import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, MessageCircle, Users, Phone, Video, 
  Hash, Send, Smile, Mic, MoreVertical,
  Zap, Heart, Gift, Calendar
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  message: string;
  time: string;
  isMe: boolean;
  type: string;
  postContent?: string; // Optional property for shared posts
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState('1');
  const [activeTab, setActiveTab] = useState('dms');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Sarah Chen',
      message: 'Hey! Are you coming to the rooftop party tonight?',
      time: '2:30 PM',
      isMe: false,
      type: 'text'
    },
    {
      id: '2',
      sender: 'You',
      message: 'Absolutely! I\'m bringing the bluetooth speaker 🔊',
      time: '2:32 PM',
      isMe: true,
      type: 'text'
    },
    {
      id: '3',
      sender: 'Sarah Chen',
      message: 'Perfect! Can\'t wait to see everyone there ✨',
      time: '2:33 PM',
      isMe: false,
      type: 'text'
    }
  ]);

  // Listen for shared posts from localStorage
  useEffect(() => {
    const handleSharedPost = () => {
      const sharedPost = localStorage.getItem('sharedPost');
      if (sharedPost) {
        const postData = JSON.parse(sharedPost);
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: 'You',
          message: `Shared a post: "${postData.content}"`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: true,
          type: 'shared_post',
          postContent: postData.content
        };
        setChatMessages(prev => [...prev, newMessage]);
        localStorage.removeItem('sharedPost');
      }
    };

    // Check immediately and set up listener
    handleSharedPost();
    window.addEventListener('storage', handleSharedPost);
    
    return () => window.removeEventListener('storage', handleSharedPost);
  }, []);

  const directMessages = [
    {
      id: '1',
      name: 'Sarah Chen',
      username: '@sarah_vibe',
      lastMessage: 'The rooftop party was amazing! 🎉',
      time: '2m ago',
      unread: 2,
      online: true,
      avatar: 'SC'
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      username: '@alex_games',
      lastMessage: 'Gaming tournament this weekend?',
      time: '15m ago',
      unread: 0,
      online: true,
      avatar: 'AR'
    },
    {
      id: '3',
      name: 'Maya Patel',
      username: '@maya_study',
      lastMessage: 'Thanks for the study session help!',
      time: '1h ago',
      unread: 1,
      online: false,
      avatar: 'MP'
    }
  ];

  const communityChats = [
    {
      id: 'c1',
      name: 'VIP Rooftop Party',
      description: 'Dec 30 • 45 members',
      lastMessage: 'Who\'s bringing the speakers?',
      time: '5m ago',
      unread: 3,
      isLive: true,
      avatar: '🏢'
    },
    {
      id: 'c2',
      name: 'Gaming Tournament',
      description: 'Jan 5 • 32 members',
      lastMessage: 'Prize pool updated: ₹50,000!',
      time: '20m ago',
      unread: 1,
      isLive: false,
      avatar: '🎮'
    },
    {
      id: 'c3',
      name: 'NYU Students Hub',
      description: 'General • 234 members',
      lastMessage: 'Anyone up for coffee?',
      time: '45m ago',
      unread: 0,
      isLive: false,
      avatar: '🎓'
    }
  ];

  const eventChats = [
    {
      id: 'e1',
      name: 'Tech Conference 2025',
      description: 'Jan 15-17 • 120 attendees',
      lastMessage: 'Schedule update: Keynote moved to 10 AM',
      time: '10m ago',
      unread: 5,
      isLive: true,
      avatar: '💻',
      isInviteOnly: true
    },
    {
      id: 'e2',
      name: 'Music Festival Planning',
      description: 'Feb 20 • 80 members',
      lastMessage: 'Artist lineup announcement tomorrow!',
      time: '30m ago',
      unread: 2,
      isLive: true,
      avatar: '🎵',
      isInviteOnly: true
    },
    {
      id: 'e3',
      name: 'Startup Pitch Night',
      description: 'Jan 25 • 50 entrepreneurs',
      lastMessage: 'Registration closes in 3 days',
      time: '1h ago',
      unread: 0,
      isLive: false,
      avatar: '🚀',
      isInviteOnly: false
    }
  ];

  const currentChat = [...directMessages, ...communityChats, ...eventChats].find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      message: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type: 'text'
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  return (
    <div className="h-screen flex bg-black">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Messages</h1>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="relative">
                <Heart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-600/80">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-10 bg-secondary border-0 rounded-full"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2 mt-3">
            <Button size="sm" variant="outline" className="flex-1 border-blue-600/30 text-xs">
              <Users className="w-3 h-3 mr-1" />
              Groups
            </Button>
            <Button size="sm" variant="outline" className="flex-1 border-blue-600/30 text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Events
            </Button>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-gradient-to-r from-blue-600/10 to-transparent p-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Live:</span>
            <span className="text-xs text-gray-300">3 active event chats • 12 new messages</span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 m-2">
            <TabsTrigger value="dms" className="text-xs">DMs</TabsTrigger>
            <TabsTrigger value="groups" className="text-xs">Groups</TabsTrigger>
            <TabsTrigger value="events" className="text-xs">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="dms" className="flex-1 overflow-y-auto">
            <div className="space-y-1 p-2">
              {directMessages.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-secondary/50 ${
                    selectedChat === chat.id ? 'bg-blue-600/20 border border-blue-600/30' : ''
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold truncate">{chat.name}</p>
                        <span className="text-xs text-gray-400">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                      <p className="text-xs text-gray-500">{chat.username}</p>
                    </div>
                    
                    {chat.unread > 0 && (
                      <Badge className="bg-blue-600 text-white text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="flex-1 overflow-y-auto">
            <div className="space-y-1 p-2">
              {communityChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-secondary/50 ${
                    selectedChat === chat.id ? 'bg-blue-600/20 border border-blue-600/30' : ''
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-2xl">
                        {chat.avatar}
                      </div>
                      {chat.isLive && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold truncate">{chat.name}</p>
                        <span className="text-xs text-gray-400">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                      <p className="text-xs text-gray-500">{chat.description}</p>
                    </div>
                    
                    {chat.unread > 0 && (
                      <Badge className="bg-blue-600 text-white text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="flex-1 overflow-y-auto">
            <div className="space-y-1 p-2">
              {eventChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-secondary/50 ${
                    selectedChat === chat.id ? 'bg-blue-600/20 border border-blue-600/30' : ''
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl">
                        {chat.avatar}
                      </div>
                      {chat.isLive && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                      {'isInviteOnly' in chat && chat.isInviteOnly && (
                        <div className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-card flex items-center justify-center">
                          <span className="text-xs">🔒</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold truncate">{chat.name}</p>
                          {'isInviteOnly' in chat && chat.isInviteOnly && (
                            <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-500">
                              Invite Only
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {chat.description}
                      </p>
                    </div>
                    
                    {chat.unread > 0 && (
                      <Badge className="bg-blue-600 text-white text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {typeof currentChat.avatar === 'string' && currentChat.avatar.length <= 2 
                      ? currentChat.avatar 
                      : currentChat.name[0]
                    }
                  </div>
                  <div>
                    <h2 className="font-semibold">{currentChat.name}</h2>
                    <p className="text-sm text-gray-400">
                      {'username' in currentChat ? currentChat.username : currentChat.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.isMe 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-secondary text-white'
                  }`}>
                    {!msg.isMe && (
                      <p className="text-xs font-semibold mb-1 opacity-70">{msg.sender}</p>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    {msg.type === 'shared_post' && msg.postContent && (
                      <div className="mt-2 p-2 bg-black/20 rounded text-xs">
                        <p>"{msg.postContent}"</p>
                      </div>
                    )}
                    <p className={`text-xs mt-1 ${msg.isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost">
                  <Smile className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="bg-secondary border-0 pr-20"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Gift className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Mic className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-600/80" onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
              <p className="text-gray-400">Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
