export interface ServiceProvider {
  id: string;
  user_id: string | null;
  image_url: string;
  hourly_rate: number;
  service_type: string;
  created_at: string;
  description: string | null;
  name: string;
  phone: string | null;
  experience: string | null;
  email: string | null;
  cv_url: string | null;
  linkedin_profile: string | null;
}

export interface ServiceBooking {
  id: string;
  user_id: string | null;
  provider_id: number;
  service_date: string;
  service_time: string;
  address: string;
  comments: string | null;
  status: string;
  created_at: string;
  street_address: string;
  city: string;
  postal_code: string;
  payment_status: string;
  payment_intent_id: string | null;
  provider_response: string;
}

export interface ServiceBookingWithProvider extends ServiceBooking {
  provider: ServiceProvider;
}

export interface Profile {
  id: string;
  user_type: 'client' | 'provider';
  created_at: string;
  updated_at: string;
}

export interface ProviderAvailability {
  id: string;
  provider_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  booking_id: string | null;
  is_read: boolean;
}

export interface Review {
  id: string;
  booking_id: string;
  user_id: string;
  rating: number;
  text: string;
  created_at: string;
}