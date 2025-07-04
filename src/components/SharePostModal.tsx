
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, Send, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: string;
  postId: string;
}

export const SharePostModal = ({ isOpen, onClose, postContent, postId }: SharePostModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sentTo, setSentTo] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Mock DM contacts - in a real app, this would come from your messages/contacts
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

  const handleSendToContact = async (contactId: string, contactName: string) => {
    try {
      // Store the shared post in localStorage to be picked up by Messages component
      const sharedPostData = {
        postId,
        content: postContent,
        sharedTo: contactName,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('sharedPost', JSON.stringify(sharedPostData));
      
      // Trigger storage event for same-tab communication
      window.dispatchEvent(new Event('storage'));
      
      // Add to sent list
      setSentTo(prev => new Set([...prev, contactId]));
      
      toast({
        title: "Post Shared!",
        description: `Post shared with ${contactName}`,
      });

      // Auto close after 1.5 seconds
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
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredContacts.map((contact) => {
              const hasSent = sentTo.has(contact.id);
              return (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-[#00197e] text-white">
                          {contact.avatar}
                        </AvatarFallback>
                      </Avatar>
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
