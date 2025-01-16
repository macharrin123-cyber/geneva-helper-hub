import { Database } from "./database.types";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Export table types
export type ServiceProvider = Tables<'service_providers'>;
export type ServiceBooking = Tables<'service_bookings'>;
export type ProviderAvailability = Tables<'provider_availability'>;

// Extended type for bookings with provider info
export type ServiceBookingWithProvider = ServiceBooking & {
  provider: ServiceProvider;
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
