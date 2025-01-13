import Navigation from "@/components/Navigation";
import SignupForm from "@/components/SignupForm";
import { HelpingHand } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 animate-fade-in"> {/* Increased top padding from pt-16 to pt-24 */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"> {/* Increased bottom margin from mb-12 to mb-16 */}
            <div className="flex items-center justify-center gap-3 mb-10 transform hover:scale-105 transition-transform duration-300"> {/* Increased gap and bottom margin */}
              <HelpingHand className="h-16 w-16 text-primary" />
              <h1 className="text-4xl font-bold text-primary font-poppins">
                Helpify
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Service Provider Network
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to start offering your services in Geneva and become part of our trusted community
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-xl mx-auto">
            <SignupForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;