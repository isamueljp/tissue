
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Radio, Mic, Users, Volume2, Play, Pause, 
  Heart, Share, Plus, Search, Headphones,
  Clock, TrendingUp, Star, Settings
} from 'lucide-react';

const RadioPage = () => {
  const [isLive, setIsLive] = useState(false);
  const [currentStation, setCurrentStation] = useState('Campus Vibes FM');

  const liveStations = [
    {
      id: '1',
      name: 'Campus Vibes FM',
      dj: 'DJ Sarah',
      listeners: 234,
      genre: 'Chill/Lo-fi',
      nowPlaying: 'Sunset Dreams - Chill Collective',
      description: 'The perfect soundtrack for campus life',
      isLive: true,
      duration: '2h 15m'
    },
    {
      id: '2',
      name: 'Party Central Radio',
      dj: 'DJ Marcus',
      listeners: 189,
      genre: 'EDM/Dance',
      nowPlaying: 'Electric Nights - Neon Pulse',
      description: 'Non-stop party hits and electronic beats',
      isLive: true,
      duration: '1h 45m'
    },
    {
      id: '3',
      name: 'Midnight Confessions',
      dj: 'DJ Luna',
      listeners: 156,
      genre: 'Indie/Alternative',
      nowPlaying: 'Whispered Secrets - Night Owls',
      description: 'Late night vibes and deep conversations',
      isLive: true,
      duration: '3h 20m'
    },
    {
      id: '4',
      name: 'Study Session Sounds',
      dj: 'DJ Focus',
      listeners: 98,
      genre: 'Ambient/Focus',
      nowPlaying: 'Deep Concentration - Study Beats',
      description: 'Background music for productive sessions',
      isLive: false,
      duration: 'Starting soon'
    }
  ];

  const talkShows = [
    {
      id: '1',
      title: 'Campus Conversations',
      host: 'Alex & Maya',
      topic: 'Student Life Hacks',
      listeners: 67,
      nextShow: 'Tomorrow 8PM',
      description: 'Weekly talk about college life, relationships, and everything in between'
    },
    {
      id: '2',
      title: 'Tech Talk Tuesday',
      host: 'Code Collective',
      topic: 'AI in Student Life',
      listeners: 45,
      nextShow: 'Tuesday 7PM',
      description: 'Discussing the latest tech trends affecting students'
    }
  ];

  const upcomingShows = [
    { time: '8:00 PM', show: 'Evening Chill Mix', dj: 'DJ Sarah', genre: 'Chill' },
    { time: '9:30 PM', show: 'Party Prep Hour', dj: 'DJ Marcus', genre: 'Dance' },
    { time: '11:00 PM', show: 'Midnight Confessions', dj: 'DJ Luna', genre: 'Indie' },
    { time: '12:30 AM', show: 'Late Night Study', dj: 'DJ Focus', genre: 'Ambient' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Radio Station</h1>
            <p className="text-gray-400">Tune in, talk, and connect through live audio</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-red-600/30">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button 
              className={`${isLive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
              onClick={() => setIsLive(!isLive)}
            >
              <Mic className="w-4 h-4 mr-2" />
              {isLive ? 'End Broadcast' : 'Go Live'}
            </Button>
          </div>
        </div>

        {/* Live Broadcast Status */}
        {isLive && (
          <Card className="bg-gradient-to-r from-red-600/20 to-red-800/20 p-4 mb-6 border border-red-600/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="font-semibold text-red-400">You're Live!</h3>
                  <p className="text-sm text-gray-300">Broadcasting to 23 listeners</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Current Station */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-red-600/20 p-6 mb-6 border border-red-600/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-600/30 rounded-full flex items-center justify-center">
                <Radio className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{currentStation}</h3>
                <p className="text-gray-400">Now Playing: Sunset Dreams - Chill Collective</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-green-600 animate-pulse">LIVE</Badge>
                  <span className="text-sm text-gray-400">234 listeners</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="w-5 h-5" />
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 w-12 h-12 rounded-full">
                <Play className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="stations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
            <TabsTrigger value="stations">Live Stations</TabsTrigger>
            <TabsTrigger value="shows">Talk Shows</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>

          <TabsContent value="stations" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Live Radio Stations</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search stations..." 
                  className="pl-10 bg-secondary border-0 w-64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveStations.map((station) => (
                <Card key={station.id} className="bg-card border border-border p-4 hover:border-red-600/40 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                        <Radio className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold flex items-center">
                          {station.name}
                          {station.isLive && <Badge className="ml-2 bg-green-600 animate-pulse">LIVE</Badge>}
                        </h4>
                        <p className="text-sm text-gray-400">DJ: {station.dj}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-300 mb-1">🎵 {station.nowPlaying}</p>
                    <p className="text-xs text-gray-500">{station.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {station.listeners}
                      </span>
                      <Badge variant="outline" className="text-xs border-red-600/30">
                        {station.genre}
                      </Badge>
                    </div>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {station.duration}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-red-600 hover:bg-red-700" 
                      size="sm"
                      onClick={() => setCurrentStation(station.name)}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Listen
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-600/30">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shows" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Talk Shows & Podcasts</h3>
              <Button variant="outline" className="border-red-600/30">
                <Plus className="w-4 h-4 mr-2" />
                Start Show
              </Button>
            </div>

            {talkShows.map((show) => (
              <Card key={show.id} className="bg-card border border-border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{show.title}</h4>
                    <p className="text-sm text-gray-400">Hosted by {show.host}</p>
                    <p className="text-sm text-gray-300 mt-1">Topic: {show.topic}</p>
                  </div>
                  <Badge variant="outline" className="border-red-600/30">
                    Talk Show
                  </Badge>
                </div>

                <p className="text-sm text-gray-400 mb-3">{show.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Headphones className="w-4 h-4 mr-1" />
                      {show.listeners} listeners
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {show.nextShow}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-red-600/30">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700" size="sm">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Today's Schedule</h3>
              <Button variant="outline" className="border-red-600/30">
                <Plus className="w-4 h-4 mr-2" />
                Add Show
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingShows.map((show, index) => (
                <Card key={index} className="bg-card border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{show.time}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{show.show}</h4>
                        <p className="text-sm text-gray-400">with {show.dj}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-red-600/30 text-xs">
                        {show.genre}
                      </Badge>
                      <Button variant="outline" size="sm" className="border-red-600/30">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="text-center py-8">
              <Mic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start Your Radio Show</h3>
              <p className="text-gray-400 mb-6">Share your voice, music, and connect with your community</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Card className="bg-card border border-border p-4">
                  <Radio className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Music Show</h4>
                  <p className="text-sm text-gray-400 mb-3">DJ sets, playlists, and live music</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Start Music Show
                  </Button>
                </Card>
                
                <Card className="bg-card border border-border p-4">
                  <Mic className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Talk Show</h4>
                  <p className="text-sm text-gray-400 mb-3">Discussions, interviews, and conversations</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Start Talk Show
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RadioPage;
