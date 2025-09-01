import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Brain, DollarSign, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Market & Competitive Intelligence",
      description: "Deep market analysis and competitive intelligence powered by AI and proprietary data sources. Get unprecedented insights into market dynamics, competitor movements, and emerging opportunities.",
      features: ["Real-time market monitoring", "Competitor analysis", "Trend forecasting", "Industry benchmarking"],
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: Brain,
      title: "AI/ML Powered Transformation",
      description: "Transform your business operations with cutting-edge AI and machine learning solutions. From process automation to predictive analytics, we architect intelligent systems that drive growth.",
      features: ["Process automation", "Predictive analytics", "Custom AI models", "Data transformation"],
      gradient: "from-secondary to-secondary-glow"
    },
    {
      icon: DollarSign,
      title: "Investment Advisory",
      description: "Strategic investment advisory backed by decades of experience and quantitative analysis. Navigate complex investment landscapes with confidence and precision.",
      features: ["Portfolio optimization", "Risk assessment", "Due diligence", "Strategic planning"],
      gradient: "from-primary-glow to-secondary"
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span className="text-gradient-primary">Our</span> Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three pillars of excellence that power next-generation business transformation
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="relative p-8 bg-gradient-card border-border/20 hover:shadow-premium transition-premium group overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-premium`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-serif mb-4 text-foreground">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary-glow">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button variant="premium" size="lg">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;