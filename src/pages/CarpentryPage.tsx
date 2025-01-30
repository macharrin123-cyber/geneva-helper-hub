import { useEffect, useState } from "react";
import ServicePage from "@/components/ServicePage";
import { supabase } from "@/integrations/supabase/client";
import type { ServiceProvider } from "@/integrations/supabase/types";

interface Provider {
  id: number;
  name: string;
  rating: number;
  hourlyRate: number;
  yearsExperience: number;
  phone: string;
  image: string;
}

const CarpentryPage = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      // Fetch regular service providers
      const { data: serviceProviders, error: spError } = await supabase
        .from('service_providers')
        .select('*')
        .eq('service_type', 'carpentry');
      
      if (spError) {
        console.error('Error fetching carpentry providers:', spError);
        return;
      }

      // Fetch approved applications
      const { data: approvedApplications, error: appError } = await supabase
        .from('service_provider_applications')
        .select('*')
        .eq('service', 'carpentry')
        .eq('status', 'approved');

      if (appError) {
        console.error('Error fetching approved applications:', appError);
        return;
      }

      // Combine and format providers
      const allProviders = [
        ...serviceProviders,
        ...approvedApplications.map(app => ({
          id: app.id,
          name: app.name,
          service_type: app.service,
          hourly_rate: app.hourly_rate,
          image_url: app.image_url,
          description: app.description
        }))
      ];

      const formattedProviders = allProviders.map(provider => ({
        id: parseInt(provider.id),
        name: provider.name,
        rating: 4.5, // Default rating
        hourlyRate: provider.hourly_rate,
        yearsExperience: 5, // Default experience
        phone: '+41 76 XXX XX XX', // Default phone
        image: provider.image_url
      }));

      setProviders(formattedProviders);
    };

    fetchProviders();
  }, []);

  return <ServicePage serviceType="carpentry" providers={providers} />;
};

export default CarpentryPage;