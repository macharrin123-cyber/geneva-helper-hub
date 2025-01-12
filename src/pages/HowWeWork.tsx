import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

const HowWeWork = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            How We Work
          </h1>

          <div className="space-y-10">
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Process</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-6 group">
                  <div className="bg-primary/10 rounded-full p-4 mt-1 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary text-xl font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Browse Services</h3>
                    <p className="text-gray-600 leading-relaxed">Browse through our wide range of professional services and select the one that matches your needs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="bg-primary/10 rounded-full p-4 mt-1 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary text-xl font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Book a Service</h3>
                    <p className="text-gray-600 leading-relaxed">Choose your preferred date and time, provide your address, and any specific requirements you may have.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="bg-primary/10 rounded-full p-4 mt-1 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary text-xl font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Secure Payment</h3>
                    <p className="text-gray-600 leading-relaxed">Make a secure payment through our platform. Your payment is held until the service is completed to your satisfaction.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="bg-primary/10 rounded-full p-4 mt-1 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary text-xl font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Service Delivery</h3>
                    <p className="text-gray-600 leading-relaxed">Our verified professional will arrive at the scheduled time and complete the service according to your requirements.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Quality Assurance</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold text-xl text-gray-700 mb-3">Verified Professionals</h3>
                  <p className="text-gray-600 leading-relaxed">All service providers undergo thorough background checks and must provide proof of their qualifications and experience.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold text-xl text-gray-700 mb-3">Quality Standards</h3>
                  <p className="text-gray-600 leading-relaxed">We maintain high standards of service quality through regular monitoring and customer feedback.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold text-xl text-gray-700 mb-3">Insurance Coverage</h3>
                  <p className="text-gray-600 leading-relaxed">All services are covered by insurance for your peace of mind.</p>
                </div>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Refund Policy</h2>
              <div className="space-y-6">
                <p className="text-gray-600 text-lg">We offer refunds under the following conditions:</p>
                <ul className="list-none space-y-4">
                  {[
                    "Service provider fails to arrive within the scheduled time window",
                    "Service quality does not meet our standards",
                    "Service cannot be completed due to provider-related issues",
                    "Cancellation made at least 24 hours before the scheduled service"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600">
                      <span className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  Contact our customer support team within 48 hours of service completion to request a refund.
                </p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HowWeWork;