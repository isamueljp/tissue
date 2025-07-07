
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { BottomNavigation } from './BottomNavigation';

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' && location.search === '';
  const shouldHideSidebar = isAuthPage;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Desktop Sidebar - hidden on auth pages and mobile */}
      {!shouldHideSidebar && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}
      
      {/* Main Content */}
      <div className={`flex-1 ${!shouldHideSidebar ? 'md:ml-64' : ''}`}>
        <Outlet />
      </div>
      
      {/* Mobile Bottom Navigation - only show when authenticated */}
      {!shouldHideSidebar && <BottomNavigation />}
    </div>
  );
};

export default MainLayout;
