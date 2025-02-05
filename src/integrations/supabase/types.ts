export interface Profile {
  id: string;
  user_type: 'client' | 'provider';
  created_at: string;
  updated_at: string;
}

export interface ServiceProvider {
  id: string;
  user_id?: string;
  name: string;
  email?: string;
  phone?: string;
  service_type: string;
  experience?: string;
  description?: string;
  hourly_rate: number;
  image_url: string;
  created_at?: string;
}

export interface ProviderAvailability {
  id: string;
  provider_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  created_at: string;
}

export interface ServiceBooking {
  id: string;
  user_id?: string;
  provider_id: number;
  service_date: string;
  service_time: string;
  address: string;
  street_address: string;
  city: string;
  postal_code: string;
  comments?: string;
  status?: string;
  payment_status?: string;
  payment_intent_id?: string;
  provider_response?: string;
  created_at?: string;
}

export interface ServiceBookingWithProvider extends ServiceBooking {
  provider: ServiceProvider;
}