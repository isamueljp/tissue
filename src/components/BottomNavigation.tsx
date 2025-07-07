
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, MessageSquare, Users, User, Vote, DollarSign, MapPin, Music } from 'lucide-react';

export const BottomNavigation = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/'
    },
    {
      icon: TrendingUp,
      label: 'Events',
      path: '/events'
    },
    {
      icon: DollarSign,
      label: 'Invest',
      path: '/invest'
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      path: '/messages'
    },
    {
      icon: Users,
      label: 'Communities',
      path: '/communities'
    },
    {
      icon: Vote,
      label: 'Voting',
      path: '/voting'
    },
    {
      icon: MapPin,
      label: 'Travel',
      path: '/travel'
    },
    {
      icon: Music,
      label: 'Music',
      path: '/music'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-2 overflow-x-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px] ${
              location.pathname === item.path
                ? 'text-[#00197e] bg-[#00197e]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon className="w-4 h-4 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
