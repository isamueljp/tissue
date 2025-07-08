
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar } from 'lucide-react';

interface Party {
  id: string;
  name: string;
  location: string;
  time: string;
  attendees: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  distance: string;
  type: 'party' | 'event' | 'meetup';
}

export const NearbyPartiesBar = () => {
  const [parties] = useState<Party[]>([
    {
      id: '1',
      name: 'Rooftop Party',
      location: 'Downtown Club',
      time: '8:00 PM',
      distance: '0.5 km',
      type: 'party',
      attendees: [
        { id: '1', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
        { id: '2', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
        { id: '3', name: 'Maya', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
      ]
    },
    {
      id: '2',
      name: 'Study Group',
      location: 'Coffee House',
      time: '7:00 PM',
      distance: '1.2 km',
      type: 'meetup',
      attendees: [
        { id: '4', name: 'John', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
        { id: '5', name: 'Emma', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face' },
      ]
    },
    {
      id: '3',
      name: 'Gaming Night',
      location: 'Arcade Zone',
      time: '9:00 PM',
      distance: '2.1 km',
      type: 'event',
      attendees: [
        { id: '6', name: 'Mike', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' },
        { id: '7', name: 'Lisa', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face' },
        { id: '8', name: 'David', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=40&h=40&fit=crop&crop=face' },
      ]
    },
    {
      id: '4',
      name: 'Music Jam',
      location: 'Band Studio',
      time: '10:00 PM',
      distance: '3.5 km',
      type: 'party',
      attendees: [
        { id: '9', name: 'Chris', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=40&h=40&fit=crop&crop=face' },
        { id: '10', name: 'Anna', avatar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop&crop=face' },
      ]
    }
  ]);

  const getTypeColor = (type: Party['type']) => {
    switch (type) {
      case 'party': return 'bg-pink-500';
      case 'event': return 'bg-blue-500';
      case 'meetup': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: Party['type']) => {
    switch (type) {
      case 'party': return 'Party';
      case 'event': return 'Event';
      case 'meetup': return 'Meetup';
      default: return 'Event';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Nearby Parties</h3>
        <Button variant="ghost" size="sm" className="text-[#00197e]">
          See All
        </Button>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
        {parties.map((party) => (
          <div
            key={party.id}
            className="flex-shrink-0 w-64 bg-card border border-border rounded-lg p-3 cursor-pointer hover:bg-card/80 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-white text-sm truncate">{party.name}</h4>
                  <Badge 
                    className={`${getTypeColor(party.type)} text-white text-xs px-2 py-0`}
                  >
                    {getTypeLabel(party.type)}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-gray-400 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{party.location}</span>
                  <span>•</span>
                  <span>{party.distance}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>{party.time}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-2">
                  {party.attendees.slice(0, 3).map((attendee) => (
                    <Avatar key={attendee.id} className="w-6 h-6 border-2 border-card">
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                      <AvatarFallback className="text-xs">
                        {attendee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-gray-400 ml-2">
                  <Users className="w-3 h-3" />
                  <span>{party.attendees.length} attending</span>
                </div>
              </div>
              
              <Button size="sm" className="bg-[#00197e] hover:bg-[#00197e]/80 text-xs px-3 py-1">
                Join
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
