
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Smartphone, QrCode, Check } from 'lucide-react';

interface UPIPaymentProps {
  amount: number;
  onPaymentSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

const UPIPayment = ({ amount, onPaymentSuccess, onCancel }: UPIPaymentProps) => {
  const [upiId, setUpiId] = useState('');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const upiApps = [
    { id: 'paytm', name: 'Paytm', icon: '💳' },
    { id: 'gpay', name: 'Google Pay', icon: '🎯' },
    { id: 'phonepe', name: 'PhonePe', icon: '💜' },
    { id: 'bhim', name: 'BHIM', icon: '🏦' },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate UPI payment processing
    setTimeout(() => {
      const mockTransactionId = `TXN${Date.now()}`;
      onPaymentSuccess(mockTransactionId);
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">UPI Payment</h2>
        <p className="text-2xl font-bold text-primary">₹{amount}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="upi">UPI ID</Label>
          <Input
            id="upi"
            placeholder="your-upi@app"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Choose UPI App</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {upiApps.map((app) => (
              <Button
                key={app.id}
                variant={selectedApp === app.id ? "default" : "outline"}
                className="h-16 flex flex-col items-center justify-center"
                onClick={() => setSelectedApp(app.id)}
              >
                <span className="text-2xl mb-1">{app.icon}</span>
                <span className="text-xs">{app.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg">
          <QrCode className="w-5 h-5" />
          <span className="text-sm">Or scan QR code to pay</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button 
          onClick={handlePayment} 
          disabled={!upiId || !selectedApp || isProcessing}
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Smartphone className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay ₹{amount}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default UPIPayment;
