
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, Trophy, ExternalLink, User, 
  Instagram, Music, MessageSquare, UserPlus, UserCheck
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { supabase } from '@/integrations/supabase/client';
import { PostCard } from '@/components/PostCard';
import { useToast } from '@/hooks/use-toast';

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

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useAuth();
  const { toggleLike } = usePosts();
  const { toast } = useToast();

  const fetchUserProfile = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchUserPosts = async () => {
    if (!userId) return;

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
        .eq('user_id', userId)
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

  const checkFollowStatus = async () => {
    if (!user || !userId || user.id === userId) return;

    try {
      const { data, error } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', user.id)
        .eq('following_id', userId)
        .single();

      if (!error && data) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const handleFollow = async () => {
    if (!user || !userId) return;

    try {
      if (isFollowing) {
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', userId);
        
        setIsFollowing(false);
        toast({
          title: "Unfollowed",
          description: `You unfollowed ${userProfile?.full_name || userProfile?.username}`,
        });
      } else {
        await supabase
          .from('follows')
          .insert({
            follower_id: user.id,
            following_id: userId
          });
        
        setIsFollowing(true);
        toast({
          title: "Following",
          description: `You are now following ${userProfile?.full_name || userProfile?.username}`,
        });
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUserProfile(),
        fetchUserPosts(),
        checkFollowStatus()
      ]);
      setLoading(false);
    };

    loadData();
  }, [userId, user]);

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const getDisplayName = () => {
    return userProfile?.full_name || userProfile?.username || 'User';
  };

  const getUsername = () => {
    return userProfile?.username || '@user';
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

  if (!userProfile) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center py-8 space-y-4">
          <h2 className="text-2xl font-bold">User Not Found</h2>
          <p className="text-gray-400">This user profile doesn't exist</p>
          <Button onClick={() => navigate('/')} className="bg-[#00197e] hover:bg-[#00197e]/80">
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  const isOwnProfile = user?.id === userId;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Profile Header */}
      <Card className="bg-card border border-border p-6">
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
            
            {userProfile?.bio && (
              <p className="text-gray-300 mb-4">{userProfile.bio}</p>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <Badge className="bg-[#00197e]/20 text-[#00197e]">Level 1 Host</Badge>
              <Badge variant="outline" className="border-[#00197e] text-[#00197e]">New Member</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00197e]">₹0</div>
                <div className="text-xs text-gray-400">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">0</div>
                <div className="text-xs text-gray-400">Events Hosted</div>
              </div>
              <div className="text-center">
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
            {!isOwnProfile && user && (
              <Button 
                onClick={handleFollow}
                className={`${
                  isFollowing 
                    ? 'bg-gray-600 hover:bg-gray-700' 
                    : 'bg-[#00197e] hover:bg-[#00197e]/80'
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
            )}
            <Button variant="outline" className="border-[#00197e] text-[#00197e]">
              Message
            </Button>
          </div>
        </div>
      </Card>

      {/* Posts Section */}
      <Card className="bg-card border border-border p-6">
        <h3 className="text-lg font-bold mb-4">Posts</h3>
        {userPosts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No posts yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} onLike={toggleLike} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserProfile;
