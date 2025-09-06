import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  content_type: 'blog_post' | 'book' | 'podcast' | 'video' | 'ai_prompt';
  content_html: string;
  external_url: string;
  thumbnail_url: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  created_at: string;
  metadata: any;
}

export function useContent(contentType?: string, category?: string) {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, [contentType, category]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('content')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (contentType) {
        // Map frontend content types to database content types
        const dbContentType: 'blog_post' | 'book' | 'podcast' | 'video' | 'ai_prompt' = 
          contentType === 'article' ? 'blog_post' : 
          contentType === 'prompt' ? 'ai_prompt' : 
          contentType as 'blog_post' | 'book' | 'podcast' | 'video' | 'ai_prompt';
        query = query.eq('content_type', dbContentType);
      }

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      setContent(data as ContentItem[] || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  return { content, loading, error, refetch: fetchContent };
}