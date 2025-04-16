import { Building, CalendarCheck } from 'lucide-react';
import { useState } from 'react';

export function Apartments() {
  const [selectedHotel, setSelectedHotel] = useState('rheinpark-rees');

  const handleHotelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHotel(event.target.value);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="custom-container">
        <h2 className="text-3xl font-serif mb-8 text-center">Luxuriöse Apartments</h2>
        <p className="text-gray-600 text-center text-lg mb-12">
          Entdecken Sie unsere exklusiven Apartments in erstklassigen Lagen
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hotel Selection */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <Building className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-medium mb-4 text-center">Wählen Sie Ihr Hotel</h3>
            <select 
              value={selectedHotel}
              onChange={handleHotelChange}
              className="w-full p-3 border border-gray-200 rounded-lg text-gray-600
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                appearance-none cursor-pointer hover:border-primary transition-all"
            >
              <option value="rheinpark-rees">Hotel Rheinpark Rees</option>
              <option value="atlanta-leipzig">Atlanta Hotel Leipzig</option>
              <option value="dampfmuehle">Hotel Dampfmühle</option>
              <option value="luisenplatz">Hotel Am Luisenplatz</option>
              <option value="bb-potsdam">B&B Am Luisenplatz</option>
              <option value="kamper-hof">Hostel Kamper Hof</option>
            </select>
          </div>

          {/* Booking Button */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <CalendarCheck className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-medium mb-4 text-center">Jetzt Buchen</h3>
            <a 
              href={`https://www.booking.com/hotel/de/${selectedHotel}.de.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-medium
                py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Apartment Reservieren
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}