import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ServiceProvider } from "@/integrations/supabase/types";

interface SearchResultsProps {
  searchTerm: string;
}

const SearchResults = ({ searchTerm }: SearchResultsProps) => {
  const { data: providers, isLoading } = useQuery({
    queryKey: ["providers", searchTerm],
    queryFn: async () => {
      console.log("Fetching providers for search term:", searchTerm);
      
      // First, get regular service providers
      const { data: serviceProviders, error: spError } = await supabase
        .from("service_providers")
        .select("*")
        .ilike("service_type", `%${searchTerm}%`);

      if (spError) {
        console.error("Error fetching service providers:", spError);
        throw spError;
      }

      // Then, get approved applications
      const { data: approvedApplications, error: appError } = await supabase
        .from("service_provider_applications")
        .select("*")
        .eq("status", "approved")
        .ilike("service", `%${searchTerm}%`);

      if (appError) {
        console.error("Error fetching approved applications:", appError);
        throw appError;
      }

      // Convert applications to provider format
      const applicationProviders = approvedApplications.map(app => ({
        id: app.id,
        name: app.name,
        service_type: app.service,
        hourly_rate: app.hourly_rate,
        image_url: app.image_url,
        description: app.description,
        created_at: app.created_at
      }));

      // Combine both arrays
      const allProviders = [...serviceProviders, ...applicationProviders];
      console.log("Fetched providers:", allProviders);
      return allProviders as ServiceProvider[];
    },
    enabled: searchTerm.length > 0,
  });

  // If search term is empty, return null to allow parent to show original content
  if (!searchTerm) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!providers?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">
          No service providers found for "{searchTerm}"
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <div
          key={provider.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src={provider.image_url || "/placeholder.svg"}
            alt={`${provider.service_type} provider`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {provider.name || provider.service_type}
            </h3>
            <p className="text-gray-600">
              ${provider.hourly_rate}/hour
            </p>
            {provider.description && (
              <p className="text-gray-500 mt-2 text-sm">
                {provider.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;