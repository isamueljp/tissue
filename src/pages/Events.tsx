
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Vote, MapPin, Eye, Clock, Star } from 'lucide-react';
import { useEvents, Event } from '@/hooks/useEvents';
import { EventCard } from '@/components/EventCard';
import { EventDetailModal } from '@/components/EventDetailModal';
import { NearbyEventsPreview } from '@/components/NearbyEventsPreview';
import { RSVPModal } from '@/components/RSVPModal';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [rsvpEvent, setRSVPEvent] = useState<Event | null>(null);
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

  const handleRSVP = (event: Event) => {
    setRSVPEvent(event);
    setShowRSVPModal(true);
  };

  const trendingHeaders = [
    "🔥 Hot events happening now",
    "👀 Most viewed this hour",
    "⚡ Don't miss out on these",
    "🎉 Events everyone's talking about"
  ];

  const [currentHeaderIndex] = useState(Math.floor(Math.random() * trendingHeaders.length));

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-md mx-auto space-y-4">
        {/* Dynamic Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Events</h1>
          <p className="text-red-400 text-sm font-medium animate-pulse">
            {trendingHeaders[currentHeaderIndex]}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            onClick={() => navigate('/create-event')}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Create Event
          </Button>
          <Button variant="outline" className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-600/10">
            <Vote className="w-4 h-4 mr-2" />
            Create Poll
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events, vibes, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary/50 border-0 rounded-full shadow-inner"
          />
        </div>

        {/* Nearby Events Preview */}
        <NearbyEventsPreview events={filteredEvents.slice(0, 5)} onRSVP={handleRSVP} />

        {/* Live Activity Indicator */}
        <div className="flex items-center justify-center space-x-4 py-2">
          <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs">Live activity</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400 text-xs">
            <Eye className="w-3 h-3" />
            <span>{Math.floor(Math.random() * 50) + 20} viewing now</span>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-400">Loading amazing events...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-red-400">Unable to load events. Please try again.</p>
            </div>
          )}
          
          {!loading && !error && filteredEvents.length === 0 && (
            <div className="text-center py-12 space-y-3">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold text-white">No events right now</h3>
              <p className="text-gray-400 text-sm">Be the first to create something amazing!</p>
              <Button 
                onClick={() => navigate('/create-event')}
                className="bg-red-600 hover:bg-red-700 mt-4"
              >
                Create First Event
              </Button>
            </div>
          )}
          
          {filteredEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              onEventClick={handleEventClick}
              onRSVP={handleRSVP}
              index={index}
              isHot={index < 2}
              isTrending={index === 0}
            />
          ))}
        </div>

        {/* Smart Suggestions */}
        {!loading && filteredEvents.length > 0 && (
          <div className="mt-6 p-4 bg-card/50 rounded-lg border border-border/30">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-white">You might like</span>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {filteredEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="flex-shrink-0 w-24">
                  <div className="bg-secondary/30 p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-300 truncate">{event.title}</p>
                    <Button size="sm" variant="ghost" className="text-xs mt-1 p-1 h-6">
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event Detail Modal */}
        <EventDetailModal
          event={selectedEvent}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
        />

        {/* RSVP Modal */}
        <RSVPModal
          event={rsvpEvent}
          isOpen={showRSVPModal}
          onClose={() => setShowRSVPModal(false)}
        />
      </div>
    </div>
  );
};

export default Events;
