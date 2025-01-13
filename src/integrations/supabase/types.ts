import { Database } from './database.types'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export interface ServiceProvider {
  id: string;
  user_id: string | null;
  image_url: string;
  hourly_rate: number;
  service_type: string;
  created_at: string | null;
}

export interface ServiceBooking {
  id: string;
  user_id: string | null;
  provider_id: number;
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

export interface ServiceBookingWithProvider extends ServiceBooking {
  provider: ServiceProvider;
}
