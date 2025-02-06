import { Database } from "./database.types";

// Export the Tables helper type from database.types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

// Define and export all required interfaces
export interface ServiceProvider {
  id: string;
  user_id?: string;
  name: string;
  image_url: string;
  hourly_rate: number;
  service_type: string;
  created_at?: string;
  description?: string;
  email?: string;
  phone?: string;
  experience?: string;
  cv_url?: string;
  linkedin_profile?: string;
  nationality?: string;
  country_code?: string;
  address?: string;
  services?: string[];
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
  sender_id?: string;
  receiver_id?: string;
  content: string;
  created_at: string;
  booking_id?: string;
  is_read?: boolean;
}

// Legacy Provider interface used by service pages
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
