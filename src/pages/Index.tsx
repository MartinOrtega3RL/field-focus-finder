import { useState } from 'react';
import FieldCarousel from "@/components/FieldCarousel";
import SearchFilter from "@/components/SearchFilter";
import FieldsGrid from "@/components/FieldsGrid";
import { fields } from "@/data/fields";
const Index = () => {
  const [filters, setFilters] = useState({
    search: '',
    sport: '',
    price: '',
    availability: ''
  });
  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  return <div className="min-h-screen">
      

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Carousel */}
        <section className="mb-12">
          <FieldCarousel />
        </section>

        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">Find Your Perfect Field</h2>
            <p className="text-muted">Search and filter through available sports fields</p>
          </div>
          <SearchFilter onSearch={handleSearch} />
        </section>

        {/* Fields Grid Section */}
        <section className="mb-12">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Available Fields</h2>
              <p className="text-muted">Book your next game or practice session</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-sport-yellow"></div>
              <span className="text-white font-bold">{fields.length} Fields</span>
            </div>
          </div>
          <FieldsGrid fields={fields} filters={filters} />
        </section>
      </main>

      <footer className="bg-sport-blue py-8 px-4 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">FieldFinder</h2>
              <p className="text-muted">Book sports fields with ease</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-sport-orange transition-colors">
                Terms
              </a>
              <a href="#" className="text-white hover:text-sport-orange transition-colors">
                Privacy
              </a>
              <a href="#" className="text-white hover:text-sport-orange transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} FieldFinder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;