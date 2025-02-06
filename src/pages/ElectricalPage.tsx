import { useEffect, useState } from "react";
import ServicePage from "@/components/ServicePage";
import { supabase } from "@/integrations/supabase/client";
import type { Provider } from "@/integrations/supabase/types";

const ElectricalPage = () => {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: 1,
      name: "Andreas Keller",
      rating: 4.9,
      hourlyRate: 98,
      yearsExperience: 18,
      phone: "+41 76 789 01 23",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      email: "andreas.keller@example.com"
    },
    {
      id: 2,
      name: "Marco Fischer",
      rating: 4.8,
      hourlyRate: 92,
      yearsExperience: 14,
      phone: "+41 76 890 12 34",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      email: "marco.fischer@example.com"
    },
    {
      id: 3,
      name: "Stefan Huber",
      rating: 4.7,
      hourlyRate: 88,
      yearsExperience: 10,
      phone: "+41 76 901 23 45",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      email: "stefan.huber@example.com"
    }
  ]);

  return <ServicePage serviceType="electrical" providers={providers} />;
};

export default ElectricalPage;