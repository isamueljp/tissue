
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
  const [userBalance, setUserBalance] = useState(2450); // Mock user balance

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
    // Add investment to user's portfolio
  };

  const withdrawEarnings = (amount: number) => {
    // Handle UPI withdrawal
    console.log(`Withdrawing ₹${amount} to UPI`);
  };

  if (showPayment && selectedEvent) {
    const event = opportunities.find(e => e.id === selectedEvent);
    return (
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <UPIPayment
            amount={parseInt(investmentAmount)}
            purpose={`Investment in ${event?.title}`}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setShowPayment(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Investment Hub</h1>
            <p className="text-gray-400">Invest in student events and earn returns via UPI</p>
          </div>
          
          {/* User Balance Card */}
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-600/30 p-4">
            <div className="flex items-center space-x-3">
              <Wallet className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Available Balance</p>
                <p className="text-2xl font-bold text-green-500">₹{userBalance.toLocaleString()}</p>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Withdraw
              </Button>
            </div>
          </Card>
        </div>

        {/* Your Investments Summary */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-red-600/20 border-purple-600/30 p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Your Investment Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">₹420</div>
              <div className="text-sm text-gray-400">Total Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">₹350</div>
              <div className="text-sm text-gray-400">Active Investments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">28%</div>
              <div className="text-sm text-gray-400">Avg. ROI</div>
            </div>
          </div>
          
          {/* Recent Investments */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Recent Investments</h3>
            <div className="space-y-2">
              {userInvestments.map((investment) => (
                <div key={investment.id} className="flex items-center justify-between bg-secondary/30 rounded-lg p-3">
                  <div>
                    <p className="font-medium">{investment.eventName}</p>
                    <p className="text-sm text-gray-400">Invested: ₹{investment.invested}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${investment.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {investment.payout}
                    </p>
                    <Badge className={investment.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'}>
                      {investment.status}
                    </Badge>
                  </div>
                  {investment.status === 'completed' && (
                    <Button size="sm" onClick={() => withdrawEarnings(investment.returns - investment.invested)}>
                      Withdraw to UPI
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Investment Opportunities */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Live Investment Opportunities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => {
              const fundingProgress = (opportunity.currentFunding / opportunity.fundingGoal) * 100;
              const projectedRevenue = opportunity.ticketPrice * opportunity.expectedTickets;
              const projectedProfit = projectedRevenue - opportunity.fundingGoal;

              return (
                <Card key={opportunity.id} className="bg-card border border-border hover:border-red-600/40 transition-all">
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{opportunity.title}</h3>
                        <p className="text-gray-400 text-sm">{opportunity.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-red-600 mb-1">{opportunity.expectedROI}</Badge>
                        <p className="text-xs text-gray-400">{opportunity.riskLevel} Risk</p>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {opportunity.eventDate}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {opportunity.investors} investors
                        </span>
                      </div>
                    </div>

                    {/* Funding Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Funding Progress</span>
                        <span>₹{opportunity.currentFunding.toLocaleString()}/₹{opportunity.fundingGoal.toLocaleString()}</span>
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
                    <div className="grid grid-cols-2 gap-4 p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <div className="flex items-center">
                          <Target className="w-4 h-4 text-red-600 mr-1" />
                          <span className="text-xs text-gray-400">Revenue</span>
                        </div>
                        <p className="font-bold">₹{projectedRevenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-xs text-gray-400">Profit</span>
                        </div>
                        <p className="font-bold text-green-500">₹{projectedProfit.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Payout Information */}
                    <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <ArrowUpRight className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-400">
                          Payout via UPI on {opportunity.payoutDate}
                        </span>
                      </div>
                    </div>

                    {/* Investment Input */}
                    <div className="space-y-3">
                      <label className="text-sm text-gray-400">Investment Amount</label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                          <Input
                            type="number"
                            placeholder={`Min ₹${opportunity.minInvestment}`}
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            className="pl-8 bg-secondary border-border"
                            min={opportunity.minInvestment}
                          />
                        </div>
                        <Button 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleInvest(opportunity.id, investmentAmount)}
                          disabled={!investmentAmount || parseInt(investmentAmount) < opportunity.minInvestment}
                        >
                          Invest
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400">
                        Min: ₹{opportunity.minInvestment} • Payment via UPI
                      </p>
                    </div>

                    {/* Quick Investment Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      {[opportunity.minInvestment, opportunity.minInvestment * 2, opportunity.minInvestment * 5].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          className="border-red-600/30 text-red-600 hover:bg-red-600 hover:text-white"
                          onClick={() => setInvestmentAmount(amount.toString())}
                        >
                          ₹{amount}
                        </Button>
                      ))}
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
