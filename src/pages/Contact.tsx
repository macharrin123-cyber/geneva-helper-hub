import { FC } from "react";
import Navigation from "@/components/Navigation";
import ContactPage from "@/pages/ContactPage";

const Contact: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <ContactPage />
    </div>
  );
};

export default Contact;