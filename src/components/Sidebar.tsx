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

  // Premium Four Degree Logo
  const FourDegreeLogo = () => <div className="relative group cursor-pointer">
      {/* Outer premium glow ring */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
      
      {/* Main logo container */}
      <div className="relative w-10 h-10 bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-full flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-110 transition-all duration-300 group-hover:shadow-purple-500/25">
        
        {/* Inner gradient background */}
        <div className="absolute inset-1 bg-gradient-to-br from-white/5 to-transparent rounded-full"></div>
        
        {/* Four Degree icon - stylized "4°" */}
        <div className="relative z-10 text-white group-hover:text-blue-100 transition-colors duration-300 font-bold text-sm">
          4°
        </div>
        
        {/* Subtle inner shine effect */}
        <div className="absolute top-1 left-2 w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
      </div>
      
      {/* Premium status indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full border border-black shadow-lg"></div>
    </div>;
  return <div className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-border p-4">
      <div className="flex items-center space-x-3 mb-8 group">
        <FourDegreeLogo />
        <h1 className="text-2xl font-bold transition-colors duration-300 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400">fourth degree</h1>
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