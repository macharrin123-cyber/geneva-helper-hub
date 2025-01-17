import { FC } from "react";
import Navigation from "@/components/Navigation";

const About: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Helpify</h1>
        <div className="prose prose-lg max-w-none">
          <p>
            Helpify is your trusted platform for connecting with skilled service providers
            in your area. We make it easy to find and book professional services for
            all your needs.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;