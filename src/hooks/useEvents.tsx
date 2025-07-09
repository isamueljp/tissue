
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
      
      // First get all events
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (eventsError) {
        console.error('Supabase error:', eventsError);
        throw eventsError;
      }

      if (!eventsData || eventsData.length === 0) {
        setEvents([]);
        return;
      }

      // Get all unique user IDs from events
      const userIds = [...new Set(eventsData.map(event => event.user_id))];
      
      // Get profiles for these users
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url')
        .in('id', userIds);

      if (profilesError) {
        console.error('Profiles error:', profilesError);
        // Continue without profiles data rather than failing completely
      }

      // Create a map of user_id to profile
      const profilesMap = new Map();
      if (profilesData) {
        profilesData.forEach(profile => {
          profilesMap.set(profile.id, profile);
        });
      }

      // Combine events with their profiles
      const transformedEvents: Event[] = eventsData.map(event => ({
        ...event,
        profiles: profilesMap.get(event.user_id) || {
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
      .select()
      .single();

    if (error) throw error;
    
    // Get the profile for this user
    const { data: profileData } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url')
      .eq('id', user.id)
      .single();
    
    const transformedEvent: Event = {
      ...data,
      profiles: profileData || {
        id: user.id,
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
