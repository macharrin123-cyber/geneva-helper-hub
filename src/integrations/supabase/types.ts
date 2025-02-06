import { Database } from "./database.types";

export type { Database };

export interface ServiceProvider {
  id: string;
  user_id?: string | null;
  name: string;
  service_type: string;
  hourly_rate: number;
  image_url: string;
  description?: string | null;
  created_at: string | null;
  phone?: string | null;
  experience?: string | null;
  email?: string | null;
  cv_url?: string | null;
  linkedin_profile?: string | null;
  nationality?: string | null;
  country_code?: string | null;
  address?: string | null;
  services?: string[] | null;
}

export interface Provider extends ServiceProvider {
  rating?: number;
  reviews?: number;
  availability?: ProviderAvailability[];
  email: string;
}

export interface ServiceBooking {
  id: string;
  user_id: string | null;
  provider_id: number;
  service_date: string;
  service_time: string;
  address: string;
  comments?: string | null;
  status: string | null;
  created_at: string | null;
  provider_response: string | null;
  street_address: string;
  city: string;
  postal_code: string;
  payment_status?: string | null;
  payment_intent_id?: string | null;
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
  sender_id?: string | null;
  receiver_id?: string | null;
  content: string;
  created_at: string;
  booking_id?: string | null;
  is_read?: boolean | null;
}

export interface UserProfile {
  id: string;
  user_type: 'provider' | 'client';
  created_at: string;
  updated_at: string;
  image_url?: string | null;
}

export interface Review {
  id: string;
  booking_id: string;
  user_id: string;
  rating: number;
  text: string;
  created_at: string;
}