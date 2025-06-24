
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EventsGrid from '@/components/EventsGrid';
import QuickActions from '@/components/QuickActions';
import LeaderboardPreview from '@/components/LeaderboardPreview';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <EventsGrid />
      <QuickActions />
      <LeaderboardPreview />
      <Footer />
    </div>
  );
};

export default Index;
