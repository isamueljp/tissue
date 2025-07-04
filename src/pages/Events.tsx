
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, MapPin, Calendar, Users, Vote, TrendingUp,
  Clock, Star, Heart, Share, Eye, DollarSign, Trophy
} from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [searchTerm, setSearchTerm] = useState('');

  const events = [
    {
      id: '1',
      title: 'VIP Rooftop Party',
      date: 'Dec 30, 2024',
      time: '8:00 PM',
      location: 'Manhattan Rooftop',
      attendees: 45,
      maxAttendees: 60,
      price: '₹2,500',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=200&fit=crop',
      category: 'Party',
      host: 'Sarah Chen',
      description: 'Join us for an exclusive rooftop party with stunning city views, premium drinks, and amazing vibes!',
      tags: ['Party', 'VIP', 'Rooftop', 'Premium'],
      likes: 234,
      views: 1200
    },
    {
      id: '2',
      title: 'Gaming Tournament',
      date: 'Jan 5, 2025',
      time: '2:00 PM',
      location: 'Tech Hub Gaming Center',
      attendees: 32,
      maxAttendees: 50,
      price: '₹1,000',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
      category: 'Gaming',
      host: 'Alex Rodriguez',
      description: 'Competitive gaming tournament with amazing prizes! Multiple games, multiple winners.',
      tags: ['Gaming', 'Tournament', 'Competition', 'Prizes'],
      likes: 156,
      views: 890
    },
    {
      id: '3',
      title: 'Study Group Marathon',
      date: 'Jan 8, 2025',
      time: '10:00 AM',
      location: 'NYU Library',
      attendees: 28,
      maxAttendees: 35,
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop',
      category: 'Education',
      host: 'Maya Patel',
      description: 'Intensive study session for finals. Coffee, snacks, and focused learning environment provided.',
      tags: ['Study', 'Education', 'Free', 'Library'],
      likes: 89,
      views: 456
    }
  ];

  const polls = [
    {
      id: '1',
      title: 'Best Party Theme for New Year?',
      creator: 'Sarah Chen',
      totalVotes: 234,
      timeLeft: '2 days left',
      options: [
        { text: 'Masquerade Ball', votes: 89, percentage: 38 },
        { text: 'Retro 90s Theme', votes: 67, percentage: 29 },
        { text: 'Black & Gold Elegance', votes: 45, percentage: 19 },
        { text: 'Casual Rooftop Vibes', votes: 33, percentage: 14 }
      ],
      category: 'Party Planning'
    },
    {
      id: '2',
      title: 'Which gaming tournament should we host next?',
      creator: 'Alex Rodriguez',
      totalVotes: 167,
      timeLeft: '5 days left',
      options: [
        { text: 'Valorant Championship', votes: 78, percentage: 47 },
        { text: 'FIFA Tournament', votes: 45, percentage: 27 },
        { text: 'Among Us Night', votes: 28, percentage: 17 },
        { text: 'Minecraft Build-Off', votes: 16, percentage: 9 }
      ],
      category: 'Gaming'
    },
    {
      id: '3',
      title: 'Best study spot on campus?',
      creator: 'Maya Patel',
      totalVotes: 124,
      timeLeft: '1 day left',
      options: [
        { text: 'Main Library 4th Floor', votes: 56, percentage: 45 },
        { text: 'Student Center Quiet Zone', votes: 34, percentage: 27 },
        { text: 'Coffee Shop Corner', votes: 22, percentage: 18 },
        { text: 'Outdoor Study Garden', votes: 12, percentage: 10 }
      ],
      category: 'Education'
    }
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.host.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPolls = polls.filter(poll =>
    poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poll.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poll.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Events & Voting</h1>
          <p className="text-gray-400">Discover amazing events and participate in community decisions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-red-600 hover:bg-red-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Create Event
          </Button>
          <Button variant="outline" className="border-blue-600 text-blue-600">
            <Vote className="w-4 h-4 mr-2" />
            Create Poll
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search events, polls, or creators..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 bg-secondary/50 border-0 rounded-full text-lg py-3"
        />
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="voting">Voting</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="bg-card border border-border overflow-hidden hover:border-red-600/30 transition-all cursor-pointer group">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-600 text-white">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 flex space-x-1">
                    <Badge variant="outline" className="bg-black/50 border-white/20 text-white">
                      <Eye className="w-3 h-3 mr-1" />
                      {event.views}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">
                      {event.title}
                    </h3>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 text-red-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-300">
                        <Users className="w-4 h-4 mr-2 text-green-500" />
                        {event.attendees}/{event.maxAttendees} attending
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-green-500">{event.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                        <Heart className="w-4 h-4 mr-1" />
                        {event.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">by {event.host}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="voting" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPolls.map((poll) => (
              <Card key={poll.id} className="bg-card border border-border p-6 hover:border-blue-600/30 transition-all">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white mb-2">{poll.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>by {poll.creator}</span>
                        <Badge variant="outline" className="border-blue-600 text-blue-600">
                          {poll.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{poll.timeLeft}</p>
                      <p className="text-xs text-gray-500">{poll.totalVotes} votes</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {poll.options.map((option, index) => (
                      <div key={index} className="cursor-pointer hover:bg-secondary/30 p-2 rounded-lg transition-all">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-white">{option.text}</span>
                          <span className="text-xs text-gray-400">{option.percentage}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${option.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{option.votes} votes</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Vote className="w-4 h-4 mr-2" />
                      Vote Now
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400">
                        <Trophy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
