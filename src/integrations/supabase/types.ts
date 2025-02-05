export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface ServiceProvider {
  id: string;
  user_id: string | null;
  image_url: string;
  hourly_rate: number;
  service_type: string;
  created_at: string | null;
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
  street_address: string;
  city: string;
  postal_code: string;
  comments: string | null;
  status: string | null;
  created_at: string | null;
  provider_response: string | null;
  payment_status: string | null;
  payment_intent_id: string | null;
  address: string;
}

export interface ServiceBookingWithProvider extends ServiceBooking {
  provider: ServiceProvider;
}

export interface Profile {
  id: string;
  user_type: 'provider' | 'client';
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
  sender_id: string | null;
  receiver_id: string | null;
  content: string;
  created_at: string;
  booking_id: string | null;
  is_read: boolean | null;
}

export interface Review {
  id: string;
  booking_id: string;
  user_id: string;
  rating: number;
  text: string;
  created_at: string;
}

// Database types from the Supabase type generator
export type Database = {
  public: {
    Tables: {
      service_providers: {
        Row: {
          id: string
          user_id: string
          image_url: string
          hourly_rate: number
          service_type: string
          created_at: string
          description: string
        }
      }
      service_bookings: {
        Row: {
          id: string
          user_id: string
          provider_id: string
          service_date: string
          service_time: string
          address: string
          comments?: string
          status: string
          created_at: string
          provider_response: string
        }
      }
      provider_availability: {
        Row: {
          id: string
          provider_id: string
          day_of_week: number
          start_time: string
          end_time: string
          created_at: string
        }
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          user_id: string
          rating: number
          text: string
          created_at: string
        }
      }
      chat_messages: {
        Row: {
          booking_id: string | null
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          receiver_id: string | null
          sender_id: string | null
        }
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
      }
      service_provider_applications: {
        Row: {
          created_at: string
          cv_url: string | null
          description: string
          email: string
          experience: string
          hourly_rate: number
          id: string
          image_url: string
          linkedin_profile: string | null
          name: string
          phone: string
          service: string
          status: string | null
        }
      }
      service_provider_invites: {
        Row: {
          application_id: string
          created_at: string
          email: string
          expires_at: string
          id: string
          token: string
          used: boolean | null
        }
      }
    }
  }
}
