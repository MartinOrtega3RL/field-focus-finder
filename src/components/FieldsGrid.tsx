
import { useState, useEffect } from 'react';
import FieldCard from './FieldCard';
import { Field } from '@/types/field';

interface FieldsGridProps {
  fields: Field[];
  filters: {
    search: string;
    sport: string;
    price: string;
    availability: string;
  };
}

const FieldsGrid = ({ fields, filters }: FieldsGridProps) => {
  const [filteredFields, setFilteredFields] = useState<Field[]>([]);

  useEffect(() => {
    let result = [...fields];

    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        field => 
          field.name.toLowerCase().includes(searchLower) || 
          field.description.toLowerCase().includes(searchLower) ||
          field.location.toLowerCase().includes(searchLower)
      );
    }

    // Filter by sport type
    if (filters.sport) {
      result = result.filter(field => field.sport.toLowerCase() === filters.sport.toLowerCase());
    }

    // Filter by price
    if (filters.price) {
      const price = parseFloat(field.price.replace(/[^0-9.]/g, ''));
      switch (filters.price) {
        case 'low':
          result = result.filter(field => {
            const price = parseFloat(field.price.replace(/[^0-9.]/g, ''));
            return price < 50;
          });
          break;
        case 'medium':
          result = result.filter(field => {
            const price = parseFloat(field.price.replace(/[^0-9.]/g, ''));
            return price >= 50 && price <= 100;
          });
          break;
        case 'high':
          result = result.filter(field => {
            const price = parseFloat(field.price.replace(/[^0-9.]/g, ''));
            return price > 100;
          });
          break;
      }
    }

    // Filter by availability
    if (filters.availability) {
      result = result.filter(field => {
        switch (filters.availability) {
          case 'morning':
            return Object.values(field.availability).some(daySlots => 
              daySlots.some(slot => {
                const hour = parseInt(slot.split(' - ')[0].split(':')[0]);
                return hour >= 6 && hour < 12;
              })
            );
          case 'afternoon':
            return Object.values(field.availability).some(daySlots => 
              daySlots.some(slot => {
                const hour = parseInt(slot.split(' - ')[0].split(':')[0]);
                return hour >= 12 && hour < 17;
              })
            );
          case 'evening':
            return Object.values(field.availability).some(daySlots => 
              daySlots.some(slot => {
                const hour = parseInt(slot.split(' - ')[0].split(':')[0]);
                return hour >= 17 && hour < 23;
              })
            );
          case 'weekend':
            return (
              field.availability.saturday.length > 0 || 
              field.availability.sunday.length > 0
            );
          default:
            return true;
        }
      });
    }

    setFilteredFields(result);
  }, [fields, filters]);

  if (filteredFields.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-white/5 rounded-lg">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">No fields found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredFields.map(field => (
        <FieldCard key={field.id} field={field} />
      ))}
    </div>
  );
};

export default FieldsGrid;
