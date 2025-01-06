import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img 
              src="/lovable-uploads/62b2a12e-2e10-4096-adae-5afec671bbf9.png" 
              alt="Geneva Coat of Arms" 
              className="h-8 w-auto"
            />
            <Link to="/" className="text-primary text-xl font-bold">
              Geneva Services
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/browse" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
              Browse Services
            </Link>
            <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
              Become a Provider
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Browse Services
              </Link>
              <Link
                to="/signup"
                className="block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                onClick={() => setIsOpen(false)}
              >
                Become a Provider
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;