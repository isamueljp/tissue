
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Sparkles, Unlock, Calendar, DollarSign } from 'lucide-react';

interface DropReward {
  type: 'event' | 'perk' | 'gift_card';
  title: string;
  description: string;
  value?: string;
  icon: React.ReactNode;
}

export const DailyDrop = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [reward, setReward] = useState<DropReward | null>(null);

  const possibleRewards: DropReward[] = [
    {
      type: 'event',
      title: 'Exclusive VIP Party',
      description: 'Access to tonight\'s secret rooftop party',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      type: 'perk',
      title: 'Skip the Line Pass',
      description: 'Fast-track entry to any event this week',
      icon: <Unlock className="w-4 h-4" />
    },
    {
      type: 'gift_card',
      title: 'Cafe Voucher',
      description: 'Free coffee for your next study session',
      value: '$15',
      icon: <DollarSign className="w-4 h-4" />
    }
  ];

  const handleOpenDrop = () => {
    const randomReward = possibleRewards[Math.floor(Math.random() * possibleRewards.length)];
    setReward(randomReward);
    setIsOpened(true);
  };

  if (isOpened && reward) {
    return (
      <Card className="bg-gradient-to-br from-[#00197e]/20 to-purple-600/20 border-[#00197e]/30 p-4 animate-scale-in">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-[#00197e] rounded-full flex items-center justify-center">
              {reward.icon}
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="font-bold text-white">🎉 You Got It!</h3>
            <h4 className="font-semibold text-[#00197e]">{reward.title}</h4>
            <p className="text-sm text-gray-300">{reward.description}</p>
            {reward.value && (
              <Badge className="bg-green-600 text-white">{reward.value}</Badge>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" className="bg-[#00197e] hover:bg-[#00197e]/80 flex-1">
              {reward.type === 'event' ? 'View Event' : 'Claim Now'}
            </Button>
            {reward.type === 'event' && (
              <Button size="sm" variant="outline" className="border-[#00197e]/30">
                <Calendar className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-yellow-600/30 p-4 cursor-pointer hover:scale-105 transition-transform duration-200" onClick={handleOpenDrop}>
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
            <Gift className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-bold text-white">Daily Drop</h3>
          <p className="text-sm text-gray-300">Tap to unlock today's surprise!</p>
          <Badge className="bg-yellow-600 text-white animate-bounce">
            <Sparkles className="w-3 h-3 mr-1" />
            Available Now
          </Badge>
        </div>
      </div>
    </Card>
  );
};
