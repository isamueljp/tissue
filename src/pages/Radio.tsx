
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Radio, Play, Pause, Volume2, VolumeX, Heart, Share,
  Mic, Music, Users, Search, TrendingUp, Star, Headphones
} from 'lucide-react';

const RadioPage = () => {
  const [currentStation, setCurrentStation] = useState('chill-vibes');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('live');

  const liveStations = [
    {
      id: 'chill-vibes',
      name: 'Chill Vibes FM',
      dj: 'DJ Sarah',
      genre: 'Lo-fi & Chill',
      listeners: 234,
      currentSong: 'Midnight Coffee - Lofi Dreams',
      avatar: '🎧',
      isLive: true,
      description: 'Perfect for study sessions and late-night vibes'
    },
    {
      id: 'party-central',
      name: 'Party Central',
      dj: 'DJ Mike',
      genre: 'EDM & Dance',
      listeners: 456,
      currentSong: 'Electric Nights - Bass Drop',
      avatar: '🎵',
      isLive: true,
      description: 'High energy beats to get you moving'
    },
    {
      id: 'indie-corner',
      name: 'Indie Corner',
      dj: 'DJ Alex',
      genre: 'Indie & Alternative',
      listeners: 189,
      currentSong: 'Neon Dreams - Indie Hearts',
      avatar: '🎸',
      isLive: true,
      description: 'Discover new indie artists and hidden gems'
    }
  ];

  const artistRadio = [
    {
      id: 'taylor-swift',
      name: 'Taylor Swift Radio',
      artist: 'Taylor Swift',
      genre: 'Pop',
      listeners: 1200,
      currentSong: 'Anti-Hero',
      image: '👑',
      description: 'All Taylor Swift, all the time'
    },
    {
      id: 'weeknd',
      name: 'The Weeknd Radio',
      artist: 'The Weeknd',
      genre: 'R&B/Pop',
      listeners: 890,
      currentSong: 'Blinding Lights',
      image: '🌙',
      description: 'The Weeknd and similar artists'
    },
    {
      id: 'dua-lipa',
      name: 'Dua Lipa Radio',
      artist: 'Dua Lipa',
      genre: 'Pop/Dance',
      listeners: 756,
      currentSong: 'Levitating',
      image: '💫',
      description: 'Dua Lipa and dance-pop favorites'
    },
    {
      id: 'bad-bunny',
      name: 'Bad Bunny Radio',
      artist: 'Bad Bunny',
      genre: 'Reggaeton/Latin',
      listeners: 1100,
      currentSong: 'Me Porto Bonito',
      image: '🐰',
      description: 'Reggaeton and Latin hits'
    }
  ];

  const podcastStations = [
    {
      id: 'campus-talk',
      name: 'Campus Talk',
      host: 'Student Council',
      topic: 'University Life',
      listeners: 123,
      episode: 'Ep 15: Finals Survival Guide',
      avatar: '🎙️',
      isLive: false
    },
    {
      id: 'tech-bytes',
      name: 'Tech Bytes',
      host: 'CS Society',
      topic: 'Technology',
      listeners: 89,
      episode: 'Ep 8: AI in Education',
      avatar: '💻',
      isLive: true
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const selectStation = (stationId: string) => {
    setCurrentStation(stationId);
    setIsPlaying(true);
  };

  const currentStationData = liveStations.find(s => s.id === currentStation) || liveStations[0];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-red-600 flex items-center">
              <Radio className="w-6 h-6 mr-2" />
              Radio
            </h1>
            <p className="text-gray-400">Live music, podcasts, and student voices</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            <Mic className="w-4 h-4 mr-2" />
            Start Broadcasting
          </Button>
        </div>

        {/* Now Playing Card */}
        <Card className="bg-gradient-to-r from-red-600/20 to-purple-600/20 border-red-600/30 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl">
                {currentStationData.avatar}
              </div>
              <div>
                <h3 className="font-bold text-lg">{currentStationData.name}</h3>
                <p className="text-red-400">{currentStationData.currentSong}</p>
                <p className="text-sm text-gray-400">
                  {currentStationData.dj} • {currentStationData.listeners} listeners
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="hover:text-red-400"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Button
                onClick={togglePlay}
                className="bg-red-600 hover:bg-red-700 w-12 h-12 rounded-full"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
            </div>
          </div>
          
          {/* Volume Control */}
          <div className="mt-4 flex items-center space-x-3">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all"
                style={{ width: `${isMuted ? 0 : volume}%` }}
              />
            </div>
            <span className="text-sm text-gray-400 w-10">{isMuted ? 0 : volume}%</span>
          </div>
        </Card>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search stations, artists, or genres..." 
            className="pl-10 bg-secondary border-0 rounded-full"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
            <TabsTrigger value="live" className="flex items-center space-x-2">
              <Radio className="w-4 h-4" />
              <span>Live Radio</span>
            </TabsTrigger>
            <TabsTrigger value="artists" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Artist Radio</span>
            </TabsTrigger>
            <TabsTrigger value="podcasts" className="flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Podcasts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveStations.map((station) => (
                <Card 
                  key={station.id} 
                  className={`bg-card border cursor-pointer hover:border-red-600/40 transition-all ${
                    currentStation === station.id ? 'border-red-600 bg-red-600/10' : 'border-border'
                  }`}
                  onClick={() => selectStation(station.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{station.avatar}</div>
                        <div>
                          <h3 className="font-semibold">{station.name}</h3>
                          <p className="text-sm text-gray-400">{station.dj}</p>
                        </div>
                      </div>
                      {station.isLive && (
                        <Badge className="bg-red-600 animate-pulse">LIVE</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-2">{station.description}</p>
                    <p className="text-xs text-red-400 mb-3">♪ {station.currentSong}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-gray-400">
                          <Headphones className="w-4 h-4 mr-1" />
                          {station.listeners}
                        </span>
                        <Badge variant="outline" className="text-xs border-red-600/30">
                          {station.genre}
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="p-1 hover:text-red-400">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-1 hover:text-blue-400">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artists" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artistRadio.map((station) => (
                <Card key={station.id} className="bg-card border border-border hover:border-red-600/40 transition-all cursor-pointer">
                  <div className="p-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                        {station.image}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{station.name}</h3>
                        <p className="text-red-400">{station.artist}</p>
                        <p className="text-sm text-gray-400">{station.genre}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{station.description}</p>
                    <p className="text-xs text-red-400 mb-3">♪ Now: {station.currentSong}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Headphones className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{station.listeners} listeners</span>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Play className="w-4 h-4 mr-1" />
                        Play
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="podcasts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {podcastStations.map((podcast) => (
                <Card key={podcast.id} className="bg-card border border-border hover:border-red-600/40 transition-all">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{podcast.avatar}</div>
                        <div>
                          <h3 className="font-semibold">{podcast.name}</h3>
                          <p className="text-sm text-gray-400">{podcast.host}</p>
                        </div>
                      </div>
                      {podcast.isLive && (
                        <Badge className="bg-red-600 animate-pulse">LIVE</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-red-400 mb-2">{podcast.episode}</p>
                    <p className="text-xs text-gray-400 mb-3">Topic: {podcast.topic}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{podcast.listeners} listeners</span>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Play className="w-4 h-4 mr-1" />
                        Listen
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RadioPage;
