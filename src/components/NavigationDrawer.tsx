
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle,
  DrawerTrigger,
  DrawerClose 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { 
  Zap, Home, TrendingUp, MessageSquare, Users, Vote, 
  DollarSign, User, MapPin, Music, Phone, X 
} from 'lucide-react';

const NavigationDrawer = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: TrendingUp, label: 'Events', path: '/events' },
    { icon: DollarSign, label: 'Invest', path: '/invest' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Users, label: 'Communities', path: '/communities' },
    { icon: Vote, label: 'Voting', path: '/voting' },
    { icon: MapPin, label: 'Travel', path: '/travel' },
    { icon: Music, label: 'Music', path: '/music' },
    { icon: Phone, label: 'Radio', path: '/radio' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2 p-2 hover:bg-red-600/20 rounded-lg transition-colors"
        >
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-red-600">society6</span>
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="bg-black border-border">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-red-600">society6</span>
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm">
              <X className="w-5 h-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="px-4 pb-8">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <DrawerClose key={item.path} asChild>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-red-600/20 text-red-600' 
                      : 'text-gray-300 hover:text-white hover:bg-secondary/50'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-lg font-medium">{item.label}</span>
                </Link>
              </DrawerClose>
            ))}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NavigationDrawer;
