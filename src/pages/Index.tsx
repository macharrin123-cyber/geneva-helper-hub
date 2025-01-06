import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ServiceGrid from "@/components/ServiceGrid";

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