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

  // Premium Tissue Logo - Billion Dollar Company Design
  const TissueLogo = () => (
    <div className="relative group cursor-pointer">
      {/* Outer premium glow ring */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
      
      {/* Main logo container */}
      <div className="relative w-10 h-10 bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-full flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-110 transition-all duration-300 group-hover:shadow-purple-500/25">
        
        {/* Inner gradient background */}
        <div className="absolute inset-1 bg-gradient-to-br from-white/5 to-transparent rounded-full"></div>
        
        {/* Premium tissue icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" className="relative z-10 text-white group-hover:text-blue-100 transition-colors duration-300" fill="none">
          {/* Sophisticated tissue layers with premium gradients */}
          <defs>
            <linearGradient id="tissueGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
              <stop offset="50%" stopColor="#e0e7ff" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.5"/>
            </linearGradient>
            <linearGradient id="tissueGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.6"/>
            </linearGradient>
            <linearGradient id="tissueGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.4"/>
            </linearGradient>
          </defs>
          
          {/* Top tissue layer - premium design */}
          <path 
            d="M4 7 Q6 5 12 5 Q18 5 20 7 Q20 9 18 11 Q15 13 12 13 Q9 13 6 11 Q4 9 4 7 Z" 
            fill="url(#tissueGradient1)" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="0.5"
          />
          
          {/* Middle tissue layer */}
          <path 
            d="M5 10 Q7 8 12 8 Q17 8 19 10 Q19 12 17 14 Q14 16 12 16 Q10 16 7 14 Q5 12 5 10 Z" 
            fill="url(#tissueGradient2)" 
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="0.5"
          />
          
          {/* Bottom tissue layer */}
          <path 
            d="M6 13 Q8 11 12 11 Q16 11 18 13 Q18 15 16 17 Q13 19 12 19 Q11 19 8 17 Q6 15 6 13 Z" 
            fill="url(#tissueGradient3)" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="0.5"
          />
          
          {/* Premium highlight effect */}
          <ellipse cx="12" cy="9" rx="4" ry="1.5" fill="rgba(255,255,255,0.15)"/>
          <ellipse cx="12" cy="12" rx="3" ry="1" fill="rgba(255,255,255,0.1)"/>
        </svg>
        
        {/* Subtle inner shine effect */}
        <div className="absolute top-1 left-2 w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
      </div>
      
      {/* Premium status indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full border border-black shadow-lg"></div>
    </div>
  );

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-border p-4">
      <div className="flex items-center space-x-3 mb-8 group">
        <TissueLogo />
        <h1 className="text-2xl font-bold transition-colors duration-300 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400">
          tissue
        </h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(item => <Link key={item.path} to={item.path} className={`sidebar-item ${location.pathname === item.path ? 'bg-red-600/20 text-red-600' : 'text-gray-400 hover:text-white'}`}>
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>)}
      </nav>
    </div>
  );
};

export default Sidebar;
