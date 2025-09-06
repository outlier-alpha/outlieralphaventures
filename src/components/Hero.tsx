import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Brain, Target } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroBg})`
    }} />
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight">
            <span className="text-gradient-primary">Next-Gen</span><br />
            <span className="text-foreground">Venture Studio</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">Nurturing Tomorrow's Titans with AI-powered intelligence, strategic growth, and fundraise advisory.</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="hero" 
              size="xl" 
              className="shadow-glow"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Our Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by Leaders</p>
            <div className="flex justify-center space-x-8 opacity-60">
              <div className="text-xs tracking-wider font-medium">FORTUNE 500</div>
              <div className="text-xs tracking-wider font-medium">UNICORNS</div>
              <div className="text-xs tracking-wider font-medium">PE FIRMS</div>
              <div className="text-xs tracking-wider font-medium">STARTUPS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-secondary rounded-full animate-glow" />
      <div className="absolute top-3/4 right-10 w-1 h-1 bg-primary-glow rounded-full animate-float" />
      <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-secondary-glow rounded-full animate-glow" />
    </section>;
};
export default Hero;