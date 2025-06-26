
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CreditCard, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';

interface UPIPaymentProps {
  amount: number;
  purpose: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const UPIPayment = ({ amount, purpose, onSuccess, onCancel }: UPIPaymentProps) => {
  const [upiId, setUpiId] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'qr' | 'bank'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    }, 3000);
  };

  if (paymentSuccess) {
    return (
      <Card className="p-6 text-center bg-green-600/10 border-green-600/30">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-500 mb-2">Payment Successful!</h3>
        <p className="text-gray-300">₹{amount} paid via UPI</p>
      </Card>
    );
  }

  return (
    <Card className="bg-card border border-border p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Pay with UPI</h3>
        <p className="text-gray-400">{purpose}</p>
        <div className="text-3xl font-bold text-red-600 mt-2">₹{amount}</div>
      </div>

      <div className="space-y-4">
        {/* Payment Method Selection */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={selectedMethod === 'upi' ? 'default' : 'outline'}
            size="sm"
            className={selectedMethod === 'upi' ? 'bg-red-600' : 'border-red-600/30'}
            onClick={() => setSelectedMethod('upi')}
          >
            <Smartphone className="w-4 h-4 mr-1" />
            UPI ID
          </Button>
          <Button
            variant={selectedMethod === 'qr' ? 'default' : 'outline'}
            size="sm"
            className={selectedMethod === 'qr' ? 'bg-red-600' : 'border-red-600/30'}
            onClick={() => setSelectedMethod('qr')}
          >
            QR Code
          </Button>
          <Button
            variant={selectedMethod === 'bank' ? 'default' : 'outline'}
            size="sm"
            className={selectedMethod === 'bank' ? 'bg-red-600' : 'border-red-600/30'}
            onClick={() => setSelectedMethod('bank')}
          >
            <CreditCard className="w-4 h-4 mr-1" />
            Bank
          </Button>
        </div>

        {selectedMethod === 'upi' && (
          <div>
            <Input
              placeholder="Enter UPI ID (e.g., user@paytm)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="bg-secondary border-border"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {['@paytm', '@phonepe', '@googlepay', '@ybl'].map((suffix) => (
                <Badge
                  key={suffix}
                  className="cursor-pointer bg-secondary hover:bg-red-600/20"
                  onClick={() => setUpiId(upiId.split('@')[0] + suffix)}
                >
                  {suffix}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {selectedMethod === 'qr' && (
          <div className="text-center p-4 bg-secondary rounded-lg">
            <div className="w-32 h-32 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center">
              <div className="text-black font-mono text-xs">QR CODE</div>
            </div>
            <p className="text-sm text-gray-400">Scan with any UPI app</p>
          </div>
        )}

        {selectedMethod === 'bank' && (
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-between border-red-600/30">
              <span>Net Banking</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between border-red-600/30">
              <span>Credit/Debit Card</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="flex space-x-2 pt-4">
          <Button 
            variant="outline" 
            className="flex-1 border-red-600/30"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700"
            onClick={handlePayment}
            disabled={isProcessing || (selectedMethod === 'upi' && !upiId)}
          >
            {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default UPIPayment;
