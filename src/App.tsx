
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainLayout from "./components/MainLayout";
import LoginPage from "./components/LoginPage";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Invest from "./pages/Invest";
import Messages from "./pages/Messages";
import Communities from "./pages/Communities";
import Travel from "./pages/Travel";
import MusicPage from "./pages/Music";
import RadioPage from "./pages/Radio";
import Profile from "./pages/Profile";
import Voting from "./pages/Voting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Index />} />
          <Route path="events" element={<Events />} />
          <Route path="invest" element={<Invest />} />
          <Route path="messages" element={<Messages />} />
          <Route path="communities" element={<Communities />} />
          <Route path="voting" element={<Voting />} />
          <Route path="travel" element={<Travel />} />
          <Route path="music" element={<MusicPage />} />
          <Route path="radio" element={<RadioPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
