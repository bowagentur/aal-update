import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Hotel {
  id: string;
  name: string;
  description: string;
  rating: number;
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  };
  sections?: {
    welcome?: {
      title: string;
      intro: string;
      highlights: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
    wellness?: {
      title: string;
      intro: string;
      features: string[];
      openingHours: {
        weekdays: string;
        weekend: string;
      };
    };
  };
  rooms?: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    size: number;
    maxOccupancy: number;
    priceSingle?: number;
    priceDouble: number;
    amenities: string[];
  }>;
  location?: {
    address: string;
    city: string;
    zip: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  policies?: {
    checkIn?: {
      from: string;
      until: string;
      lateCheckIn?: string;
    };
    checkOut?: {
      until: string;
      lateCheckOut?: string;
    };
    pets?: {
      allowed: boolean;
      fee: string;
      notes: string;
    };
    payment?: {
      methods: string[];
      prePayment: string;
    };
  };
}

export function useHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  async function fetchHotels() {
    try {
      setLoading(true);
      
      // Fetch hotels with their locations
      const { data: hotelsData, error: hotelsError } = await supabase
        .from('hotels')
        .select(`
          id,
          name,
          description,
          rating,
          branding,
          hotel_locations (*),
          hotel_sections (
            type,
            title,
            content,
            metadata
          ),
          hotel_rooms (
            id,
            name,
            description,
            category,
            size,
            max_occupancy,
            price_single,
            price_double,
            amenities
          ),
          hotel_contacts (
            type,
            value
          ),
          hotel_policies (
            type,
            content
          )
        `)
        .eq('active', true);

      if (hotelsError) throw hotelsError;

      setHotels(hotelsData.map(hotel => {
        // Transform the raw data into our Hotel interface
        const transformed: Hotel = {
          id: hotel.id,
          name: hotel.name,
          description: hotel.description,
          rating: hotel.rating,
          branding: hotel.branding,
          location: hotel.hotel_locations?.[0],
          sections: {
            welcome: hotel.hotel_sections?.find(s => s.type === 'welcome'),
            wellness: hotel.hotel_sections?.find(s => s.type === 'wellness')
          },
          rooms: hotel.hotel_rooms?.map(room => ({
            id: room.id,
            name: room.name,
            description: room.description,
            category: room.category,
            size: room.size,
            maxOccupancy: room.max_occupancy,
            priceSingle: room.price_single,
            priceDouble: room.price_double,
            amenities: room.amenities
          })),
          policies: hotel.hotel_policies?.reduce((acc, policy) => ({
            ...acc,
            [policy.type]: policy.content
          }), {})
        };

        return transformed;
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching hotels');
    } finally {
      setLoading(false);
    }
  }

  async function createHotel(hotelData: Partial<Hotel>) {
    try {
      // Extract only the fields that exist in the hotels table
      const { name, description, rating, branding } = hotelData;
      const hotelPayload = { name, description, rating, branding };

      const { data, error } = await supabase
        .from('hotels')
        .insert([hotelPayload])
        .select()
        .single();

      if (error) throw error;

      setHotels(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating hotel');
      throw err;
    }
  }

  async function updateHotel(id: string, updates: Partial<Hotel>) {
    try {
      // Extract only the fields that exist in the hotels table
      const { name, description, rating, branding, active } = updates;
      const hotelPayload = { name, description, rating, branding, active };

      const { data, error } = await supabase
        .from('hotels')
        .update(hotelPayload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Update related tables if data is provided
      if (updates.location) {
        await supabase
          .from('hotel_locations')
          .upsert({ hotel_id: id, ...updates.location });
      }

      if (updates.rooms) {
        await supabase
          .from('hotel_rooms')
          .upsert(
            updates.rooms.map(room => ({
              ...room,
              hotel_id: id
            }))
          );
      }

      if (updates.sections) {
        for (const [type, section] of Object.entries(updates.sections)) {
          if (!section) continue;
          await supabase
            .from('hotel_sections')
            .upsert({
              hotel_id: id,
              type,
              title: section.title,
              content: section.content,
              metadata: section
            });
        }
      }

      if (updates.policies) {
        for (const [type, content] of Object.entries(updates.policies)) {
          await supabase
            .from('hotel_policies')
            .upsert({
              hotel_id: id,
              type: type as any,
              content
            });
        }
      }

      setHotels(prev => prev.map(hotel => 
        hotel.id === id ? { ...hotel, ...data } : hotel
      ));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating hotel');
      throw err;
    }
  }

  async function deleteHotel(id: string) {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setHotels(prev => prev.filter(hotel => hotel.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting hotel');
      throw err;
    }
  }

  return {
    hotels,
    loading,
    error,
    createHotel,
    updateHotel,
    deleteHotel,
    refreshHotels: fetchHotels
  };
}