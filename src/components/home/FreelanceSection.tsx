import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FreelanceSection = () => {
  return (
    <div className="mt-20 mb-16 bg-white rounded-lg shadow-lg p-8">
      <div className="grid md:grid-cols-1 gap-8 items-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Make Extra Income as a Service Provider
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're a professional or skilled individual, join our platform to offer your services. 
            Set your own schedule, choose your services, and earn on your terms.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Work when it suits you - full-time, part-time, or weekends only</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Set Your Rates</h3>
              <p className="text-gray-600">Choose your own hourly rate and the services you want to offer</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Easy to Start</h3>
              <p className="text-gray-600">Simple signup process - start earning as soon as you're verified</p>
            </div>
          </div>
          <Link to="/signup">
            <Button className="text-lg px-8 py-6">Join as a Service Provider</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FreelanceSection;