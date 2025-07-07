
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              
              {/* Main logo container */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-[#00197e] to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                <img 
                  src="/lovable-uploads/ee40ffbc-5548-405a-b158-a0a40933c6a3.png" 
                  alt="Fourth Degree Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              
              {/* Premium indicator */}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200">
            fourth degree
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-12 animate-fade-in delay-300">
          <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
            The exclusive social hub for university students
          </p>
          <p className="text-lg text-gray-400">
            Host, discover, and co-create premium events
          </p>
        </div>

        {/* Get Started Button */}
        <div className="animate-fade-in delay-500">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-[#00197e] to-blue-600 hover:from-blue-700 hover:to-[#00197e] text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Features hint */}
        <div className="mt-16 animate-fade-in delay-700">
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>Premium Events</span>
            <span>•</span>
            <span>Student Communities</span>
            <span>•</span>
            <span>Exclusive Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};
