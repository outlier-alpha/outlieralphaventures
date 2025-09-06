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

    // Fetch posts from WordPress API
    const postsResponse = await fetch('https://investedatadiaries.wordpress.com/wp-json/wp/v2/posts?per_page=100&status=publish');
    const posts: WordPressPost[] = await postsResponse.json();

    // Fetch categories
    const categoriesResponse = await fetch('https://investedatadiaries.wordpress.com/wp-json/wp/v2/categories');
    const categories: WordPressCategory[] = await categoriesResponse.json();

    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));

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