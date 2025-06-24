
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, Calendar, Target } from 'lucide-react';

const Invest = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');

  const opportunities = [
    {
      id: '1',
      title: 'VIP Rooftop Party',
      description: 'Exclusive rooftop experience with premium drinks',
      fundingGoal: 5000,
      currentFunding: 3200,
      minInvestment: 50,
      expectedROI: '25%',
      eventDate: 'Dec 30, 2024',
      investors: 24,
      ticketPrice: 75,
      expectedTickets: 80,
      category: 'VIP'
    },
    {
      id: '2',
      title: 'Gaming Tournament Championship',
      description: 'Professional esports tournament with cash prizes',
      fundingGoal: 3000,
      currentFunding: 2100,
      minInvestment: 25,
      expectedROI: '30%',
      eventDate: 'Jan 5, 2025',
      investors: 18,
      ticketPrice: 40,
      expectedTickets: 100,
      category: 'Gaming'
    },
    {
      id: '3',
      title: 'Music Festival',
      description: 'Multi-stage music festival with top artists',
      fundingGoal: 15000,
      currentFunding: 8500,
      minInvestment: 100,
      expectedROI: '35%',
      eventDate: 'Jan 15, 2025',
      investors: 45,
      ticketPrice: 120,
      expectedTickets: 200,
      category: 'Music'
    }
  ];

  const handleInvest = (eventId: string) => {
    console.log(`Investing $${investmentAmount} in event ${eventId}`);
    // Handle investment logic here
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Investment Opportunities</h1>
        <p className="text-gray-400">Invest in student events and earn returns from ticket sales</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {opportunities.map((opportunity) => {
          const fundingProgress = (opportunity.currentFunding / opportunity.fundingGoal) * 100;
          const projectedRevenue = opportunity.ticketPrice * opportunity.expectedTickets;
          const projectedProfit = projectedRevenue - opportunity.fundingGoal;

          return (
            <Card key={opportunity.id} className="twitter-card p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{opportunity.title}</h3>
                    <p className="text-gray-400 text-sm">{opportunity.description}</p>
                  </div>
                  <Badge className="bg-red-600">{opportunity.expectedROI}</Badge>
                </div>

                {/* Event Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {opportunity.eventDate}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    {opportunity.investors} investors
                  </div>
                </div>

                {/* Funding Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Funding Progress</span>
                    <span className="text-white">${opportunity.currentFunding}/${opportunity.fundingGoal}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all"
                      style={{ width: `${fundingProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{Math.round(fundingProgress)}% funded</p>
                </div>

                {/* Financial Projections */}
                <div className="grid grid-cols-2 gap-4 p-3 bg-secondary rounded-lg">
                  <div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 text-red-600 mr-1" />
                      <span className="text-xs text-gray-400">Projected Revenue</span>
                    </div>
                    <p className="font-bold text-white">${projectedRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-gray-400">Projected Profit</span>
                    </div>
                    <p className="font-bold text-green-500">${projectedProfit.toLocaleString()}</p>
                  </div>
                </div>

                {/* Investment Input */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Investment Amount</label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="number"
                        placeholder={`Min $${opportunity.minInvestment}`}
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="pl-10 bg-secondary border-border text-white"
                        min={opportunity.minInvestment}
                      />
                    </div>
                    <Button 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleInvest(opportunity.id)}
                      disabled={!investmentAmount || parseInt(investmentAmount) < opportunity.minInvestment}
                    >
                      Invest
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Minimum investment: ${opportunity.minInvestment}
                  </p>
                </div>

                {/* Quick Investment Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[50, 100, 250].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      className="border-red-600/30 text-red-600 hover:bg-red-600 hover:text-white"
                      onClick={() => setInvestmentAmount(amount.toString())}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Invest;
