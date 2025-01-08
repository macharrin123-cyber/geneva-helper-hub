import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ServiceGrid from "@/components/ServiceGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 mix-blend-multiply" />
          <div 
            className="relative h-[500px] bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=2000&q=80')`
            }}
          >
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <h1 className="text-5xl font-bold mb-6">
                  Find Local Services in Geneva
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Connect with trusted local professionals for all your home service needs. Quality service providers at your fingertips.
                </p>
                <Link
                  to="/signup"
                  className="inline-block bg-white text-primary px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium"
                >
                  Become a Service Provider
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <ServiceGrid />
        </div>

        {/* Trust Section */}
        <div className="max-w-7xl mx-auto px-4 mt-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&q=80" 
                alt="Verified Professionals"
                className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">All our service providers are thoroughly vetted and verified.</p>
            </div>
            <div className="text-center p-6">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80" 
                alt="Easy Booking"
                className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book services with just a few clicks, anytime and anywhere.</p>
            </div>
            <div className="text-center p-6">
              <img 
                src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=300&q=80" 
                alt="Quality Guaranteed"
                className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">We ensure high-quality service delivery for every booking.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;