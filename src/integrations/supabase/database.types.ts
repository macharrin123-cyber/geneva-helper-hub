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