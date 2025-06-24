
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Hash, TrendingUp, DollarSign, Users, MessageSquare, Vote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="flex items-center justify-center mb-4">
          <Hash className="w-12 h-12 text-red-600 mr-3" />
          <h1 className="text-6xl font-bold text-white">
            society<span className="text-red-600">6</span>
          </h1>
        </div>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          The platform where students create, invest, and profit from events together
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/events">
            <Button className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg">
              Explore Events
            </Button>
          </Link>
          <Link to="/invest">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 text-lg">
              Start Investing
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="twitter-card p-6 text-center">
          <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">$125K</div>
          <div className="text-gray-400">Total Invested</div>
        </Card>
        <Card className="twitter-card p-6 text-center">
          <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">2.5K</div>
          <div className="text-gray-400">Active Students</div>
        </Card>
        <Card className="twitter-card p-6 text-center">
          <DollarSign className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">28%</div>
          <div className="text-gray-400">Avg ROI</div>
        </Card>
        <Card className="twitter-card p-6 text-center">
          <Vote className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">156</div>
          <div className="text-gray-400">Events This Month</div>
        </Card>
      </div>

      {/* Featured Events */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">🔥 Trending Events</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="twitter-card p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">VIP Rooftop Party</h3>
                  <p className="text-gray-400">Exclusive rooftop experience</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">25% ROI</div>
                  <div className="text-sm text-gray-400">Expected</div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>$3,200 / $5,000 funded</span>
                <span>24 investors</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full w-3/5"></div>
              </div>
              <Link to="/invest">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Invest Now
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="twitter-card p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">Music Festival</h3>
                  <p className="text-gray-400">Multi-stage music experience</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">35% ROI</div>
                  <div className="text-sm text-gray-400">Expected</div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>$8,500 / $15,000 funded</span>
                <span>45 investors</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full w-3/5"></div>
              </div>
              <Link to="/invest">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Invest Now
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">💡 How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="twitter-card p-6 text-center">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Host or Invest</h3>
            <p className="text-gray-400">Create events or invest in promising student gatherings</p>
          </Card>

          <Card className="twitter-card p-6 text-center">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Collaborate</h3>
            <p className="text-gray-400">Chat, contribute items, and plan together in real-time</p>
          </Card>

          <Card className="twitter-card p-6 text-center">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Earn Returns</h3>
            <p className="text-gray-400">Get paid from ticket sales based on your investment</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
