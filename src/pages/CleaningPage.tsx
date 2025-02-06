import { useEffect, useState } from "react";
import ServicePage from "@/components/ServicePage";
import { supabase } from "@/integrations/supabase/client";
import type { Provider } from "@/integrations/supabase/types";

const CleaningPage = () => {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 4.9,
      hourlyRate: 45,
      yearsExperience: 8,
      phone: "+41 76 123 45 67",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      email: "sarah.johnson@example.com"
    },
    {
      id: 2,
      name: "Maria Garcia",
      rating: 4.8,
      hourlyRate: 42,
      yearsExperience: 6,
      phone: "+41 76 234 56 78",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      email: "maria.garcia@example.com"
    },
    {
      id: 3,
      name: "Emma Weber",
      rating: 4.7,
      hourlyRate: 40,
      yearsExperience: 5,
      phone: "+41 76 345 67 89",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      email: "emma.weber@example.com"
    }
  ]);

  return <ServicePage serviceType="cleaning" providers={providers} />;
};

export default CleaningPage;