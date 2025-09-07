import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNewsletter } from "@/hooks/useNewsletter";
import { useContent } from "@/hooks/useContent";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

const Research = () => {
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);
  const { subscribe, isLoading, message } = useNewsletter();
  const { content: articles, loading: articlesLoading, error, refetch } = useContent('blog_post', selectedCategory);

  const handleSubscribe = () => {
    subscribe(email);
    setEmail('');
  };

  const loadWordPressContent = async () => {
    setIsLoadingData(true);
    try {
      const { data, error } = await supabase.functions.invoke('wordpress-scraper');
      if (error) throw error;
      console.log('WordPress content loaded:', data);
      refetch(); // Refresh the articles
    } catch (error) {
      console.error('Error loading WordPress content:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Get unique categories from articles
  const categories = ['All', ...Array.from(new Set(articles.map(article => article.category).filter(Boolean)))];

  // Handle load more functionality
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  // Filter and slice articles for display
  const displayedArticles = articles.slice(0, displayCount);
  const hasMore = displayCount < articles.length;

  

  return (
    <main className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
            Research & <span className="text-gradient-primary">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Ideas, Frameworks & Strategies to keep you ahead
          </p>
          
          {/* Load WordPress Content Button */}
          <div className="mb-6">
            <Button 
              onClick={loadWordPressContent}
              disabled={isLoadingData}
              variant="outline"
              size="sm"
            >
              {isLoadingData ? 'Syncing WordPress Content...' : 'Sync Latest Content'}
            </Button>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {articlesLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/20 animate-pulse">
                <div className="p-6">
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-3"></div>
                  <div className="h-20 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Error loading content: {error}</p>
            <Button onClick={refetch} variant="outline" className="mt-4">
              Try Again
            </Button>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found for the selected category.</p>
            <Button onClick={loadWordPressContent} variant="outline" className="mt-4">
              Load Content from WordPress
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article) => (
              <Card key={article.id} className="bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-card transition-premium group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-white bg-white/10 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-premium">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {article.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    {article.external_url ? (
                      <a 
                        href={article.external_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-white hover:text-white/80 transition-premium font-medium"
                      >
                        Read Full Analysis →
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Full content available
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Section */}
        {hasMore && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleLoadMore}
            >
              See More Posts
            </Button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">
            Stay Updated with Our <span className="text-gradient-secondary">Research</span>
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get weekly insights and analysis on everything AI x Finance delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button 
              variant="premium" 
              onClick={handleSubscribe}
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
          {message && (
            <p className="mt-4 text-sm text-center text-foreground">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Research;