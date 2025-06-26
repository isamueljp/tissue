
import { MessageSquare, Plus, User, Zap, Heart, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from 'react';

const Header = () => {
  const [likes, setLikes] = useState(47);
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  const mockNotifications = [
    { id: 1, text: 'Sarah liked your event', time: '2m ago' },
    { id: 2, text: 'New rooftop party starting soon', time: '5m ago' },
    { id: 3, text: 'Alex joined your community', time: '10m ago' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white font-bold" />
            </div>
            <h1 className="text-2xl font-bold text-gradient-red">society6</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>discover</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>events</span>
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            {/* Active Like Button */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-2 hover:bg-red-600/20"
                onClick={handleLike}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span className="text-sm font-medium">{likes}</span>
              </Button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-600 flex items-center justify-center p-0">
                    {notifications}
                  </Badge>
                )}
              </Button>
              
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-lg shadow-lg p-4 z-50">
                  <h3 className="font-semibold mb-3">Notifications</h3>
                  <div className="space-y-2">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="p-2 bg-secondary/50 rounded text-sm">
                        <p>{notif.text}</p>
                        <span className="text-xs text-gray-400">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button variant="secondary" size="sm" className="hidden sm:flex">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 futuristic-glow">
              <Plus className="w-4 h-4 mr-2" />
              Host
            </Button>
            <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full bg-accent/20">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
