
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Forward, MoreVertical } from 'lucide-react';
import { Post } from '@/hooks/usePosts';
import { formatDistanceToNow } from 'date-fns';
import { SharePostModal } from './SharePostModal';
import { CommentsSection } from './CommentsSection';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

export const PostCard = ({ post, onLike }: PostCardProps) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  return (
    <>
      <Card className="bg-card border border-border p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.profiles.avatar_url} />
              <AvatarFallback className="bg-[#00197e] text-white">
                {post.profiles.full_name?.charAt(0) || post.profiles.username?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">
                {post.profiles.full_name || post.profiles.username || 'Anonymous'}
              </p>
              <p className="text-xs text-gray-400">{timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-white leading-relaxed">{post.content}</p>
          
          {post.image_url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.image_url}
                alt="Post image"
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-1 p-2 ${
                post.user_has_liked 
                  ? 'text-[#00197e] hover:text-[#00197e]/80' 
                  : 'text-gray-400 hover:text-[#00197e]'
              }`}
            >
              <Heart 
                className={`w-4 h-4 ${post.user_has_liked ? 'fill-current' : ''}`} 
              />
              <span className="text-xs">{post.likes_count}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center space-x-1 p-2 ${
                showComments 
                  ? 'text-[#00197e] hover:text-[#00197e]/80' 
                  : 'text-gray-400 hover:text-[#00197e]'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{post.comments_count}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShareModalOpen(true)}
              className="text-gray-400 hover:text-[#00197e] p-2"
            >
              <Forward className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection postId={post.id} isVisible={showComments} />
      </Card>

      <SharePostModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        postContent={post.content}
        postId={post.id}
      />
    </>
  );
};
