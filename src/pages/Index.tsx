
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, MapPin, Users, Heart, MessageCircle, Share, 
  Zap, Music, Trophy, Gift, Sparkles, Play, Volume2,
  ChevronLeft, ChevronRight, Navigation
} from 'lucide-react';

const Index = () => {
  const [trendingIndex, setTrendingIndex] = useState(0);

  const tonightsVibes = [
    {
      title: "Rooftop Chill Session",
      vibe: "🌅 Sunset Vibes",
      background: "bg-gradient-to-r from-orange-500/20 to-red-500/20",
      attendees: 34
    },
    {
      title: "Secret Gaming Tournament", 
      vibe: "🎮 Competitive Energy",
      background: "bg-gradient-to-r from-purple-500/20 to-blue-500/20",
      attendees: 28
    },
    {
      title: "Study + Vibe Session",
      vibe: "✨ Productive Chill",
      background: "bg-gradient-to-r from-green-500/20 to-teal-500/20", 
      attendees: 19
    }
  ];

  const events = [
    {
      id: '1',
      title: 'Rooftop Chill Session',
      host: '@sarah_vibe',
      description: 'Sunset vibes with good music and even better people 🌅',
      time: '6:00 PM',
      date: 'Tonight',
      location: 'North Block Rooftop',
      attendees: 23,
      maxAttendees: 35,
      tags: ['#chill', '#rooftop', '#sunset'],
      liveFeed: true,
    },
    {
      id: '2',
      title: 'Secret Gaming Tournament',
      host: '@alex_games',
      description: 'Invite only. Password: LEGEND',
      time: '8:00 PM',
      date: 'Tomorrow',
      location: 'Underground Lounge',
      attendees: 12,
      maxAttendees: 16,
      tags: ['#gaming', '#secret', '#tournament'],
      liveFeed: false,
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingIndex((prev) => (prev + 1) % tonightsVibes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile-optimized Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-red-600">society6</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="relative p-2">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700 px-3">
              <Sparkles className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Tonight's Vibe Banner - Twitter-like */}
        <Card className={`p-4 ${tonightsVibes[trendingIndex].background} border-red-600/30 relative`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="font-bold text-lg">{tonightsVibes[trendingIndex].title}</h2>
              <p className="text-red-400 text-sm">{tonightsVibes[trendingIndex].vibe}</p>
              <p className="text-xs text-gray-400">{tonightsVibes[trendingIndex].attendees} people vibing</p>
            </div>
            <Badge className="bg-red-600 text-xs">LIVE</Badge>
          </div>
        </Card>

        {/* Search Bar - Twitter-style */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            placeholder="What's happening?" 
            className="pl-12 bg-secondary/50 border-0 rounded-full text-lg py-3"
          />
        </div>

        {/* Quick Actions - Mobile Grid */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Zap, label: 'Host', color: 'bg-red-600' },
            { icon: Users, label: 'Find', color: 'bg-blue-600' },
            { icon: Music, label: 'Vibe', color: 'bg-purple-600' },
            { icon: Trophy, label: 'Rank', color: 'bg-yellow-600' }
          ].map((action, index) => (
            <Card key={index} className="p-3 text-center hover:scale-105 transition-all cursor-pointer">
              <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-gray-400">{action.label}</p>
            </Card>
          ))}
        </div>

        {/* Event Feed - Twitter-like Posts */}
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="bg-card border border-border hover:border-red-600/30 transition-all">
              <div className="p-4 space-y-3">
                {/* Post Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{event.host[1].toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{event.host}</p>
                      <p className="text-xs text-gray-400">{event.date} • {event.time}</p>
                    </div>
                  </div>
                  {event.liveFeed && <Badge className="bg-red-600 text-xs">LIVE</Badge>}
                </div>

                {/* Post Content */}
                <div>
                  <h3 className="font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {event.location}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {event.attendees}/{event.maxAttendees}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-secondary px-2 py-1 rounded-full text-red-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions - Twitter-style */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center space-x-6">
                    <Button size="sm" variant="ghost" className="flex items-center space-x-1 text-gray-400 hover:text-red-400 p-2">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{Math.floor(Math.random() * 20) + 5}</span>
                    </Button>
                    <Button size="sm" variant="ghost" className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 p-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{Math.floor(Math.random() * 10) + 2}</span>
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-400 p-2">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1">
                    Join
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-4">
          <Button variant="outline" className="border-red-600/30 hover:border-red-600 text-sm">
            Load more vibes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
