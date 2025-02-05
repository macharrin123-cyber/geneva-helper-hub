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
      admin_users: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["admin_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["admin_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["admin_role"]
          user_id?: string | null
        }
        Relationships: []
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
        Insert: {
          booking_id?: string | null
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          booking_id?: string | null
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "service_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      provider_availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          provider_id: string
          start_time: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          provider_id: string
          start_time: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          provider_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_availability_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string
          created_at: string
          id: string
          rating: number
          text: string
          user_id: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          id?: string
          rating: number
          text: string
          user_id: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          id?: string
          rating?: number
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "service_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      service_bookings: {
        Row: {
          address: string
          city: string
          comments: string | null
          created_at: string | null
          id: string
          payment_intent_id: string | null
          payment_status: string | null
          postal_code: string
          provider_id: number
          provider_response: string | null
          service_date: string
          service_time: string
          status: string | null
          street_address: string
          user_id: string | null
        }
        Insert: {
          address: string
          city: string
          comments?: string | null
          created_at?: string | null
          id?: string
          payment_intent_id?: string | null
          payment_status?: string | null
          postal_code: string
          provider_id: number
          provider_response?: string | null
          service_date: string
          service_time: string
          status?: string | null
          street_address: string
          user_id?: string | null
        }
        Update: {
          address?: string
          city?: string
          comments?: string | null
          created_at?: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string | null
          postal_code?: string
          provider_id?: number
          provider_response?: string | null
          service_date?: string
          service_time?: string
          status?: string | null
          street_address?: string
          user_id?: string | null
        }
        Relationships: []
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
        Insert: {
          created_at?: string
          cv_url?: string | null
          description: string
          email: string
          experience: string
          hourly_rate: number
          id?: string
          image_url: string
          linkedin_profile?: string | null
          name: string
          phone: string
          service: string
          status?: string | null
        }
        Update: {
          created_at?: string
          cv_url?: string | null
          description?: string
          email?: string
          experience?: string
          hourly_rate?: number
          id?: string
          image_url?: string
          linkedin_profile?: string | null
          name?: string
          phone?: string
          service?: string
          status?: string | null
        }
        Relationships: []
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
        Insert: {
          application_id: string
          created_at?: string
          email: string
          expires_at: string
          id?: string
          token: string
          used?: boolean | null
        }
        Update: {
          application_id?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          token?: string
          used?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "service_provider_invites_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "service_provider_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      service_providers: {
        Row: {
          created_at: string | null
          cv_url: string | null
          description: string | null
          email: string | null
          experience: string | null
          hourly_rate: number
          id: string
          image_url: string
          linkedin_profile: string | null
          name: string
          phone: string | null
          service_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          cv_url?: string | null
          description?: string | null
          email?: string | null
          experience?: string | null
          hourly_rate: number
          id?: string
          image_url: string
          linkedin_profile?: string | null
          name?: string
          phone?: string | null
          service_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          cv_url?: string | null
          description?: string | null
          email?: string | null
          experience?: string | null
          hourly_rate?: number
          id?: string
          image_url?: string
          linkedin_profile?: string | null
          name?: string
          phone?: string | null
          service_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      admin_role: "admin"
      user_type: "provider" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Add the missing type definitions
export interface ServiceProvider {
  id: string;
  user_id?: string;
  name: string;
  service_type: string;
  hourly_rate: number;
  image_url: string;
  description?: string;
  created_at: string;
  email?: string;
  phone?: string;
  experience?: string;
  cv_url?: string;
  linkedin_profile?: string;
}

export interface ServiceBooking {
  id: string;
  user_id?: string;
  provider_id: number;
  service_date: string;
  service_time: string;
  status?: string;
  address: string;
  street_address: string;
  city: string;
  postal_code: string;
  comments?: string;
  created_at: string;
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
