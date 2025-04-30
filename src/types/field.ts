
export interface Availability {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
}

export interface Field {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  price: string;
  status: 'Available' | 'Booked' | 'Maintenance';
  sport: string;
  features: string[];
  availability: Availability;
}
