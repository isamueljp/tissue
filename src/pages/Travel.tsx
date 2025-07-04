
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, MapPin, Plane, Car, Train, Radio, Play, Pause,
  Volume2, Users, Star, Heart, Share, Clock, Calendar, Music
} from 'lucide-react';

const Travel = () => {
  const [activeTab, setActiveTab] = useState('travel');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentRadio, setCurrentRadio] = useState<string | null>(null);

  const travelSpots = [
    {
      id: '1',
      name: 'Goa Beach Paradise',
      location: 'Goa, India',
      price: '₹15,000',
      duration: '3 days, 2 nights',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 234,
      tags: ['Beach', 'Party', 'Relaxation'],
      description: 'Perfect beach getaway with stunning sunsets, water sports, and vibrant nightlife.',
      host: 'Sarah Chen',
      travelers: 12,
      maxTravelers: 20
    },
    {
      id: '2',
      name: 'Himalayan Adventure',
      location: 'Manali, Himachal Pradesh',
      price: '₹25,000',
      duration: '5 days, 4 nights',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 189,
      tags: ['Adventure', 'Mountains', 'Trekking'],
      description: 'Thrilling mountain adventure with trekking, camping, and breathtaking views.',
      host: 'Alex Rodriguez',
      travelers: 8,
      maxTravelers: 15
    },
    {
      id: '3',
      name: 'Rajasthan Heritage Tour',
      location: 'Jaipur, Rajasthan',
      price: '₹20,000',
      duration: '4 days, 3 nights',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e02?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 156,
      tags: ['Culture', 'Heritage', 'Royal'],
      description: 'Explore magnificent palaces, forts, and rich cultural heritage of the Pink City.',
      host: 'Maya Patel',
      travelers: 15,
      maxTravelers: 25
    }
  ];

  const radioStations = [
    {
      id: 'r1',
      name: 'Travel Vibes FM',
      genre: 'Chill & Travel',
      listeners: 1234,
      currentSong: 'Wanderlust - Road Trip Mix',
      duration: '3:45',
      host: 'DJ Travel',
      description: 'Perfect soundtrack for your next adventure',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
      isLive: true
    },
    {
      id: 'r2',
      name: 'Mountain Echoes',
      genre: 'Ambient & Nature',
      listeners: 856,
      currentSong: 'Himalayan Dawn - Nature Sounds',
      duration: '5:12',
      host: 'Echo Master',
      description: 'Relax with sounds from the mountains',
      cover: 'https://images.unsplash.com/photo-1464822759844-d150ad6cad0c?w=100&h=100&fit=crop',
      isLive: true
    },
    {
      id: 'r3',
      name: 'Beach Waves Radio',
      genre: 'Tropical & Chill',
      listeners: 967,
      currentSong: 'Ocean Breeze - Tropical Mix',
      duration: '4:23',
      host: 'Wave Rider',
      description: 'Feel the ocean breeze wherever you are',
      cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop',
      isLive: true
    },
    {
      id: 'r4',
      name: 'City Lights FM',
      genre: 'Urban & Electronic',
      listeners: 743,
      currentSong: 'Neon Nights - Electronic Vibes',
      duration: '3:58',
      host: 'Night Owl',
      description: 'Urban beats for city explorers',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop',
      isLive: false
    }
  ];

  const filteredTravelSpots = travelSpots.filter(spot =>
    spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredRadioStations = radioStations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.host.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRadio = (radioId: string) => {
    setCurrentRadio(currentRadio === radioId ? null : radioId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Travel & Radio</h1>
          <p className="text-gray-400">Discover amazing destinations and tune into great music</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plane className="w-4 h-4 mr-2" />
            Plan Trip
          </Button>
          <Button variant="outline" className="border-green-600 text-green-600">
            <Radio className="w-4 h-4 mr-2" />
            Start Radio
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search destinations, radio stations, or genres..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 bg-secondary/50 border-0 rounded-full text-lg py-3"
        />
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="travel">Travel Destinations</TabsTrigger>
          <TabsTrigger value="radio">Radio Stations</TabsTrigger>
        </TabsList>

        <TabsContent value="travel" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTravelSpots.map((spot) => (
              <Card key={spot.id} className="bg-card border border-border overflow-hidden hover:border-red-600/30 transition-all cursor-pointer group">
                <div className="relative">
                  <img 
                    src={spot.image} 
                    alt={spot.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-600 text-white">
                      {spot.duration}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="sm" className="text-white hover:text-red-500 bg-black/20 backdrop-blur-sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium">{spot.rating}</span>
                        <span className="text-xs text-gray-300">({spot.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{spot.travelers}/{spot.maxTravelers}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">
                      {spot.name}
                    </h3>
                    <span className="font-bold text-green-500">{spot.price}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    {spot.location}
                  </div>
                  
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {spot.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {spot.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <p className="text-xs text-gray-500">by {spot.host}</p>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
                        Join Trip
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="radio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRadioStations.map((station) => (
              <Card key={station.id} className="bg-card border border-border p-4 hover:border-green-600/30 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={station.cover} 
                        alt={station.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      {station.isLive && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{station.name}</h3>
                      <p className="text-sm text-gray-400">{station.genre}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{station.listeners} listening</span>
                        {station.isLive && (
                          <Badge className="bg-red-600 text-white text-xs">LIVE</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white truncate">
                          {station.currentSong}
                        </p>
                        <p className="text-xs text-gray-400">by {station.host}</p>
                      </div>
                      <span className="text-xs text-gray-500">{station.duration}</span>
                    </div>
                    
                    <p className="text-xs text-gray-400">{station.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => toggleRadio(station.id)}
                        className={`${
                          currentRadio === station.id 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {currentRadio === station.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Now Playing Bar */}
          {currentRadio && (
            <Card className="fixed bottom-4 left-4 right-4 bg-card border border-border p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {radioStations.find(s => s.id === currentRadio)?.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {radioStations.find(s => s.id === currentRadio)?.currentSong}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setCurrentRadio(null)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Travel;
