import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
const Index = () => {
  return <main className="pt-16">
      <Hero />
      <Services />
      <AboutUs />
      
      {/* Research Section */}
      <section id="research" className="py-24 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span className="text-gradient-secondary">Research</span> & Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Latest analysis and insights from InvesteData Diaries
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[{
            title: "RBI Strikes Again",
            description: "Analysis of RBI's latest guidelines affecting the fintech ecosystem and gold loan segment.",
            link: "https://investedatadiaries.wordpress.com/2024/05/01/rbi-strikes-again/"
          }, {
            title: "Venture Funding Cycles",
            description: "Understanding investment cycles and founder strategies during funding droughts.",
            link: "https://investedatadiaries.wordpress.com"
          }, {
            title: "World of Web3",
            description: "Weekly insights on NFT marketplaces, big tech moves, and Web3 ecosystem developments.",
            link: "https://investedatadiaries.wordpress.com/2022/10/02/world-of-web3-beta-ep13/"
          }].map((article, index) => <div key={index} className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/20 hover:shadow-card transition-premium">
                <h3 className="font-semibold mb-3 text-foreground">{article.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{article.description}</p>
                <div className="flex justify-between items-center">
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary-glow transition-premium"
                  >
                    Read More →
                  </a>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span className="text-gradient-primary">Resources</span> & Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Access comprehensive resources from our knowledge base
          </p>
          <div className="text-muted-foreground">
            <p>Resources content will be populated from the GitHub repository and blog archives.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-card">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            Ready to <span className="text-gradient-secondary">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">Partner with us to unlock the full potential of AI-powered intelligence and strategic growth advisory.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold hover:shadow-glow transition-premium">
              Schedule Consultation
            </button>
            
          </div>
        </div>
      </section>
    </main>;
};
export default Index;