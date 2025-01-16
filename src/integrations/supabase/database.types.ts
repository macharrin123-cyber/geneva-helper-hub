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
          comments: string | null
          status: string | null
          created_at: string | null
          street_address: string
          city: string
          postal_code: string
          payment_status: string | null
          payment_intent_id: string | null
          provider_response: string | null
        }
      }
    }
  }
}