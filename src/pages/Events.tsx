
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Vote } from 'lucide-react';
import { useEvents, Event } from '@/hooks/useEvents';
import { EventCard } from '@/components/EventCard';
import { EventDetailModal } from '@/components/EventDetailModal';
import { CreateEventModal } from '@/components/CreateEventModal';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { events, loading, error } = useEvents();

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.profiles.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.hashtags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowDetailModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
          <p className="text-gray-400">Discover and create amazing events in your community</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Create Event
          </Button>
          <Button variant="outline" className="border-blue-600 text-blue-600">
            <Vote className="w-4 h-4 mr-2" />
            Create Poll
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search events, creators, or hashtags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 bg-secondary/50 border-0 rounded-full text-lg py-3"
        />
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-400">Loading events...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}
        
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No events found. Be the first to create one!</p>
          </div>
        )}
        
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEventClick={handleEventClick}
          />
        ))}
      </div>

      {/* Modals */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      
      <EventDetailModal
        event={selectedEvent}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default Events;
