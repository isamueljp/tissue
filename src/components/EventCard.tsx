
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, Clock } from 'lucide-react';

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

  return (
    <Card className="group bg-card border-border hover:border-primary/30 transition-all duration-300 hover-lift overflow-hidden">
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Star className="w-12 h-12 text-accent/50" />
          </div>
        )}
        
        {/* VIP Badge */}
        {isVip && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground font-semibold">
            VIP
          </Badge>
        )}
        
        {/* Category Badge */}
        <Badge variant="secondary" className="absolute top-3 left-3">
          {category}
        </Badge>
      </div>

      <div className="p-6">
        {/* Event Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        </div>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-accent" />
            <span>{date}</span>
            <Clock className="w-4 h-4 ml-4 mr-2 text-accent" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-accent" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-accent" />
            <span>{attendeeCount}/{maxAttendees} attending</span>
          </div>
        </div>

        {/* Attendance Progress */}
        <div className="mb-4">
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

        {/* Points & Host */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-accent mr-1" />
            <span className="font-semibold text-accent">{points} pts</span>
          </div>
          <span className="text-xs text-muted-foreground">by {hostName}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            Join Event
          </Button>
          <Button variant="outline" size="sm">
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
