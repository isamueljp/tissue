
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Users } from 'lucide-react';
import { Event } from '@/hooks/useEvents';

interface NearbyEventsPreviewProps {
  events: Event[];
  onRSVP: (event: Event) => void;
}

export const NearbyEventsPreview = ({ events, onRSVP }: NearbyEventsPreviewProps) => {
  if (events.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <MapPin className="w-4 h-4 text-red-500" />
        <span className="text-sm font-medium text-white">Nearby Events</span>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {events.map((event) => (
          <Card key={event.id} className="flex-shrink-0 w-40 bg-card/50 border border-border/30 p-3">
            <div className="space-y-2">
              <div className="h-16 bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-lg flex items-center justify-center text-lg">
                {event.event_type === 'Party' ? '🎉' : event.event_type === 'Study' ? '📚' : '🎯'}
              </div>
              
              <h4 className="font-medium text-white text-xs leading-tight line-clamp-2">
                {event.title}
              </h4>
              
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <Avatar key={i} className="w-4 h-4 border border-background">
                      <AvatarImage src={`https://images.unsplash.com/photo-150${i}003211169-0a1dd7228f2d?w=20&h=20&fit=crop&crop=face`} />
                      <AvatarFallback className="text-xs">U</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs text-gray-400">+{Math.floor(Math.random() * 20) + 5}</span>
              </div>
              
              <Button 
                size="sm" 
                className="w-full bg-green-600 hover:bg-green-700 text-xs py-1"
                onClick={() => onRSVP(event)}
              >
                Join Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
