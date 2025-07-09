
import { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, Users } from 'lucide-react';

const phrases = [
  { text: "🔥 Trending parties tonight", icon: <Flame className="w-4 h-4 text-orange-500" /> },
  { text: "⏳ Last chance to RSVP", icon: <Clock className="w-4 h-4 text-red-500" /> },
  { text: "✨ Where plans become parties", icon: <Sparkles className="w-4 h-4 text-yellow-500" /> },
  { text: "👥 Your friends are waiting", icon: <Users className="w-4 h-4 text-blue-500" /> },
  { text: "🎯 Tonight, we don't miss out", icon: <Sparkles className="w-4 h-4 text-purple-500" /> }
];

export const AnimatedHeader = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-4 space-y-2">
      <div className="relative h-8 overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(${currentPhrase * -100}%)` }}
        >
          {phrases.map((phrase, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-lg font-bold text-white w-full justify-center"
              style={{ transform: `translateY(${index * 100}%)` }}
            >
              {phrase.icon}
              <span>{phrase.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-gray-400 animate-fade-in">
        Your city is waiting. What's the move?
      </p>
    </div>
  );
};
