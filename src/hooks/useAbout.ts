import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image_url: string;
  bio: string;
}

export interface Award {
  id: string;
  title: string;
  description: string;
  year: number;
  icon: string;
}

export interface AboutContent {
  history: string;
  philosophy: string;
  team: TeamMember[];
  awards: Award[];
}

export function useAbout() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    try {
      setLoading(true);
      
      // Fetch about content
      const { data: aboutData, error: aboutError } = await supabase
        .from('about')
        .select('*')
        .single();

      if (aboutError) throw aboutError;

      // Fetch team members
      const { data: teamData, error: teamError } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });

      if (teamError) throw teamError;

      // Fetch awards
      const { data: awardsData, error: awardsError } = await supabase
        .from('awards')
        .select('*')
        .order('year', { ascending: false });

      if (awardsError) throw awardsError;

      setContent({
        history: aboutData.history,
        philosophy: aboutData.philosophy,
        team: teamData,
        awards: awardsData
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching about content');
    } finally {
      setLoading(false);
    }
  }

  async function updateContent(updates: Partial<Omit<AboutContent, 'team' | 'awards'>>) {
    try {
      const { data, error } = await supabase
        .from('about')
        .update(updates)
        .select()
        .single();

      if (error) throw error;

      setContent(prev => prev ? { ...prev, ...updates } : null);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating about content');
      throw err;
    }
  }

  return {
    content,
    loading,
    error,
    updateContent,
    refreshContent: fetchContent
  };
}