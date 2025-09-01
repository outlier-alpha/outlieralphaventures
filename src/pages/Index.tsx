import Hero from "@/components/Hero";
import Services from "@/components/Services";

const Index = () => {
  return (
    <main className="pt-16">
      <Hero />
      <Services />
      
      {/* Research Section Placeholder */}
      <section id="research" className="py-24 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span className="text-gradient-secondary">Research</span> & Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Deep-dive analysis and thought leadership on emerging markets, 
            technology trends, and investment opportunities.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "FinTech Disruption Report 2024",
                description: "Comprehensive analysis of emerging fintech trends and their impact on traditional banking.",
                readTime: "12 min read"
              },
              {
                title: "AI in Private Equity",
                description: "How artificial intelligence is transforming due diligence and portfolio management.",
                readTime: "8 min read"
              },
              {
                title: "Market Intelligence Trends",
                description: "The evolution of competitive intelligence in the age of big data and automation.",
                readTime: "15 min read"
              }
            ].map((article, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/20 hover:shadow-card transition-premium">
                <h3 className="font-semibold mb-3 text-foreground">{article.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{article.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-secondary">{article.readTime}</span>
                  <button className="text-sm text-primary hover:text-primary-glow transition-premium">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section Placeholder */}
      <section id="resources" className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span className="text-gradient-primary">Resources</span> & Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Curated resources, tools, and frameworks to accelerate your business transformation.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Investment Frameworks", count: "12 Templates" },
              { title: "Market Analysis Tools", count: "8 Tools" },
              { title: "AI Implementation Guides", count: "15 Guides" },
              { title: "Case Studies", count: "25 Studies" }
            ].map((resource, index) => (
              <div key={index} className="bg-gradient-card p-6 rounded-lg border border-border/20 hover:shadow-premium transition-premium">
                <div className="text-2xl font-bold text-secondary mb-2">{resource.count}</div>
                <div className="text-foreground font-semibold">{resource.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-card">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            Ready to <span className="text-gradient-secondary">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Partner with us to unlock the full potential of AI-powered intelligence and strategic investment advisory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold hover:shadow-glow transition-premium">
              Schedule Consultation
            </button>
            <button className="border border-border/20 bg-card/10 backdrop-blur-sm text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-card/20 transition-premium">
              View Portfolio
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;