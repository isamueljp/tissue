
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Users, Trophy, Calendar } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      title: 'Host Event',
      description: 'Create your own exclusive event',
      color: 'from-primary to-primary/80',
      action: 'host'
    },
    {
      icon: Users,
      title: 'Find Co-Hosts',
      description: 'Collaborate on epic events',
      color: 'from-accent to-accent/80',
      action: 'collaborate'
    },
    {
      icon: Trophy,
      title: 'Leaderboard',
      description: 'Check your ranking',
      color: 'from-primary to-accent',
      action: 'leaderboard'
    },
    {
      icon: Calendar,
      title: 'My Events',
      description: 'Manage your events',
      color: 'from-accent to-primary',
      action: 'manage'
    }
  ];

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quick <span className="text-gradient-maroon">Actions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to create amazing events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <Card key={action.action} className="group relative overflow-hidden bg-card hover:bg-card/80 border-border hover:border-primary/30 transition-all duration-300 hover-lift">
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} text-white mb-4`}>
                  <action.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {action.description}
                </p>
                
                <Button variant="outline" size="sm" className="w-full">
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
