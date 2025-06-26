
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Filter, MapPin, Clock, Users, 
  Star, TrendingUp, Users as UsersIcon, Music, Camera, Heart,
  MessageCircle, Share, Trophy, Gift, Sparkles,
  Bookmark, Timer, Navigation, Volume2, Play,
  UserPlus, Flame, Eye, ChevronLeft, ChevronRight,
  Mic, Video, Zap, Home, MessageSquare, User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingIndex, setTrendingIndex] = useState(0);
  const { user } = useAuth();

  // Auto-rotate trending events
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingIndex((prev) => (prev + 1) % tonightsVibes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  const getSocialRoleBadge = (role: string) => {
    const roles = {
      connector: { emoji: '🔗', name: 'The Connector', color: 'bg-blue-600' },
      curator: { emoji: '🎨', name: 'The Curator', color: 'bg-purple-600' },
      host: { emoji: '🏠', name: 'The Host', color: 'bg-green-600' },
      giver: { emoji: '💝', name: 'The Giver', color: 'bg-yellow-600' }
    };
    return roles[role as keyof typeof roles] || roles.connector;
  };

  const userRole = getSocialRoleBadge(user?.socialRole || 'connector');

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized header */}
      <div className="lg:hidden sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UsersIcon className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-bold text-primary">commons</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="relative">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Sparkles className="w-4 h-4 mr-2" />
              Create
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Welcome Card with Social Role */}
        <Card className="bg-gradient-to-r from-primary/20 to-purple-600/20 p-6 border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-2">Welcome back, {user?.name}!</h2>
              <Badge className={`${userRole.color} text-white`}>
                {userRole.emoji} {userRole.name}
              </Badge>
            </div>
            <div className="text-4xl">{userRole.emoji}</div>
          </div>
        </Card>

        {/* Tonight's Vibe Banner */}
        <Card className={`p-6 ${tonightsVibes[trendingIndex].background} border-red-600/30 relative overflow-hidden`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">Tonight's Vibe</h2>
              <p className="text-2xl font-bold">{tonightsVibes[trendingIndex].title}</p>
              <p className="text-red-400">{tonightsVibes[trendingIndex].vibe}</p>
              <p className="text-sm text-muted-foreground">{tonightsVibes[trendingIndex].attendees} people vibing</p>
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

        {/* Quick Actions - Mobile Optimized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/events">
            <Card className="p-4 text-center hover:scale-105 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium">Host Event</p>
            </Card>
          </Link>
          <Link to="/messages">
            <Card className="p-4 text-center hover:scale-105 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium">Find People</p>
            </Card>
          </Link>
          <Link to="/music">
            <Card className="p-4 text-center hover:scale-105 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Music className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium">Vibe Check</p>
            </Card>
          </Link>
          <Link to="/profile">
            <Card className="p-4 text-center hover:scale-105 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium">Leaderboard</p>
            </Card>
          </Link>
        </div>

        {/* Social Energy Map */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-red-600/20 p-4 border border-purple-600/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center mb-2">
                <Navigation className="w-5 h-5 mr-2 text-purple-400" />
                Social Energy Map
              </h3>
              <p className="text-sm">Rooftop 300m away is vibing right now 🔥</p>
              <p className="text-xs text-muted-foreground">High energy cluster • 45 people • Live music</p>
            </div>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Navigate
            </Button>
          </div>
        </Card>

        {/* Role-based Personalized Content */}
        {user?.socialRole === 'connector' && (
          <Card className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-4 border border-blue-600/30">
            <h3 className="font-semibold mb-2">🔗 Connector Mission</h3>
            <p className="text-sm mb-3">Help 3 more people find their tribe this week</p>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">2/3 completed</p>
          </Card>
        )}

        {/* Live Activity Feed */}
        <div className="bg-gradient-to-r from-red-600/10 to-transparent p-3 rounded-xl border border-red-600/30">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live Activity:</span>
            <span className="text-sm text-muted-foreground animate-pulse">Sarah just checked into Rooftop Chill • 23 people vibing</span>
          </div>
        </div>

        {/* Search - Mobile First */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
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

        {/* Vibe Filters - Horizontal Scroll */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All', emoji: '🌟' },
            { id: 'hot', label: 'Hot', emoji: '🔥' },
            { id: 'chill', label: 'Chill', emoji: '🌙' },
            { id: 'party', label: 'Party', emoji: '🎉' },
            { id: 'study', label: 'Study', emoji: '📚' },
          ].map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                selectedFilter === filter.id 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'border-red-600/30 hover:border-red-600 hover:bg-red-600/10'
              }`}
              onClick={() => setSelectedFilter(filter.id)}
            >
              <span className="mr-1">{filter.emoji}</span>
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Featured Event Cards - Mobile Optimized */}
        <div className="space-y-4">
          <Card className="event-card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold">@sarah_vibe</p>
                  <p className="text-sm text-muted-foreground">Tonight • 6:00 PM</p>
                </div>
              </div>
              <Badge className="bg-red-600">LIVE</Badge>
            </div>
            
            <h3 className="text-lg font-bold mb-2">Rooftop Chill Session</h3>
            <p className="text-muted-foreground mb-3">Sunset vibes with good music and even better people 🌅</p>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                North Block Rooftop
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                23/35
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                Join Event
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2">
        <div className="flex justify-around">
          <Link to="/" className="flex flex-col items-center p-2 text-primary">
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/events" className="flex flex-col items-center p-2 text-muted-foreground">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs mt-1">Events</span>
          </Link>
          <Link to="/messages" className="flex flex-col items-center p-2 text-muted-foreground">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs mt-1">Messages</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-2 text-muted-foreground">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
