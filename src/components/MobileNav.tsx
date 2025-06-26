
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home, Calendar, DollarSign, MessageCircle, Users, 
  Vote, Plane, Music, Radio, User, Zap, X, Menu
} from 'lucide-react';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/events', icon: Calendar, label: 'Events' },
    { href: '/invest', icon: DollarSign, label: 'Invest' },
    { href: '/messages', icon: MessageCircle, label: 'Messages' },
    { href: '/communities', icon: Users, label: 'Communities' },
    { href: '/voting', icon: Vote, label: 'Voting' },
    { href: '/travel', icon: Plane, label: 'Travel' },
    { href: '/music', icon: Music, label: 'Music' },
    { href: '/radio', icon: Radio, label: 'Radio' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleNav}
        className="p-2 hover:bg-red-600/20"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={toggleNav}
        />
      )}

      {/* Navigation Drawer */}
      <div className={`nav-drawer ${isOpen ? 'nav-drawer-open' : 'nav-drawer-closed'}`}>
        <div className="w-80 h-full bg-black border-r border-border flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-red-600">society6</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleNav}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={toggleNav}
                  className={`sidebar-item ${isActive ? 'bg-red-600/20 text-red-400' : 'text-gray-300 hover:text-white'}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button className="w-full bg-red-600 hover:bg-red-700">
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
