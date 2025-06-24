
import EventCard from './EventCard';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

const EventsGrid = () => {
  // Mock event data
  const events = [
    {
      id: '1',
      title: 'VIP Pool Party Mixer',
      description: 'Exclusive rooftop pool party with DJ, premium drinks, and networking opportunities. Limited to 50 students.',
      date: 'Sat, Dec 30',
      time: '8:00 PM',
      location: 'Luxury Rooftop - Downtown',
      attendeeCount: 38,
      maxAttendees: 50,
      points: 150,
      category: 'Pool Party',
      isVip: true,
      hostName: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400'
    },
    {
      id: '2',
      title: 'Gaming Tournament Night',
      description: 'Competitive gaming with prizes, snacks, and energy drinks. Bring your A-game and make new friends.',
      date: 'Fri, Dec 29',
      time: '7:00 PM',
      location: 'Student Center - Room 205',
      attendeeCount: 24,
      maxAttendees: 30,
      points: 75,
      category: 'Gaming',
      isVip: false,
      hostName: 'Alex Rodriguez'
    },
    {
      id: '3',
      title: 'Study Group & Coffee',
      description: 'Finals prep session with coffee, snacks, and good vibes. All majors welcome for collaborative studying.',
      date: 'Thu, Dec 28',
      time: '2:00 PM',
      location: 'Library - Study Hall',
      attendeeCount: 12,
      maxAttendees: 20,
      points: 50,
      category: 'Study',
      isVip: false,
      hostName: 'Maya Patel'
    },
    {
      id: '4',
      title: 'Midnight Movie Marathon',
      description: 'Classic horror movies, popcorn, and cozy vibes. Perfect for night owls and movie enthusiasts.',
      date: 'Sat, Dec 30',
      time: '11:00 PM',
      location: 'Apartment 4B - Oak Street',
      attendeeCount: 8,
      maxAttendees: 15,
      points: 60,
      category: 'Movies',
      isVip: false,
      hostName: 'Jordan Kim',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'
    },
    {
      id: '5',
      title: 'New Year\'s Pre-Party',
      description: 'Get ready for NYE with music, dancing, and countdown practice. Premium venue with full bar.',
      date: 'Sun, Dec 31',
      time: '9:00 PM',
      location: 'Skyline Lounge',
      attendeeCount: 45,
      maxAttendees: 60,
      points: 120,
      category: 'Party',
      isVip: true,
      hostName: 'Emma Thompson',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400'
    },
    {
      id: '6',
      title: 'Fitness Bootcamp',
      description: 'High-energy workout session followed by protein smoothies. All fitness levels welcome!',
      date: 'Mon, Jan 1',
      time: '10:00 AM',
      location: 'Campus Gym - Studio 1',
      attendeeCount: 18,
      maxAttendees: 25,
      points: 80,
      category: 'Fitness',
      isVip: false,
      hostName: 'Marcus Johnson'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover <span className="text-gradient-gold">Premium Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join exclusive events, earn points, and connect with fellow students in your area
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search events..." 
              className="pl-10 bg-secondary border-secondary"
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-6 bg-secondary">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="vip">VIP</TabsTrigger>
            <TabsTrigger value="party">Parties</TabsTrigger>
            <TabsTrigger value="gaming">Gaming</TabsTrigger>
            <TabsTrigger value="study">Study</TabsTrigger>
            <TabsTrigger value="fitness">Fitness</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="vip" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.filter(event => event.isVip).map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>
          
          {/* Add other tab contents as needed */}
        </Tabs>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="hover-lift">
            Load More Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;
