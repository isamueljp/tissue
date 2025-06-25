
import { Link, useLocation } from 'react-router-dom';
import { Users, Home, TrendingUp, MessageSquare, Vote, DollarSign, User, MapPin, Music, Phone } from 'lucide-react';

const Sidebar = () => {
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
    <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-4 hidden lg:block">
      <div className="flex items-center space-x-2 mb-8">
        <Users className="w-8 h-8 text-red-600" />
        <h1 className="text-xl font-bold text-red-600">commons</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${
              location.pathname === item.path ? 'bg-red-600/20 text-red-600' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
