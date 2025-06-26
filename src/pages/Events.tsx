import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Filter, MapPin, Clock, Users, 
  Heart, Share, Plus, Calendar, Zap,
  Music, Coffee, Camera, Star
} from 'lucide-react';
import ContributionBoard from '../components/ContributionBoard';
import WalkieTalkie from '../components/WalkieTalkie';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  const events = [
    {
      id: '1',
      title: 'VIP Rooftop New Year Party',
      date: 'Dec 30, 2024',
      time: '8:00 PM',
      location: 'Manhattan Rooftop',
      attendees: 89,
      maxAttendees: 120,
      price: 45,
      type: 'party',
      host: 'Alex Rodriguez',
      description: 'Ring in the new year with breathtaking city views, premium drinks, and an unforgettable night of music and dancing.',
      image: '🏢',
      vibe: 'luxe',
      hypeLevel: 95
    },
    {
      id: '2',
      title: 'Indie Music Showcase',
      date: 'Jan 12, 2025',
      time: '7:30 PM',
      location: 'Brooklyn Music Hall',
      attendees: 62,
      maxAttendees: 150,
      price: 25,
      type: 'music',
      host: 'Indie Collective',
      description: 'Discover the best up-and-coming indie bands in the city. A night of live music, good vibes, and new friends.',
      image: '🎸',
      vibe: 'chill',
      hypeLevel: 80
    },
    {
      id: '3',
      title: 'Late Night Study Group',
      date: 'Jan 18, 2025',
      time: '10:00 PM',
      location: 'Campus Library',
      attendees: 34,
      maxAttendees: 60,
      price: 0,
      type: 'study',
      host: 'Student Union',
      description: 'Join fellow students for a productive late-night study session. Snacks and coffee provided!',
      image: '📚',
      vibe: 'focused',
      hypeLevel: 65
    },
    {
      id: '4',
      title: 'Winter Sports Day',
      date: 'Jan 22, 2025',
      time: '9:00 AM',
      location: 'Mountain Resort',
      attendees: 48,
      maxAttendees: 80,
      price: 60,
      type: 'sports',
      host: 'Adventure Club',
      description: 'Hit the slopes for a day of skiing, snowboarding, and winter fun. All skill levels welcome!',
      image: '🏂',
      vibe: 'active',
      hypeLevel: 75
    }
  ];

  return (
    <div className="mobile-container">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Events</h1>
            <p className="text-gray-400 text-sm">Discover amazing experiences</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-red-600/30">
              <Filter className="w-4 h-4" />
            </Button>
            <Button size="sm" className="mobile-btn mobile-btn-primary">
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search events..." 
              className="pl-10 bg-secondary/50 border-0 rounded-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['Party', 'Music', 'Food', 'Study', 'Sports'].map((tag) => (
              <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-red-600/20 border-red-600/30 touch-target">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="twitter-card hover:border-red-600/40 touch-feedback"
              onClick={() => setSelectedEvent(event.id)}
            >
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600/30 to-purple-600/30 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {event.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-400 mb-2">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {event.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="flex items-center text-xs text-gray-400">
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-bold text-green-400">₹{event.price}</div>
                    <Badge className="bg-red-600 text-xs">
                      {event.type}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-300 text-sm">{event.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      {event.attendees}/{event.maxAttendees}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-red-500" />
                      <span className="text-xs font-medium">{event.hypeLevel}%</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="p-2 touch-target">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 touch-target">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button className="mobile-btn mobile-btn-primary text-xs">
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Event Components */}
        {selectedEvent && (
          <div className="space-y-4">
            <WalkieTalkie 
              eventId={selectedEvent}
              eventName={events.find(e => e.id === selectedEvent)?.title || 'Event'}
            />
            <ContributionBoard 
              eventTitle={events.find(e => e.id === selectedEvent)?.title || 'Event'}
            />
          </div>
        )}

        {/* Trending Events */}
        <Card className="twitter-card">
          <h3 className="font-semibold mb-3 flex items-center">
            <Star className="w-5 h-5 mr-2 text-red-500" />
            Trending Now
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Silent Disco', attendees: 156, emoji: '🎧' },
              { name: 'Food Truck Festival', attendees: 203, emoji: '🚚' },
              { name: 'Art Gallery Opening', attendees: 89, emoji: '🎨' }
            ].map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{trend.emoji}</span>
                  <span className="text-sm">{trend.name}</span>
                </div>
                <span className="text-xs text-gray-400">{trend.attendees} going</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Events;
