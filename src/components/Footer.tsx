import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A]/60 backdrop-blur-md text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold font-poppins">Helpify</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              Your trusted platform for finding and booking reliable service providers in Geneva.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-gray-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-we-work" className="text-gray-200 hover:text-white transition-colors">
                  How We Work
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold font-poppins">Contact Information</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-200">
                <MapPin className="h-5 w-5 text-blue-200" />
                Avenue de la Grenade 7, 1217 Geneve, Switzerland
              </p>
              <p className="flex items-center gap-2 text-gray-200">
                <Phone className="h-5 w-5 text-blue-200" />
                +41 22 123 45 67
              </p>
              <p className="flex items-center gap-2 text-gray-200">
                <Mail className="h-5 w-5 text-blue-200" />
                contact@helpify.ch
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-400/30">
          <p className="text-center text-sm text-gray-300">
            © {new Date().getFullYear()} Helpify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;