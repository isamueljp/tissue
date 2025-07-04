
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Instagram, Music, MessageSquare, Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: any;
  onProfileUpdate: () => void;
}

export const EditProfileModal = ({ isOpen, onClose, userProfile, onProfileUpdate }: EditProfileModalProps) => {
  const [username, setUsername] = useState('');
  const [occupation, setOccupation] = useState('Student');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [snapchatUrl, setSnapchatUrl] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || '');
      setOccupation(userProfile.occupation || 'Student');
      setInstagramUrl(userProfile.instagram_url || '');
      setSnapchatUrl(userProfile.snapchat_url || '');
      setMusicUrl(userProfile.music_url || '');
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          occupation,
          instagram_url: instagramUrl,
          snapchat_url: snapchatUrl,
          music_url: musicUrl,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });

      onProfileUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="bg-secondary border-0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="occupation" className="text-white">Occupation</Label>
              <Select value={occupation} onValueChange={setOccupation}>
                <SelectTrigger className="bg-secondary border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-secondary border border-border">
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="Artist">Artist</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-white flex items-center">
                <Instagram className="w-4 h-4 mr-2 text-pink-500" />
                Instagram URL
              </Label>
              <Input
                id="instagram"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/username"
                className="bg-secondary border-0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="snapchat" className="text-white flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-yellow-500" />
                Snapchat URL
              </Label>
              <Input
                id="snapchat"
                value={snapchatUrl}
                onChange={(e) => setSnapchatUrl(e.target.value)}
                placeholder="https://snapchat.com/add/username"
                className="bg-secondary border-0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="music" className="text-white flex items-center">
                <Music className="w-4 h-4 mr-2 text-green-500" />
                Music URL (Spotify/Apple Music)
              </Label>
              <Input
                id="music"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                placeholder="https://spotify.com/user/username"
                className="bg-secondary border-0"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1 border-gray-600">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
