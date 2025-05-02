
import { useState } from 'react';
import FieldCarousel from "@/components/FieldCarousel";
import SearchFilter from "@/components/SearchFilter";
import FieldsGrid from "@/components/FieldsGrid";
import DateTimePicker from "@/components/DateTimePicker";
import { fields } from "@/data/fields";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined);
  const [showSearchAndFields, setShowSearchAndFields] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    sport: '',
    price: '',
    availability: ''
  });

  const handleDateTimeSelected = (date: Date | undefined, timeSlot: string | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
    
    // Mostrar sección de búsqueda y canchas solo cuando ambos están seleccionados
    if (date && timeSlot) {
      setShowSearchAndFields(true);
    }
  };

  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return <div className="min-h-screen">
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Carousel */}
        <section className="mb-12">
          <FieldCarousel />
        </section>

        {/* Date & Time Picker Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">Reserva tu Cancha</h2>
            <p className="text-muted">Comienza seleccionando el día y horario para tu reserva</p>
          </div>
          <DateTimePicker onDateTimeSelected={handleDateTimeSelected} />
        </section>

        {/* Search and Filter Section - Only shown after date and time are selected */}
        {showSearchAndFields && (
          <>
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Encuentra tu Cancha Perfecta</h2>
                <p className="text-muted">Busca y filtra entre las canchas disponibles para {selectedDate && new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' }).format(selectedDate)}</p>
              </div>
              <SearchFilter onSearch={handleSearch} />
            </section>

            {/* Fields Grid Section */}
            <section className="mb-12">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Canchas Disponibles</h2>
                  <p className="text-muted">Reserva tu próximo partido o sesión de entrenamiento</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-sport-yellow"></div>
                  <span className="text-white font-bold">{fields.length} Canchas</span>
                </div>
              </div>
              <FieldsGrid fields={fields} filters={filters} />
            </section>
          </>
        )}
      </main>

      <footer className="bg-sport-blue py-8 px-4 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">BuscaCanchas</h2>
              <p className="text-muted">Reserva canchas deportivas fácilmente</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-sport-orange transition-colors">
                Términos
              </a>
              <a href="#" className="text-white hover:text-sport-orange transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-white hover:text-sport-orange transition-colors">
                Contacto
              </a>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} BuscaCanchas. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>;
};

export default Index;
