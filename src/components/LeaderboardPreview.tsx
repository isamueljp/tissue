
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, TrendingUp } from 'lucide-react';

const LeaderboardPreview = () => {
  const topUsers = [
    {
      rank: 1,
      name: 'Sarah Chen',
      points: 2450,
      streak: 12,
      eventsHosted: 8,
      avatar: '🏆'
    },
    {
      rank: 2,
      name: 'Alex Rodriguez',
      points: 2180,
      streak: 8,
      eventsHosted: 6,
      avatar: '🥈'
    },
    {
      rank: 3,
      name: 'Maya Patel',
      points: 1920,
      streak: 15,
      eventsHosted: 5,
      avatar: '🥉'
    },
    {
      rank: 4,
      name: 'Jordan Kim',
      points: 1650,
      streak: 6,
      eventsHosted: 7,
      avatar: '⭐'
    },
    {
      rank: 5,
      name: 'Emma Thompson',
      points: 1480,
      streak: 4,
      eventsHosted: 4,
      avatar: '🌟'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Leaderboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete with fellow students and climb the ranks by hosting amazing events
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <Trophy className="w-6 h-6 text-accent mr-2" />
                  Top Hosts
                </h3>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  This Month
                </Badge>
              </div>

              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <div 
                    key={user.rank}
                    className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
                      index < 3 ? 'bg-gradient-to-r from-primary/5 to-accent/5' : 'bg-secondary/30'
                    } hover:bg-primary/10`}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-2xl">{user.avatar}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{user.name}</h4>
                          {user.streak >= 10 && (
                            <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                              🔥 {user.streak} streak
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {user.eventsHosted} events hosted
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center text-accent font-bold">
                          <Star className="w-4 h-4 mr-1" />
                          {user.points.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          #{user.rank}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;
