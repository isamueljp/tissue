
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, DollarSign, Users, Calendar, MapPin, TrendingUp, 
  Music, Camera, MessageCircle, Share, Heart, Zap,
  Clock, Star, Gift, Headphones, Gamepad2
} from 'lucide-react';
import EventChat from '../components/EventChat';
import ContributionBoard from '../components/ContributionBoard';

const Events = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('1');

  const events = [
    {
      id: '1',
      title: 'VIP Rooftop Party',
      description: 'Exclusive rooftop experience with premium drinks and DJ',
      date: 'Dec 30, 2024',
      time: '8:00 PM',
      location: 'Downtown Rooftop',
      host: '@sarah_vibe',
      attendees: 45,
      maxAttendees: 80,
      ticketPrice: 25,
      fundingGoal: 5000,
      currentFunding: 3200,
      expectedProfit: 15000,
      roi: '25%',
      investors: 24,
      hypeLevel: 'hot',
      tags: ['#rooftop', '#vip', '#dj'],
      contributions: ['Sound System', 'Drinks', 'Lighting'],
      musicVibe: 'Electronic/House',
      ageGroup: '18-24',
      vibe: '🔥 High Energy',
      whatsappLink: 'https://chat.whatsapp.com/rooftop-party-2024'
    },
    {
      id: '2',
      title: 'Gaming Tournament Night',
      description: 'Competitive gaming with cash prizes and energy drinks',
      date: 'Jan 5, 2025',
      time: '7:00 PM',
      location: 'Tech Center Basement',
      host: '@alex_games',
      attendees: 32,
      maxAttendees: 50,
      ticketPrice: 15,
      fundingGoal: 2000,
      currentFunding: 1800,
      expectedProfit: 4000,
      roi: '18%',
      investors: 12,
      hypeLevel: 'building',
      tags: ['#gaming', '#tournament', '#prizes'],
      contributions: ['Gaming Chairs', 'Snacks', 'Monitors'],
      musicVibe: 'Lo-fi/Chill',
      ageGroup: '18-25',
      vibe: '🎮 Competitive',
      whatsappLink: 'https://chat.whatsapp.com/gaming-tournament-2025'
    }
  ];

  const createEventForm = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    ticketPrice: '',
    fundingGoal: '',
    musicVibe: '',
    vibe: ''
  };

  const selectedEventData = events.find(e => e.id === selectedEvent);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Events & Parties</h1>
          <p className="text-gray-400 mt-1">Discover, invest, and create amazing experiences</p>
        </div>
        <Button 
          className="bg-red-600 hover:bg-red-700"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Host Event
        </Button>
      </div>

      {/* Create Event Form */}
      {showCreateForm && (
        <Card className="twitter-card p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Create Your Event</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Event Title</label>
              <Input placeholder="Epic Pool Party" className="bg-secondary border-0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Vibe Check</label>
              <Input placeholder="🔥 High Energy / 🌙 Chill / 🎮 Competitive" className="bg-secondary border-0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date & Time</label>
              <div className="flex space-x-2">
                <Input type="date" className="bg-secondary border-0" />
                <Input type="time" className="bg-secondary border-0" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input placeholder="North Block Rooftop" className="bg-secondary border-0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max People</label>
              <Input placeholder="50" type="number" className="bg-secondary border-0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ticket Price ($)</label>
              <Input placeholder="20" type="number" className="bg-secondary border-0" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea 
                placeholder="Tell people what makes this event special..." 
                className="bg-secondary border-0"
                rows={3}
              />
            </div>
            <div className="md:col-span-2 flex space-x-3">
              <Button className="bg-red-600 hover:bg-red-700">
                Create Event
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="lg:col-span-2 space-y-6">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className={`twitter-card p-6 cursor-pointer transition-all ${
                selectedEvent === event.id ? 'ring-2 ring-red-600' : ''
              }`}
              onClick={() => setSelectedEvent(event.id)}
            >
              <div className="space-y-4">
                {/* Event Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {event.host[1].toUpperCase()}
                      </div>
                      <span className="text-gray-400">{event.host}</span>
                      <Badge className={`${event.hypeLevel === 'hot' ? 'bg-red-600' : 'bg-yellow-600'}`}>
                        {event.hypeLevel === 'hot' ? '🔥 HOT' : '⚡ BUILDING'}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                  <Badge className="bg-green-600">{event.roi} ROI</Badge>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2 text-red-500" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2 text-red-500" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Music className="w-4 h-4 mr-2 text-red-500" />
                    {event.musicVibe}
                  </div>
                </div>

                {/* Vibe & Tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{event.vibe}</span>
                    <span className="text-sm text-gray-400">• {event.ageGroup}</span>
                  </div>
                  <div className="flex space-x-1">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Investment Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Investment Progress</span>
                    <span>${event.currentFunding}/${event.fundingGoal}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all"
                      style={{ width: `${(event.currentFunding / event.fundingGoal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                      <span className="font-bold">${event.ticketPrice}</span>
                    </div>
                    <span className="text-xs text-gray-400">Ticket</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-blue-500 mr-1" />
                      <span className="font-bold">{event.attendees}/{event.maxAttendees}</span>
                    </div>
                    <span className="text-xs text-gray-400">Going</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
                      <span className="font-bold">{event.investors}</span>
                    </div>
                    <span className="text-xs text-gray-400">Investors</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-bold">{Math.floor(Math.random() * 50) + 25}</span>
                    </div>
                    <span className="text-xs text-gray-400">Points</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                    <Heart className="w-4 h-4 mr-2" />
                    Join Party
                  </Button>
                  <Button variant="outline" className="flex-1 border-green-600 text-green-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Invest
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="border-gray-600">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>

                {/* WhatsApp Link */}
                <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-400">Auto-Join WhatsApp Group</p>
                      <p className="text-xs text-gray-400">Get added instantly when you join the event</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Join Chat
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Chat & Contributions Sidebar */}
        <div className="space-y-6">
          {selectedEventData && (
            <>
              <EventChat eventTitle={selectedEventData.title} />
              <ContributionBoard eventTitle={selectedEventData.title} />
              
              {/* Music Suggestions */}
              <Card className="twitter-card p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Headphones className="w-4 h-4 text-purple-500 mr-2" />
                  Music Vibe
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>🎵 Current Playlist</span>
                    <span className="text-purple-400">{selectedEventData.musicVibe}</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full border-purple-600 text-purple-600">
                    <Music className="w-4 h-4 mr-2" />
                    Suggest Songs
                  </Button>
                </div>
              </Card>

              {/* Live Location */}
              <Card className="twitter-card p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <MapPin className="w-4 h-4 text-blue-500 mr-2" />
                  Location & Travel
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">{selectedEventData.location}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      🚗 Carpool
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      📍 Navigate
                    </Button>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
