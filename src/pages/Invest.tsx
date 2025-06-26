import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, Calendar, Target, ArrowUpRight, Wallet } from 'lucide-react';
import UPIPayment from '../components/UPIPayment';

const Invest = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState(2450);

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
      category: 'VIP',
      riskLevel: 'Low',
      payoutDate: 'Jan 2, 2025'
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
      category: 'Gaming',
      riskLevel: 'Medium',
      payoutDate: 'Jan 8, 2025'
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
      category: 'Music',
      riskLevel: 'High',
      payoutDate: 'Jan 20, 2025'
    }
  ];

  const userInvestments = [
    {
      id: '1',
      eventName: 'Last Week\'s Concert',
      invested: 200,
      returns: 260,
      status: 'completed',
      payout: '+₹60',
      date: 'Dec 20, 2024'
    },
    {
      id: '2',
      eventName: 'Gaming Night',
      invested: 150,
      returns: 180,
      status: 'pending',
      payout: '+₹30',
      date: 'Dec 25, 2024'
    }
  ];

  const handleInvest = (eventId: string, amount: string) => {
    const event = opportunities.find(e => e.id === eventId);
    if (event && amount) {
      setSelectedEvent(eventId);
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSelectedEvent(null);
    setInvestmentAmount('');
  };

  if (showPayment && selectedEvent) {
    const event = opportunities.find(e => e.id === selectedEvent);
    return (
      <div className="mobile-container p-4">
        <UPIPayment
          amount={parseInt(investmentAmount)}
          purpose={`Investment in ${event?.title}`}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPayment(false)}
        />
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Investment Hub</h1>
            <p className="text-gray-400 text-sm">Invest & earn via UPI</p>
          </div>
          
          {/* User Balance */}
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-600/30 p-3">
            <div className="flex items-center space-x-2">
              <Wallet className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-xs text-gray-400">Balance</p>
                <p className="text-lg font-bold text-green-500">₹{userBalance.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Portfolio Summary */}
        <Card className="twitter-card bg-gradient-to-r from-purple-600/20 to-red-600/20 border-purple-600/30">
          <h2 className="text-lg font-bold mb-3">Your Portfolio</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-green-500">₹420</div>
              <div className="text-xs text-gray-400">Earned</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-500">₹350</div>
              <div className="text-xs text-gray-400">Active</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-500">28%</div>
              <div className="text-xs text-gray-400">ROI</div>
            </div>
          </div>
          
          {/* Recent Investments */}
          <div className="space-y-2">
            {userInvestments.map((investment) => (
              <div key={investment.id} className="flex items-center justify-between bg-secondary/30 rounded-lg p-2">
                <div>
                  <p className="font-medium text-sm">{investment.eventName}</p>
                  <p className="text-xs text-gray-400">₹{investment.invested}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${investment.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                    {investment.payout}
                  </p>
                  {investment.status === 'completed' && (
                    <Button size="sm" className="text-xs mobile-btn mobile-btn-primary mt-1">
                      Withdraw
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Investment Opportunities */}
        <div>
          <h2 className="text-lg font-bold mb-3">Live Opportunities</h2>
          <div className="space-y-4">
            {opportunities.map((opportunity) => {
              const fundingProgress = (opportunity.currentFunding / opportunity.fundingGoal) * 100;
              const projectedRevenue = opportunity.ticketPrice * opportunity.expectedTickets;
              const projectedProfit = projectedRevenue - opportunity.fundingGoal;

              return (
                <Card key={opportunity.id} className="twitter-card hover:border-red-600/40">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold">{opportunity.title}</h3>
                        <p className="text-gray-400 text-sm">{opportunity.description}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {opportunity.eventDate}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {opportunity.investors}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <Badge className="bg-red-600 mb-1">{opportunity.expectedROI}</Badge>
                        <p className="text-xs text-gray-400">{opportunity.riskLevel}</p>
                      </div>
                    </div>

                    {/* Funding Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span>₹{opportunity.currentFunding.toLocaleString()}/₹{opportunity.fundingGoal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full transition-all"
                          style={{ width: `${fundingProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Financial Info */}
                    <div className="grid grid-cols-2 gap-3 p-2 bg-secondary/30 rounded-lg">
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <Target className="w-3 h-3 text-red-600 mr-1" />
                          <span className="text-xs text-gray-400">Revenue</span>
                        </div>
                        <p className="font-bold text-sm">₹{projectedRevenue.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                          <span className="text-xs text-gray-400">Profit</span>
                        </div>
                        <p className="font-bold text-sm text-green-500">₹{projectedProfit.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Investment Input */}
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">₹</span>
                          <Input
                            type="number"
                            placeholder={`Min ₹${opportunity.minInvestment}`}
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            className="pl-6 bg-secondary border-border text-sm"
                            min={opportunity.minInvestment}
                          />
                        </div>
                        <Button 
                          className="mobile-btn mobile-btn-primary"
                          onClick={() => handleInvest(opportunity.id, investmentAmount)}
                          disabled={!investmentAmount || parseInt(investmentAmount) < opportunity.minInvestment}
                        >
                          Invest
                        </Button>
                      </div>

                      {/* Quick Amounts */}
                      <div className="grid grid-cols-3 gap-2">
                        {[opportunity.minInvestment, opportunity.minInvestment * 2, opportunity.minInvestment * 5].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            className="border-red-600/30 text-red-600 hover:bg-red-600 hover:text-white text-xs touch-target"
                            onClick={() => setInvestmentAmount(amount.toString())}
                          >
                            ₹{amount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Payout Info */}
                    <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-2">
                      <div className="flex items-center space-x-2">
                        <ArrowUpRight className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-blue-400">
                          UPI payout on {opportunity.payoutDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invest;
