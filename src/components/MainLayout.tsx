
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Main Content - Full width on mobile */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
