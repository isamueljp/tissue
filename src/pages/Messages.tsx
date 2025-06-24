
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Phone, Video, MoreHorizontal } from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Sarah Chen',
      username: '@sarah_chen',
      lastMessage: 'Hey! Ready for the rooftop party?',
      timestamp: '2m',
      unread: 2,
      avatar: 'SC'
    },
    {
      id: '2',
      name: 'Gaming Squad',
      username: '@gaming_squad',
      lastMessage: 'Tournament starts in 1 hour!',
      timestamp: '15m',
      unread: 0,
      avatar: 'GS'
    },
    {
      id: '3',
      name: 'Alex Rodriguez',
      username: '@alex_rod',
      lastMessage: 'Can you bring the speakers?',
      timestamp: '1h',
      unread: 1,
      avatar: 'AR'
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'Sarah Chen',
      message: 'Hey! Ready for the rooftop party?',
      timestamp: '2:30 PM',
      isMine: false
    },
    {
      id: '2',
      sender: 'You',
      message: 'Absolutely! Just finished setting up the sound system',
      timestamp: '2:32 PM',
      isMine: true
    },
    {
      id: '3',
      sender: 'Sarah Chen',
      message: 'Perfect! The investors are going to love this setup 🎉',
      timestamp: '2:33 PM',
      isMine: false
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // Handle sending message
    setNewMessage('');
  };

  return (
    <div className="p-6 h-screen flex">
      {/* Chat List */}
      <div className="w-80 border-r border-border">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold text-white mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-secondary border-border text-white"
            />
          </div>
        </div>

        <div className="space-y-1 p-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedChat(conv.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedChat === conv.id ? 'bg-red-600/20' : 'hover:bg-secondary'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{conv.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white truncate">{conv.name}</p>
                    <span className="text-xs text-gray-400">{conv.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1 min-w-5 text-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">SC</span>
              </div>
              <div>
                <p className="font-semibold text-white">Sarah Chen</p>
                <p className="text-sm text-gray-400">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isMine
                    ? 'bg-red-600 text-white'
                    : 'bg-secondary text-white'
                }`}
              >
                <p>{message.message}</p>
                <p className={`text-xs mt-1 ${message.isMine ? 'text-red-100' : 'text-gray-400'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-secondary border-border text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-red-600 hover:bg-red-700"
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
