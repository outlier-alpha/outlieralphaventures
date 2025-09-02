import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Headphones, Play, ExternalLink } from "lucide-react";

const Resources = () => {
  const aiPrompts = [
    {
      title: "Due Diligence Automation Workflows",
      description: "Comprehensive prompts for automating financial analysis and due diligence processes",
      type: "Workflow Package",
      downloads: "1.2K"
    },
    {
      title: "Market Research AI Assistant",
      description: "Prompts for competitive intelligence gathering and market analysis",
      type: "Prompt Library",
      downloads: "890"
    },
    {
      title: "Investment Thesis Generator",
      description: "Structured prompts for developing and validating investment hypotheses",
      type: "Strategy Tool",
      downloads: "650"
    },
    {
      title: "Risk Assessment Framework",
      description: "AI-powered risk evaluation prompts for venture investments",
      type: "Risk Management",
      downloads: "430"
    }
  ];

  const books = [
    {
      title: "Venture Deals",
      author: "Brad Feld & Jason Mendelson",
      summary: "Essential guide to venture capital deal structures, term sheets, and negotiation strategies. A must-read for entrepreneurs and investors.",
      link: "https://www.amazon.com/Venture-Deals-Smarter-Lawyer-Capitalist/dp/1119594820",
      category: "Venture Capital"
    },
    {
      title: "The Lean Startup",
      author: "Eric Ries",
      summary: "Revolutionary approach to building startups through validated learning, rapid experimentation, and iterative product development.",
      link: "https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898",
      category: "Entrepreneurship"
    },
    {
      title: "Blitzscaling",
      author: "Reid Hoffman",
      summary: "Framework for rapidly scaling companies and achieving market dominance in the technology era. Essential for growth-stage ventures.",
      link: "https://www.amazon.com/Blitzscaling-Lightning-Fast-Building-Massively-Companies/dp/1524761419",
      category: "Growth Strategy"
    }
  ];

  const podcasts = [
    {
      title: "The Twenty Minute VC",
      host: "Harry Stebbings",
      summary: "Leading venture capital podcast featuring interviews with top VCs, entrepreneurs, and industry thought leaders.",
      link: "https://www.thetwentyminutevc.com/",
      category: "Venture Capital"
    },
    {
      title: "Masters in Business",
      host: "Barry Ritholtz",
      summary: "Bloomberg's flagship business podcast covering markets, economics, and investment strategies with industry leaders.",
      link: "https://www.bloomberg.com/podcasts/masters_in_business",
      category: "Markets"
    },
    {
      title: "Invest Like the Best",
      host: "Patrick O'Shaughnessy",
      summary: "Deep conversations with successful investors and business leaders about decision-making and strategy.",
      link: "https://www.joincolossus.com/episodes",
      category: "Investment Strategy"
    }
  ];

  const videos = [
    {
      title: "AI's $200B Question",
      creator: "Sequoia Capital",
      summary: "Analysis of AI infrastructure investments and the path to sustainable returns in artificial intelligence.",
      link: "https://www.youtube.com/watch?v=example1",
      duration: "24 min",
      category: "AI/Tech"
    },
    {
      title: "The Future of Fintech",
      creator: "A16Z",
      summary: "Comprehensive overview of fintech evolution, regulatory challenges, and emerging opportunities in financial services.",
      link: "https://www.youtube.com/watch?v=example2",
      duration: "32 min",
      category: "Fintech"
    },
    {
      title: "Building Marketplace Networks",
      creator: "NFX",
      summary: "Strategic framework for building and scaling network effect businesses and marketplace platforms.",
      link: "https://www.youtube.com/watch?v=example3",
      duration: "28 min",
      category: "Network Effects"
    }
  ];

  return (
    <main className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
            Resources & <span className="text-gradient-primary">Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Curated collection of AI workflows, essential reads, and strategic content for venture builders
          </p>
        </div>

        {/* AI Prompts & Workflows Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Download className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold font-serif">
              AI Prompts & Workflow Library
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {aiPrompts.map((prompt, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-card transition-premium group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {prompt.type}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {prompt.downloads}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-premium">
                    {prompt.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {prompt.description}
                  </p>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Package
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Books Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold font-serif">
              Essential Reads
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-card transition-premium">
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {book.category}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-foreground">
                    {book.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    by {book.author}
                  </p>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {book.summary}
                  </p>
                  
                  <a 
                    href={book.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary-glow transition-premium font-medium"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Book
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Podcasts Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Headphones className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold font-serif">
              Recommended Podcasts
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {podcasts.map((podcast, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-card transition-premium">
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {podcast.category}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-foreground">
                    {podcast.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    hosted by {podcast.host}
                  </p>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {podcast.summary}
                  </p>
                  
                  <a 
                    href={podcast.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary-glow transition-premium font-medium"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Listen Now
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Play className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold font-serif">
              Strategic Video Content
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-card transition-premium">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {video.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {video.duration}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-foreground">
                    {video.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    by {video.creator}
                  </p>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {video.summary}
                  </p>
                  
                  <a 
                    href={video.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary-glow transition-premium font-medium"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Watch Video
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Resources;