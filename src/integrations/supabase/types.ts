import type { Database } from "./database.types";

// Define base types from database schema
type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

// Export the Database type
export type { Database };

// Define and export all required interfaces
export interface ServiceProvider extends Tables<'service_providers'> {
  name: string;
  service_type: string;
  hourly_rate: number;
  image_url: string;
  description?: string;
  created_at?: string;
}

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
}

export interface ProviderAvailability extends Tables<'provider_availability'> {
  id: string;
  provider_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  created_at: string;
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

// Add any additional types needed for the application
export interface UserProfile extends Tables<'profiles'> {
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