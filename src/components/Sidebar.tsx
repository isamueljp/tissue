
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, MessageSquare, Users, Vote, DollarSign, User, MapPin, Music, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const { toast } = useToast();

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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Premium Four Degree Logo
  const FourDegreeLogo = () => <div className="relative group cursor-pointer">
      {/* Outer premium glow ring */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
      
      {/* Main logo container */}
      
      
      {/* Premium status indicator */}
      
    </div>;

  return <div className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-border p-4 flex flex-col">
      <div className="flex items-center space-x-3 mb-8 group">
        {/* Fourth Degree Logo */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#00197e] flex items-center justify-center">
          <img src="/lovable-uploads/ee40ffbc-5548-405a-b158-a0a40933c6a3.png" alt="Fourth Degree Logo" className="w-full h-full object-contain" />
        </div>
        <FourDegreeLogo />
        <h1 className="text-2xl font-bold transition-colors duration-300 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400">fourth degree</h1>
      </div>
      
      <nav className="space-y-2 flex-1">
        {menuItems.map(item => <Link key={item.path} to={item.path} className={`sidebar-item ${location.pathname === item.path ? 'bg-[#00197e]/20 text-[#00197e]' : 'text-gray-400 hover:text-white'}`}>
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>)}
      </nav>

      {/* Sign Out Button */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-red-500/20"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>;
};

export default Sidebar;
