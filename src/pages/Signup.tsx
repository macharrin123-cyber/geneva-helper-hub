import Navigation from "@/components/Navigation";
import SignupForm from "@/components/SignupForm";

const Signup = () => {
  console.log("Signup page rendering");
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Service Provider Network
            </h1>
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