import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, DollarSign, Sparkles } from "lucide-react";

const FreelanceSection = () => {
  return (
    <div className="mt-20 mb-16 bg-gradient-to-br from-blue-200 to-white rounded-xl shadow-2xl overflow-hidden border border-blue-100 transform transition-all duration-300 hover:shadow-3xl">
      <div className="max-w-7xl mx-auto p-8 md:p-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C4A6E] mb-6 font-poppins">
            Make Extra Income as a Service Provider
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed">
            Whether you're a professional or skilled individual, join our platform to offer your services. 
            Set your own schedule, choose your services, and earn on your terms.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-[#0C4A6E]" />
              </div>
              <h3 className="font-semibold text-xl mb-3 text-[#0C4A6E]">Flexible Schedule</h3>
              <p className="text-gray-700">Work when it suits you - full-time, part-time, or weekends only</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-xl mb-3 text-[#0C4A6E]">Set Your Rates</h3>
              <p className="text-gray-700">Choose your own hourly rate and the services you want to offer</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-xl mb-3 text-[#0C4A6E]">Easy to Start</h3>
              <p className="text-gray-700">Simple signup process - start earning as soon as you're verified</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link to="/signup">
              <Button 
                className="text-lg px-8 py-6 bg-[#0C4A6E] hover:bg-[#0C4A6E]/90 transition-all duration-300 group"
              >
                Join as a Service Provider
                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelanceSection;