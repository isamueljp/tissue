
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, MapPin, Flame } from 'lucide-react';

interface SocialUpdate {
  id: string;
  type: 'join' | 'rsvp' | 'spots_left' | 'trending';
  message: string;
  user?: {
    name: string;
    avatar: string;
  };
  event?: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

export const RealTimeSocialPulse = () => {
  const [updates, setUpdates] = useState<SocialUpdate[]>([]);

  const sampleUpdates: SocialUpdate[] = [
    {
      id: '1',
      type: 'join',
      message: 'Alex joined a house party near you',
      user: { name: 'Alex', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
      event: 'Downtown House Party',
      time: '2m ago',
      icon: <Users className="w-3 h-3" />,
      color: 'text-green-400'
    },
    {
      id: '2',
      type: 'rsvp',
      message: '8 friends are attending an event tonight',
      event: 'Rooftop Jam Session',
      time: '5m ago',
      icon: <Users className="w-3 h-3" />,
      color: 'text-blue-400'
    },
    {
      id: '3',
      type: 'spots_left',
      message: '3 spots left for the rooftop jam',
      event: 'Rooftop Jam Session',
      time: '8m ago',
      icon: <Clock className="w-3 h-3" />,
      color: 'text-red-400'
    },
    {
      id: '4',
      type: 'trending',
      message: 'Study Break Party is trending now',
      event: 'Study Break Party',
      time: '12m ago',
      icon: <Flame className="w-3 h-3" />,
      color: 'text-orange-400'
    }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const randomUpdate = sampleUpdates[Math.floor(Math.random() * sampleUpdates.length)];
      const newUpdate = {
        ...randomUpdate,
        id: Date.now().toString(),
        time: 'now'
      };
      
      setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
    }, 8000);

    // Initialize with some updates
    setUpdates(sampleUpdates);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-white">Live Activity</span>
      </div>
      
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {updates.map((update) => (
          <Card key={update.id} className="bg-card/30 border-border/20 p-2 animate-fade-in">
            <div className="flex items-center space-x-2">
              {update.user && (
                <Avatar className="w-6 h-6">
                  <AvatarImage src={update.user.avatar} />
                  <AvatarFallback className="text-xs">{update.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              
              <div className={`${update.color}`}>
                {update.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-300 truncate">{update.message}</p>
                <div className="flex items-center space-x-2 mt-1">
                  {update.event && (
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {update.event}
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">{update.time}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
