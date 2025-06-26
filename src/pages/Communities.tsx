
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Search, Plus, Crown, MessageCircle, Calendar, 
  TrendingUp, MapPin, Hash, Star, Coffee, Music, Gamepad2, 
  BookOpen, Dumbbell, Heart, Share, Eye, Settings, UserPlus
} from 'lucide-react';

const Communities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
      events: 12,
      posts: 45,
      badges: ['Popular', 'Active'],
      moderators: ['@sarah_vibe', '@music_mike'],
      recentPosts: [
        { user: '@alex', content: 'Tonight\'s sunset session was amazing!', time: '5m ago' },
        { user: '@maya', content: 'Who has the speaker for tomorrow?', time: '1h ago' }
      ]
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
      events: 8,
      posts: 78,
      badges: ['Competitive'],
      moderators: ['@game_master'],
      recentPosts: [
        { user: '@gamer1', content: 'New tournament starting this weekend!', time: '30m ago' }
      ]
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
      events: 5,
      posts: 34,
      badges: ['Study Focus'],
      moderators: ['@study_guru'],
      recentPosts: [
        { user: '@bookworm', content: 'Library group study tomorrow at 2 PM', time: '2h ago' }
      ]
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
      events: 15,
      posts: 89,
      badges: ['Party Central', 'Weekend Warriors'],
      moderators: ['@party_planner', '@dj_supreme'],
      recentPosts: [
        { user: '@dancer', content: 'Epic party last night! Thanks everyone!', time: '10m ago' },
        { user: '@partygoer', content: 'When\'s the next dance battle?', time: '45m ago' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: Hash, count: communities.length },
    { id: 'music', label: 'Music', icon: Music, count: 1 },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2, count: 1 },
    { id: 'study', label: 'Study', icon: BookOpen, count: 1 },
    { id: 'party', label: 'Party', icon: Users, count: 1 },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell, count: 0 },
    { id: 'food', label: 'Food', icon: Coffee, count: 0 }
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           community.category.toLowerCase() === selectedCategory;
    
    if (activeTab === 'joined') {
      return matchesSearch && matchesCategory && community.isJoined;
    }
    if (activeTab === 'trending') {
      return matchesSearch && matchesCategory && community.trending;
    }
    return matchesSearch && matchesCategory;
  });

  const joinCommunity = (communityId: string) => {
    // Handle join logic
    console.log(`Joining community ${communityId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
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
            <TabsTrigger value="joined">My Communities ({communities.filter(c => c.isJoined).length})</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={`whitespace-nowrap ${
                    selectedCategory === category.id 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'border-red-600/30 hover:border-red-600 hover:bg-red-600/10'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="w-4 h-4 mr-1" />
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>

            {/* Communities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCommunities.map((community) => (
                <Card key={community.id} className="bg-card border border-border hover:border-red-600/40 transition-all">
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{community.icon}</div>
                        <div>
                          <h3 className="font-semibold flex items-center space-x-2">
                            <span>{community.name}</span>
                            {community.trending && <TrendingUp className="w-4 h-4 text-yellow-500" />}
                          </h3>
                          <p className="text-sm text-gray-400">{community.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {community.badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-red-600/30">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-3 border-y border-border">
                      <div className="text-center">
                        <div className="font-bold text-lg">{community.members}</div>
                        <div className="text-xs text-gray-400">Members</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">{community.events}</div>
                        <div className="text-xs text-gray-400">Events</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">{community.posts}</div>
                        <div className="text-xs text-gray-400">Posts</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Recent Posts
                      </h4>
                      <div className="space-y-2">
                        {community.recentPosts.slice(0, 2).map((post, index) => (
                          <div key={index} className="bg-secondary/30 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-xs">
                                {post.user[1].toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm font-medium">{post.user}</span>
                                  <span className="text-xs text-gray-400">{post.time}</span>
                                </div>
                                <p className="text-sm text-gray-300">{post.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Moderators */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Crown className="w-4 h-4 mr-1 text-yellow-500" />
                        Moderators
                      </h4>
                      <div className="flex space-x-2">
                        {community.moderators.map((mod, index) => (
                          <div key={index} className="flex items-center space-x-1 bg-secondary/30 rounded-full px-2 py-1">
                            <div className="w-5 h-5 bg-yellow-600 rounded-full flex items-center justify-center text-xs">
                              {mod[1].toUpperCase()}
                            </div>
                            <span className="text-xs">{mod}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-3">
                        <Button size="sm" variant="ghost" className="flex items-center space-x-1 hover:text-red-400">
                          <Heart className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 50) + 20}</span>
                        </Button>
                        <Button size="sm" variant="ghost" className="flex items-center space-x-1 hover:text-blue-400">
                          <Eye className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 100) + 50}</span>
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:text-green-400">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-red-600/30 hover:bg-red-600/20"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                        <Button 
                          size="sm"
                          className={`${community.isJoined ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                          onClick={() => joinCommunity(community.id)}
                        >
                          {community.isJoined ? (
                            <>
                              <Users className="w-4 h-4 mr-1" />
                              Joined
                            </>
                          ) : (
                            <>
                              <UserPlus className="w-4 h-4 mr-1" />
                              Join
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="joined" className="space-y-4">
            {filteredCommunities.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCommunities.map((community) => (
                  <Card key={community.id} className="bg-card border border-green-600/30 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{community.icon}</div>
                        <div>
                          <h3 className="font-semibold">{community.name}</h3>
                          <p className="text-sm text-gray-400">{community.members} members</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-green-600/30">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Badge className="bg-green-600">Joined</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Communities Yet</h3>
                <p className="text-gray-400 mb-4">Join some communities to see them here</p>
                <Button onClick={() => setActiveTab('discover')} className="bg-red-600 hover:bg-red-700">
                  Discover Communities
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <div className="space-y-4">
              {filteredCommunities.map((community, index) => (
                <Card key={community.id} className="bg-card border border-red-600/30 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-red-600">#{index + 1}</div>
                      <div className="text-2xl">{community.icon}</div>
                      <div>
                        <h3 className="font-semibold flex items-center space-x-2">
                          <span>{community.name}</span>
                          <Badge className="bg-red-600">Trending</Badge>
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{community.members} members</span>
                          <span>{community.events} events</span>
                          <span>Active {community.lastActivity}</span>
                        </div>
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
