
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Users, Trophy, MessageSquare, Hash } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      title: 'Host Event',
      description: 'Create your own server',
      color: 'from-primary to-primary/80',
      action: 'host'
    },
    {
      icon: Users,
      title: 'Find Squad',
      description: 'Join a community',
      color: 'from-accent to-accent/80',
      action: 'collaborate'
    },
    {
      icon: Trophy,
      title: 'Leaderboard',
      description: 'Check rankings',
      color: 'from-primary to-accent',
      action: 'leaderboard'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Join conversations',
      color: 'from-accent to-primary',
      action: 'chat'
    }
  ];

  return (
    <section className="py-12 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
            <Hash className="w-8 h-8 text-primary mr-2" />
            Quick <span className="text-gradient-red">Actions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to create epic student events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Card key={action.action} className="discord-card hover-lift group cursor-pointer">
              <div className="p-6 text-center space-y-4">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} text-white group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-7 h-7" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {action.description}
                  </p>
                </div>
                
                <Button variant="outline" size="sm" className="w-full border-primary/30 hover:border-primary/60">
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
