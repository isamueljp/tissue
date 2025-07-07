
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';
import { useAuth } from '@/hooks/useAuth';

const MainLayout = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  
  // Only hide navigation on landing page when user is not authenticated
  const shouldHideNavigation = !user && !loading;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Main Content - Full width since no sidebar */}
      <div className="flex-1">
        <Outlet />
      </div>
      
      {/* Bottom Navigation - show when user is authenticated */}
      {!shouldHideNavigation && <BottomNavigation />}
    </div>
  );
};

export default MainLayout;
