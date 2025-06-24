
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign, Users, Calendar, MapPin, TrendingUp } from 'lucide-react';

const Events = () => {
  const [events] = useState([
    {
      id: '1',
      title: 'VIP Rooftop Party',
      description: 'Exclusive rooftop experience with premium drinks and DJ',
      date: 'Dec 30, 2024',
      location: 'Downtown Rooftop',
      ticketPrice: 75,
      fundingGoal: 5000,
      currentFunding: 3200,
      expectedProfit: 15000,
      roi: '25%',
      investors: 24,
      tickets: { sold: 45, total: 80 }
    },
    {
      id: '2',
      title: 'Gaming Tournament',
      description: 'Competitive gaming with cash prizes',
      date: 'Jan 5, 2025',
      location: 'Tech Center',
      ticketPrice: 25,
      fundingGoal: 2000,
      currentFunding: 1800,
      expectedProfit: 4000,
      roi: '18%',
      investors: 12,
      tickets: { sold: 32, total: 50 }
    }
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="twitter-card p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                  <p className="text-gray-400">{event.description}</p>
                </div>
                <Badge className="bg-red-600">{event.roi} ROI</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
              </div>

              {/* Funding Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Funding Progress</span>
                  <span className="text-white">${event.currentFunding}/${event.fundingGoal}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all"
                    style={{ width: `${(event.currentFunding / event.fundingGoal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-4 h-4 text-red-600 mr-1" />
                    <span className="font-bold text-white">${event.ticketPrice}</span>
                  </div>
                  <span className="text-xs text-gray-400">Ticket Price</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-red-600 mr-1" />
                    <span className="font-bold text-white">{event.investors}</span>
                  </div>
                  <span className="text-xs text-gray-400">Investors</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-red-600 mr-1" />
                    <span className="font-bold text-white">{event.tickets.sold}/{event.tickets.total}</span>
                  </div>
                  <span className="text-xs text-gray-400">Tickets Sold</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-red-600 hover:bg-red-700">
                  Invest Now
                </Button>
                <Button variant="outline" className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
