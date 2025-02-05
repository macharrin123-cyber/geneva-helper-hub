import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTestUser } from "@/utils/createTestUser";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'sign_in' | 'sign_up' | 'guest'>('sign_in');
  const [guestEmail, setGuestEmail] = useState('');
  const [isProcessingEmailLink, setIsProcessingEmailLink] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('User already signed in, checking profile...');
          await routeUserBasedOnType(session.user.id);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setError('Failed to check authentication status');
      }
    };
    
    checkUser();

    // Handle email confirmation
    const handleEmailConfirmation = async () => {
      if (location.hash && location.hash.includes('access_token')) {
        setIsProcessingEmailLink(true);
        try {
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) throw sessionError;
          
          if (session) {
            console.log('Email confirmation successful, routing user...');
            await routeUserBasedOnType(session.user.id);
          }
        } catch (error) {
          console.error('Error processing email confirmation:', error);
          setError('Failed to process email confirmation. Please try signing in again.');
        } finally {
          setIsProcessingEmailLink(false);
        }
      }
    };

    handleEmailConfirmation();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === "SIGNED_IN" && session) {
        console.log('User signed in, checking profile type...');
        await routeUserBasedOnType(session.user.id);
      }

      if (event === "SIGNED_OUT") {
        console.log('User signed out');
        setError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  const routeUserBasedOnType = async (userId: string) => {
    try {
      console.log('Fetching user profile for:', userId);
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        throw profileError;
      }

      console.log('User profile:', profile);

      if (!profile) {
        console.log('No profile found, creating new profile...');
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: userId, user_type: 'client' }]);

        if (insertError) throw insertError;
        
        navigate("/client-dashboard");
        return;
      }

      if (profile.user_type === 'provider') {
        console.log('Routing to provider dashboard');
        navigate("/provider-dashboard");
      } else {
        console.log('Routing to client dashboard');
        navigate("/client-dashboard");
      }
    } catch (error: any) {
      console.error('Error in routeUserBasedOnType:', error);
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem signing you in. Please try again.",
      });
    }
  };

  const handleGuestContinue = async () => {
    if (!guestEmail) {
      setError('Please enter your email');
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: guestEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/signin#access_token=true`
        }
      });

      if (signInError) throw signInError;

      toast({
        title: "Check your email",
        description: "We've sent you a magic link to sign in.",
      });
    } catch (error: any) {
      console.error('Error in guest sign in:', error);
      if (error.message.includes('rate limit')) {
        setError('Please wait a minute before requesting another magic link.');
      } else {
        setError(error.message);
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "There was a problem signing you in. Please try again.",
      });
    }
  };

  const handleCreateTestUser = async () => {
    const result = await createTestUser();
    if (result) {
      toast({
        title: "Test User Created",
        description: "You can now sign in with test@helpify.ch / test123!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create test user. It might already exist.",
      });
    }
  };

  if (isProcessingEmailLink) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Signing you in...</h2>
          <p className="text-gray-500 mt-2">Please wait while we complete the process.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      <div className="max-w-md mx-auto pt-24 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary/10 p-3 rounded-full mb-4 transform transition-all duration-300 hover:scale-105">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            {view === 'guest' ? (
              <>
                <h1 className="text-2xl font-bold text-gray-900 text-center">Continue as Guest</h1>
                <p className="text-gray-500 mt-2 text-center max-w-sm">
                  Enter your email to continue without creating an account
                </p>
              </>
            ) : view === 'sign_up' ? (
              <>
                <h1 className="text-2xl font-bold text-gray-900 text-center">Join Our Community</h1>
                <p className="text-gray-500 mt-2 text-center max-w-sm">
                  Sign up to start earning money and become part of Geneva's most trusted service network
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h1>
                <p className="text-gray-500 mt-2 text-center max-w-sm">
                  Sign in to access your account and continue providing excellent services
                </p>
              </>
            )}
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {view === 'guest' ? (
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
              />
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                onClick={handleGuestContinue}
              >
                Continue as Guest
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setView('sign_in')}
              >
                Back to Sign In
              </Button>
            </div>
          ) : (
            <>
              <Auth
                supabaseClient={supabase}
                view={view}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#1E3A8A',
                        brandAccent: '#1d4ed8',
                        brandButtonText: "white",
                        defaultButtonBackground: "white",
                        defaultButtonBackgroundHover: "#f8fafc",
                        defaultButtonBorder: "lightgray",
                        defaultButtonText: "gray",
                        dividerBackground: "#e2e8f0",
                        inputBackground: "transparent",
                        inputBorder: "#e2e8f0",
                        inputBorderHover: "#94a3b8",
                        inputBorderFocus: "#1E3A8A",
                        inputText: "#1e293b",
                        inputLabelText: "#64748b",
                        inputPlaceholder: "#94a3b8",
                      },
                      space: {
                        spaceSmall: '4px',
                        spaceMedium: '8px',
                        spaceLarge: '12px',
                        labelBottomMargin: '8px',
                        anchorBottomMargin: '4px',
                        emailInputSpacing: '4px',
                        socialAuthSpacing: '4px',
                        buttonPadding: '10px 15px',
                        inputPadding: '10px 15px',
                      },
                      borderWidths: {
                        buttonBorderWidth: '1px',
                        inputBorderWidth: '1px',
                      },
                      radii: {
                        borderRadiusButton: '8px',
                        buttonBorderRadius: '8px',
                        inputBorderRadius: '8px',
                      },
                      fonts: {
                        bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                        buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                        inputFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                      },
                    },
                  },
                  className: {
                    container: 'flex flex-col gap-4',
                    button: 'font-medium shadow-sm hover:shadow-md transition-all duration-200',
                    divider: 'my-4',
                    label: 'font-medium',
                    input: 'focus:ring-2 focus:ring-primary/20 transition-all duration-200',
                    loader: 'border-primary',
                  },
                }}
                providers={[]}
                redirectTo={window.location.origin}
              />
              <div className="mt-4 text-center space-y-2">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setView('guest')}
                >
                  Continue as Guest
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-sm"
                  onClick={handleCreateTestUser}
                >
                  Create Test Account (test@helpify.ch)
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
