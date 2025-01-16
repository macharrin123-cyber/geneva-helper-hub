import { useEffect, useState } from "react";
import ServicePage from "@/components/ServicePage";
import { supabase } from "@/integrations/supabase/client";

const PaintingPage = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .eq('service_type', 'painting');
      
      if (error) {
        console.error('Error fetching painting providers:', error);
        return;
      }

      const formattedProviders = data.map(provider => ({
        id: provider.id,
        name: provider.name || 'Service Provider',
        rating: 4.5,
        hourlyRate: provider.hourly_rate,
        yearsExperience: 5,
        phone: '+41 76 XXX XX XX',
        image: provider.image_url
      }));

      setProviders(formattedProviders);
    };

    fetchProviders();
  }, []);

  return <ServicePage serviceType="painting" providers={providers} />;
};

export default PaintingPage;