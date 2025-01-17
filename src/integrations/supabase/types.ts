import { Database } from "./database.types";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export interface ServiceProvider extends Tables<'service_providers'> {
  name: string;
}

export interface ServiceBooking extends Tables<'service_bookings'> {
  provider?: ServiceProvider;
}

export interface ServiceBookingWithProvider extends ServiceBooking {
  provider: ServiceProvider;
}

export interface ProviderAvailability extends Tables<'provider_availability'> {}

export interface Profile extends Tables<'profiles'> {}
