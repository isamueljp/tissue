
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' && location.search === '';
  const shouldHideNavigation = isAuthPage;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Main Content - Full width since no sidebar */}
      <div className="flex-1">
        <Outlet />
      </div>
      
      {/* Bottom Navigation - only show when authenticated */}
      {!shouldHideNavigation && <BottomNavigation />}
    </div>
  );
};

export default MainLayout;
