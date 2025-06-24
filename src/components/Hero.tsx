
import { Button } from "@/components/ui/button";
import { Hash, Users, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Futuristic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-primary/5" />
      
      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Hash className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-5xl md:text-7xl font-bold">
              society<span className="text-gradient-red">6</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The ultimate Discord for student events. Host, chat, contribute, and connect 
            <span className="text-primary font-semibold"> instantly</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 futuristic-glow">
              <Zap className="w-5 h-5 mr-2" />
              Join Events
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/30 hover:border-primary/60">
              <Users className="w-5 h-5 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="text-center discord-card p-4">
            <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Events</div>
          </div>
          <div className="text-center discord-card p-4">
            <div className="text-2xl md:text-3xl font-bold text-accent">2.5K</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
          <div className="text-center discord-card p-4">
            <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
