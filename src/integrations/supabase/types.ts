import { Database } from "./database.types";

// Export the base Database type
export type { Database } from "./database.types";

// Define the Profile type based on the profiles table
export interface Profile {
  id: string;
  user_type: "provider" | "client";
  created_at: string;
  updated_at: string;
}

// Define the ServiceProvider type based on the service_providers table
export interface ServiceProvider {
  id: string;
  user_id: string | null;
  image_url: string;
  hourly_rate: number;
  service_type: string;
  created_at: string | null;
  description: string | null;
  name: string;
}

// Define the ServiceBooking type based on the service_bookings table
export interface ServiceBooking {
  id: string;
  user_id: string | null;
  provider_id: string;
  service_date: string;
  service_time: string;
  address: string;
  comments: string | null;
  status: string | null;
  created_at: string | null;
  street_address: string;
  city: string;
  postal_code: string;
  payment_status: string | null;
  payment_intent_id: string | null;
  provider_response: string | null;
}

// Define the ServiceBookingWithProvider type that includes provider details
export interface ServiceBookingWithProvider extends ServiceBooking {
  provider: ServiceProvider;
}

// Define the ProviderAvailability type based on the provider_availability table
export interface ProviderAvailability {
  id: string;
  provider_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  created_at: string;
}

// Helper type for database row types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

// Helper type for database insert types
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];

// Helper type for database update types
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];