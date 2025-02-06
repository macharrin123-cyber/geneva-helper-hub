import { useEffect, useState } from "react";
import ServicePage from "@/components/ServicePage";
import { supabase } from "@/integrations/supabase/client";
import type { Provider } from "@/integrations/supabase/types";

const PaintingPage = () => {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: 1,
      name: "Lucas Moser",
      rating: 4.9,
      hourlyRate: 75,
      yearsExperience: 12,
      phone: "+41 76 345 67 89",
      image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a",
      email: "lucas.moser@example.com"
    },
    {
      id: 2,
      name: "Simon Frei",
      rating: 4.8,
      hourlyRate: 72,
      yearsExperience: 9,
      phone: "+41 76 456 78 90",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      email: "simon.frei@example.com"
    },
    {
      id: 3,
      name: "Daniel Koch",
      rating: 4.7,
      hourlyRate: 68,
      yearsExperience: 7,
      phone: "+41 76 567 89 01",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      email: "daniel.koch@example.com"
    }
  ]);

  return <ServicePage serviceType="painting" providers={providers} />;
};

export default PaintingPage;