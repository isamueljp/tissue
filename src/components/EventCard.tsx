
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Calendar, DollarSign, Hash, Share, Heart } from 'lucide-react';
import { Event } from '@/hooks/useEvents';
import { formatDistanceToNow } from 'date-fns';

interface EventCardProps {
  event: Event;
  onEventClick: (event: Event) => void;
}

export const EventCard = ({ event, onEventClick }: EventCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(event.created_at), { addSuffix: true });

  return (
    <Card className="bg-card border border-border p-4 space-y-3 cursor-pointer hover:border-[#00197e]/30 transition-all" onClick={() => onEventClick(event)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={event.profiles.avatar_url || ''} />
            <AvatarFallback className="bg-[#00197e] text-white">
              {event.profiles.full_name?.charAt(0) || event.profiles.username?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">
              {event.profiles.full_name || event.profiles.username || 'Anonymous'}
            </p>
            <p className="text-xs text-gray-400">{timeAgo}</p>
          </div>
        </div>
        <Badge className="bg-[#00197e] text-white">
          {event.event_type}
        </Badge>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-bold text-white text-lg">{event.title}</h3>
        {event.description && (
          <p className="text-gray-300 leading-relaxed">{event.description}</p>
        )}
        
        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            {new Date(event.created_at).toLocaleDateString()} at {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          
          {event.location_name && (
            <div className="flex items-center text-sm text-gray-400">
              <MapPin className="w-4 h-4 mr-2 text-red-500" />
              {event.location_name}
            </div>
          )}
          
          {event.donation_amount && (
            <div className="flex items-center text-sm text-gray-400">
              <DollarSign className="w-4 h-4 mr-2 text-green-500" />
              Suggested donation: {event.donation_amount}
            </div>
          )}
        </div>

        {/* Hashtags */}
        {event.hashtags && event.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.hashtags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-xs">0</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
            <Share className="w-4 h-4" />
          </Button>
        </div>
        {event.donation_link && (
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <DollarSign className="w-4 h-4 mr-1" />
            Donate
          </Button>
        )}
      </div>
    </Card>
  );
};
