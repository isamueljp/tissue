
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radio, Mic, MicOff, Volume2, VolumeX, Users } from 'lucide-react';

interface WalkieTalkieProps {
  eventId: string;
  eventName: string;
}

const WalkieTalkie = ({ eventId, eventName }: WalkieTalkieProps) => {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isListening, setIsListening] = useState(true);
  const [activeUsers, setActiveUsers] = useState(8);
  const [lastTransmission, setLastTransmission] = useState('Sarah: "Anyone near the main entrance?"');

  const handleTransmit = () => {
    setIsTransmitting(!isTransmitting);
    if (!isTransmitting) {
      // Simulate transmission
      setTimeout(() => {
        setLastTransmission('You: "Hello everyone, testing the radio!"');
        setIsTransmitting(false);
      }, 3000);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  useEffect(() => {
    // Simulate incoming transmissions
    const interval = setInterval(() => {
      if (isListening && !isTransmitting) {
        const messages = [
          'Alex: "Music setup is ready!"',
          'Maya: "Food truck just arrived"',
          'DJ Mike: "Sound check complete"',
          'Sarah: "See you all at the rooftop!"'
        ];
        setLastTransmission(messages[Math.floor(Math.random() * messages.length)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isListening, isTransmitting]);

  return (
    <Card className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border border-green-600/30">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-green-400" />
            <div>
              <h3 className="font-semibold text-green-400">Event Radio</h3>
              <p className="text-xs text-gray-400">{eventName}</p>
            </div>
          </div>
          <Badge className="bg-green-600 flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{activeUsers}</span>
          </Badge>
        </div>

        {/* Last Transmission */}
        <div className="bg-secondary/50 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-400 mb-1">Last transmission:</p>
          <p className="text-sm text-white">{lastTransmission}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleListening}
            className={`flex-1 ${isListening ? 'border-green-600/50' : 'border-gray-600/50'}`}
          >
            {isListening ? (
              <>
                <Volume2 className="w-4 h-4 mr-2" />
                Listening
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 mr-2" />
                Muted
              </>
            )}
          </Button>

          <Button
            onClick={handleTransmit}
            className={`flex-1 ${
              isTransmitting 
                ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isTransmitting ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                Transmitting...
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Talk
              </>
            )}
          </Button>
        </div>

        {/* Instructions */}
        <p className="text-xs text-gray-400 mt-2 text-center">
          Hold "Talk" to transmit to all event participants
        </p>
      </div>
    </Card>
  );
};

export default WalkieTalkie;
