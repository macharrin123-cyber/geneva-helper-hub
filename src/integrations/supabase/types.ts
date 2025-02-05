import { Database } from "./database.types";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export type Profile = Tables<'profiles'>
export type ServiceProvider = Tables<'service_providers'>
export type ServiceBooking = Tables<'service_bookings'>
export type ProviderAvailability = Tables<'provider_availability'>

export interface ServiceBookingWithProvider extends ServiceBooking {
  provider: ServiceProvider;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  is_read?: boolean;
}

export interface ChatConversation {
  provider: ServiceProvider;
  lastMessage?: ChatMessage;
  unreadCount: number;
}