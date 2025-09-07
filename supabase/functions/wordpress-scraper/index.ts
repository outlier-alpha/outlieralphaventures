import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WordPressPost {
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  categories: number[];
  tags: number[];
  featured_media: number;
}

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting WordPress content scraping...');

    // Fetch posts from WordPress API - try multiple possible URLs
    let postsResponse;
    let posts: WordPressPost[] = [];
    
    // Try different WordPress REST API endpoints
    const possibleUrls = [
      'https://public-api.wordpress.com/wp/v2/sites/investedatadiaries.wordpress.com/posts?per_page=100&status=publish',
      'https://investedatadiaries.wordpress.com/wp-json/wp/v2/posts?per_page=100&status=publish',
      'https://public-api.wordpress.com/rest/v1.1/sites/investedatadiaries.wordpress.com/posts?number=100'
    ];
    
    for (const url of possibleUrls) {
      try {
        console.log(`Trying URL: ${url}`);
        postsResponse = await fetch(url);
        if (postsResponse.ok) {
          const responseText = await postsResponse.text();
          console.log(`Response from ${url}:`, responseText.substring(0, 200));
          
          // Handle different response formats
          const responseData = JSON.parse(responseText);
          if (responseData.posts) {
            // WordPress.com API format
            posts = responseData.posts.map((post: any) => ({
              title: { rendered: post.title },
              content: { rendered: post.content },
              excerpt: { rendered: post.excerpt },
              date: post.date,
              link: post.URL || post.guid,
              categories: post.categories ? Object.keys(post.categories).map(Number) : [],
              tags: post.tags ? Object.keys(post.tags).map(Number) : [],
              featured_media: post.featured_image || 0
            }));
          } else if (Array.isArray(responseData)) {
            // Standard WordPress REST API format
            posts = responseData;
          }
          
          if (posts.length > 0) {
            console.log(`Successfully fetched ${posts.length} posts from ${url}`);
            break;
          }
        }
      } catch (error) {
        console.log(`Failed to fetch from ${url}:`, error);
        continue;
      }
    }

    if (posts.length === 0) {
      throw new Error('Unable to fetch posts from any WordPress API endpoint');
    }

    // For WordPress.com API, categories might be in a different format
    let categories: WordPressCategory[] = [];
    let categoryMap = new Map<number, string>();
    
    // Try to fetch categories, but don't fail if it doesn't work
    try {
      const categoriesResponse = await fetch('https://public-api.wordpress.com/rest/v1.1/sites/investedatadiaries.wordpress.com/categories');
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        if (categoriesData.categories) {
          categories = Object.values(categoriesData.categories).map((cat: any) => ({
            id: cat.ID,
            name: cat.name,
            slug: cat.slug
          }));
          categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
        }
      }
    } catch (error) {
      console.log('Could not fetch categories, using default mapping');
      // Create a simple mapping for common categories
      categoryMap = new Map([
        [1, 'General'],
        [2, 'Finance'],
        [3, 'AI'],
        [4, 'Technology'],
        [5, 'Investment']
      ]);
    }

    console.log(`Found ${posts.length} posts to process`);

    let successCount = 0;
    let errorCount = 0;

    for (const post of posts) {
      try {
        // Map WordPress categories to our category system
        const postCategories = post.categories.map(catId => categoryMap.get(catId)).filter(Boolean);
        const primaryCategory = postCategories[0] || 'General';

        // Map to our content type - using blog_post as the database type
        const contentType = 'blog_post';

        const contentData = {
          title: post.title.rendered.replace(/<[^>]*>/g, ''), // Strip HTML
          description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 300) + '...',
          content_html: post.content.rendered,
          content_type: contentType,
          external_url: post.link,
          category: primaryCategory,
          tags: postCategories,
          status: 'published',
          published_at: post.date,
          metadata: {
            wordpress_id: post.link,
            original_categories: post.categories,
            original_tags: post.tags,
            featured_media: post.featured_media
          }
        };

        // Check if content already exists
        const { data: existingContent } = await supabaseClient
          .from('content')
          .select('id')
          .eq('external_url', post.link)
          .single();

        if (existingContent) {
          console.log(`Updating existing post: ${post.title.rendered}`);
          const { error } = await supabaseClient
            .from('content')
            .update(contentData)
            .eq('external_url', post.link);
          
          if (error) throw error;
        } else {
          console.log(`Creating new post: ${post.title.rendered}`);
          const { error } = await supabaseClient
            .from('content')
            .insert([contentData]);
          
          if (error) throw error;
        }

        successCount++;
      } catch (error) {
        console.error(`Error processing post "${post.title.rendered}":`, error);
        errorCount++;
      }
    }

    console.log(`Scraping completed. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully processed ${successCount} posts with ${errorCount} errors`,
        stats: { successCount, errorCount, totalPosts: posts.length }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('WordPress scraper error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});