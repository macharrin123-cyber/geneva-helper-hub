import { useState } from "react";
import Navigation from "@/components/Navigation";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQPage = () => {
  const faqs = [
    {
      question: "How does Helpify work?",
      answer: "Helpify connects you with qualified local service providers in Geneva. Simply browse through our available services, select a provider, and book an appointment. Our platform ensures secure payments and quality service delivery."
    },
    {
      question: "What services do you offer?",
      answer: "We offer a wide range of home services including plumbing, electrical work, painting, carpentry, cleaning, and moving services. All our service providers are vetted and qualified professionals."
    },
    {
      question: "How do I book a service?",
      answer: "Booking a service is easy! Browse through our service categories, select a provider based on their profile and reviews, choose your preferred date and time, and complete the booking process. You'll receive confirmation and can track your booking through your dashboard."
    },
    {
      question: "Are your service providers verified?",
      answer: "Yes, all service providers on Helpify go through a thorough verification process. We check their qualifications, experience, and references to ensure they meet our quality standards."
    },
    {
      question: "What are your payment terms?",
      answer: "We accept secure online payments through our platform. Payment is processed only after you've approved the service completion. We offer transparent pricing with no hidden fees."
    },
    {
      question: "Can I cancel or reschedule a booking?",
      answer: "Yes, you can cancel or reschedule a booking through your dashboard up to 24 hours before the scheduled service time. Please refer to our cancellation policy for more details."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "Your satisfaction is our priority. If you're not satisfied with a service, please contact our customer support team within 48 hours of service completion. We'll work with you and the service provider to resolve any issues."
    },
    {
      question: "Do you offer emergency services?",
      answer: "Yes, some of our providers offer emergency services for urgent situations. Look for the 'Emergency Service Available' badge on provider profiles."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4 font-poppins">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services, booking process, and more.
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-4 mb-4"
              >
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Still have questions? We're here to help!
          </p>
          <a 
            href="/contact" 
            className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </main>
    </div>
  );
};

export default FAQPage;