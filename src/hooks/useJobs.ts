import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  created_at: string;
  active: boolean;
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching jobs');
    } finally {
      setLoading(false);
    }
  }

  async function createJob(jobData: Omit<Job, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) throw error;

      setJobs(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating job');
      throw err;
    }
  }

  async function updateJob(id: string, updates: Partial<Job>) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setJobs(prev => prev.map(job => 
        job.id === id ? { ...job, ...data } : job
      ));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating job');
      throw err;
    }
  }

  async function deleteJob(id: string) {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting job');
      throw err;
    }
  }

  return {
    jobs,
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    refreshJobs: fetchJobs
  };
}