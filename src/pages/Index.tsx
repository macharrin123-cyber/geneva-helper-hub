import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ServiceGrid from "@/components/ServiceGrid";
import { ClipboardCheck, UserCheck, Mail, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Local Services in Geneva
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with trusted local professionals for all your home service needs
            </p>
          </div>

          <ServiceGrid />

          <div className="mt-20 mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How to Become a Service Provider
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <ClipboardCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Apply</h3>
                <p className="text-gray-600 text-sm">Fill out our simple application form</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">2. Verification</h3>
                <p className="text-gray-600 text-sm">We verify your credentials</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Approval</h3>
                <p className="text-gray-600 text-sm">Receive approval notification</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">4. Start Working</h3>
                <p className="text-gray-600 text-sm">Begin accepting service requests</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/signup"
              className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Become a Service Provider
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;