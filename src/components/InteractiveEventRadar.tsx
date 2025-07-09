
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Flame, Users, Zap } from 'lucide-react';

interface HotZone {
  id: string;
  name: string;
  eventCount: number;
  distance: string;
  hypeLevel: number;
  attendees: number;
  topEvent: string;
}

export const InteractiveEventRadar = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const hotZones: HotZone[] = [
    {
      id: '1',
      name: 'Downtown Core',
      eventCount: 12,
      distance: '0.8 km',
      hypeLevel: 95,
      attendees: 240,
      topEvent: 'Rooftop Rave Night'
    },
    {
      id: '2',
      name: 'Campus District',
      eventCount: 8,
      distance: '1.2 km',
      hypeLevel: 78,
      attendees: 156,
      topEvent: 'Study Break Party'
    },
    {
      id: '3',
      name: 'Arts Quarter',
      eventCount: 6,
      distance: '2.1 km',
      hypeLevel: 82,
      attendees: 89,
      topEvent: 'Underground Showcase'
    },
    {
      id: '4',
      name: 'Waterfront',
      eventCount: 4,
      distance: '3.5 km',
      hypeLevel: 71,
      attendees: 67,
      topEvent: 'Beach Bonfire'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <MapPin className="w-4 h-4 text-red-500 animate-pulse" />
        <span className="text-sm font-medium text-white">Event Radar</span>
        <Badge className="bg-red-600 text-white text-xs animate-pulse">LIVE</Badge>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {hotZones.map((zone) => (
          <Card 
            key={zone.id} 
            className={`flex-shrink-0 w-32 bg-card/50 border transition-all duration-300 cursor-pointer ${
              selectedZone === zone.id ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-border/30'
            }`}
            onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
          >
            <div className="p-3 space-y-2">
              <div className="relative">
                <div className={`w-full h-16 rounded-lg flex items-center justify-center text-2xl ${
                  zone.hypeLevel > 90 ? 'bg-gradient-to-br from-red-600/30 to-orange-600/30' :
                  zone.hypeLevel > 80 ? 'bg-gradient-to-br from-orange-600/30 to-yellow-600/30' :
                  'bg-gradient-to-br from-blue-600/30 to-purple-600/30'
                }`}>
                  🎯
                </div>
                {zone.hypeLevel > 90 && (
                  <Flame className="absolute -top-1 -right-1 w-4 h-4 text-orange-500 animate-bounce" />
                )}
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium text-white text-xs leading-tight">{zone.name}</h4>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{zone.eventCount} events</span>
                  <span>{zone.distance}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">{zone.attendees}</span>
                </div>
              </div>
              
              {zone.hypeLevel > 85 && (
                <Badge className="w-full bg-red-600/20 text-red-400 text-xs border-red-600/30">
                  <Zap className="w-3 h-3 mr-1" />
                  HOT
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      {selectedZone && (
        <Card className="bg-red-600/10 border-red-600/30 p-3">
          <div className="space-y-2">
            {(() => {
              const zone = hotZones.find(z => z.id === selectedZone);
              return zone ? (
                <>
                  <h4 className="font-bold text-red-400">{zone.name} - {zone.topEvent}</h4>
                  <p className="text-xs text-gray-300">
                    {zone.attendees} people going • Hype Level: {zone.hypeLevel}%
                  </p>
                  <div className="flex space-x-2">
                    <Badge className="bg-red-600 text-white text-xs">View Events</Badge>
                    <Badge variant="outline" className="text-xs border-red-600/30 text-red-400">
                      Get Directions
                    </Badge>
                  </div>
                </>
              ) : null;
            })()}
          </div>
        </Card>
      )}
    </div>
  );
};
