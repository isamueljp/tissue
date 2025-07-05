
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Heart, Sparkles, Play, Volume2, Flame, Star, Eye, Clock, UserPlus, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { LoginModal } from '@/components/auth/LoginModal';
import { CreatePostModal } from '@/components/CreatePostModal';
import { PostCard } from '@/components/PostCard';

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [streakCount] = useState(7);
  const {
    user,
    loading: authLoading
  } = useAuth();
  const {
    posts,
    loading: postsLoading,
    toggleLike
  } = usePosts();

  // Stories data with placeholder fallback
  const stories = [{
    id: '1',
    user: 'sarah_vibe',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    hasUpdate: true,
    isLive: true
  }, {
    id: '2',
    user: 'alex_games',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    hasUpdate: true,
    isLive: false
  }, {
    id: '3',
    user: 'music_maven',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    hasUpdate: false,
    isLive: true
  }, {
    id: '4',
    user: 'night_owl',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    hasUpdate: true,
    isLive: false
  }, {
    id: '5',
    user: 'coffee_crew',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&crop=face',
    hasUpdate: false,
    isLive: false
  }];

  const handleCreatePost = () => {
    if (!user) {
      setLoginModalOpen(true);
    } else {
      setCreatePostModalOpen(true);
    }
  };

  const handleLogin = () => {
    setLoginModalOpen(true);
  };

  if (authLoading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-[#00197e] rounded-full animate-pulse mb-4 mx-auto"></div>
          <p>Loading fourth degree...</p>
        </div>
      </div>;
  }

  return <div className="min-h-screen bg-black text-white">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#00197e] rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#00197e]">fourth degree</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {user && <div className="flex items-center space-x-1 bg-[#00197e]/20 px-2 py-1 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold">{streakCount}</span>
              </div>}
            
            {user ? <Button size="sm" onClick={handleCreatePost} className="bg-[#00197e] hover:bg-[#00197e]/80 px-3">
                <Plus className="w-4 h-4 mr-1" />
                Create
              </Button> : <Button size="sm" onClick={handleLogin} className="px-3 bg-[#00197e]">
                Sign In
              </Button>}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Redesigned Stories Section - Less Instagram-like */}
        <div className="bg-gradient-to-r from-[#00197e]/10 to-purple-500/10 rounded-2xl p-4 backdrop-blur-sm border border-[#00197e]/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white/80 flex items-center">
              <Play className="w-4 h-4 mr-2 text-[#00197e]" />
              Live Stories
            </h3>
            <span className="text-xs text-white/60">{stories.filter(s => s.isLive).length} live now</span>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
            {stories.map(story => (
              <div key={story.id} className="flex-shrink-0 relative group cursor-pointer">
                <div className="relative">
                  {/* Smooth rectangular container instead of circular */}
                  <div className={`w-20 h-28 rounded-xl overflow-hidden relative transition-all duration-300 group-hover:scale-105 ${
                    story.hasUpdate || story.isLive 
                      ? 'ring-2 ring-[#00197e] ring-offset-2 ring-offset-black' 
                      : 'ring-1 ring-gray-600'
                  }`}>
                    <img 
                      src={story.image} 
                      alt={story.user} 
                      className="w-full h-full object-cover"
                      onError={e => {
                        console.log('Image failed to load:', story.image);
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${story.user}&background=random`;
                      }} 
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Status indicators */}
                    {story.isLive && (
                      <div className="absolute top-2 left-2">
                        <div className="flex items-center bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                          LIVE
                        </div>
                      </div>
                    )}
                    
                    {story.hasUpdate && !story.isLive && (
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-[#00197e] rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  {/* Username at bottom */}
                  <p className="text-xs text-center mt-2 text-white/70 font-medium truncate w-20">
                    {story.user.split('_')[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input placeholder="What's the vibe?" className="pl-12 bg-secondary/50 border-0 rounded-full text-lg py-3" />
        </div>

        {/* Posts Feed */}
        {!user && <div className="text-center py-8 space-y-4">
            <h2 className="text-2xl font-bold">Welcome to fourth degree</h2>
            <p className="text-gray-400">Join the community to see posts and connect with others</p>
            <Button onClick={handleLogin} className="bg-[#00197e] hover:bg-[#00197e]/80">
              Sign In to Continue
            </Button>
          </div>}

        {user && <div className="space-y-4">
            {postsLoading ? <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="w-24 h-4 bg-gray-700 rounded"></div>
                        <div className="w-16 h-3 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-700 rounded"></div>
                      <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
                    </div>
                  </div>)}
              </div> : posts.length === 0 ? <div className="text-center py-8 space-y-4">
                <h3 className="text-xl font-semibold">No posts yet</h3>
                <p className="text-gray-400">Be the first to share something amazing!</p>
                <Button onClick={handleCreatePost} className="bg-[#00197e] hover:bg-[#00197e]/80">
                  Create First Post
                </Button>
              </div> : posts.map(post => <PostCard key={post.id} post={post} onLike={toggleLike} />)}
          </div>}
      </div>

      {/* Modals */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <CreatePostModal isOpen={createPostModalOpen} onClose={() => setCreatePostModalOpen(false)} />
    </div>;
};

export default Index;
