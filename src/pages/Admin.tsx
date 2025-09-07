import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface ContentItem {
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
}

const Admin = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    content_type: 'blog_post' | 'book' | 'podcast' | 'video' | 'ai_prompt';
    content_html: string;
    external_url: string;
    thumbnail_url: string;
    category: string;
    tags: string[];
    status: 'draft' | 'published' | 'archived';
  }>({
    title: '',
    description: '',
    content_type: 'blog_post',
    content_html: '',
    external_url: '',
    thumbnail_url: '',
    category: '',
    tags: [],
    status: 'draft'
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content_type: 'blog_post',
      content_html: '',
      external_url: '',
      thumbnail_url: '',
      category: '',
      tags: [],
      status: 'draft'
    });
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsCreating(true);
  };

  const handleEdit = (item: ContentItem) => {
    setFormData({
      title: item.title,
      description: item.description || '',
      content_type: item.content_type,
      content_html: item.content_html || '',
      external_url: item.external_url || '',
      thumbnail_url: item.thumbnail_url || '',
      category: item.category || '',
      tags: item.tags || [],
      status: item.status
    });
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleSave = async () => {
    try {
      const saveData = {
        ...formData,
        published_at: formData.status === 'published' ? new Date().toISOString() : null
      };

      if (editingItem) {
        // Update existing content
        const { error } = await supabase
          .from('content')
          .update(saveData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Content updated successfully"
        });
      } else {
        // Create new content
        const { error } = await supabase
          .from('content')
          .insert([saveData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Content created successfully"
        });
      }
      
      resetForm();
      fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;
    
    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Content deleted successfully"
      });
      
      fetchContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive"
      });
    }
  };

  const syncWordPress = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('wordpress-scraper');
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "WordPress content synced successfully"
      });
      
      fetchContent();
    } catch (error) {
      console.error('Error syncing WordPress:', error);
      toast({
        title: "Error",
        description: "Failed to sync WordPress content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold font-serif">Content Management</h1>
          <div className="flex gap-4">
            <Button onClick={syncWordPress} variant="outline">
              Sync WordPress
            </Button>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </div>
        </div>

        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList>
            <TabsTrigger value="manage">Manage Content</TabsTrigger>
            {(isCreating || editingItem) && (
              <TabsTrigger value="edit">
                {editingItem ? 'Edit Content' : 'Create Content'}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="manage">
            <div className="grid gap-6">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading content...</p>
                </div>
              ) : content.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No content found</p>
                </div>
              ) : (
                content.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                            {item.status}
                          </Badge>
                          <Badge variant="outline">{item.content_type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Category: {item.category || 'None'}</span>
                          <span>Created: {new Date(item.created_at).toLocaleDateString()}</span>
                          {item.external_url && (
                            <a 
                              href={item.external_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              View External
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {(isCreating || editingItem) && (
            <TabsContent value="edit">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">
                    {editingItem ? 'Edit Content' : 'Create New Content'}
                  </h2>
                  <Button variant="ghost" onClick={resetForm}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Title</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter content title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content Type</label>
                      <Select 
                        value={formData.content_type}
                        onValueChange={(value: 'blog_post' | 'book' | 'podcast' | 'video' | 'ai_prompt') => setFormData(prev => ({ ...prev, content_type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blog_post">Blog Post</SelectItem>
                          <SelectItem value="book">Book</SelectItem>
                          <SelectItem value="podcast">Podcast</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="ai_prompt">AI Prompt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the content"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Input
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="Content category"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <Select 
                        value={formData.status}
                        onValueChange={(value: 'draft' | 'published' | 'archived') => setFormData(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">External URL</label>
                      <Input
                        value={formData.external_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, external_url: e.target.value }))}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Thumbnail URL</label>
                      <Input
                        value={formData.thumbnail_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Content (HTML)</label>
                    <Textarea
                      value={formData.content_html}
                      onChange={(e) => setFormData(prev => ({ ...prev, content_html: e.target.value }))}
                      placeholder="HTML content (optional for external links)"
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleSave} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      {editingItem ? 'Update' : 'Create'}
                    </Button>
                    <Button variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;