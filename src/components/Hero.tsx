import { Button } from "@/components/ui/button";
import EnhancedNeuralMesh from "@/components/EnhancedNeuralMesh";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Enhanced Neural Mesh Background */}
      <div className="absolute inset-0 z-0">
        <EnhancedNeuralMesh />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90 z-10" />
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 leading-tight">
            Where <span className="text-gradient-primary">AI</span> meets{" "}
            <span className="text-gradient-secondary">Finance</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Empowering venture builders with intelligent automation, strategic insights, 
            and cutting-edge tools to revolutionize investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-gradient-primary hover:shadow-glow transition-premium"
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Our Services
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-2"
              asChild
            >
              <a href="https://calendly.com/iabe-ventures/30min" target="_blank" rel="noopener noreferrer">
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-15" />
    </section>
  );
};
export default Hero;