import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold font-serif text-foreground">
            Outlier Alpha
          </h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-premium">
              Services
            </a>
            <a href="#research" className="text-muted-foreground hover:text-foreground transition-premium">
              Research
            </a>
            <a href="#resources" className="text-muted-foreground hover:text-foreground transition-premium">
              Resources
            </a>
          </nav>
        </div>
        <Button variant="hero" size="default">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;