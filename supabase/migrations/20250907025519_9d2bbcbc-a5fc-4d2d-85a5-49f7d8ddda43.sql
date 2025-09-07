-- Create additional tables for comprehensive content management

-- Create content categories table
CREATE TABLE public.content_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on content_categories
ALTER TABLE public.content_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for content_categories
CREATE POLICY "Content categories are viewable by everyone" 
ON public.content_categories 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admin users can manage content categories" 
ON public.content_categories 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Create content_tags table for tagging system
CREATE TABLE public.content_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#3B82F6', -- Default blue color
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on content_tags
ALTER TABLE public.content_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for content_tags
CREATE POLICY "Content tags are viewable by everyone" 
ON public.content_tags 
FOR SELECT 
USING (true);

CREATE POLICY "Admin users can manage content tags" 
ON public.content_tags 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Create content_tag_relations for many-to-many relationship
CREATE TABLE public.content_tag_relations (
  content_id UUID NOT NULL REFERENCES public.content(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.content_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, tag_id)
);

-- Enable RLS on content_tag_relations
ALTER TABLE public.content_tag_relations ENABLE ROW LEVEL SECURITY;

-- Create policies for content_tag_relations
CREATE POLICY "Content tag relations are viewable by everyone" 
ON public.content_tag_relations 
FOR SELECT 
USING (true);

CREATE POLICY "Admin users can manage content tag relations" 
ON public.content_tag_relations 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Add trigger for content_categories updated_at
CREATE TRIGGER update_content_categories_updated_at
BEFORE UPDATE ON public.content_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content categories
INSERT INTO public.content_categories (name, slug, description, display_order) VALUES
('General', 'general', 'General content and articles', 1),
('Finance', 'finance', 'Financial analysis and insights', 2),
('AI & Technology', 'ai-technology', 'Artificial intelligence and technology content', 3),
('Investment Strategy', 'investment-strategy', 'Investment strategies and market analysis', 4),
('Due Diligence', 'due-diligence', 'Due diligence processes and tools', 5),
('Venture Capital', 'venture-capital', 'Venture capital and startup funding', 6);

-- Insert default content tags
INSERT INTO public.content_tags (name, slug, color) VALUES
('AI', 'ai', '#3B82F6'),
('Finance', 'finance', '#10B981'),
('Investment', 'investment', '#F59E0B'),
('Technology', 'technology', '#8B5CF6'),
('Strategy', 'strategy', '#EF4444'),
('Analysis', 'analysis', '#06B6D4'),
('Market Research', 'market-research', '#84CC16'),
('Due Diligence', 'due-diligence', '#F97316');