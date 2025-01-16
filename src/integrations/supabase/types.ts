import { Database } from './database.types';

export type { Database };

export type ServiceProvider = Database['public']['Tables']['service_providers']['Row'];
export type ServiceBooking = Database['public']['Tables']['service_bookings']['Row'];
export type ProviderAvailability = {
  id: string;
  provider_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  created_at?: string;
};

export type ServiceBookingWithProvider = ServiceBooking & {
  service_providers: ServiceProvider;
};