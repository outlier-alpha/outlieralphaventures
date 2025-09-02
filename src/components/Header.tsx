import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-bold font-serif text-foreground hover:text-primary transition-premium">
            Outlier Alpha
          </Link>
          <nav className="hidden md:flex space-x-6">
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-premium">
              Services
            </a>
            <Link to="/research" className="text-muted-foreground hover:text-foreground transition-premium">
              Research
            </Link>
            <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-premium">
              Resources
            </Link>
          </nav>
        </div>
        <Button variant="hero" size="default" asChild>
          <a href="https://calendly.com/manoj-outlieralphaventures/30min" target="_blank" rel="noopener noreferrer">
            Get Started
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;