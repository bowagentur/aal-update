import { Star, MapPin } from 'lucide-react';
import { hotels } from '../../data/hotels';

export function HotelGrid() {
  return (
    <section className="py-24 bg-gray-50" id="hotels">
      <div className="custom-container">
        <div className="text-center mb-16">
          <span className="text-secondary uppercase tracking-wider">Unsere Standorte</span>
          <h2 className="text-4xl font-serif mt-2 mb-4">Exklusive Hotels</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Entdecken Sie unsere sorgfältig ausgewählten Hotels an einzigartigen Standorten
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <article key={hotel.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64">
                <img 
                  src={hotel.sections.welcome.images[0].url} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-secondary mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{hotel.location.city}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-serif">{hotel.name}</h3>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex">
                    {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{hotel.rating}</span>
                </div>
                
                <p className="text-gray-600 mb-6 text-sm line-clamp-2">{hotel.description}</p>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <a 
                      href={`/hotels/${hotel.id}`} 
                      className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium text-sm group-hover:underline"
                    >
                      Details ansehen
                    </a>
                    <button className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded-lg text-sm hover:bg-[var(--color-secondary)]/90 transition-colors">
                      Jetzt buchen
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}