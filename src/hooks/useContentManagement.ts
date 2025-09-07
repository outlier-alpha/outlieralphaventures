import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ContentFormData {
  title: string;
  description: string;
  content_type: 'blog_post' | 'book' | 'podcast' | 'video' | 'ai_prompt';
  content_html: string;
  external_url: string;
  thumbnail_url: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
}

export interface ContentItem extends ContentFormData {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  author_id: string | null;
  metadata: any;
}

export function useContentManagement() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createContent = async (data: ContentFormData): Promise<ContentItem | null> => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase
        .from('content')
        .insert([{
          ...data,
          published_at: data.status === 'published' ? new Date().toISOString() : null
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content created successfully"
      });

      return result;
    } catch (error) {
      console.error('Error creating content:', error);
      toast({
        title: "Error",
        description: "Failed to create content",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: string, data: Partial<ContentFormData>): Promise<ContentItem | null> => {
    try {
      setLoading(true);
      const updateData: any = { ...data };
      
      if (data.status === 'published' && !updateData.published_at) {
        updateData.published_at = new Date().toISOString();
      }

      const { data: result, error } = await supabase
        .from('content')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully"
      });

      return result;
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content deleted successfully"
      });

      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const publishContent = async (id: string): Promise<ContentItem | null> => {
    return updateContent(id, { 
      status: 'published', 
      published_at: new Date().toISOString() 
    } as any);
  };

  const archiveContent = async (id: string): Promise<ContentItem | null> => {
    return updateContent(id, { status: 'archived' });
  };

  const duplicateContent = async (id: string): Promise<ContentItem | null> => {
    try {
      setLoading(true);
      
      // First, get the original content
      const { data: original, error: fetchError } = await supabase
        .from('content')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Create a copy with modified title and draft status
      const duplicateData = {
        ...original,
        id: undefined, // Let the database generate a new ID
        title: `${original.title} (Copy)`,
        status: 'draft' as const,
        published_at: null,
        created_at: undefined, // Let the database set this
        updated_at: undefined, // Let the database set this
      };

      const { data: result, error } = await supabase
        .from('content')
        .insert([duplicateData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content duplicated successfully"
      });

      return result;
    } catch (error) {
      console.error('Error duplicating content:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate content",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createContent,
    updateContent,
    deleteContent,
    publishContent,
    archiveContent,
    duplicateContent
  };
}