import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Filter, MapPin, Clock, Users, 
  Star, TrendingUp, Zap, Music, Camera, Heart,
  MessageCircle, Share, Trophy, Gift, Sparkles,
  Bookmark, Timer, Navigation, Volume2, Play,
  UserPlus, Flame, Eye, ChevronLeft, ChevronRight,
  Mic, Video
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingIndex, setTrendingIndex] = useState(0);

  // Tonight's vibe data
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

  // Auto-rotate trending events
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingIndex((prev) => (prev + 1) % tonightsVibes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Mock data for the feed with enhanced features
  const events = [
    {
      id: '1',
      title: 'Rooftop Chill Session',
      host: '@sarah_vibe',
      hostBadge: 'golden-flame',
      description: 'Sunset vibes with good music and even better people 🌅',
      time: '6:00 PM',
      date: 'Tonight',
      location: 'North Block Rooftop',
      distance: '2.1 km',
      attendees: 23,
      maxAttendees: 35,
      points: 50,
      tags: ['#chill', '#rooftop', '#sunset'],
      hypeLevel: 'hot',
      contributions: [
        { item: 'Speaker', needed: 2, claimed: 1 },
        { item: 'Snacks', needed: 5, claimed: 3 },
        { item: 'Fairy Lights', needed: 1, claimed: 0 }
      ],
      memories: 3,
      isVip: false,
      liveFeed: true,
      playlist: 'Lo-fi Sunset Mix',
      currentSong: 'Sunset Dreams - Chillhop',
      recentJoiners: ['@mike', '@anna', '@priya', '@sam', '@alex'],
      friendsGoing: ['@bestie1', '@roommate', '@study_buddy'],
      vibePreview: '90% chill energy, 70% music lovers, mostly juniors',
      countdownHours: 2,
      countdownMinutes: 45,
      socialIncentive: 'Invite 2 friends and everyone gets free snacks!',
      liveStats: '4 people just joined in the last minute!',
      surpriseRole: 'Be the sunset photographer 📸'
    },
    {
      id: '2',
      title: 'Secret Gaming Tournament',
      host: '@alex_games',
      hostBadge: 'event-master',
      description: 'Invite only. Password: LEGEND',
      time: '8:00 PM',
      date: 'Tomorrow',
      location: 'Underground Lounge',
      distance: '800m',
      attendees: 12,
      maxAttendees: 16,
      points: 100,
      tags: ['#gaming', '#secret', '#tournament'],
      hypeLevel: 'building',
      contributions: [
        { item: 'Energy Drinks', needed: 10, claimed: 6 },
        { item: 'Controllers', needed: 4, claimed: 4 },
        { item: 'Prizes', needed: 3, claimed: 1 }
      ],
      memories: 0,
      isVip: true,
      liveFeed: false,
      playlist: 'Epic Gaming Beats',
      currentSong: 'Boss Battle - Electronic',
      recentJoiners: ['@gamer1', '@pro_player'],
      friendsGoing: ['@gaming_buddy'],
      vibePreview: '95% high-energy, 80% competitive, mixed years',
      countdownHours: 26,
      countdownMinutes: 15,
      socialIncentive: 'Winner takes 50% of prize pool!',
      liveStats: 'Only 4 slots remaining!',
      surpriseRole: 'Be the tournament commentator 🎤'
    },
    {
      id: '3',
      title: 'Study + Vibe Session',
      host: '@maya_study',
      hostBadge: 'community-builder',
      description: 'Finals prep but make it fun ✨',
      time: '2:00 PM',
      date: 'Sunday',
      location: 'Library Garden',
      distance: '1.5 km',
      attendees: 8,
      maxAttendees: 15,
      points: 30,
      tags: ['#study', '#chill', '#productivity'],
      hypeLevel: 'slow',
      contributions: [
        { item: 'Coffee', needed: 3, claimed: 2 },
        { item: 'Notebooks', needed: 5, claimed: 0 },
        { item: 'Good Energy', needed: 1, claimed: 1 }
      ],
      memories: 1,
      isVip: false,
      liveFeed: false,
      playlist: 'Study Focus Beats',
      currentSong: 'Deep Focus - Ambient',
      recentJoiners: ['@studious', '@focused'],
      friendsGoing: ['@study_group'],
      vibePreview: '75% focused energy, 60% seniors, study mode',
      countdownHours: 45,
      countdownMinutes: 30,
      socialIncentive: 'Group study = better grades for all!',
      liveStats: 'Perfect study weather this Sunday!',
      surpriseRole: 'Be the motivation cheerleader 📚'
    }
  ];

  const quickActions = [
    { icon: Zap, label: 'Host Event', color: 'bg-red-600', path: '/events' },
    { icon: Users, label: 'Find People', color: 'bg-blue-600', path: '/messages' },
    { icon: Music, label: 'Vibe Check', color: 'bg-purple-600', path: '/events' },
    { icon: Trophy, label: 'Leaderboard', color: 'bg-yellow-600', path: '/profile' }
  ];

  const vibeFilters = [
    { id: 'all', label: 'All', emoji: '🌟' },
    { id: 'hot', label: 'Hot', emoji: '🔥' },
    { id: 'chill', label: 'Chill', emoji: '🌙' },
    { id: 'party', label: 'Party', emoji: '🎉' },
    { id: 'study', label: 'Study', emoji: '📚' },
    { id: 'friends', label: 'Friends', emoji: '👥' },
    { id: 'vip', label: 'VIP', emoji: '⭐' }
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

  const getHostBadgeColor = (badge: string) => {
    switch (badge) {
      case 'golden-flame': return 'text-yellow-500';
      case 'event-master': return 'text-purple-500';
      case 'community-builder': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
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
        {/* Tonight's Vibe Banner */}
        <Card className={`p-6 ${tonightsVibes[trendingIndex].background} border-red-600/30 relative overflow-hidden`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">Tonight's Vibe</h2>
              <p className="text-2xl font-bold">{tonightsVibes[trendingIndex].title}</p>
              <p className="text-red-400">{tonightsVibes[trendingIndex].vibe}</p>
              <p className="text-sm text-gray-400">{tonightsVibes[trendingIndex].attendees} people vibing</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setTrendingIndex((prev) => (prev - 1 + tonightsVibes.length) % tonightsVibes.length)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setTrendingIndex((prev) => (prev + 1) % tonightsVibes.length)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-600">LIVE</Badge>
          </div>
        </Card>

        {/* Social Energy Map */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-red-600/20 p-4 border border-purple-600/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center mb-2">
                <Navigation className="w-5 h-5 mr-2 text-purple-400" />
                Social Energy Map
              </h3>
              <p className="text-sm text-gray-300">Rooftop 300m away is vibing right now 🔥</p>
              <p className="text-xs text-gray-400">High energy cluster • 45 people • Live music</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center mb-2">
                <Navigation className="w-8 h-8 text-purple-400" />
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Navigate
              </Button>
            </div>
          </div>
        </Card>

        {/* Social Goals */}
        <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-4 border border-green-600/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-green-500" />
                Social Goals
              </h3>
              <p className="text-sm text-gray-300">Meet 5 new people this week</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full w-3/5"></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">3/5 completed • 2 more to go!</p>
            </div>
            <Badge className="bg-green-600">3/5</Badge>
          </div>
        </Card>

        {/* Vibe Forecast */}
        <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold">Vibe Forecast</span>
          </div>
          <div className="text-sm text-gray-400 space-y-1">
            <p>🔥 Biggest party in 2 hours</p>
            <p>🌙 3 chill sessions happening now</p>
            <p>⚡ 2 new exclusive events just dropped</p>
          </div>
        </div>

        {/* Search & Voice Input */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Find something mellow near me..." 
              className="pl-10 pr-12 bg-secondary border-0 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button size="sm" variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Mic className="w-4 h-4" />
            </Button>
          </div>

          {/* Smart Vibe Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {vibeFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedFilter === filter.id 
                    ? 'bg-red-600 hover:bg-red-700 pulse-glow' 
                    : 'border-red-600/30 hover:border-red-600 hover:bg-red-600/10'
                }`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                <span className="mr-1">{filter.emoji}</span>
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Now Happening Ticker */}
        <div className="bg-gradient-to-r from-red-600/20 to-transparent p-3 rounded-xl border border-red-600/30">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Now Happening:</span>
            <span className="text-sm text-gray-300 animate-pulse">Sarah just checked into Rooftop Chill • 23 people vibing • New gaming tournament starting!</span>
          </div>
        </div>

        {/* Daily Challenge */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-red-600/20 p-4 border border-purple-600/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                Daily Challenge
              </h3>
              <p className="text-sm text-gray-300">Attend 2 events this week and unlock Secret Sunset Invite</p>
            </div>
            <Badge className="bg-yellow-600">1/2</Badge>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path}>
              <Card className="p-3 text-center hover:scale-105 transition-all cursor-pointer hover-scale">
                <div className={`w-8 h-8 ${action.color} rounded-full flex items-center justify-center mx-auto mb-2 pulse-glow`}>
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
            <Card key={event.id} className={`event-card relative overflow-hidden ${event.liveFeed ? 'red-glow animate-pulse' : ''}`}>
              {/* Live Badge */}
              {event.liveFeed && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-red-600 animate-pulse">LIVE</Badge>
                </div>
              )}

              {/* Live Stats Banner */}
              {event.liveStats && (
                <div className="bg-red-600/10 border-b border-red-600/30 p-2 text-center">
                  <span className="text-xs text-red-400 animate-pulse">{event.liveStats}</span>
                </div>
              )}

              <div className="space-y-4 p-6">
                {/* Event Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{event.host[1].toUpperCase()}</span>
                      </div>
                      {/* Host Badge */}
                      {event.hostBadge && (
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${getHostBadgeColor(event.hostBadge)}`}>
                          <Flame className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{event.host}</p>
                      <p className="text-sm text-gray-400">{event.date} • {event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {event.isVip && <Badge className="bg-red-600">VIP</Badge>}
                    <Button size="sm" variant="ghost" className="hover:text-red-400">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Event Content */}
                <div>
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-300 mb-3">{event.description}</p>
                  
                  {/* Vibe Forecast */}
                  <div className="bg-secondary/30 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-400 mb-1">Vibe Forecast</p>
                    <p className="text-sm text-gray-300">{event.vibePreview}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </span>
                    <span className="flex items-center">
                      <Navigation className="w-4 h-4 mr-1" />
                      {event.distance}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees}/{event.maxAttendees}
                    </span>
                    <span className="flex items-center">
                      <Timer className="w-4 h-4 mr-1 text-yellow-500" />
                      {event.countdownHours}h {event.countdownMinutes}m
                    </span>
                  </div>

                  {/* Friends Going */}
                  {event.friendsGoing.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-400 mb-2">Friends going:</p>
                      <div className="flex space-x-1">
                        {event.friendsGoing.map((friend, index) => (
                          <div key={index} className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs">
                            {friend[1].toUpperCase()}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Music Player Preview */}
                  <div className="bg-secondary/30 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <Play className="w-4 h-4" />
                        </Button>
                        <div>
                          <p className="text-sm font-medium">{event.currentSong}</p>
                          <p className="text-xs text-gray-400">{event.playlist}</p>
                        </div>
                      </div>
                      <Volume2 className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Recent Joiners */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-2">Recently joined:</p>
                    <div className="flex -space-x-2">
                      {event.recentJoiners.slice(0, 5).map((joiner, index) => (
                        <div 
                          key={index} 
                          className="w-8 h-8 bg-green-600 rounded-full border-2 border-black flex items-center justify-center text-xs font-medium"
                          title={`${joiner} joined 2 hours ago`}
                        >
                          {joiner[1].toUpperCase()}
                        </div>
                      ))}
                      {event.recentJoiners.length > 5 && (
                        <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-black flex items-center justify-center text-xs">
                          +{event.recentJoiners.length - 5}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map((tag, index) => (
                      <Button 
                        key={index} 
                        size="sm" 
                        variant="ghost"
                        className="text-xs bg-secondary px-2 py-1 rounded-full text-red-400 hover:bg-red-600/20"
                      >
                        {tag}
                      </Button>
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

                  {/* Contributions with Progress */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Still needed:</p>
                    <div className="space-y-2">
                      {event.contributions.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-secondary/30 rounded-lg p-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{item.item}</span>
                            <div className="w-16 bg-gray-700 rounded-full h-1">
                              <div 
                                className="bg-red-600 h-1 rounded-full transition-all"
                                style={{ width: `${(item.claimed / item.needed) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{item.claimed}/{item.needed}</span>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs border-red-600/30 hover:bg-red-600/20">
                            Claim
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    {/* Surprise Me Option */}
                    <Button className="w-full mt-2 bg-purple-600/20 border border-purple-600/30 text-purple-400 hover:bg-purple-600/30">
                      <Gift className="w-4 h-4 mr-2" />
                      Surprise Me! ({event.surpriseRole})
                    </Button>
                  </div>

                  {/* Social Incentive Banner */}
                  {event.socialIncentive && (
                    <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <UserPlus className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">{event.socialIncentive}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <Button size="sm" variant="ghost" className="flex items-center space-x-1 hover:text-red-400">
                        <Heart className="w-4 h-4" />
                        <span>{Math.floor(Math.random() * 20) + 5}</span>
                      </Button>
                      <Button size="sm" variant="ghost" className="flex items-center space-x-1 hover:text-blue-400">
                        <MessageCircle className="w-4 h-4" />
                        <span>{Math.floor(Math.random() * 10) + 2}</span>
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:text-green-400">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:text-purple-400">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 pulse-glow">
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
          <Button variant="outline" className="border-red-600/30 hover:border-red-600 hover:bg-red-600/10">
            Load more vibes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
