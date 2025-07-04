
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  QrCode, Trophy, Camera, ExternalLink, User, Edit,
  Instagram, Music, MessageSquare
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { supabase } from '@/integrations/supabase/client';
import { PostCard } from '@/components/PostCard';
import { EditProfileModal } from '@/components/EditProfileModal';

interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  occupation: string | null;
  instagram_url: string | null;
  snapchat_url: string | null;
  music_url: string | null;
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { user } = useAuth();
  const { toggleLike } = usePosts();

  const fetchUserProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          ),
          likes!left (
            user_id
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const postsWithLikes = data?.map(post => ({
        ...post,
        user_has_liked: post.likes?.some((like: any) => like.user_id === user?.id) || false
      })) || [];

      setUserPosts(postsWithLikes);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
  }, [user]);

  const getInitials = (name: string | null) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || 'U';
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const getDisplayName = () => {
    return userProfile?.full_name || user?.email?.split('@')[0] || 'User';
  };

  const getUsername = () => {
    return userProfile?.username || user?.email || '@user';
  };

  const socialLinks = [
    { 
      platform: 'Instagram', 
      url: userProfile?.instagram_url, 
      icon: Instagram, 
      color: 'text-pink-500' 
    },
    { 
      platform: 'Snapchat', 
      url: userProfile?.snapchat_url, 
      icon: MessageSquare, 
      color: 'text-yellow-500' 
    },
    { 
      platform: 'Music', 
      url: userProfile?.music_url, 
      icon: Music, 
      color: 'text-green-500' 
    }
  ].filter(link => link.url);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center py-8">
          <div className="w-8 h-8 bg-[#00197e] rounded-full animate-pulse mb-4 mx-auto"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center py-8 space-y-4">
          <h2 className="text-2xl font-bold">Please Sign In</h2>
          <p className="text-gray-400">You need to sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="twitter-card p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userProfile?.avatar_url || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-[#00197e] to-[#00197e]/80 text-white text-2xl font-bold">
                {getInitials(userProfile?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
              <span className="text-xs">🔥</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white">{getDisplayName()}</h1>
            <p className="text-gray-400 mb-2">{getUsername()} • {userProfile?.occupation || 'Student'}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <Badge className="badge-glow">Level 1 Host</Badge>
              <Badge variant="outline" className="border-[#00197e] text-[#00197e]">New Member</Badge>
              <Badge variant="outline" className="border-yellow-500 text-yellow-500">1-day Streak 🔥</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="profile-stat">
                <div className="text-2xl font-bold text-[#00197e]">₹0</div>
                <div className="text-xs text-gray-400">Total Points</div>
              </div>
              <div className="profile-stat">
                <div className="text-2xl font-bold text-blue-500">0</div>
                <div className="text-xs text-gray-400">Events Hosted</div>
              </div>
              <div className="profile-stat">
                <div className="text-2xl font-bold text-green-500">{userPosts.length}</div>
                <div className="text-xs text-gray-400">Posts</div>
              </div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                {socialLinks.map((social, index) => (
                  <Button key={index} variant="outline" size="sm" className="border-gray-600" asChild>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <social.icon className={`w-4 h-4 mr-2 ${social.color}`} />
                      {social.platform}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button className="bg-[#00197e] hover:bg-[#00197e]/80">
              <QrCode className="w-4 h-4 mr-2" />
              My QR Code
            </Button>
            <Button variant="outline" className="border-[#00197e] text-[#00197e]">
              Share Profile
            </Button>
            <Button variant="outline" onClick={() => setEditModalOpen(true)} className="border-blue-600 text-blue-600">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-secondary">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="memories">Memories</TabsTrigger>
          <TabsTrigger value="qr">QR & Check-in</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <Card className="twitter-card p-6">
            <h3 className="text-lg font-bold mb-4">My Posts</h3>
            {userPosts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No posts yet. Create your first post to see it here!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map(post => (
                  <PostCard key={post.id} post={post} onLike={toggleLike} />
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <Card className="twitter-card p-6">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
                <div className="w-8 h-8 bg-[#00197e] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium">Joined four degree</p>
                  <p className="text-sm text-gray-400">Welcome to the community!</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          <Card className="twitter-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Trophy className="w-5 h-5 text-green-500 mr-2" />
              Investment Portfolio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="profile-stat">
                <div className="text-2xl font-bold text-green-500">₹0</div>
                <div className="text-xs text-gray-400">Total Returns</div>
              </div>
              <div className="profile-stat">
                <div className="text-2xl font-bold text-[#00197e]">₹0</div>
                <div className="text-xs text-gray-400">Invested</div>
              </div>
              <div className="profile-stat">
                <div className="text-2xl font-bold text-yellow-500">0%</div>
                <div className="text-xs text-gray-400">Average ROI</div>
              </div>
            </div>
            
            <div className="text-center py-8 text-gray-400">
              <p>No investments yet. Start investing in events to see your portfolio here!</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="memories" className="space-y-6">
          <Card className="twitter-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Camera className="w-5 h-5 text-purple-500 mr-2" />
              Event Memories
            </h3>
            <div className="text-center py-8 text-gray-400">
              <p>No memories yet. Join some events to start creating memories!</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="qr" className="space-y-6">
          <Card className="twitter-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <QrCode className="w-5 h-5 text-[#00197e] mr-2" />
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
                <Button className="bg-[#00197e] hover:bg-[#00197e]/80">Share QR</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <EditProfileModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        userProfile={userProfile}
        onProfileUpdate={fetchUserProfile}
      />
    </div>
  );
};

export default Profile;
