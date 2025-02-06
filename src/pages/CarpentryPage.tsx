import { useEffect, useState } from "react";
import ServicePage from "@/components/ServicePage";
import { supabase } from "@/integrations/supabase/client";
import type { Provider } from "@/integrations/supabase/types";

const CarpentryPage = () => {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: 1,
      name: "Peter Zimmermann",
      rating: 4.9,
      hourlyRate: 88,
      yearsExperience: 20,
      phone: "+41 76 012 34 56",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
      email: "peter.zimmermann@example.com"
    },
    {
      id: 2,
      name: "Hans Meier",
      rating: 4.8,
      hourlyRate: 85,
      yearsExperience: 15,
      phone: "+41 76 123 45 67",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      email: "hans.meier@example.com"
    },
    {
      id: 3,
      name: "Kurt Wagner",
      rating: 4.7,
      hourlyRate: 82,
      yearsExperience: 12,
      phone: "+41 76 234 56 78",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      email: "kurt.wagner@example.com"
    }
  ]);

  return <ServicePage serviceType="carpentry" providers={providers} />;
};

export default CarpentryPage;