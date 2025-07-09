
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { MapPin, Calendar, DollarSign, Share, Heart, MessageCircle, Bookmark, Clock, Flame, Eye, Users, Zap } from 'lucide-react';
import { Event } from '@/hooks/useEvents';
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect } from 'react';

interface EventCardProps {
  event: Event;
  onEventClick: (event: Event) => void;
  onRSVP: (event: Event) => void;
  index?: number;
  isHot?: boolean;
  isTrending?: boolean;
}

export const EventCard = ({ event, onEventClick, onRSVP, index = 0, isHot = false, isTrending = false }: EventCardProps) => {
  const [countdown, setCountdown] = useState('');
  const [hypeLevel] = useState(Math.floor(Math.random() * 40) + 60);
  const [attendeeCount] = useState(Math.floor(Math.random() * 50) + 12);
  const [viewerCount, setViewerCount] = useState(Math.floor(Math.random() * 20) + 5);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const timeAgo = formatDistanceToNow(new Date(event.created_at), { addSuffix: true });

  // Mock attendee avatars
  const attendeeAvatars = [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
  ];

  useEffect(() => {
    const eventDate = new Date(event.created_at);
    eventDate.setHours(eventDate.getHours() + 2); // Add 2 hours to make it future
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown(`${hours}h ${minutes}m`);
      } else {
        setCountdown('Live now');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    
    // Update viewer count periodically
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(viewerInterval);
    };
  }, [event.created_at]);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card className="bg-card border border-border hover:border-red-500/30 transition-all duration-300 overflow-hidden group cursor-pointer relative">
      {/* Cover Image */}
      <div className="relative h-32 bg-gradient-to-br from-red-600/20 to-blue-600/20 overflow-hidden">
        {event.image_url ? (
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {event.event_type === 'Party' ? '🎉' : event.event_type === 'Study' ? '📚' : '🎯'}
          </div>
        )}
        
        {/* Trending/Hot badges */}
        <div className="absolute top-2 left-2 flex space-x-1">
          {isTrending && (
            <Badge className="bg-red-600 text-white text-xs animate-pulse">
              <Flame className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
          {isHot && (
            <Badge className="bg-orange-600 text-white text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          )}
          {attendeeCount > 40 && (
            <Badge className="bg-yellow-600 text-white text-xs">
              Almost Full
            </Badge>
          )}
        </div>

        {/* Event type badge */}
        <Badge className="absolute top-2 right-2 bg-[#00197e] text-white text-xs">
          {event.event_type}
        </Badge>

        {/* Live viewer count */}
        <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full">
          <Eye className="w-3 h-3 text-gray-300" />
          <span className="text-xs text-gray-300">{viewerCount}</span>
        </div>
      </div>

      <div className="p-3 space-y-3" onClick={() => onEventClick(event)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={event.profiles.avatar_url || ''} />
              <AvatarFallback className="bg-[#00197e] text-white text-xs">
                {event.profiles.full_name?.charAt(0) || event.profiles.username?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white text-sm">
                {event.profiles.full_name || event.profiles.username || 'Anonymous'}
              </p>
              <p className="text-xs text-gray-400">{timeAgo}</p>
            </div>
          </div>
          
          {/* Countdown */}
          <div className="flex items-center space-x-1 bg-red-600/20 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3 text-red-400" />
            <span className="text-xs text-red-400 font-medium">{countdown}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-bold text-white text-base leading-tight">{event.title}</h3>
          {event.description && (
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{event.description}</p>
          )}
          
          {/* Event Details */}
          <div className="space-y-1">
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="w-3 h-3 mr-2 text-blue-500" />
              {new Date(event.created_at).toLocaleDateString()} at {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            
            {event.location_name && (
              <div className="flex items-center text-xs text-gray-400">
                <MapPin className="w-3 h-3 mr-2 text-red-500" />
                {event.location_name}
              </div>
            )}
          </div>

          {/* Hype Meter */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Hype Level</span>
              <span className="text-red-400 font-medium">{hypeLevel}%</span>
            </div>
            <Progress value={hypeLevel} className="h-1" />
          </div>

          {/* Attendees Preview */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {attendeeAvatars.map((avatar, i) => (
                  <Avatar key={i} className="w-6 h-6 border border-background">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-gray-400">+{attendeeCount} attending</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">{Math.floor(attendeeCount * 0.3)} spots left</span>
            </div>
          </div>

          {/* Hashtags */}
          {event.hashtags && event.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {event.hashtags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                  #{tag}
                </Badge>
              ))}
              {event.hashtags.length > 3 && (
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                  +{event.hashtags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-gray-400 hover:text-red-400 p-1 ${isLiked ? 'text-red-400' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <Heart className={`w-3 h-3 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{isLiked ? '1' : '0'}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-blue-400 p-1"
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(event);
              }}
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              <span className="text-xs">Ask</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-green-400 p-1"
              onClick={handleShare}
            >
              <Share className="w-3 h-3" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-gray-400 hover:text-yellow-400 p-1 ${isBookmarked ? 'text-yellow-400' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
              }}
            >
              <Bookmark className={`w-3 h-3 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700 text-xs px-3 py-1"
              onClick={(e) => {
                e.stopPropagation();
                onRSVP(event);
              }}
            >
              ✅ Join
            </Button>
            
            {event.donation_link && (
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs px-2 py-1 border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(event.donation_link!, '_blank');
                }}
              >
                <DollarSign className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
