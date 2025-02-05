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
    }
  }
}

export type ServiceProvider = Database['public']['Tables']['service_providers']['Row']
export type ServiceBooking = Database['public']['Tables']['service_bookings']['Row']
export type ProviderAvailability = Database['public']['Tables']['provider_availability']['Row']

export interface ServiceBookingWithProvider extends ServiceBooking {
  provider: ServiceProvider
}

export interface Profile {
  id: string
  user_type: 'provider' | 'client'
  created_at: string
  updated_at: string
}