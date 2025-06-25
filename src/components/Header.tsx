
import { MessageSquare, Plus, User, Users, Heart, Bell, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [likes, setLikes] = useState(47);
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();

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
              <Users className="w-6 h-6 text-white font-bold" />
            </div>
            <h1 className="text-2xl font-bold text-primary">commons</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
              <Users className="w-4 h-4" />
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
                className="flex items-center space-x-2 hover:bg-red-600/20 text-red-500"
                onClick={handleLike}
              >
                <Heart className="w-4 h-4 fill-current" />
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
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            <Button variant="secondary" size="sm" className="hidden sm:flex">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Host
            </Button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full bg-accent/20">
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
