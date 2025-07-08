
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Send, Check, Copy, MessageCircle,
  Share2, ExternalLink, Instagram, Facebook
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedSharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: string;
  postId: string;
}

export const EnhancedSharePostModal = ({ isOpen, onClose, postContent, postId }: EnhancedSharePostModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sentTo, setSentTo] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const postUrl = `${window.location.origin}/post/${postId}`;

  // Mock DM contacts
  const dmContacts = [
    { id: '1', name: 'Sarah Chen', username: '@sarah_vibe', avatar: 'SC', online: true },
    { id: '2', name: 'Alex Rodriguez', username: '@alex_games', avatar: 'AR', online: true },
    { id: '3', name: 'Maya Patel', username: '@maya_study', avatar: 'MP', online: false },
    { id: '4', name: 'John Smith', username: '@john_music', avatar: 'JS', online: true },
  ];

  const filteredContacts = dmContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      toast({
        title: "Link Copied!",
        description: "Post link has been copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const handleWhatsAppShare = () => {
    const message = `Check out this post: ${postContent}\n\n${postUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramShare = () => {
    // Instagram doesn't support direct URL sharing, so we'll copy the link
    handleCopyLink();
    toast({
      title: "Link Copied!",
      description: "Paste this link in your Instagram story or DM",
    });
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleSendToContact = async (contactId: string, contactName: string) => {
    try {
      const sharedPostData = {
        postId,
        content: postContent,
        sharedTo: contactName,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('sharedPost', JSON.stringify(sharedPostData));
      window.dispatchEvent(new Event('storage'));
      
      setSentTo(prev => new Set([...prev, contactId]));
      
      toast({
        title: "Post Shared!",
        description: `Post shared with ${contactName}`,
      });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share post",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setSentTo(new Set());
    setSearchTerm('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-white">Share Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Post Preview */}
          <div className="bg-secondary/30 rounded-lg p-3">
            <p className="text-sm text-gray-300 line-clamp-2">{postContent}</p>
          </div>

          {/* External Share Options */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={handleWhatsAppShare}
              className="flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span>WhatsApp</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleInstagramShare}
              className="flex items-center space-x-2"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Instagram</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleFacebookShare}
              className="flex items-center space-x-2"
            >
              <Facebook className="w-4 h-4 text-blue-500" />
              <span>Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleCopyLink}
              className="flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary border-0"
            />
          </div>

          {/* Contacts List */}
          <div className="max-h-40 overflow-y-auto space-y-2">
            {filteredContacts.map((contact) => {
              const hasSent = sentTo.has(contact.id);
              return (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-[#00197e] rounded-full flex items-center justify-center text-white font-bold">
                        {contact.avatar}
                      </div>
                      {contact.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">{contact.name}</p>
                      <p className="text-sm text-gray-400">{contact.username}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleSendToContact(contact.id, contact.name)}
                    disabled={hasSent}
                    className={`${
                      hasSent 
                        ? 'bg-green-600 hover:bg-green-600' 
                        : 'bg-[#00197e] hover:bg-[#00197e]/80'
                    }`}
                  >
                    {hasSent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              );
            })}
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-4 text-gray-400">
              No contacts found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
