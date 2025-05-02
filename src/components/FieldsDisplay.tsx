
import { useState } from 'react';
import FieldsGrid from './FieldsGrid';
import SearchFilter from './SearchFilter';
import { Field } from '@/types/field';

interface FieldsDisplayProps {
  fields: Field[];
  selectedDate: Date; // Add selectedDate prop
}

const FieldsDisplay = ({ fields, selectedDate }: FieldsDisplayProps) => {
  const [filters, setFilters] = useState({
    search: '',
    sport: '',
    price: '',
    availability: '',
  });

  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="w-full bg-sport-blue rounded-lg p-6 space-y-6">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Canchas Disponibles</h2>
          <p className="text-muted">Reserva tu próximo partido o entrenamiento</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-sport-yellow"></div>
          <span className="text-white font-bold">{fields.length} Canchas</span>
        </div>
      </div>
      
      <SearchFilter onSearch={handleSearch} />
      
      <FieldsGrid fields={fields} filters={filters} selectedDate={selectedDate} />
    </div>
  );
};

export default FieldsDisplay;
