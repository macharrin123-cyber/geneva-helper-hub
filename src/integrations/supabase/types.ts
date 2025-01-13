export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ServiceBooking = Database['public']['Tables']['service_bookings']['Row']
export type ServiceProvider = Database['public']['Tables']['service_providers']['Row']

export interface ServiceBookingWithProvider extends ServiceBooking {
  service_providers: ServiceProvider;
}

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
          created_at?: string | null
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
          description: string
          email: string
          experience: string
          hourly_rate: number
          id: string
          image_url: string
          name: string
          phone: string
          service: string
          status: string | null
        }
        Insert: {
          created_at?: string
          description: string
          email: string
          experience: string
          hourly_rate: number
          id?: string
          image_url: string
          name: string
          phone: string
          service: string
          status?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          email?: string
          experience?: string
          hourly_rate?: number
          id?: string
          image_url?: string
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
          }
        ]
      }
      service_providers: {
        Row: {
          created_at: string | null
          hourly_rate: number
          id: string
          image_url: string
          service_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          hourly_rate: number
          id?: string
          image_url: string
          service_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          hourly_rate?: number
          id?: string
          image_url?: string
          service_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_providers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
