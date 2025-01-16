import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('User already signed in, checking profile...');
        await routeUserBasedOnType(session.user.id);
      }
    };
    
    checkUser();

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
  }, [navigate]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      <div className="max-w-md mx-auto pt-24 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary/10 p-3 rounded-full mb-4 transform transition-all duration-300 hover:scale-105">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-center">
              Sign in to access your account
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Auth
            supabaseClient={supabase}
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
        </div>
      </div>
    </div>
  );
};

export default SignIn;