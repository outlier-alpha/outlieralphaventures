import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const Footer = () => {
  return <footer className="bg-card border-t border-border/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold font-serif mb-4">Outlier Alpha</h3>
            <p className="text-muted-foreground mb-6">Next-generation venture studio combining strategic advisory with AI transformation expertise.</p>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-premium">Market Intelligence</a></li>
              <li><a href="#" className="hover:text-foreground transition-premium">AI Transformation</a></li>
              
              <li><a href="#" className="hover:text-foreground transition-premium">Strategic Consulting</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#research" className="hover:text-foreground transition-premium">Research</a></li>
              <li><a href="#resources" className="hover:text-foreground transition-premium">Insights</a></li>
              
              <li><a href="#" className="hover:text-foreground transition-premium">White Papers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>info.outlieralpha@gmail.com</li>
              <li>+91 (XXX) XXX-XXXX</li>
              <li>New York, NY</li>
              <li>
            </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 Outlier Alpha. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-premium">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-premium">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-premium">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;