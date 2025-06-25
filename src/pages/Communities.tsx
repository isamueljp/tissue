
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Search, Plus, Crown, MessageCircle, 
  Calendar, TrendingUp, MapPin, Hash, Star,
  Coffee, Music, Gamepad2, BookOpen, Dumbbell
} from 'lucide-react';

const Communities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');

  const communities = [
    {
      id: '1',
      name: 'NYU Rooftop Vibes',
      description: 'Sunset sessions, chill music, and great company',
      members: 234,
      category: 'Music',
      icon: '🏢',
      isJoined: true,
      lastActivity: '2m ago',
      trending: true,
      events: 12
    },
    {
      id: '2', 
      name: 'Gaming Legends',
      description: 'Competitive gaming, tournaments, and late-night sessions',
      members: 189,
      category: 'Gaming',
      icon: '🎮',
      isJoined: false,
      lastActivity: '15m ago',
      trending: false,
      events: 8
    },
    {
      id: '3',
      name: 'Coffee & Study Buddies',
      description: 'Study groups, café meetups, and productivity sessions',
      members: 156,
      category: 'Study',
      icon: '☕',
      isJoined: true,
      lastActivity: '1h ago',
      trending: false,
      events: 5
    },
    {
      id: '4',
      name: 'Dance Floor Dominators',
      description: 'Party nights, dance battles, and epic celebrations',
      members: 278,
      category: 'Party',
      icon: '💃',
      isJoined: false,
      lastActivity: '5m ago',
      trending: true,
      events: 15
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: Hash },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'food', label: 'Food', icon: Coffee }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Communities</h1>
            <p className="text-gray-400">Find your tribe and vibe with like-minded people</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Community
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search communities..." 
            className="pl-10 bg-secondary border-0 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="joined">My Communities</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-4">
            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap border-red-600/30 hover:border-red-600 hover:bg-red-600/10"
                >
                  <category.icon className="w-4 h-4 mr-1" />
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Communities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((community) => (
                <Card key={community.id} className="bg-card border border-border p-4 hover:border-red-600/40 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{community.icon}</div>
                      <div>
                        <h3 className="font-semibold flex items-center">
                          {community.name}
                          {community.trending && <TrendingUp className="w-4 h-4 ml-2 text-yellow-500" />}
                        </h3>
                        <p className="text-sm text-gray-400">{community.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {community.members}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {community.events} events
                      </span>
                    </div>
                    <span>{community.lastActivity}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      className={`flex-1 ${community.isJoined ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                      size="sm"
                    >
                      {community.isJoined ? 'Joined' : 'Join Community'}
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-600/30">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="joined">
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your Communities</h3>
              <p className="text-gray-400">Communities you've joined will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="space-y-4">
              {communities.filter(c => c.trending).map((community) => (
                <Card key={community.id} className="bg-card border border-red-600/30 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{community.icon}</div>
                      <div>
                        <h3 className="font-semibold flex items-center">
                          {community.name}
                          <Badge className="ml-2 bg-red-600">Trending</Badge>
                        </h3>
                        <p className="text-sm text-gray-400">{community.members} members</p>
                      </div>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700" size="sm">
                      Join
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Communities;
