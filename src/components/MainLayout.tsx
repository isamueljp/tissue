
import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav';
import { Zap } from 'lucide-react';

const MainLayout = () => {
  return (
    <div className="mobile-container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MobileNav />
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-red-600">society6</h1>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
