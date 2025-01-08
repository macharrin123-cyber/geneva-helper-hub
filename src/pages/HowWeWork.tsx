import Navigation from "@/components/Navigation";

const HowWeWork = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            How We Work
          </h1>

          <div className="space-y-8">
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Process</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Browse Services</h3>
                    <p className="text-gray-600">Browse through our wide range of professional services and select the one that matches your needs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Book a Service</h3>
                    <p className="text-gray-600">Choose your preferred date and time, provide your address, and any specific requirements you may have.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Secure Payment</h3>
                    <p className="text-gray-600">Make a secure payment through our platform. Your payment is held until the service is completed to your satisfaction.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Service Delivery</h3>
                    <p className="text-gray-600">Our verified professional will arrive at the scheduled time and complete the service according to your requirements.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quality Assurance</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Verified Professionals</h3>
                  <p className="text-gray-600">All service providers undergo thorough background checks and must provide proof of their qualifications and experience.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Quality Standards</h3>
                  <p className="text-gray-600">We maintain high standards of service quality through regular monitoring and customer feedback.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Insurance Coverage</h3>
                  <p className="text-gray-600">All services are covered by insurance for your peace of mind.</p>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Refund Policy</h2>
              <div className="space-y-4">
                <p className="text-gray-600">We offer refunds under the following conditions:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Service provider fails to arrive within the scheduled time window</li>
                  <li>Service quality does not meet our standards</li>
                  <li>Service cannot be completed due to provider-related issues</li>
                  <li>Cancellation made at least 24 hours before the scheduled service</li>
                </ul>
                <p className="text-gray-600">
                  Contact our customer support team within 48 hours of service completion to request a refund.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowWeWork;