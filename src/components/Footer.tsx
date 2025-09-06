import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Linkedin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-card border-t border-border/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold font-serif mb-4">Outlier Alpha</h3>
            <p className="text-muted-foreground mb-6">Next-generation venture studio combining strategic advisory with AI transformation expertise.</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/#services" className="hover:text-foreground transition-premium">Market & Competitive Intelligence</a></li>
              <li><a href="/#services" className="hover:text-foreground transition-premium">AI/ML Powered Transformation</a></li>
              <li><a href="/#services" className="hover:text-foreground transition-premium">Fundraise & M&A Advisory</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/#research" className="hover:text-foreground transition-premium">Research & Insights</a></li>
              <li><a href="/resources" className="hover:text-foreground transition-premium">Resources & Tools</a></li>
              <li><a href="https://investedatadiaries.wordpress.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-premium">Archive</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>info.outlieralpha@gmail.com</li>
              <li>+91 (XXX) XXX-XXXX</li>
              <li>Delhi, Singapore</li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/outlier-alpha-ventures/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:text-foreground transition-premium"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
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