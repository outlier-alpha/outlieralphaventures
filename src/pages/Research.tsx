import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Research = () => {
  const articles = [
    {
      title: "RBI strikes again!",
      description: "Another day another fintech area under RBI's lens. This time it's the 55Bn USD Gold loans segment, where RBI has raised concerns about the evaluation process of fintechs sourcing gold via field agents.",
      date: "May 1, 2024",
      link: "https://investedatadiaries.wordpress.com/2024/05/01/rbi-strikes-again/",
      category: "Fintech"
    },
    {
      title: "Venture Funding Cycles & Market Dynamics",
      description: "Understanding investment cycles, market timing, and founder strategies during funding droughts. Analysis of current venture landscape and emerging opportunities.",
      date: "2024",
      link: "https://investedatadiaries.wordpress.com",
      category: "Venture Capital"
    },
    {
      title: "World of Web3 - Beta Episode 13",
      description: "Weekly insights on NFT marketplaces, big tech moves in crypto space, and Web3 ecosystem developments. Deep dive into emerging trends and investment opportunities.",
      date: "October 2, 2022",
      link: "https://investedatadiaries.wordpress.com/2022/10/02/world-of-web3-beta-ep13/",
      category: "Web3"
    },
    {
      title: "Fintech Regulatory Landscape Analysis",
      description: "RBI's relentless stream of guidelines for the last two years has formalized key business processes – whether it's KYC norms, loading of PPI cards, limits on FLDG, scope of nodal accounts.",
      date: "2024",
      link: "https://investedatadiaries.wordpress.com",
      category: "Regulation"
    },
    {
      title: "Payment Industry Margins & Monetization",
      description: "Margins in the core payments business are already abysmally low. Limited access to data insights that are only to be stored by card issuer and network. Analysis of credit as monetization strategy.",
      date: "2024",
      link: "https://investedatadiaries.wordpress.com",
      category: "Payments"
    },
    {
      title: "Consumer Lending Market Analysis",
      description: "Consumer lending has faced double whammy with increasing compliance costs and raising risk weights for unsecured portfolio tightening the capital supply at bank level.",
      date: "2024",
      link: "https://investedatadiaries.wordpress.com",
      category: "Lending"
    }
  ];

  const categories = ["All", "Fintech", "Venture Capital", "Web3", "Regulation", "Payments", "Lending"];

  return (
    <main className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
            Research & <span className="text-gradient-primary">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Deep market analysis, industry insights, and strategic perspectives from InvesteData Diaries
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-card transition-premium group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.date}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-premium">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {article.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary-glow transition-premium font-medium"
                  >
                    Read Full Analysis →
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">
            Stay Updated with Our <span className="text-gradient-secondary">Research</span>
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get weekly insights and analysis delivered to your inbox. Deep market intelligence for informed investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button variant="premium">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Research;