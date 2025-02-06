export interface Provider {
  id: number;
  name: string;
  rating: number;
  hourlyRate: number;
  yearsExperience: number;
  phone: string;
  image: string;
  email: string;
  nationality?: string;
  country_code?: string;
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
  nationality?: string;
  country_code?: string;
}

export interface ServiceBooking {
  id: string;
  user_id?: string;
  provider_id: number;
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

export interface ChatMessage {
  id: string;
  sender_id?: string;
  receiver_id?: string;
  content: string;
  created_at: string;
  booking_id?: string;
  is_read?: boolean;
}

export interface ProviderAvailability {
  id: string;
  provider_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  created_at: string;
}