
import { EventCard } from './EventCard';
import EventChat from './EventChat';
import ContributionBoard from './ContributionBoard';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Hash, Zap } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useEvents } from '@/hooks/useEvents';
import { useState } from 'react';

const EventsGrid = () => {
  const { events, loading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const handleRSVP = (event: any) => {
    console.log('RSVP for event:', event.title);
    // Handle RSVP logic here
  };

  const vipEvents = events.filter(event => event.event_type === 'VIP' || event.event_type === 'Club Party');

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
            <Hash className="w-8 h-8 text-primary mr-2" />
            <span className="text-gradient-red">Active Events</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join live events, chat with students, and contribute to make them awesome
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search events..." 
            className="pl-10 bg-secondary border-0 futuristic-glow"
          />
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-5 bg-card border border-border">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary">
              <Hash className="w-4 h-4 mr-1" />
              All
            </TabsTrigger>
            <TabsTrigger value="vip" className="data-[state=active]:bg-primary">
              <Zap className="w-4 h-4 mr-1" />
              VIP
            </TabsTrigger>
            <TabsTrigger value="party">Parties</TabsTrigger>
            <TabsTrigger value="gaming">Gaming</TabsTrigger>
            <TabsTrigger value="study">Study</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Events Grid */}
              <div className="lg:col-span-2">
                {loading && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading events...</p>
                  </div>
                )}
                
                {error && (
                  <div className="text-center py-8">
                    <p className="text-red-400">Error: {error}</p>
                  </div>
                )}
                
                {!loading && !error && events.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No events found. Be the first to create one!</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onEventClick={handleEventClick}
                      onRSVP={handleRSVP}
                    />
                  ))}
                </div>
              </div>
              
              {/* Chat and Contributions Sidebar */}
              <div className="space-y-6">
                <EventChat eventTitle="Active Events" />
                <ContributionBoard eventTitle="Active Events" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vip" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vipEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onEventClick={handleEventClick}
                      onRSVP={handleRSVP}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <EventChat eventTitle="VIP Events" />
                <ContributionBoard eventTitle="VIP Events" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary/60">
            Load More Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;
