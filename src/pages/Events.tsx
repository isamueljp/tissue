import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-red-600">Events</h1>
            <p className="text-gray-400">Discover and join amazing experiences</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-red-600/30">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Events List */}
          <div className="lg:col-span-2 space-y-4">
            {events.map((event) => (
              <Card 
                key={event.id} 
                className="event-card bg-card border border-border p-6 hover:border-red-600/40"
                onClick={() => setSelectedEvent(event.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600/30 to-purple-600/30 rounded-xl flex items-center justify-center text-2xl">
                      {event.image}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">${event.price}</div>
                    <p className="text-sm text-gray-400">per person</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{event.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees}/{event.maxAttendees}
                    </span>
                    <Badge className="bg-red-600">
                      {event.type}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{event.hypeLevel}% Hype</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700">
                      Join Event
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search & Quick Filters */}
            <Card className="bg-card border border-border p-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    placeholder="Search events..." 
                    className="pl-10 bg-secondary border-0"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['Party', 'Music', 'Food', 'Study', 'Sports'].map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-red-600/20 border-red-600/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Walkie-Talkie for Selected Event */}
            {selectedEvent && (
              <WalkieTalkie 
                eventId={selectedEvent}
                eventName={events.find(e => e.id === selectedEvent)?.title || 'Event'}
              />
            )}

            {/* Event Contributions */}
            {selectedEvent && (
              <ContributionBoard 
                eventTitle={events.find(e => e.id === selectedEvent)?.title || 'Event'}
              />
            )}

            {/* Trending Events */}
            <Card className="bg-card border border-border p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
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
      </div>
    </div>
  );
};

export default Events;
