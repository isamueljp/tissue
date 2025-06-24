
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, QrCode, Calendar, Trophy } from 'lucide-react';

const Profile = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="twitter-card p-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">JD</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">John Doe</h1>
              <p className="text-gray-400">@johndoe • University Student</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className="bg-red-600">Level 5 Host</Badge>
                <Badge variant="outline" className="border-red-600 text-red-600">VIP Member</Badge>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <QrCode className="w-4 h-4 mr-2" />
              My QR Code
            </Button>
          </div>
        </Card>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="twitter-card p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-white">$2,847</p>
              </div>
            </div>
          </Card>

          <Card className="twitter-card p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Active Investments</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
            </div>
          </Card>

          <Card className="twitter-card p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Events Hosted</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Investment Portfolio */}
        <Card className="twitter-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">Investment Portfolio</h2>
          <div className="space-y-4">
            {[
              { event: 'VIP Rooftop Party', invested: 250, returns: 312, roi: '+24.8%', status: 'completed' },
              { event: 'Gaming Tournament', invested: 150, returns: 0, roi: 'Pending', status: 'active' },
              { event: 'Pool Party Mixer', invested: 300, returns: 375, roi: '+25%', status: 'completed' }
            ].map((investment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="font-semibold text-white">{investment.event}</p>
                  <p className="text-gray-400 text-sm">Invested: ${investment.invested}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">
                    {investment.returns > 0 ? `$${investment.returns}` : 'Pending'}
                  </p>
                  <p className={`text-sm ${investment.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {investment.roi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* QR Code Section */}
        <Card className="twitter-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">Event Check-in QR</h2>
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
              <QrCode className="w-32 h-32 text-black" />
            </div>
          </div>
          <p className="text-center text-gray-400 mt-4">
            Show this QR code to event hosts for quick check-in
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
