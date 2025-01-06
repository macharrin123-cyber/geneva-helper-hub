import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Geneva Services
        </h1>
        <p className="text-xl text-gray-600">
          Find trusted local professionals for all your home service needs
        </p>
        
        <div className="space-y-4">
          <Link
            to="/signup"
            className="block w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 text-center"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="block w-full border border-primary text-primary px-6 py-3 rounded-md hover:bg-gray-50 text-center"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;