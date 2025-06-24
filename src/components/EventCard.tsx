
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, MessageSquare, Package, ExternalLink } from 'lucide-react';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendeeCount: number;
  maxAttendees: number;
  points: number;
  category: string;
  isVip?: boolean;
  hostName: string;
  image?: string;
}

const EventCard = ({ 
  title, 
  description, 
  date, 
  time, 
  location, 
  attendeeCount, 
  maxAttendees, 
  points, 
  category, 
  isVip = false,
  hostName,
  image 
}: EventCardProps) => {
  const attendancePercentage = (attendeeCount / maxAttendees) * 100;

  const handleJoinWhatsApp = () => {
    // Simulate WhatsApp group join
    window.open('https://chat.whatsapp.com/invite-link', '_blank');
  };

  return (
    <Card className="discord-card hover-lift overflow-hidden group">
      {/* Event Image */}
      <div className="relative h-40 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <MessageSquare className="w-12 h-12 text-primary/50" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={isVip ? "default" : "secondary"} className={isVip ? "bg-primary" : ""}>
            {category}
          </Badge>
          {isVip && <Badge className="bg-accent">VIP</Badge>}
        </div>
        
        {/* Live indicator */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 bg-background/80 rounded-full px-2 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs">Live</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Event Header */}
        <div>
          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        </div>

        {/* Event Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span>{date} • {time}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span>{attendeeCount}/{maxAttendees} joined</span>
          </div>
        </div>

        {/* Attendance Progress */}
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Attendance</span>
            <span>{Math.round(attendancePercentage)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>

        {/* Host & Points */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">by @{hostName}</span>
          <span className="font-semibold text-primary">{points} pts</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button className="bg-primary hover:bg-primary/90" size="sm">
            <Users className="w-4 h-4 mr-1" />
            Join
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-1" />
            Chat
          </Button>
        </div>

        {/* Discord-like action buttons */}
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-1"
            onClick={handleJoinWhatsApp}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            WhatsApp
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            <Package className="w-4 h-4 mr-1" />
            Contribute
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
