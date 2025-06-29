
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { usePosts } from '@/hooks/usePosts';
import { Camera, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { createPost } = usePosts();
  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createPost(content, imageFile || undefined);
      setContent('');
      setImageFile(null);
      setImagePreview(null);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-black border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Create Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What's happening in your world?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] bg-secondary border-0 text-white placeholder:text-gray-400 resize-none"
            maxLength={500}
          />
          
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <label htmlFor="image-upload" className="cursor-pointer">
                <Camera className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-400">
                {content.length}/500
              </span>
            </div>
            
            <Button
              type="submit"
              disabled={!content.trim() || loading}
              className="bg-red-600 hover:bg-red-700 px-6"
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
