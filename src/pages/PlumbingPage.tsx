import { useEffect, useState } from "react";
import ServicePage from "@/components/ServicePage";
import { supabase } from "@/integrations/supabase/client";
import type { Provider } from "@/integrations/supabase/types";

const PlumbingPage = () => {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: 1,
      name: "Thomas Schmidt",
      rating: 4.9,
      hourlyRate: 95,
      yearsExperience: 15,
      phone: "+41 76 456 78 90",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      email: "thomas.schmidt@example.com"
    },
    {
      id: 2,
      name: "Michael Weber",
      rating: 4.8,
      hourlyRate: 90,
      yearsExperience: 12,
      phone: "+41 76 567 89 01",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      email: "michael.weber@example.com"
    },
    {
      id: 3,
      name: "David Müller",
      rating: 4.7,
      hourlyRate: 85,
      yearsExperience: 8,
      phone: "+41 76 678 90 12",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      email: "david.mueller@example.com"
    }
  ]);

  return <ServicePage serviceType="plumbing" providers={providers} />;
};

export default PlumbingPage;