
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-20 right-6 w-14 h-14 bg-[#00197e] hover:bg-[#00197e]/80 rounded-full shadow-lg z-40 flex items-center justify-center"
      size="icon"
    >
      <Plus className="w-6 h-6 text-white" />
    </Button>
  );
};
