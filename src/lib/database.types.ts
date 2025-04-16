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
      hotels: {
        Row: {
          id: string
          name: string
          description: string | null
          rating: number | null
          created_at: string | null
          updated_at: string | null
          branding: Json | null
          active: boolean | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          rating?: number | null
          created_at?: string | null
          updated_at?: string | null
          branding?: Json | null
          active?: boolean | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          rating?: number | null
          created_at?: string | null
          updated_at?: string | null
          branding?: Json | null
          active?: boolean | null
        }
      }
      hotel_locations: {
        Row: {
          id: string
          hotel_id: string | null
          address: string
          city: string
          zip: string
          country: string
          latitude: number | null
          longitude: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          hotel_id?: string | null
          address: string
          city: string
          zip: string
          country: string
          latitude?: number | null
          longitude?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          hotel_id?: string | null
          address?: string
          city?: string
          zip?: string
          country?: string
          latitude?: number | null
          longitude?: number | null
          created_at?: string | null
        }
      }
      hotel_sections: {
        Row: {
          id: string
          hotel_id: string | null
          type: Database['public']['Enums']['section_type']
          title: string
          content: string | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          hotel_id?: string | null
          type: Database['public']['Enums']['section_type']
          title: string
          content?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          hotel_id?: string | null
          type?: Database['public']['Enums']['section_type']
          title?: string
          content?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      hotel_rooms: {
        Row: {
          id: string
          hotel_id: string | null
          name: string
          description: string | null
          category: Database['public']['Enums']['room_category']
          size: number | null
          max_occupancy: number | null
          price_single: number | null
          price_double: number | null
          amenities: Json | null
          images: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          hotel_id?: string | null
          name: string
          description?: string | null
          category: Database['public']['Enums']['room_category']
          size?: number | null
          max_occupancy?: number | null
          price_single?: number | null
          price_double?: number | null
          amenities?: Json | null
          images?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          hotel_id?: string | null
          name?: string
          description?: string | null
          category?: Database['public']['Enums']['room_category']
          size?: number | null
          max_occupancy?: number | null
          price_single?: number | null
          price_double?: number | null
          amenities?: Json | null
          images?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      hotel_contacts: {
        Row: {
          id: string
          hotel_id: string | null
          type: string
          value: string
          created_at: string | null
        }
        Insert: {
          id?: string
          hotel_id?: string | null
          type: string
          value: string
          created_at?: string | null
        }
        Update: {
          id?: string
          hotel_id?: string | null
          type?: string
          value?: string
          created_at?: string | null
        }
      }
      hotel_policies: {
        Row: {
          id: string
          hotel_id: string | null
          type: Database['public']['Enums']['policy_type']
          content: Json
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          hotel_id?: string | null
          type: Database['public']['Enums']['policy_type']
          content: Json
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          hotel_id?: string | null
          type?: Database['public']['Enums']['policy_type']
          content?: Json
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Enums: {
      room_category: 'standard' | 'comfort' | 'deluxe' | 'suite' | 'apartment'
      section_type: 'welcome' | 'rooms' | 'wellness' | 'dining' | 'meetings' | 'location'
      policy_type: 'checkin' | 'checkout' | 'cancellation' | 'pets' | 'children' | 'payment'
    }
  }
}