
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEvents } from '@/hooks/useEvents';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Upload, DollarSign, Hash } from 'lucide-react';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const eventTypes = [
  'House Party',
  'Birthday Party',
  'Club Party',
  'Talk Show',
  'Concert',
  'Networking Event',
  'Workshop',
  'Other'
];

export const CreateEventModal = ({ isOpen, onClose }: CreateEventModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: '',
    location_name: '',
    donation_link: '',
    donation_amount: '',
    hashtags: ''
  });
  const [loading, setLoading] = useState(false);
  const { createEvent } = useEvents();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.event_type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const hashtags = formData.hashtags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await createEvent({
        title: formData.title,
        description: formData.description,
        event_type: formData.event_type,
        location_name: formData.location_name || undefined,
        donation_link: formData.donation_link || undefined,
        donation_amount: formData.donation_amount || undefined,
        hashtags: hashtags.length > 0 ? hashtags : undefined
      });

      toast({
        title: "Success",
        description: "Event created successfully!"
      });

      setFormData({
        title: '',
        description: '',
        event_type: '',
        location_name: '',
        donation_link: '',
        donation_amount: '',
        hashtags: ''
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create event",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Event</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event_type" className="text-white">Event Type *</Label>
            <Select value={formData.event_type} onValueChange={(value) => setFormData(prev => ({ ...prev, event_type: value }))}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-secondary border-border"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-secondary border-border"
              placeholder="Describe your event..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-white flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              value={formData.location_name}
              onChange={(e) => setFormData(prev => ({ ...prev, location_name: e.target.value }))}
              className="bg-secondary border-border"
              placeholder="Enter event location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hashtags" className="text-white flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Hashtags
            </Label>
            <Input
              id="hashtags"
              value={formData.hashtags}
              onChange={(e) => setFormData(prev => ({ ...prev, hashtags: e.target.value }))}
              className="bg-secondary border-border"
              placeholder="Enter hashtags separated by commas"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Donation (Optional)
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="donation_link" className="text-sm text-gray-400">Donation Link</Label>
                <Input
                  id="donation_link"
                  value={formData.donation_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, donation_link: e.target.value }))}
                  className="bg-secondary border-border"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donation_amount" className="text-sm text-gray-400">Suggested Amount</Label>
                <Input
                  id="donation_amount"
                  value={formData.donation_amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, donation_amount: e.target.value }))}
                  className="bg-secondary border-border"
                  placeholder="₹100"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#00197e] hover:bg-[#00197e]/80"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
