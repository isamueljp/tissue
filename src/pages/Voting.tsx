
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Vote, TrendingUp, Users, Clock, Star, 
  Music, MapPin, Calendar, Trophy, Zap,
  ThumbsUp, ThumbsDown, Heart, MessageCircle
} from 'lucide-react';

const Voting = () => {
  const [activeTab, setActiveTab] = useState('events');

  const eventProposals = [
    {
      id: '1',
      title: 'Silent Disco on Campus',
      proposer: '@sarah_vibe',
      description: 'Three different DJ channels, dance under the stars with wireless headphones',
      votes: 89,
      totalVotes: 120,
      timeLeft: '2 days left',
      category: 'Music & Dance',
      estimatedCost: '$500',
      location: 'Main Quad',
      tags: ['#silentdisco', '#campus', '#unique'],
      status: 'winning',
      comments: 23
    },
    {
      id: '2',
      title: 'Midnight Food Truck Festival',
      proposer: '@foodie_alex',
      description: 'Late-night food trucks with different cuisines for night owls',
      votes: 67,
      totalVotes: 120,
      timeLeft: '2 days left',
      category: 'Food & Social',
      estimatedCost: '$800',
      location: 'Parking Lot B',
      tags: ['#foodtruck', '#midnight', '#variety'],
      status: 'competing',
      comments: 15
    },
    {
      id: '3',
      title: 'Rooftop Movie Marathon',
      proposer: '@movie_maya',
      description: 'Classic movies under the stars with blankets and popcorn',
      votes: 45,
      totalVotes: 120,
      timeLeft: '2 days left',
      category: 'Entertainment',
      estimatedCost: '$300',
      location: 'Library Rooftop',
      tags: ['#movies', '#rooftop', '#chill'],
      status: 'trailing',
      comments: 8
    }
  ];

  const hostVoting = [
    {
      id: '1',
      name: 'Sarah Chen',
      username: '@sarah_vibe',
      experience: '23 events hosted',
      rating: 4.8,
      votes: 156,
      totalVotes: 200,
      specialties: ['DJ Events', 'Rooftop Parties', 'VIP Experiences'],
      recentEvent: 'Epic Rooftop Sunset',
      proposal: 'NYU Spring Festival 2025'
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      username: '@alex_games',
      experience: '18 events hosted',
      rating: 4.6,
      votes: 124,
      totalVotes: 200,
      specialties: ['Gaming Tournaments', 'Tech Events', 'Competitions'],
      recentEvent: 'Gaming Championship',
      proposal: 'Campus Gaming Convention'
    }
  ];

  const musicVotes = [
    {
      event: 'VIP Rooftop Party',
      songs: [
        { title: 'Blinding Lights', artist: 'The Weeknd', votes: 45 },
        { title: 'Levitating', artist: 'Dua Lipa', votes: 38 },
        { title: 'Good 4 U', artist: 'Olivia Rodrigo', votes: 32 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'winning': return 'bg-green-600';
      case 'competing': return 'bg-yellow-600';
      case 'trailing': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'winning': return '🏆 Leading';
      case 'competing': return '⚡ Competitive';
      case 'trailing': return '🔄 Catching Up';
      default: return 'Voting';
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Voting</h1>
          <p className="text-gray-400">Shape the future of campus events - your voice matters!</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-secondary mb-8">
            <TabsTrigger value="events">Event Ideas</TabsTrigger>
            <TabsTrigger value="hosts">Host Elections</TabsTrigger>
            <TabsTrigger value="music">Music Votes</TabsTrigger>
            <TabsTrigger value="features">App Features</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">🗳️ Vote for Next Week's Event</h2>
              <p className="text-gray-400">Top voted event gets funded and organized!</p>
            </div>
            
            {eventProposals.map((proposal) => (
              <Card key={proposal.id} className="twitter-card p-6">
                <div className="space-y-4">
                  {/* Proposal Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(proposal.status)}>
                          {getStatusText(proposal.status)}
                        </Badge>
                        <span className="text-sm text-gray-400">by {proposal.proposer}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{proposal.title}</h3>
                      <p className="text-gray-300 mb-3">{proposal.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-500">{proposal.votes}</div>
                      <div className="text-sm text-gray-400">votes</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {proposal.timeLeft}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      {proposal.location}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                      {proposal.category}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Star className="w-4 h-4 mr-2 text-purple-500" />
                      {proposal.estimatedCost}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {proposal.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Vote Progress</span>
                      <span>{Math.round((proposal.votes / proposal.totalVotes) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(proposal.votes / proposal.totalVotes) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <Button size="sm" variant="ghost" className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{proposal.comments}</span>
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400">
                        Share
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-red-600/30">
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        Pass
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Vote
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="hosts" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">🏆 Host Elections</h2>
              <p className="text-gray-400">Vote for who should organize the next big event</p>
            </div>

            {hostVoting.map((host) => (
              <Card key={host.id} className="twitter-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {host.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{host.name}</h3>
                        <p className="text-gray-400">{host.username}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{host.rating}/5.0</span>
                          <span className="text-sm text-gray-400">• {host.experience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-500">{host.votes}</div>
                      <div className="text-sm text-gray-400">votes</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Proposal: <span className="text-white font-medium">{host.proposal}</span></p>
                    <p className="text-sm text-gray-400 mb-2">Last Event: <span className="text-white">{host.recentEvent}</span></p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {host.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="border-blue-600 text-blue-400">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Progress 
                      value={(host.votes / host.totalVotes) * 100} 
                      className="h-2 mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{Math.round((host.votes / host.totalVotes) * 100)}% confidence</span>
                      <span>{host.totalVotes} total votes</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Vote className="w-4 h-4 mr-2" />
                      Vote for {host.name.split(' ')[0]}
                    </Button>
                    <Button variant="outline" className="border-gray-600">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="music" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">🎵 Music Voting</h2>
              <p className="text-gray-400">Help curate the perfect playlist for upcoming events</p>
            </div>

            {musicVotes.map((event, eventIndex) => (
              <Card key={eventIndex} className="twitter-card p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Music className="w-5 h-5 text-purple-500 mr-2" />
                  {event.event} - Playlist Vote
                </h3>
                
                <div className="space-y-4">
                  {event.songs.map((song, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                          <Music className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{song.title}</p>
                          <p className="text-sm text-gray-400">{song.artist}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">{song.votes} votes</span>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Heart className="w-3 h-3 mr-1" />
                          Vote
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="outline" className="w-full border-purple-600 text-purple-600">
                    <Music className="w-4 h-4 mr-2" />
                    Suggest a Song
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">⚡ App Feature Voting</h2>
              <p className="text-gray-400">Help us build the features you want to see</p>
            </div>

            <Card className="twitter-card p-6">
              <h3 className="text-lg font-bold mb-4">Upcoming Features</h3>
              <div className="space-y-4">
                {[
                  { feature: 'Live Event Streaming', votes: 234, description: 'Stream events live for remote attendees' },
                  { feature: 'AI Event Matching', votes: 198, description: 'Smart suggestions based on your preferences' },
                  { feature: 'Event Photo Albums', votes: 156, description: 'Collaborative photo sharing for events' },
                  { feature: 'Campus Integration', votes: 143, description: 'Connect with official university events' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-medium">{item.feature}</p>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">{item.votes} votes</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Zap className="w-3 h-3 mr-1" />
                        Vote
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Voting;
