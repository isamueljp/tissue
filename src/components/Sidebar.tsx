import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, MessageSquare, Users, Vote, DollarSign, User, MapPin, Music, Phone } from 'lucide-react';
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
    icon: Phone,
    label: 'Radio',
    path: '/radio'
  }, {
    icon: User,
    label: 'Profile',
    path: '/profile'
  }];

  // Simple Instagram-style Tissue Logo
  const TissueLogo = () => <div className="relative group cursor-pointer">
      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-red-500/25 transition-all duration-300 group-hover:scale-110">
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-white" fill="currentColor">
          <path d="M4 6 Q10 3 16 6 Q16 8 15 10 Q12 12 10 12 Q8 12 5 10 Q4 8 4 6 Z" opacity="0.9" />
          <path d="M5 9 Q10 7 15 9 Q15 11 14 13 Q12 15 10 15 Q8 15 6 13 Q5 11 5 9 Z" opacity="0.7" />
          <path d="M6 12 Q10 10 14 12 Q14 14 13 16 Q11 17 10 17 Q9 17 7 16 Q6 14 6 12 Z" opacity="0.5" />
        </svg>
      </div>
    </div>;
  return <div className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-border p-4">
      <div className="flex items-center space-x-3 mb-8 group">
        <TissueLogo />
        <h1 className="text-2xl font-bold transition-colors duration-300 text-[#fa0000]">
          tissue
        </h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(item => <Link key={item.path} to={item.path} className={`sidebar-item ${location.pathname === item.path ? 'bg-red-600/20 text-red-600' : 'text-gray-400 hover:text-white'}`}>
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>)}
      </nav>
    </div>;
};
export default Sidebar;