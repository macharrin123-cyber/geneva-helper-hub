import { Database } from "./database.types";

// Base table types from database
type Tables = Database["public"]["Tables"];

// Define the Profile type
export type Profile = Tables["profiles"]["Row"];

// Define the ServiceProvider type
export type ServiceProvider = Tables["service_providers"]["Row"];

// Define the ProviderAvailability type
export type ProviderAvailability = Tables["provider_availability"]["Row"];

// Define the ServiceBooking type
export type ServiceBooking = Tables["service_bookings"]["Row"];

// Define the ServiceBookingWithProvider type that includes provider information
export type ServiceBookingWithProvider = ServiceBooking & {
  provider: ServiceProvider;
};

// Export the Database type itself
export type { Database };