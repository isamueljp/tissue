
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, MapPin, PartyPopper, MessageCircle, Share } from 'lucide-react';
import { Event } from '@/hooks/useEvents';
import { useState } from 'react';

interface RSVPModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal = ({ event, isOpen, onClose }: RSVPModalProps) => {
  const [step, setStep] = useState<'rsvp' | 'confirmation'>('rsvp');
  const [guestCount, setGuestCount] = useState('1');
  const [message, setMessage] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  if (!event) return null;

  const handleRSVP = () => {
    // Here you would typically save the RSVP to your backend
    setStep('confirmation');
    setTimeout(() => {
      setStep('rsvp');
      onClose();
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Join me at ${event.title}`,
        text: event.description || '',
        url: window.location.href,
      });
    }
  };

  const addToCalendar = () => {
    const startDate = new Date(event.created_at);
    startDate.setHours(startDate.getHours() + 2); // Event starts in 2 hours
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2); // 2 hour event
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const details = encodeURIComponent(event.description || '');
    const location = encodeURIComponent(event.location_name || '');
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank');
    setShowCalendar(true);
  };

  if (step === 'confirmation') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[400px] bg-card border-border text-center">
          <div className="space-y-6 py-8">
            <div className="text-6xl animate-bounce">🎊</div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">You're going!</h2>
              <p className="text-gray-300">
                You're all set for <span className="font-semibold text-white">{event.title}</span>
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={addToCalendar} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            
            {showCalendar && (
              <p className="text-xs text-green-400">✅ Calendar event created!</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Join Event</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Event Preview */}
          <div className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-lg flex items-center justify-center text-2xl">
              {event.event_type === 'Party' ? '🎉' : event.event_type === 'Study' ? '📚' : '🎯'}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">{event.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{new Date(event.created_at).toLocaleDateString()}</span>
                {event.location_name && (
                  <>
                    <MapPin className="w-3 h-3 ml-2" />
                    <span>{event.location_name}</span>
                  </>
                )}
              </div>
            </div>
            <Badge className="bg-[#00197e] text-white">
              {event.event_type}
            </Badge>
          </div>

          {/* Host Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={event.profiles.avatar_url || ''} />
              <AvatarFallback className="bg-[#00197e] text-white">
                {event.profiles.full_name?.charAt(0) || 'H'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">
                {event.profiles.full_name || event.profiles.username || 'Event Host'}
              </p>
              <p className="text-sm text-gray-400">Event Host</p>
            </div>
            <Button size="sm" variant="outline" className="ml-auto">
              <MessageCircle className="w-3 h-3 mr-1" />
              Message
            </Button>
          </div>

          {/* RSVP Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Number of guests (including yourself)
              </label>
              <Input
                type="number"
                min="1"
                max="10"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Message to host (optional)
              </label>
              <Textarea
                placeholder="Looking forward to this event!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-secondary border-border"
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleRSVP} className="flex-1 bg-green-600 hover:bg-green-700">
              <PartyPopper className="w-4 h-4 mr-2" />
              Confirm RSVP
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
