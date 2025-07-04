
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send, Trash2 } from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';

interface CommentsSectionProps {
  postId: string;
  isVisible: boolean;
}

export const CommentsSection = ({ postId, isVisible }: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const { comments, loading, addComment, deleteComment } = useComments(postId);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    await addComment(newComment);
    setNewComment('');
  };

  if (!isVisible) return null;

  return (
    <div className="border-t border-border mt-3 pt-3 space-y-3">
      {/* Comments List */}
      <div className="max-h-60 overflow-y-auto space-y-3">
        {loading ? (
          <div className="text-center py-4 text-gray-400">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-4 text-gray-400">No comments yet</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={comment.profiles.avatar_url} />
                <AvatarFallback className="bg-[#00197e] text-white text-xs">
                  {comment.profiles.full_name?.charAt(0) || comment.profiles.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-secondary/30 rounded-lg px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white text-sm">
                      {comment.profiles.full_name || comment.profiles.username || 'Anonymous'}
                    </span>
                    {user?.id === comment.user_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteComment(comment.id)}
                        className="text-gray-400 hover:text-red-400 p-1 h-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <p className="text-white text-sm">{comment.content}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-3">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      {user && (
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-[#00197e] text-white text-xs">
              {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex space-x-2">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-secondary/50 border-0 text-white placeholder-gray-400"
            />
            <Button 
              type="submit" 
              size="sm" 
              className="bg-[#00197e] hover:bg-[#00197e]/80"
              disabled={!newComment.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
