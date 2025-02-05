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
          description: string | null
          name: string
          phone: string | null
          experience: string | null
          email: string | null
          cv_url: string | null
          linkedin_profile: string | null
        }
      }
      service_bookings: {
        Row: {
          id: string
          user_id: string | null
          provider_id: string
          service_date: string
          service_time: string
          address: string
          comments: string | null
          status: string | null
          created_at: string | null
          provider_response: string | null
          street_address: string
          city: string
          postal_code: string
          payment_status: string | null
          payment_intent_id: string | null
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
      chat_messages: {
        Row: {
          id: string
          sender_id: string | null
          receiver_id: string | null
          content: string
          created_at: string
          booking_id: string | null
          is_read: boolean | null
        }
      }
      profiles: {
        Row: {
          id: string
          user_type: 'provider' | 'client'
          created_at: string
          updated_at: string
        }
      }
    }
  }
}

export type ServiceProvider = Database['public']['Tables']['service_providers']['Row']
export type ServiceBooking = Database['public']['Tables']['service_bookings']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type ProviderAvailability = Database['public']['Tables']['provider_availability']['Row']
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

export interface ServiceBookingWithProvider extends ServiceBooking {
  provider: ServiceProvider
}