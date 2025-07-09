
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Event {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  event_type: string;
  location_name: string | null;
  location_lat: number | null;
  location_lng: number | null;
  image_url: string | null;
  donation_link: string | null;
  donation_amount: string | null;
  hashtags: string[] | null;
  created_at: string;
  updated_at: string;
  profiles: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  };
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          profiles!events_user_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Transform the data to match our Event interface
      const transformedEvents = (data || []).map(event => ({
        ...event,
        profiles: event.profiles || {
          id: event.user_id,
          username: null,
          full_name: null,
          avatar_url: null
        }
      }));

      setEvents(transformedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching events');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: {
    title: string;
    description: string;
    event_type: string;
    location_name?: string;
    location_lat?: number;
    location_lng?: number;
    image_url?: string;
    donation_link?: string;
    donation_amount?: string;
    hashtags?: string[];
  }) => {
    if (!user) throw new Error('User must be authenticated');

    const { data, error } = await supabase
      .from('events')
      .insert([{ ...eventData, user_id: user.id }])
      .select(`
        *,
        profiles!events_user_id_fkey (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .single();

    if (error) throw error;
    
    const transformedEvent = {
      ...data,
      profiles: data.profiles || {
        id: data.user_id,
        username: null,
        full_name: null,
        avatar_url: null
      }
    };

    setEvents(prev => [transformedEvent, ...prev]);
    return transformedEvent;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    createEvent,
    refetch: fetchEvents
  };
};
