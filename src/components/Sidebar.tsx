
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, MessageSquare, Users, Vote, DollarSign, User, MapPin, Music, Phone } from 'lucide-react';

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

  // Custom Tissue Logo Component
  const TissueLogo = () => (
    <div className="relative group">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        className="transition-all duration-300 group-hover:scale-110"
      >
        {/* Main tissue paper layers */}
        <path
          d="M6 8 Q16 4 26 8 Q26 12 24 16 Q20 20 16 20 Q12 20 8 16 Q6 12 6 8 Z"
          fill="url(#tissueGradient1)"
          className="opacity-90"
        />
        <path
          d="M8 12 Q16 8 24 12 Q24 16 22 20 Q18 24 16 24 Q14 24 10 20 Q8 16 8 12 Z"
          fill="url(#tissueGradient2)"
          className="opacity-80"
        />
        <path
          d="M10 16 Q16 12 22 16 Q22 20 20 24 Q18 26 16 26 Q14 26 12 24 Q10 20 10 16 Z"
          fill="url(#tissueGradient3)"
          className="opacity-70"
        />
        
        {/* Soft texture lines */}
        <path d="M8 10 Q16 8 24 10" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none"/>
        <path d="M9 14 Q16 12 23 14" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none"/>
        <path d="M11 18 Q16 16 21 18" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none"/>
        
        {/* Glow effect */}
        <circle cx="16" cy="16" r="12" fill="none" stroke="url(#glowGradient)" strokeWidth="0.5" opacity="0.6"/>
        
        <defs>
          <linearGradient id="tissueGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="tissueGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="tissueGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" opacity="0.8"/>
            <stop offset="100%" stopColor="#fca5a5" opacity="0.2"/>
          </linearGradient>
        </defs>
      </svg>
      
      {/* Pulsing glow effect */}
      <div className="absolute inset-0 rounded-full bg-red-600/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-border p-4">
      <div className="flex items-center space-x-3 mb-8 group cursor-pointer">
        <TissueLogo />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-red-600 to-pink-500 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-pink-400 transition-all duration-300">
          tissue
        </h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${
              location.pathname === item.path ? 'bg-red-600/20 text-red-600' : 'text-gray-400 hover:text-white'
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
