import Navigation from "@/components/Navigation";
import SignupForm from "@/components/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <img 
              src="/lovable-uploads/0372c3fa-414e-4170-b75e-f3d8580124eb.png"
              alt="Geneva Coat of Arms"
              className="mx-auto mb-8 w-48 h-auto"
            />
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