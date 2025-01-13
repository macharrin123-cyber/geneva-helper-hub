import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const ProviderOnboarding = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = searchParams.get("token");

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setError("No invite token provided");
        return;
      }

      try {
        const { data, error: queryError } = await supabase
          .from("service_provider_invites")
          .select("*")
          .eq("token", token)
          .single();

        if (queryError || !data) {
          setError("Invalid or expired invite token");
          setIsValidToken(false);
          return;
        }

        if (data.used) {
          setError("This invite has already been used");
          setIsValidToken(false);
          return;
        }

        if (new Date(data.expires_at) < new Date()) {
          setError("This invite has expired");
          setIsValidToken(false);
          return;
        }

        setIsValidToken(true);
      } catch (err) {
        console.error("Error checking token:", err);
        setError("An error occurred while verifying your invite");
        setIsValidToken(false);
      }
    };

    checkToken();
  }, [token]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && token && session?.user) {
        try {
          // Mark invite as used
          const { error: updateError } = await supabase
            .from("service_provider_invites")
            .update({ used: true })
            .eq("token", token);

          if (updateError) {
            console.error("Error marking invite as used:", updateError);
          }

          // Create service provider profile
          const { error: providerError } = await supabase
            .from("service_providers")
            .insert([
              {
                user_id: session.user.id,
                // We'll need to fetch these details from the application
                service_type: "pending",
                hourly_rate: 0,
                image_url: "placeholder.jpg"
              }
            ]);

          if (providerError) {
            console.error("Error creating provider profile:", providerError);
          }

          navigate("/provider-dashboard");
        } catch (err) {
          console.error("Error in post-signup process:", err);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [token, navigate]);

  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isValidToken || error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Helpify</h1>
          <p className="mt-2 text-gray-600">
            Create your account to start providing services
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-xl">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
            redirectTo={`${window.location.origin}/provider-onboarding?token=${token}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProviderOnboarding;