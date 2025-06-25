
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Hash, Search, Filter, MapPin, Clock, Users, 
  Star, TrendingUp, Zap, Music, Camera, Heart,
  MessageCircle, Share, Trophy, Gift, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for the feed
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
      points: 50,
      tags: ['#chill', '#rooftop', '#sunset'],
      hypeLevel: 'hot',
      contributions: ['Speaker', 'Snacks', 'Fairy Lights'],
      memories: 3,
      isVip: false,
      liveFeed: true
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
      points: 100,
      tags: ['#gaming', '#secret', '#tournament'],
      hypeLevel: 'building',
      contributions: ['Energy Drinks', 'Controllers', 'Prizes'],
      memories: 0,
      isVip: true,
      liveFeed: false
    },
    {
      id: '3',
      title: 'Study + Vibe Session',
      host: '@maya_study',
      description: 'Finals prep but make it fun ✨',
      time: '2:00 PM',
      date: 'Sunday',
      location: 'Library Garden',
      attendees: 8,
      maxAttendees: 15,
      points: 30,
      tags: ['#study', '#chill', '#productivity'],
      hypeLevel: 'slow',
      contributions: ['Coffee', 'Notebooks', 'Good Energy'],
      memories: 1,
      isVip: false,
      liveFeed: false
    }
  ];

  const quickActions = [
    { icon: Zap, label: 'Host Event', color: 'bg-red-600', path: '/events' },
    { icon: Users, label: 'Find People', color: 'bg-blue-600', path: '/messages' },
    { icon: Music, label: 'Vibe Check', color: 'bg-purple-600', path: '/events' },
    { icon: Trophy, label: 'Leaderboard', color: 'bg-yellow-600', path: '/profile' }
  ];

  const getHypeColor = (level: string) => {
    switch (level) {
      case 'hot': return 'text-red-500';
      case 'building': return 'text-yellow-500';
      case 'slow': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getHypeEmoji = (level: string) => {
    switch (level) {
      case 'hot': return '🔥';
      case 'building': return '⚡';
      case 'slow': return '🧊';
      default: return '💭';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-red-600">society6</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="relative">
              <Heart className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              <Sparkles className="w-4 h-4 mr-2" />
              Create
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Search & Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="What's the vibe tonight?" 
              className="pl-10 bg-secondary border-0 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
            <TabsList className="grid w-full grid-cols-4 bg-secondary">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="hot">🔥 Hot</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="vip">VIP</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path}>
              <Card className="p-3 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className={`w-8 h-8 ${action.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-gray-400">{action.label}</p>
              </Card>
            </Link>
          ))}
        </div>

        {/* Event Feed */}
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="event-card">
              <div className="space-y-4">
                {/* Event Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{event.host[1].toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{event.host}</p>
                      <p className="text-sm text-gray-400">{event.date} • {event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {event.isVip && <Badge className="bg-red-600">VIP</Badge>}
                    {event.liveFeed && (
                      <div className="flex items-center space-x-1 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-500">LIVE</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Content */}
                <div>
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-300 mb-3">{event.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees}/{event.maxAttendees}
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {event.points} pts
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

                  {/* Hype Meter */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`hype-meter ${getHypeColor(event.hypeLevel)}`}>
                      <span>{getHypeEmoji(event.hypeLevel)}</span>
                      <span className="capitalize">{event.hypeLevel} right now</span>
                    </div>
                    
                    {event.memories > 0 && (
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <Camera className="w-4 h-4" />
                        <span>{event.memories} memories</span>
                      </div>
                    )}
                  </div>

                  {/* Contributions */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Still needed:</p>
                    <div className="flex flex-wrap gap-2">
                      {event.contributions.map((item, index) => (
                        <Button key={index} size="sm" variant="outline" className="text-xs">
                          I'll bring {item}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <Button size="sm" variant="ghost" className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{Math.floor(Math.random() * 20) + 5}</span>
                      </Button>
                      <Button size="sm" variant="ghost" className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{Math.floor(Math.random() * 10) + 2}</span>
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Join Event
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-6">
          <Button variant="outline" className="border-red-600/30 hover:border-red-600">
            Load more vibes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
