
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Hash, Users, Smile } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

const EventChat = ({ eventTitle }: { eventTitle: string }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'alex_host',
      message: 'Welcome to the event chat! 🎉',
      timestamp: '2:30 PM'
    },
    {
      id: '2',
      user: 'sarah_chen',
      message: 'Can someone bring extra speakers?',
      timestamp: '2:32 PM'
    },
    {
      id: '3',
      user: 'mike_student',
      message: 'I got the speakers covered! 🔊',
      timestamp: '2:33 PM'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      user: 'you',
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <Card className="discord-card h-96 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Hash className="w-5 h-5 text-primary" />
          <span className="font-semibold">{eventTitle}</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">24 online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {msg.user[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm">{msg.user}</span>
                <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
              </div>
              <p className="text-sm text-foreground">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${eventTitle.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-secondary border-0 pr-12"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary/90"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventChat;
