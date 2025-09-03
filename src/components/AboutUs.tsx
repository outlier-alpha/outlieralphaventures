import { GraduationCap, Award, Building2 } from "lucide-react";
import iabeLogoImg from "@/assets/iabe-logo.gif";

const AboutUs = () => {
  const institutions = [
    {
      name: "IIT-BHU",
      description: "Indian Institute of Technology",
      icon: GraduationCap
    },
    {
      name: "IIM Lucknow", 
      description: "Indian Institute of Management",
      icon: GraduationCap
    },
    {
      name: "ESCP Business School",
      description: "European School of Management",
      icon: Building2
    },
    {
      name: "GARP",
      description: "Global Association of Risk Professionals",
      icon: Award
    }
  ];

  return (
    <section className="py-16 bg-card/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            <span className="text-gradient-primary">About</span> Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leading expertise from world-class institutions
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {institutions.map((institution, index) => {
            const IconComponent = institution.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center group hover:scale-105 transition-premium min-w-32"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-premium transition-premium mb-2">
                  <IconComponent className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1 text-center">{institution.name}</h3>
                <p className="text-xs text-muted-foreground text-center">
                  {institution.description}
                </p>
              </div>
            );
          })}
          
          <div className="flex flex-col items-center group hover:scale-105 transition-premium min-w-32">
            <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center shadow-glow group-hover:shadow-premium transition-premium mb-2 overflow-hidden">
              <img 
                src={iabeLogoImg} 
                alt="IABE Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <h3 className="font-semibold text-sm text-foreground mb-1 text-center">IABE</h3>
            <p className="text-xs text-muted-foreground text-center">
              Journal International Finance & Economics
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;