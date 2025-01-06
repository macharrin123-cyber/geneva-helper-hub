import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">TaskRabbit Clone</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/provider-dashboard" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
              Provider Dashboard
            </Link>
            <Link to="/client-dashboard" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
              My Bookings
            </Link>
            <Link to="/signup" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
              Become a Provider
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/provider-dashboard"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Provider Dashboard
            </Link>
            <Link
              to="/client-dashboard"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              My Bookings
            </Link>
            <Link
              to="/signup"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Become a Provider
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-gray-700 hover:text-primary block w-full text-left px-3 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;