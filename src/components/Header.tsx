
import { MessageSquare, Plus, User, Hash } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <Hash className="w-6 h-6 text-white font-bold" />
            </div>
            <h1 className="text-2xl font-bold text-gradient-red">society6</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
              <Hash className="w-4 h-4" />
              <span>discover</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>events</span>
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" className="hidden sm:flex">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 futuristic-glow">
              <Plus className="w-4 h-4 mr-2" />
              Host
            </Button>
            <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full bg-accent/20">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
