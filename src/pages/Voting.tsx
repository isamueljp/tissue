
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vote, TrendingUp, Users, Calendar, Music, User } from 'lucide-react';

const Voting = () => {
  const [votedItems, setVotedItems] = useState<string[]>([]);

  const eventProposals = [
    {
      id: '1',
      title: 'Underground Rave',
      description: 'Secret location electronic music event',
      proposer: 'DJ_Mike',
      votes: 234,
      category: 'Music',
      deadline: '2 days',
      fundingGoal: 8000
    },
    {
      id: '2',
      title: 'Hackathon Weekend',
      description: '48-hour coding competition with prizes',
      proposer: 'CodeMaster',
      votes: 189,
      category: 'Tech',
      deadline: '5 days',
      fundingGoal: 3000
    }
  ];

  const hostVoting = [
    {
      id: '1',
      name: 'Sarah Chen',
      events: 8,
      rating: 4.9,
      votes: 156,
      category: 'VIP Events'
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      events: 12,
      rating: 4.7,
      votes: 143,
      category: 'Gaming'
    }
  ];

  const musicVoting = [
    {
      id: '1',
      event: 'VIP Rooftop Party',
      songs: [
        { title: 'Blinding Lights', artist: 'The Weeknd', votes: 45 },
        { title: 'Levitating', artist: 'Dua Lipa', votes: 38 },
        { title: 'Good 4 U', artist: 'Olivia Rodrigo', votes: 29 }
      ]
    }
  ];

  const handleVote = (itemId: string, type: string) => {
    if (!votedItems.includes(`${type}-${itemId}`)) {
      setVotedItems([...votedItems, `${type}-${itemId}`]);
      // Handle vote logic here
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-white">Community Voting</h1>

      {/* Event Proposals */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">📝 Event Proposals</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {eventProposals.map((proposal) => (
            <Card key={proposal.id} className="twitter-card p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{proposal.title}</h3>
                    <p className="text-gray-400">{proposal.description}</p>
                  </div>
                  <Badge className="bg-red-600">{proposal.category}</Badge>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {proposal.proposer}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {proposal.deadline} left
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                    <span className="font-bold text-white">{proposal.votes} votes</span>
                  </div>
                  <span className="text-gray-400">Goal: ${proposal.fundingGoal.toLocaleString()}</span>
                </div>

                <Button
                  onClick={() => handleVote(proposal.id, 'proposal')}
                  disabled={votedItems.includes(`proposal-${proposal.id}`)}
                  className={`w-full ${
                    votedItems.includes(`proposal-${proposal.id}`)
                      ? 'bg-green-600 hover:bg-green-600'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  <Vote className="w-4 h-4 mr-2" />
                  {votedItems.includes(`proposal-${proposal.id}`) ? 'Voted!' : 'Vote for this Event'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Host Voting */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">⭐ Vote for Best Hosts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hostVoting.map((host) => (
            <Card key={host.id} className="twitter-card p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="font-bold text-white">{host.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{host.name}</h3>
                    <p className="text-gray-400">{host.category} Specialist</p>
                  </div>
                  <Badge className="bg-red-600">{host.rating}★</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Events Hosted:</span>
                    <span className="text-white ml-2">{host.events}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Total Votes:</span>
                    <span className="text-white ml-2">{host.votes}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleVote(host.id, 'host')}
                  disabled={votedItems.includes(`host-${host.id}`)}
                  className={`w-full ${
                    votedItems.includes(`host-${host.id}`)
                      ? 'bg-green-600 hover:bg-green-600'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  <Vote className="w-4 h-4 mr-2" />
                  {votedItems.includes(`host-${host.id}`) ? 'Voted!' : 'Vote for Host'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Music Voting */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">🎵 Vote for Event Music</h2>
        <Card className="twitter-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">VIP Rooftop Party Playlist</h3>
          <div className="space-y-3">
            {musicVoting[0].songs.map((song, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center space-x-3">
                  <Music className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-semibold text-white">{song.title}</p>
                    <p className="text-gray-400 text-sm">{song.artist}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-semibold">{song.votes} votes</span>
                  <Button
                    size="sm"
                    onClick={() => handleVote(`song-${index}`, 'music')}
                    disabled={votedItems.includes(`music-song-${index}`)}
                    className={
                      votedItems.includes(`music-song-${index}`)
                        ? 'bg-green-600 hover:bg-green-600'
                        : 'bg-red-600 hover:bg-red-700'
                    }
                  >
                    <Vote className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Voting;
