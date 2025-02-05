export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
          name: string
          phone?: string
          experience?: string
          email?: string
          cv_url?: string
          linkedin_profile?: string
        }
      }
      service_bookings: {
        Row: {
          id: string
          user_id?: string
          provider_id: string  // Changed from number to string to match schema
          service_date: string
          service_time: string
          address: string
          comments?: string
          status: string
          created_at: string
          provider_response: string
          street_address: string
          city: string
          postal_code: string
          payment_status?: string
          payment_intent_id?: string
        }
      }
    }
  }
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
  cv_url?: string;
  linkedin_profile?: string;
  created_at?: string;
}

export interface ServiceBooking {
  id: string;
  user_id?: string;
  provider_id: string;  // Changed from number to string
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