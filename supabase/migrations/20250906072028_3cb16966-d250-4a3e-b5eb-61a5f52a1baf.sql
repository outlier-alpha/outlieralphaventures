-- Create content management tables for blog posts and resources

-- Create enum for content types
CREATE TYPE public.content_type AS ENUM ('blog_post', 'ai_prompt', 'book', 'podcast', 'video');

-- Create enum for content status
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create content table for all types of content
CREATE TABLE public.content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content_html TEXT,
  content_type public.content_type NOT NULL,
  status public.content_status NOT NULL DEFAULT 'draft',
  category TEXT,
  tags TEXT[],
  author_id UUID REFERENCES public.profiles(id),
  external_url TEXT,
  thumbnail_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for content (public read, admin write)
CREATE POLICY "Published content is viewable by everyone" 
ON public.content FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admin users can manage all content" 
ON public.content FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Create policies for newsletter subscribers (public insert, admin read)
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin users can view subscribers" 
ON public.newsletter_subscribers FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_updated_at
  BEFORE UPDATE ON public.content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample content to match existing data
INSERT INTO public.content (title, description, content_type, status, category, external_url, published_at) VALUES
('RBI strikes again!', 'Another day another fintech area under RBI''s lens. This time it''s the 55Bn USD Gold loans segment, where RBI has raised concerns about the evaluation process of fintechs sourcing gold via field agents.', 'blog_post', 'published', 'Fintech', 'https://investedatadiaries.wordpress.com/2024/05/01/rbi-strikes-again/', '2024-05-01'),
('Venture Funding Cycles & Market Dynamics', 'Understanding investment cycles, market timing, and founder strategies during funding droughts. Analysis of current venture landscape and emerging opportunities.', 'blog_post', 'published', 'Venture Capital', 'https://investedatadiaries.wordpress.com', '2024-01-01'),
('World of Web3 - Beta Episode 13', 'Weekly insights on NFT marketplaces, big tech moves in crypto space, and Web3 ecosystem developments. Deep dive into emerging trends and investment opportunities.', 'blog_post', 'published', 'Web3', 'https://investedatadiaries.wordpress.com/2022/10/02/world-of-web3-beta-ep13/', '2022-10-02');

-- Create indexes for better performance
CREATE INDEX idx_content_type_status ON public.content(content_type, status);
CREATE INDEX idx_content_published_at ON public.content(published_at);
CREATE INDEX idx_content_category ON public.content(category);
CREATE INDEX idx_profiles_role ON public.profiles(role);