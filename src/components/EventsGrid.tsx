import { EventCard } from './EventCard';
import EventChat from './EventChat';
import ContributionBoard from './ContributionBoard';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Hash, Zap } from 'lucide-react';
import { Input } from "@/components/ui/input";

const EventsGrid = () => {
  // Mock event data
  const events = [
    {
      id: '1',
      title: 'VIP Pool Party Mixer',
      description: 'Exclusive rooftop pool party with DJ, premium drinks, and networking opportunities.',
      date: 'Sat, Dec 30',
      time: '8:00 PM',
      location: 'Luxury Rooftop - Downtown',
      attendeeCount: 38,
      maxAttendees: 50,
      points: 150,
      category: 'Pool Party',
      isVip: true,
      hostName: 'sarah_chen',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400'
    },
    {
      id: '2',
      title: 'Gaming Tournament Night',
      description: 'Competitive gaming with prizes, snacks, and energy drinks.',
      date: 'Fri, Dec 29',
      time: '7:00 PM',
      location: 'Student Center - Room 205',
      attendeeCount: 24,
      maxAttendees: 30,
      points: 75,
      category: 'Gaming',
      isVip: false,
      hostName: 'alex_rodriguez'
    },
    {
      id: '3',
      title: 'Study Group & Coffee',
      description: 'Finals prep session with coffee, snacks, and good vibes.',
      date: 'Thu, Dec 28',
      time: '2:00 PM',
      location: 'Library - Study Hall',
      attendeeCount: 12,
      maxAttendees: 20,
      points: 50,
      category: 'Study',
      isVip: false,
      hostName: 'maya_patel'
    }
  ];

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              </div>
              
              {/* Chat and Contributions Sidebar */}
              <div className="space-y-6">
                <EventChat eventTitle="VIP Pool Party Mixer" />
                <ContributionBoard eventTitle="VIP Pool Party Mixer" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vip" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.filter(event => event.isVip).map((event) => (
                    <EventCard key={event.id} {...event} />
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
