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
          user_id: string | null
          image_url: string
          hourly_rate: number
          service_type: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          image_url: string
          hourly_rate: number
          service_type: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          image_url?: string
          hourly_rate?: number
          service_type?: string
          created_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          user_type: string
          created_at: string
          updated_at: string
        }
      }
      service_bookings: {
        Row: {
          id: string
          user_id: string | null
          provider_id: number
          service_date: string
          service_time: string
          address: string
          comments?: string
          status: string
          created_at: string
          street_address: string
          city: string
          postal_code: string
          payment_status: string
          payment_intent_id?: string
          provider_response: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type ServiceProvider = Database['public']['Tables']['service_providers']['Row']

export interface ServiceBookingWithProvider {
  id: string
  user_id: string
  provider_id: number
  service_date: string
  service_time: string
  address: string
  comments?: string
  status: string
  created_at: string
  street_address: string
  city: string
  postal_code: string
  payment_status: string
  payment_intent_id?: string
  provider_response: string
  service_providers?: ServiceProvider
}