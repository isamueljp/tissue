
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface FilterCategory {
  id: string;
  name: string;
  emoji: string;
  count: number;
  isActive: boolean;
}

interface SmartInterestFiltersProps {
  onFilterChange: (activeFilters: string[]) => void;
}

export const SmartInterestFilters = ({ onFilterChange }: SmartInterestFiltersProps) => {
  const [filters, setFilters] = useState<FilterCategory[]>([
    { id: 'all', name: 'All', emoji: '🌟', count: 42, isActive: true },
    { id: 'house', name: 'House', emoji: '🏠', count: 12, isActive: false },
    { id: 'talk', name: 'Talk Show', emoji: '🎤', count: 8, isActive: false },
    { id: 'club', name: 'Club', emoji: '🎧', count: 15, isActive: false },
    { id: 'birthday', name: 'Birthday', emoji: '🎉', count: 6, isActive: false },
    { id: 'study', name: 'Study', emoji: '📚', count: 9, isActive: false },
    { id: 'gaming', name: 'Gaming', emoji: '🎮', count: 4, isActive: false }
  ]);

  const handleFilterToggle = (filterId: string) => {
    const updatedFilters = filters.map(filter => {
      if (filterId === 'all') {
        return { ...filter, isActive: filter.id === 'all' };
      } else {
        if (filter.id === 'all') {
          return { ...filter, isActive: false };
        }
        return filter.id === filterId 
          ? { ...filter, isActive: !filter.isActive }
          : filter;
      }
    });

    setFilters(updatedFilters);
    
    const activeFilters = updatedFilters
      .filter(f => f.isActive && f.id !== 'all')
      .map(f => f.id);
    
    onFilterChange(activeFilters);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-white">What's your vibe?</span>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Badge
            key={filter.id}
            variant={filter.isActive ? "default" : "outline"}
            className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
              filter.isActive 
                ? 'bg-[#00197e] text-white hover:bg-[#00197e]/80' 
                : 'border-gray-600 text-gray-400 hover:border-[#00197e] hover:text-[#00197e]'
            }`}
            onClick={() => handleFilterToggle(filter.id)}
          >
            <span className="mr-1">{filter.emoji}</span>
            {filter.name}
            <span className="ml-1 text-xs opacity-70">({filter.count})</span>
          </Badge>
        ))}
      </div>
    </div>
  );
};
