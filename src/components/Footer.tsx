import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center text-white font-bold">
                Q
              </div>
              <div>
                <h3 className="text-lg font-bold text-gradient">Quick Delivery</h3>
                <p className="text-xs text-muted-foreground">Kadapa's fastest grocery</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Fresh groceries delivered to your doorstep in 30 minutes. Serving Kadapa with love and speed.
            </p>
            <div className="flex space-x-2">
              <a href="#" className="p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund" className="text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/fruits-vegetables" className="text-muted-foreground hover:text-primary transition-colors">Fruits & Vegetables</Link></li>
              <li><Link to="/category/dairy-eggs" className="text-muted-foreground hover:text-primary transition-colors">Dairy & Eggs</Link></li>
              <li><Link to="/category/staples" className="text-muted-foreground hover:text-primary transition-colors">Staples</Link></li>
              <li><Link to="/category/snacks" className="text-muted-foreground hover:text-primary transition-colors">Snacks</Link></li>
              <li><Link to="/category/beverages" className="text-muted-foreground hover:text-primary transition-colors">Beverages</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">help@quickdelivery.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  Quick Delivery Hub<br />
                  Gandhi Road, Kadapa<br />
                  Andhra Pradesh 516001
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">7 AM - 11 PM, Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="border-t pt-8 mt-8">
          <h4 className="font-semibold mb-4">We Deliver To</h4>
          <p className="text-sm text-muted-foreground">
            <strong>Kadapa Pincodes:</strong> 516001, 516002, 516003, 516004
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Don't see your area? We're expanding soon! Contact us for updates.
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Quick Delivery. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            Made with ❤️ for Kadapa
          </p>
        </div>
      </div>
    </footer>
  );
}