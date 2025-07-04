
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, Send } from 'lucide-react';

interface SharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: string;
}

export const SharePostModal = ({ isOpen, onClose, postContent }: SharePostModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSendToContact = (contactName: string) => {
    // In a real app, this would send the post to the selected contact
    console.log(`Sharing post with ${contactName}: ${postContent}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-white">Share Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
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
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg cursor-pointer"
                onClick={() => handleSendToContact(contact.name)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-red-600 text-white">
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
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            ))}
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
