
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Check, User } from 'lucide-react';

interface Contribution {
  id: string;
  item: string;
  contributor: string;
  status: 'needed' | 'claimed' | 'brought';
  quantity: number;
}

const ContributionBoard = ({ eventTitle }: { eventTitle: string }) => {
  const [contributions, setContributions] = useState<Contribution[]>([
    { id: '1', item: 'Speakers', contributor: 'mike_student', status: 'claimed', quantity: 2 },
    { id: '2', item: 'Snacks', contributor: '', status: 'needed', quantity: 5 },
    { id: '3', item: 'Drinks', contributor: 'sarah_chen', status: 'brought', quantity: 10 },
    { id: '4', item: 'Cups', contributor: '', status: 'needed', quantity: 50 },
    { id: '5', item: 'Projector', contributor: 'alex_host', status: 'claimed', quantity: 1 }
  ]);
  
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);

  const addContribution = () => {
    if (!newItem.trim()) return;
    
    const contribution: Contribution = {
      id: Date.now().toString(),
      item: newItem,
      contributor: '',
      status: 'needed',
      quantity: newQuantity
    };
    
    setContributions([...contributions, contribution]);
    setNewItem('');
    setNewQuantity(1);
  };

  const claimItem = (id: string) => {
    setContributions(contributions.map(item => 
      item.id === id 
        ? { ...item, contributor: 'you', status: 'claimed' as const }
        : item
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'needed': return 'bg-destructive';
      case 'claimed': return 'bg-accent';
      case 'brought': return 'bg-green-600';
      default: return 'bg-secondary';
    }
  };

  return (
    <Card className="discord-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Event Contributions</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          What can you bring to make this event awesome?
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Add new contribution */}
        <div className="flex space-x-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add item needed..."
            className="flex-1 bg-secondary border-0 text-base"
          />
          <Input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(parseInt(e.target.value) || 1)}
            className="w-20 bg-secondary border-0 text-base"
            min={1}
          />
          <Button onClick={addContribution} size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Contribution list */}
        <div className="space-y-2">
          {contributions.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(item.status)}>
                    {item.status === 'brought' && <Check className="w-3 h-3 mr-1" />}
                    <span className="text-sm font-medium">{item.status}</span>
                  </Badge>
                  <span className="text-base font-medium">{item.item}</span>
                  <span className="text-sm text-muted-foreground">×{item.quantity}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {item.contributor && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span className="text-sm">{item.contributor}</span>
                  </div>
                )}
                
                {item.status === 'needed' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => claimItem(item.id)}
                    className="border-primary/30 hover:border-primary/60 text-sm"
                  >
                    I'll bring this
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 p-3 bg-card rounded-lg border border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-destructive">
                {contributions.filter(c => c.status === 'needed').length}
              </div>
              <div className="text-sm text-muted-foreground">Still Needed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-accent">
                {contributions.filter(c => c.status === 'claimed').length}
              </div>
              <div className="text-sm text-muted-foreground">Claimed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-500">
                {contributions.filter(c => c.status === 'brought').length}
              </div>
              <div className="text-sm text-muted-foreground">Brought</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContributionBoard;
