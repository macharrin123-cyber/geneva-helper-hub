import { CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <CheckCircle className="w-24 h-24 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Application!
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We have received your service provider application. Our team will review your information,
              and you will receive an email notification regarding the status of your application.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThankYouPage;