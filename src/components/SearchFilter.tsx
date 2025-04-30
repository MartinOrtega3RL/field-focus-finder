
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface SearchFilterProps {
  onSearch: (filters: {
    search: string;
    sport: string;
    price: string;
    availability: string;
  }) => void;
}

const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [filters, setFilters] = useState({
    search: '',
    sport: '',
    price: '',
    availability: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <Input
              type="text"
              placeholder="Search for fields..."
              className="pl-10 h-12 sport-input"
              value={filters.search}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button 
              type="button"
              variant="outline"
              className="h-12 flex items-center gap-2 border-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
            </Button>
            <Button type="submit" className="h-12 sport-button">
              Search
            </Button>
          </div>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sport Type</label>
              <Select
                value={filters.sport}
                onValueChange={(value) => handleSelectChange('sport', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Sports" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Sports</SelectItem>
                  <SelectItem value="soccer">Soccer</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                  <SelectItem value="volleyball">Volleyball</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <Select
                value={filters.price}
                onValueChange={(value) => handleSelectChange('price', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Price</SelectItem>
                  <SelectItem value="low">Under $50</SelectItem>
                  <SelectItem value="medium">$50 - $100</SelectItem>
                  <SelectItem value="high">Over $100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Availability</label>
              <Select
                value={filters.availability}
                onValueChange={(value) => handleSelectChange('availability', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Time</SelectItem>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilter;
