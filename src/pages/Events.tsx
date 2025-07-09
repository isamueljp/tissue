
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Vote } from 'lucide-react';
import { useEvents, Event } from '@/hooks/useEvents';
import { EventCard } from '@/components/EventCard';
import { EventDetailModal } from '@/components/EventDetailModal';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { events, loading, error } = useEvents();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Events</h1>
          <p className="text-gray-400 text-sm">Discover and create amazing events</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            onClick={() => navigate('/create-event')}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Create Event
          </Button>
          <Button variant="outline" className="flex-1 border-blue-600 text-blue-600">
            <Vote className="w-4 h-4 mr-2" />
            Create Poll
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary/50 border-0 rounded-full"
          />
        </div>

        {/* Events List */}
        <div className="space-y-3">
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading events...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-red-400">Unable to load events. Please try again.</p>
            </div>
          )}
          
          {!loading && !error && filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No events right now</p>
              <p className="text-gray-500 text-sm mt-2">Be the first to create one!</p>
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

        {/* Event Detail Modal */}
        <EventDetailModal
          event={selectedEvent}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
        />
      </div>
    </div>
  );
};

export default Events;
