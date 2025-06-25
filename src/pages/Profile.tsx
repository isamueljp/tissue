
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Settings, Share, Trophy, Camera, Heart, 
  MessageCircle, Users, Star, Gift, Zap, Crown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UPIPayment from '@/components/UPIPayment';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPayment, setShowPayment] = useState(false);
  const { user } = useAuth();

  const socialRoles = {
    connector: {
      emoji: '🔗',
      name: 'The Connector',
      description: 'Master of bringing people together',
      color: 'bg-blue-600',
      achievements: ['Connected 50+ people', 'Created 5 group chats', 'Hosted intro events'],
      nextLevel: 'Connect 100 people to unlock Social Butterfly'
    },
    curator: {
      emoji: '🎨',
      name: 'The Curator',
      description: 'Tastemaker of vibes and aesthetics',
      color: 'bg-purple-600',
      achievements: ['Top playlist creator', 'Event theme designer', 'Aesthetic guru'],
      nextLevel: 'Create 10 viral playlists to unlock Vibe Master'
    },
    host: {
      emoji: '🏠',
      name: 'The Host',
      description: 'Event launching extraordinaire',
      color: 'bg-green-600',
      achievements: ['Hosted 15 events', '5-star host rating', 'Party legend'],
      nextLevel: 'Host 25 events to unlock Event Royalty'
    },
    giver: {
      emoji: '💝',
      name: 'The Giver',
      description: 'Community support champion',
      color: 'bg-yellow-600',
      achievements: ['Contributed to 30 events', 'Helped 20 people', 'Generosity king/queen'],
      nextLevel: 'Contribute to 50 events to unlock Guardian Angel'
    }
  };

  const currentRole = socialRoles[user?.socialRole as keyof typeof socialRoles] || socialRoles.connector;

  const handlePaymentSuccess = (transactionId: string) => {
    console.log('Payment successful:', transactionId);
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <UPIPayment
          amount={99}
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={() => setShowPayment(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header - Gen Z Style */}
      <Card className="bg-gradient-to-br from-primary/20 to-purple-600/20 p-6 border-primary/30">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="absolute -bottom-2 -right-2 text-2xl">
              {currentRole.emoji}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-muted-foreground mb-2">{user?.username}</p>
            
            <Badge className={`${currentRole.color} text-white mb-3`}>
              {currentRole.emoji} {currentRole.name}
            </Badge>
            
            <p className="text-sm text-muted-foreground mb-4">{currentRole.description}</p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2.8K</div>
                <div className="text-xs text-muted-foreground">Vibe Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">23</div>
                <div className="text-xs text-muted-foreground">Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">156</div>
                <div className="text-xs text-muted-foreground">Connections</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button className="bg-primary hover:bg-primary/90">
              <Share className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </Card>

      {/* Role Progress */}
      <Card className="p-6">
        <h3 className="font-bold mb-4 flex items-center">
          <Crown className="w-5 h-5 text-yellow-500 mr-2" />
          Role Progress
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Level Progress</span>
              <span className="text-sm text-muted-foreground">Level 5</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div className="bg-gradient-to-r from-primary to-purple-600 h-3 rounded-full w-3/4"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{currentRole.nextLevel}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentRole.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-secondary/50 rounded-lg">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="overview">Vibes</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-bold mb-4">Recent Vibes</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  🎉
                </div>
                <div>
                  <p className="font-medium">Hosted "Rooftop Chill Session"</p>
                  <p className="text-sm text-muted-foreground">2 hours ago • 34 people joined</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  🎵
                </div>
                <div>
                  <p className="font-medium">Created "Late Night Vibes" playlist</p>
                  <p className="text-sm text-muted-foreground">Yesterday • 156 likes</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-bold mb-4">Your Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-secondary/30 rounded-xl">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-semibold text-sm">Event Master</h4>
                <p className="text-xs text-muted-foreground">Hosted 10+ events</p>
              </div>
              <div className="text-center p-4 bg-secondary/30 rounded-xl">
                <div className="text-3xl mb-2">🔥</div>
                <h4 className="font-semibold text-sm">Vibe Creator</h4>
                <p className="text-xs text-muted-foreground">Created viral moments</p>
              </div>
              <div className="text-center p-4 bg-secondary/30 rounded-xl">
                <div className="text-3xl mb-2">💎</div>
                <h4 className="font-semibold text-sm">Community Gem</h4>
                <p className="text-xs text-muted-foreground">Loved by everyone</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-bold mb-4">Payment Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">₹</span>
                  </div>
                  <div>
                    <p className="font-medium">UPI Payment</p>
                    <p className="text-sm text-muted-foreground">Pay with any UPI app</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowPayment(true)}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Add UPI
                </Button>
              </div>
              
              <div className="p-4 bg-green-600/10 rounded-lg border border-green-600/30">
                <h4 className="font-medium text-green-600 mb-2">Premium Features</h4>
                <ul className="text-sm space-y-1">
                  <li>• Unlimited event hosting</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                  <li>• Custom themes</li>
                </ul>
                <Button 
                  onClick={() => setShowPayment(true)}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700"
                >
                  Upgrade to Premium - ₹99/month
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
