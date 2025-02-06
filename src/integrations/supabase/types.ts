import { Database } from "./database.types";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export interface ServiceProvider extends Tables<'service_providers'> {
  id: string;
  user_id?: string;
  image_url: string;
  hourly_rate: number;
  service_type: string;
  created_at?: string;
  description?: string;
  name: string;
  phone?: string;
  experience?: string;
  email?: string;
  cv_url?: string;
  linkedin_profile?: string;
  nationality?: string;
  country_code?: string;
  address?: string;
  services?: string[];
}

export interface ServiceBooking extends Tables<'service_bookings'> {
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
  provider?: ServiceProvider;
}

export interface ChatMessage extends Tables<'chat_messages'> {
  id: string;
  sender_id?: string;
  receiver_id?: string;
  content: string;
  created_at: string;
  booking_id?: string;
  is_read?: boolean;
}

export interface Profile extends Tables<'profiles'> {
  id: string;
  user_type: 'provider' | 'client';
  created_at: string;
  updated_at: string;
  image_url?: string;
}

export interface Review extends Tables<'reviews'> {
  id: string;
  booking_id: string;
  user_id: string;
  rating: number;
  text: string;
  created_at: string;
}

export interface ProviderAvailability extends Tables<'provider_availability'> {
  id: string;
  provider_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  created_at: string;
}

// This is used in the service pages for displaying provider information
export interface Provider {
  id: number;
  name: string;
  rating: number;
  hourlyRate: number;
  yearsExperience: number;
  phone: string;
  image: string;
  email: string;
}