
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, TrendingUp, Users, QrCode, Calendar, Trophy, 
  Instagram, Twitter, Music, MapPin, Star, Gift, Zap,
  Camera, Heart, MessageCircle, Share, ExternalLink
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const socialLinks = [
    { platform: 'Instagram', handle: '@john.vibes', icon: Instagram, color: 'text-pink-500' },
    { platform: 'Twitter', handle: '@johnvibes', icon: Twitter, color: 'text-blue-500' },
    { platform: 'Spotify', handle: 'John\'s Playlists', icon: Music, color: 'text-green-500' }
  ];

  const badges = [
    { name: 'Party Wizard', icon: '🧙‍♂️', description: '10 successful events hosted' },
    { name: 'Community Builder', icon: '🏗️', description: 'Brought 50+ people together' },
    { name: 'Vibe Curator', icon: '🎵', description: 'Top-rated playlist creator' },
    { name: 'Snack God', icon: '🍕', description: 'Always brings the best food' }
  ];

  const recentMemories = [
    {
      event: 'Rooftop Chill Session',
      date: 'Last Friday',
      photos: 12,
      likes: 45,
      people: ['@sarah', '@mike', '@anna']
    },
    {
      event: 'Gaming Tournament',
      date: '2 weeks ago',
      photos: 8,
      likes: 32,
      people: ['@alex', '@priya', '@sam']
    }
  ];

  const investments = [
    { event: 'VIP Pool Party', invested: 250, returns: 312, roi: '+24.8%', status: 'completed' },
    { event: 'Secret Concert', invested: 150, returns: 0, roi: 'Pending', status: 'active' },
    { event: 'Beach Cleanup + Party', invested: 100, returns: 125, roi: '+25%', status: 'completed' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="twitter-card p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
              <span className="text-xs">🔥</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white">John Doe</h1>
            <p className="text-gray-400 mb-2">@johndoe • Senior at NYU</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <Badge className="badge-glow">Level 8 Host</Badge>
              <Badge variant="outline" className="border-red-600 text-red-600">VIP Member</Badge>
              <Badge variant="outline" className="border-yellow-500 text-yellow-500">15-day Streak 🔥</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="profile-stat">
                <div className="text-2xl font-bold text-red-500">2,847</div>
                <div className="text-xs text-gray-400">Total Points</div>
              </div>
              <div className="profile-stat">
                <div className="text-2xl font-bold text-blue-500">23</div>
                <div className="text-xs text-gray-400">Events Hosted</div>
              </div>
              <div className="profile-stat">
                <div className="text-2xl font-bold text-green-500">156</div>
                <div className="text-xs text-gray-400">Events Joined</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
              {socialLinks.map((social, index) => (
                <Button key={index} variant="outline" size="sm" className="border-gray-600">
                  <social.icon className={`w-4 h-4 mr-2 ${social.color}`} />
                  {social.handle}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button className="bg-red-600 hover:bg-red-700">
              <QrCode className="w-4 h-4 mr-2" />
              My QR Code
            </Button>
            <Button variant="outline" className="border-red-600 text-red-600">
              Share Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Badges */}
      <Card className="twitter-card p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
          Achievement Badges
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <div key={index} className="text-center p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-all">
              <div className="text-3xl mb-2">{badge.icon}</div>
              <h3 className="font-semibold text-sm">{badge.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{badge.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="memories">Memories</TabsTrigger>
          <TabsTrigger value="qr">QR & Check-in</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Activity */}
          <Card className="twitter-card p-6">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium">Earned "Party Wizard" badge</p>
                  <p className="text-sm text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium">Hosted "Rooftop Chill Session"</p>
                  <p className="text-sm text-gray-400">Yesterday</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          <Card className="twitter-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <DollarSign className="w-5 h-5 text-green-500 mr-2" />
              Investment Portfolio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="profile-stat">
                <div className="text-2xl font-bold text-green-500">$687</div>
                <div className="text-xs text-gray-400">Total Returns</div>
              </div>
              <div className="profile-stat">
                <div className="text-2xl font-bold text-blue-500">$500</div>
                <div className="text-xs text-gray-400">Invested</div>
              </div>
              <div className="profile-stat">
                <div className="text-2xl font-bold text-yellow-500">+37.4%</div>
                <div className="text-xs text-gray-400">Average ROI</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {investments.map((investment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-semibold">{investment.event}</p>
                    <p className="text-sm text-gray-400">Invested: ${investment.invested}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {investment.returns > 0 ? `$${investment.returns}` : 'Pending'}
                    </p>
                    <p className={`text-sm ${investment.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {investment.roi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="memories" className="space-y-6">
          <Card className="twitter-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Camera className="w-5 h-5 text-purple-500 mr-2" />
              Event Memories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentMemories.map((memory, index) => (
                <div key={index} className="memory-card">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{memory.event}</h4>
                    <span className="text-sm text-gray-400">{memory.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>{memory.photos} photos</span>
                    <span>{memory.likes} likes</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    {memory.people.map((person, i) => (
                      <span key={i} className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full">
                        {person}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-1" />
                      Like
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="qr" className="space-y-6">
          <Card className="twitter-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <QrCode className="w-5 h-5 text-blue-500 mr-2" />
              Check-in QR Code
            </h3>
            <div className="text-center">
              <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-black" />
              </div>
              <p className="text-gray-400 mb-4">
                Show this QR code to event hosts for quick check-in
              </p>
              <div className="flex space-x-2 justify-center">
                <Button variant="outline">Save to Photos</Button>
                <Button className="bg-red-600 hover:bg-red-700">Share QR</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
