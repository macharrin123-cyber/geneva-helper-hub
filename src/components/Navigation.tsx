import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, HelpingHand, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      navigate("/");
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    }
  };

  const getCurrentFlag = () => {
    switch (language) {
      case 'en':
        return '🇬🇧';
      case 'fr':
        return '🇫🇷';
      case 'de':
        return '🇩🇪';
      case 'it':
        return '🇮🇹';
      default:
        return '🇬🇧';
    }
  };

  const linkStyles = "text-white relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

  const iconButtonStyles = "text-white hover:text-[#0EA5E9] hover:ring-2 hover:ring-[#0EA5E9] transition-all duration-200";

  return (
    <nav className="bg-[#0EA5E9]/50 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <HelpingHand className="h-8 w-8 text-white" />
            <Link to="/" className="text-white text-xl font-poppins font-semibold hover:text-blue-100 transition-colors duration-200">
              Helpify
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={linkStyles}>
              {t('nav.home')}
            </Link>
            <Link to="/how-we-work" className={linkStyles}>
              {t('nav.howWeWork')}
            </Link>
            <Link to="/about-us" className={linkStyles}>
              {t('nav.aboutUs')}
            </Link>
            <Link to="/faq" className={linkStyles}>
              FAQ
            </Link>
            <Link to="/contact" className={linkStyles}>
              {t('nav.contact')}
            </Link>
            {user && (
              <Link to="/chat" className={linkStyles}>
                Chat
              </Link>
            )}

            {!user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={iconButtonStyles}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-48 bg-white/95 backdrop-blur-sm border border-gray-200"
                  >
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/signin?type=client" 
                        className="flex items-center cursor-pointer hover:bg-blue-50"
                      >
                        Sign in as Client
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/signin?type=provider" 
                        className="flex items-center cursor-pointer hover:bg-blue-50"
                      >
                        Sign in as Provider
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link to="/signup" className="bg-white text-[#1E3A8A] px-4 py-2 rounded-md hover:bg-blue-50">
                  {t('nav.becomeProvider')}
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="text-white hover:text-blue-100 px-3 py-2 rounded-md"
              >
                {t('nav.signOut')}
              </button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={iconButtonStyles}>
                  <span className="text-xl">{getCurrentFlag()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fr')}>
                  🇫🇷 Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('de')}>
                  🇩🇪 Deutsch
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('it')}>
                  🇮🇹 Italiano
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:text-blue-100"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                className="w-48 bg-white/95 backdrop-blur-sm border border-gray-200"
              >
                <DropdownMenuItem asChild>
                  <Link 
                    to="/signin?type=client" 
                    className="flex items-center cursor-pointer hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in as Client
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    to="/signin?type=provider" 
                    className="flex items-center cursor-pointer hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in as Provider
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-[#1E3A8A]/60 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/how-we-work"
                className="block text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.howWeWork')}
              </Link>
              <Link
                to="/about-us"
                className="block text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.aboutUs')}
              </Link>
              <Link
                to="/faq"
                className="block text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="block text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.contact')}
              </Link>
              {user && (
                <Link
                  to="/chat"
                  className="block text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Chat
                </Link>
              )}

              <div className="flex gap-2 px-3 py-2">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-blue-100"
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => {
                    setLanguage('fr');
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-blue-100"
                >
                  🇫🇷 Français
                </button>
                <button
                  onClick={() => {
                    setLanguage('de');
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-blue-100"
                >
                  🇩🇪 Deutsch
                </button>
                <button
                  onClick={() => {
                    setLanguage('it');
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-blue-100"
                >
                  🇮🇹 Italiano
                </button>
              </div>

              {!user ? (
                <div className="px-3 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-full flex items-center justify-between text-white hover:text-blue-100"
                      >
                        <span className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          {t('nav.signIn')}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start"
                      className="w-48 bg-white/95 backdrop-blur-sm border border-gray-200"
                    >
                      <DropdownMenuItem asChild>
                        <Link 
                          to="/signin?type=client" 
                          className="flex items-center cursor-pointer hover:bg-blue-50"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign in as Client
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link 
                          to="/signin?type=provider" 
                          className="flex items-center cursor-pointer hover:bg-blue-50"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign in as Provider
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    to="/signup"
                    className="mt-2 block bg-white text-[#1E3A8A] px-4 py-2 rounded-md hover:bg-blue-50 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.becomeProvider')}
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left text-white hover:text-blue-100 px-3 py-2 rounded-md"
                >
                  {t('nav.signOut')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;