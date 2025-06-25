
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, Calendar, Users, Clock, Navigation, 
  Coffee, Music, Camera, Star, Plus, Search,
  Compass, Map, Route, Heart, Bookmark
} from 'lucide-react';

const Travel = () => {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Boston', 'San Francisco'];

  const travelSchedule = [
    {
      id: '1',
      time: '9:00 AM',
      activity: 'Coffee & Networking',
      location: 'Blue Bottle Coffee - SoHo',
      type: 'meetup',
      attendees: 12,
      description: 'Start your day with great coffee and meet fellow travelers',
      distance: '0.5 km',
      vibe: 'chill'
    },
    {
      id: '2', 
      time: '2:00 PM',
      activity: 'Central Park Picnic',
      location: 'Central Park - Sheep Meadow',
      type: 'event',
      attendees: 28,
      description: 'Join locals for a relaxing picnic with music and games',
      distance: '1.2 km',
      vibe: 'social'
    },
    {
      id: '3',
      time: '7:00 PM',
      activity: 'Rooftop Party',
      location: 'Manhattan Skyline Rooftop',
      type: 'party',
      attendees: 45,
      description: 'Epic sunset views with DJ sets and craft cocktails',
      distance: '2.1 km',
      vibe: 'party'
    }
  ];

  const localConnections = [
    {
      id: '1',
      name: 'Sarah Chen',
      bio: 'Local guide & photographer',
      interests: ['Photography', 'Food', 'Music'],
      mutualConnections: 3,
      badge: 'Local Expert',
      availability: 'Available today'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      bio: 'Music producer & party host',
      interests: ['Music', 'Nightlife', 'Art'],
      mutualConnections: 7,
      badge: 'Party Guru',
      availability: 'Free this evening'
    }
  ];

  const travelTips = [
    {
      title: 'Best Coffee Spots',
      description: 'Local favorites for remote work and networking',
      category: 'Food & Drink',
      rating: 4.8
    },
    {
      title: 'Hidden Speakeasies',
      description: 'Secret bars only locals know about',
      category: 'Nightlife',
      rating: 4.9
    },
    {
      title: 'Rooftop Venues',
      description: 'Best spots for sunset views and parties',
      category: 'Events',
      rating: 4.7
    }
  ];

  const getVibeColor = (vibe: string) => {
    switch (vibe) {
      case 'chill': return 'text-blue-400';
      case 'social': return 'text-green-400';
      case 'party': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getVibeEmoji = (vibe: string) => {
    switch (vibe) {
      case 'chill': return '☕';
      case 'social': return '🤝';
      case 'party': return '🎉';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Travel & Explore</h1>
            <p className="text-gray-400">Discover events, meet locals, and create memories</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-red-600/30">
              <Compass className="w-4 h-4 mr-2" />
              Find Me
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* City Selector */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {cities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedCity === city 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'border-red-600/30 hover:border-red-600'
                }`}
                onClick={() => setSelectedCity(city)}
              >
                <MapPin className="w-4 h-4 mr-1" />
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Social Energy Compass */}
        <Card className="bg-gradient-to-r from-red-600/20 to-purple-600/20 p-4 mb-6 border border-red-600/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center mb-2">
                <Compass className="w-5 h-5 mr-2 text-red-400" />
                Social Energy Compass
              </h3>
              <p className="text-sm text-gray-300">Rooftop 300m away is vibing right now 🔥</p>
              <p className="text-xs text-gray-400">45 people, live music, high energy</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-red-600/30 rounded-full flex items-center justify-center mb-2">
                <Navigation className="w-8 h-8 text-red-400" />
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Navigate
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Today's Schedule</h3>
              <Button variant="outline" className="border-red-600/30">
                <Calendar className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>

            {travelSchedule.map((item) => (
              <Card key={item.id} className="bg-card border border-border p-4 hover:border-red-600/40 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{item.time.split(':')[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center">
                        {item.activity}
                        <span className="ml-2 text-lg">{getVibeEmoji(item.vibe)}</span>
                      </h4>
                      <p className="text-sm text-gray-400 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.location}
                      </p>
                      <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <Badge className={`${getVibeColor(item.vibe)} bg-transparent border`}>
                    {item.vibe}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {item.attendees} going
                    </span>
                    <span className="flex items-center">
                      <Navigation className="w-4 h-4 mr-1" />
                      {item.distance}
                    </span>
                  </div>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.time}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Join Event
                  </Button>
                  <Button variant="outline" className="border-red-600/30">
                    <Route className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                  <Button variant="outline" className="border-red-600/30">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="people" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Connect with Locals</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search people..." 
                  className="pl-10 bg-secondary border-0 w-64"
                />
              </div>
            </div>

            {localConnections.map((person) => (
              <Card key={person.id} className="bg-card border border-border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {person.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center">
                        {person.name}
                        <Badge className="ml-2 bg-red-600">{person.badge}</Badge>
                      </h4>
                      <p className="text-sm text-gray-400">{person.bio}</p>
                      <p className="text-xs text-green-400">{person.availability}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {person.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-red-600/30">
                      {interest}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {person.mutualConnections} mutual connections
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="border-red-600/30">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700">
                      Connect
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="explore" className="space-y-4">
            <div className="text-center py-8">
              <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
              <p className="text-gray-400 mb-4">Explore events and hotspots around you</p>
              <Button className="bg-red-600 hover:bg-red-700">
                <MapPin className="w-4 h-4 mr-2" />
                Open Map View
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {travelTips.map((tip, index) => (
                <Card key={index} className="bg-card border border-border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{tip.title}</h4>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{tip.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{tip.description}</p>
                  <Badge variant="outline" className="border-red-600/30 text-xs">
                    {tip.category}
                  </Badge>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Travel;
