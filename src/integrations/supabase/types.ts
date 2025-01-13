export interface ServiceProvider {
  id: string;
  user_id: string | null;
  image_url: string;
  hourly_rate: number;
  service_type: string;
  created_at?: string;
}

export interface ServiceBookingWithProvider extends ServiceBooking {
  service_providers: ServiceProvider;
}

export interface ServiceBooking {
  id: string;
  user_id: string | null;
  provider_id: string;
  service_date: string;
  service_time: string;
  address: string;
  comments?: string;
  status?: string;
  created_at?: string;
  street_address: string;
  city: string;
  postal_code: string;
  payment_status?: string;
  payment_intent_id?: string;
  provider_response?: string;
}