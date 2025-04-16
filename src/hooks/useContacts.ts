import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function createContact(contactData: Omit<Contact, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([contactData])
        .select()
        .single();

      if (error) throw error;

      setContacts(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating contact');
      throw err;
    }
  }

  return {
    contacts,
    loading,
    error,
    createContact
  };
}