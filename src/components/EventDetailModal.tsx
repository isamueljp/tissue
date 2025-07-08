
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Calendar, DollarSign, Share, Heart, ExternalLink } from 'lucide-react';
import { Event } from '@/hooks/useEvents';
import { formatDistanceToNow } from 'date-fns';

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailModal = ({ event, isOpen, onClose }: EventDetailModalProps) => {
  if (!event) return null;

  const timeAgo = formatDistanceToNow(new Date(event.created_at), { addSuffix: true });

  const handleDonationClick = () => {
    if (event.donation_link) {
      window.open(event.donation_link, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Badge className="bg-[#00197e] text-white">
              {event.event_type}
            </Badge>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Host Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={event.profiles.avatar_url || ''} />
              <AvatarFallback className="bg-[#00197e] text-white">
                {event.profiles.full_name?.charAt(0) || event.profiles.username?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">
                {event.profiles.full_name || event.profiles.username || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-400">Event Host • {timeAgo}</p>
            </div>
          </div>

          {/* Event Title */}
          <div>
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              {event.title}
            </DialogTitle>
          </div>

          {/* Event Image */}
          {event.image_url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Event Description */}
          {event.description && (
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Description</h4>
              <p className="text-gray-300 leading-relaxed">{event.description}</p>
            </div>
          )}

          {/* Event Details */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Event Details</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Calendar className="w-4 h-4 mr-3 text-blue-500" />
                <span>
                  {new Date(event.created_at).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} at {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {event.location_name && (
                <div className="flex items-center text-sm text-gray-300">
                  <MapPin className="w-4 h-4 mr-3 text-red-500" />
                  <span>{event.location_name}</span>
                </div>
              )}
              
              {event.donation_amount && (
                <div className="flex items-center text-sm text-gray-300">
                  <DollarSign className="w-4 h-4 mr-3 text-green-500" />
                  <span>Suggested donation: {event.donation_amount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Hashtags */}
          {event.hashtags && event.hashtags.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {event.hashtags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-gray-600 text-gray-400">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Donation Button */}
          {event.donation_link && (
            <div className="pt-4 border-t border-border">
              <Button 
                onClick={handleDonationClick}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Support This Event
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
