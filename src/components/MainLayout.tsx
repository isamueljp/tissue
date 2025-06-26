
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <Outlet />
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-border md:hidden z-50 safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {/* Mobile nav items will be added here */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
