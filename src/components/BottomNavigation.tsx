
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, MessageSquare, DollarSign, User } from 'lucide-react';

export const BottomNavigation = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/'
    },
    {
      icon: DollarSign,
      label: 'Invest',
      path: '/invest'
    },
    {
      icon: TrendingUp,
      label: 'Events',
      path: '/events',
      isCenter: true
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      path: '/messages'
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
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all min-w-[60px] ${
              location.pathname === item.path
                ? 'text-[#00197e] bg-[#00197e]/20 shadow-lg shadow-[#00197e]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon 
              className={`mb-1 transition-all ${
                item.isCenter 
                  ? 'w-6 h-6' 
                  : 'w-4 h-4'
              } ${
                location.pathname === item.path && item.isCenter
                  ? 'drop-shadow-[0_0_8px_rgba(0,25,126,0.6)]'
                  : ''
              }`} 
            />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
