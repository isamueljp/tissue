
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, MapPin, Users, Heart, MessageCircle, Share, 
  Zap, Music, Trophy, Gift, Sparkles, Play, Volume2,
  ChevronLeft, ChevronRight, Navigation, Flame, Star,
  Eye, Clock, UserPlus
} from 'lucide-react';

const Index = () => {
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [streakCount, setStreakCount] = useState(7);

  // Stories data
  const stories = [
    { id: '1', user: 'sarah_vibe', image: '/api/placeholder/60/60', hasUpdate: true, isLive: true },
    { id: '2', user: 'alex_games', image: '/api/placeholder/60/60', hasUpdate: true, isLive: false },
    { id: '3', user: 'music_maven', image: '/api/placeholder/60/60', hasUpdate: false, isLive: true },
    { id: '4', user: 'night_owl', image: '/api/placeholder/60/60', hasUpdate: true, isLive: false },
    { id: '5', user: 'coffee_crew', image: '/api/placeholder/60/60', hasUpdate: false, isLive: false },
  ];

  const tonightsVibes = [
    {
      title: "Rooftop Chill Session",
      vibe: "🌅 Sunset Vibes",
      background: "bg-gradient-to-r from-orange-500/20 to-red-500/20",
      attendees: 34,
      spotsLeft: 6
    },
    {
      title: "Secret Gaming Tournament", 
      vibe: "🎮 Competitive Energy",
      background: "bg-gradient-to-r from-purple-500/20 to-blue-500/20",
      attendees: 28,
      spotsLeft: 2
    },
    {
      title: "Study + Vibe Session",
      vibe: "✨ Productive Chill",
      background: "bg-gradient-to-r from-green-500/20 to-teal-500/20", 
      attendees: 19,
      spotsLeft: 12
    }
  ];

  const events = [
    {
      id: '1',
      title: 'Rooftop Chill Session',
      host: '@sarah_vibe',
      hostAvatar: '/api/placeholder/40/40',
      description: 'Sunset vibes with good music and even better people 🌅✨',
      time: '6:00 PM',
      date: 'Tonight',
      location: 'North Block Rooftop',
      attendees: 23,
      maxAttendees: 35,
      tags: ['#chill', '#rooftop', '#sunset'],
      liveFeed: true,
      spotsLeft: 12,
      friendsGoing: ['Alex', 'Maya', 'Jordan'],
      hypeLevel: 85,
      image: '/api/placeholder/400/200'
    },
    {
      id: '2',
      title: 'Secret Gaming Tournament',
      host: '@alex_games',
      hostAvatar: '/api/placeholder/40/40',
      description: 'Invite only. Password: LEGEND 🎮🔥',
      time: '8:00 PM',
      date: 'Tomorrow',
      location: 'Underground Lounge',
      attendees: 12,
      maxAttendees: 16,
      tags: ['#gaming', '#secret', '#tournament'],
      liveFeed: false,
      spotsLeft: 4,
      friendsGoing: ['Sam', 'Riley'],
      hypeLevel: 92,
      image: '/api/placeholder/400/200'
    }
  ];

  const handleLike = (eventId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingIndex((prev) => (prev + 1) % tonightsVibes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Header with Streak */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-red-600">tissue</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Streak Counter */}
            <div className="flex items-center space-x-1 bg-red-600/20 px-2 py-1 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold">{streakCount}</span>
            </div>
            
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
        {/* Stories Section */}
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0 relative">
              <div className={`w-16 h-16 rounded-full p-0.5 ${story.hasUpdate ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gray-600'}`}>
                <div className="w-full h-full bg-black rounded-full p-0.5">
                  <img src={story.image} alt={story.user} className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              {story.isLive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-600 text-xs px-1 py-0">LIVE</Badge>
                </div>
              )}
              <p className="text-xs text-center mt-1 truncate w-16">{story.user.split('_')[0]}</p>
            </div>
          ))}
        </div>

        {/* Trending Now Banner */}
        <Card className={`p-4 ${tonightsVibes[trendingIndex].background} border-red-600/30 relative overflow-hidden`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold text-orange-500">TRENDING NOW</span>
              </div>
              <h2 className="font-bold text-lg">{tonightsVibes[trendingIndex].title}</h2>
              <p className="text-red-400 text-sm">{tonightsVibes[trendingIndex].vibe}</p>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-xs text-gray-400">{tonightsVibes[trendingIndex].attendees} vibing</span>
                <span className="text-xs text-orange-400 font-bold">Only {tonightsVibes[trendingIndex].spotsLeft} spots left! 🔥</span>
              </div>
            </div>
            <Badge className="bg-red-600 text-xs">LIVE</Badge>
          </div>
        </Card>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            placeholder="What's the vibe?" 
            className="pl-12 bg-secondary/50 border-0 rounded-full text-lg py-3"
          />
        </div>

        {/* Event Feed */}
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="bg-card border border-border hover:border-red-600/30 transition-all overflow-hidden">
              {/* Event Image */}
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {event.liveFeed && <Badge className="bg-red-600 text-xs">LIVE</Badge>}
                  <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span className="text-xs">{event.attendees} watching</span>
                  </div>
                </div>
                
                {/* Hype Meter */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span className="text-xs font-bold">{event.hypeLevel}%</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Post Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={event.hostAvatar} alt={event.host} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold text-sm">{event.host}</p>
                      <p className="text-xs text-gray-400">{event.date} • {event.time}</p>
                    </div>
                  </div>
                </div>

                {/* Event Content */}
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

                  {/* FOMO Elements */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2 text-xs">
                      <Clock className="w-3 h-3 text-orange-500" />
                      <span className="text-orange-400 font-bold">Only {event.spotsLeft} spots left!</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs">
                      <UserPlus className="w-3 h-3 text-blue-500" />
                      <span className="text-blue-400">
                        {event.friendsGoing.slice(0, 2).join(', ')} 
                        {event.friendsGoing.length > 2 && ` and ${event.friendsGoing.length - 2} others`} are going
                      </span>
                    </div>
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

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center space-x-6">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className={`flex items-center space-x-1 p-2 ${
                        likedPosts.has(event.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                      }`}
                      onClick={() => handleLike(event.id)}
                    >
                      <Heart className={`w-4 h-4 ${likedPosts.has(event.id) ? 'fill-current' : ''}`} />
                      <span className="text-xs">{Math.floor(Math.random() * 20) + 5 + (likedPosts.has(event.id) ? 1 : 0)}</span>
                    </Button>
                    <Button size="sm" variant="ghost" className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 p-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{Math.floor(Math.random() * 10) + 2}</span>
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-400 p-2">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button size="sm" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-xs px-4 py-2 rounded-full">
                    🔥 Catch the Vibe
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-4">
          <Button variant="outline" className="border-red-600/30 hover:border-red-600 text-sm">
            Load more vibes 🔥
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
