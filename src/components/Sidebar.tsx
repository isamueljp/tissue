import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, MessageSquare, Users, Vote, DollarSign, User, MapPin, Music } from 'lucide-react';
const Sidebar = () => {
  const location = useLocation();
  const menuItems = [{
    icon: Home,
    label: 'Home',
    path: '/'
  }, {
    icon: TrendingUp,
    label: 'Events',
    path: '/events'
  }, {
    icon: DollarSign,
    label: 'Invest',
    path: '/invest'
  }, {
    icon: MessageSquare,
    label: 'Messages',
    path: '/messages'
  }, {
    icon: Users,
    label: 'Communities',
    path: '/communities'
  }, {
    icon: Vote,
    label: 'Voting',
    path: '/voting'
  }, {
    icon: MapPin,
    label: 'Travel',
    path: '/travel'
  }, {
    icon: Music,
    label: 'Music',
    path: '/music'
  }, {
    icon: User,
    label: 'Profile',
    path: '/profile'
  }];

  // Premium Four Degree Logo
  const FourDegreeLogo = () => <div className="relative group cursor-pointer">
      {/* Outer premium glow ring */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
      
      {/* Main logo container */}
      
      
      {/* Premium status indicator */}
      
    </div>;
  return <div className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-border p-4">
      <div className="flex items-center space-x-3 mb-8 group">
        {/* Fourth Degree Logo */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#00197e] flex items-center justify-center">
          <img src="/lovable-uploads/ee40ffbc-5548-405a-b158-a0a40933c6a3.png" alt="Fourth Degree Logo" className="w-full h-full object-contain" />
        </div>
        <FourDegreeLogo />
        <h1 className="text-2xl font-bold transition-colors duration-300 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400">fourth degree</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(item => <Link key={item.path} to={item.path} className={`sidebar-item ${location.pathname === item.path ? 'bg-[#00197e]/20 text-[#00197e]' : 'text-gray-400 hover:text-white'}`}>
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>)}
      </nav>
    </div>;
};
export default Sidebar;