
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Music, Play, Pause, SkipForward, SkipBack, Volume2,
  Heart, Share, Plus, Search, Headphones, Radio,
  Mic, Users, Clock, TrendingUp, Star, Shuffle
} from 'lucide-react';

const MusicPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('Lo-fi Sunset Vibes');

  const eventPlaylists = [
    {
      id: '1',
      title: 'Rooftop Chill Sessions',
      creator: '@sarah_vibe',
      songs: 24,
      duration: '1h 32m',
      genre: 'Chill/Lo-fi',
      listeners: 156,
      cover: '🌅',
      description: 'Perfect sunset vibes for rooftop parties'
    },
    {
      id: '2',
      title: 'Gaming Tournament Hype',
      creator: '@alex_games',
      songs: 18,
      duration: '1h 15m',
      genre: 'Electronic/EDM',
      listeners: 89,
      cover: '🎮',
      description: 'High-energy beats for competitive gaming'
    },
    {
      id: '3',
      title: 'Study Flow State',
      creator: '@maya_study',
      songs: 32,
      duration: '2h 8m',
      genre: 'Ambient/Focus',
      listeners: 234,
      cover: '📚',
      description: 'Concentration music for productive sessions'
    }
  ];

  const liveRadioStations = [
    {
      id: '1',
      name: 'Campus Vibes FM',
      dj: 'DJ Sarah',
      listeners: 145,
      genre: 'Mixed',
      nowPlaying: 'Chill Beats for Study',
      isLive: true
    },
    {
      id: '2',
      name: 'Party Central Radio',
      dj: 'DJ Marcus',
      listeners: 78,
      genre: 'Party/Dance',
      nowPlaying: 'Weekend Warm-up Mix',
      isLive: true
    },
    {
      id: '3',
      name: 'Midnight Confessions',
      dj: 'DJ Luna',
      listeners: 56,
      genre: 'Indie/Alternative',
      nowPlaying: 'Late Night Feels',
      isLive: false
    }
  ];

  const trendingSongs = [
    { title: 'Sunset Dreams', artist: 'Chill Collective', votes: 24, category: 'Chill' },
    { title: 'Electric Nights', artist: 'Neon Pulse', votes: 19, category: 'Party' },
    { title: 'Focus Flow', artist: 'Study Beats', votes: 15, category: 'Study' },
    { title: 'Midnight Groove', artist: 'Night Owls', votes: 12, category: 'Late Night' }
  ];

  const musicRequests = [
    { event: 'Rooftop Party Tonight', requester: '@mike_music', song: 'Something upbeat for dancing', time: '2m ago' },
    { event: 'Study Session', requester: '@anna_focus', song: 'Ambient sounds for concentration', time: '5m ago' },
    { event: 'Gaming Tournament', requester: '@pro_gamer', song: 'Epic battle music', time: '8m ago' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Music Hub</h1>
            <p className="text-gray-400">Curate vibes, discover sounds, and connect through music</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-red-600/30">
              <Mic className="w-4 h-4 mr-2" />
              Go Live
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Playlist
            </Button>
          </div>
        </div>

        {/* Now Playing */}
        <Card className="bg-gradient-to-r from-red-600/20 to-purple-600/20 p-6 mb-6 border border-red-600/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-600/30 rounded-lg flex items-center justify-center">
                <Music className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{currentSong}</h3>
                <p className="text-gray-400">Chill Collective</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-red-600">Live</Badge>
                  <span className="text-sm text-gray-400">23 people listening</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700 w-12 h-12 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="sm">
                <SkipForward className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Volume2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="playlists" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="radio">Radio</TabsTrigger>
            <TabsTrigger value="voting">Voting</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="playlists" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Event Playlists</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search playlists..." 
                  className="pl-10 bg-secondary border-0 w-64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventPlaylists.map((playlist) => (
                <Card key={playlist.id} className="bg-card border border-border p-4 hover:border-red-600/40 transition-all">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="w-16 h-16 bg-red-600/20 rounded-lg flex items-center justify-center text-2xl">
                      {playlist.cover}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{playlist.title}</h4>
                      <p className="text-sm text-gray-400">by {playlist.creator}</p>
                      <p className="text-xs text-gray-500 mt-1">{playlist.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-3">
                      <span>{playlist.songs} songs</span>
                      <span>{playlist.duration}</span>
                      <Badge variant="outline" className="text-xs border-red-600/30">
                        {playlist.genre}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <Headphones className="w-4 h-4" />
                      <span>{playlist.listeners} listeners</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        Play
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="radio" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Live Radio Stations</h3>
              <Button variant="outline" className="border-red-600/30">
                <Radio className="w-4 h-4 mr-2" />
                Start Broadcasting
              </Button>
            </div>

            {liveRadioStations.map((station) => (
              <Card key={station.id} className="bg-card border border-border p-4">
                <div className="flex items-center justify-between mb-3">
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
                      <p className="text-xs text-gray-500">Now: {station.nowPlaying}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-gray-400 mb-2">
                      <Users className="w-4 h-4" />
                      <span>{station.listeners}</span>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700" size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Listen
                    </Button>
                  </div>
                </div>
                
                <Badge variant="outline" className="border-red-600/30">
                  {station.genre}
                </Badge>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="voting" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Community Music Voting</h3>
              <Button variant="outline" className="border-red-600/30">
                <Plus className="w-4 h-4 mr-2" />
                Suggest Song
              </Button>
            </div>

            {trendingSongs.map((song, index) => (
              <Card key={index} className="bg-card border border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center text-sm font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{song.title}</h4>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                    <Badge variant="outline" className="border-red-600/30 text-xs">
                      {song.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{song.votes} votes</span>
                    </div>
                    <Button variant="outline" size="sm" className="border-red-600/30">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Music Requests</h3>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Make Request
              </Button>
            </div>

            {musicRequests.map((request, index) => (
              <Card key={index} className="bg-card border border-border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-sm">{request.event}</h4>
                      <Badge variant="outline" className="text-xs border-red-600/30">
                        Request
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-1">{request.song}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>by {request.requester}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {request.time}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-red-600/30">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700" size="sm">
                      Fulfill
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MusicPage;
