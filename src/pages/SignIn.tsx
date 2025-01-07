import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          // Get user profile to determine user type
          const { data: profile } = await supabase
            .from("profiles")
            .select("user_type")
            .eq("id", session?.user?.id)
            .single();

          console.log("User profile:", profile);

          if (profile?.user_type === "provider") {
            navigate("/provider-dashboard");
          } else {
            navigate("/");
          }

          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="light"
              providers={[]}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;