import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-primary font-bold text-lg mb-4">
              <p>CINE SPHERE</p>
            </h3>
            <p className="text-foreground/70 text-sm">
              Premium home theatre solutions for the ultimate cinematic
              experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#products"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
                >
                  All Systems
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Budget Systems
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Setup Guide
                </a>
              </li>
              <li>
                <a
                  href="#compare"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Specifications
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+918007702377"
                className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
              >
                <Phone className="w-4 h-4" />
                +91 8007702377
              </a>
              <a
                href="mailto:Sonicly123@Gmail.com"
                className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
              >
                <Mail className="w-4 h-4" />
                Sonicly123@Gmail.com
              </a>
              <div className="flex items-start gap-2 text-foreground/70 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>123 Cinema Street, Tech City, TC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/60 text-sm">
            © {currentYear} Home Theatre Systems. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 text-foreground/60 hover:text-primary hover:bg-background rounded-lg transition-all duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 text-foreground/60 hover:text-primary hover:bg-background rounded-lg transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 text-foreground/60 hover:text-primary hover:bg-background rounded-lg transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
