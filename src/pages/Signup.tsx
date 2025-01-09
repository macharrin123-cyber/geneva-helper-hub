import Navigation from "@/components/Navigation";
import SignupForm from "@/components/SignupForm";
import { HelpingHand } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-8">
              <HelpingHand className="h-16 w-16 text-primary" />
              <h1 className="text-4xl font-bold text-primary font-poppins">
                Helpify
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Service Provider Network
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below to start offering your services in Geneva
            </p>
          </div>

          <SignupForm />
        </div>
      </main>
    </div>
  );
};

export default Signup;