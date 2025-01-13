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
      [_ in string]: any
    }
    Views: {
      [_ in string]: any
    }
    Functions: {
      [_ in string]: any
    }
    Enums: {
      [_ in string]: any
    }
    CompositeTypes: {
      [_ in string]: any
    }
  }
}

export interface ServiceBookingWithProvider {
  id: string;
  user_id: string;
  provider_id: number;
  service_date: string;
  service_time: string;
  address: string;
  comments?: string;
  status: string;
  created_at: string;
  street_address: string;
  city: string;
  postal_code: string;
  payment_status: string;
  payment_intent_id?: string;
  provider_response: string;
  provider?: {
    id: string;
    user_id: string;
    image_url: string;
    hourly_rate: number;
    service_type: string;
    created_at: string;
  };
}