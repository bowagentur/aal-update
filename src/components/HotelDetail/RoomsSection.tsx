import { ChevronRight, Baby, Dog, Users, Check } from 'lucide-react';

interface RoomType {
  name: string;
  description: string;
  image: string;
  price: {
    single?: string;
    double?: string;
    triple?: string;
  };
  amenities: string[];
}

interface RoomsSectionProps {
  roomTypes: RoomType[];
  standardFeatures: string[];
  policies: {
    children?: string;
    pets?: {
      notes?: string;
      fee?: string;
    };
    specialRates?: {
      groups?: string;
      business?: string;
      longStay?: string;
    };
  };
}

export function RoomsSection({ roomTypes, standardFeatures, policies }: RoomsSectionProps) {
  return (
    <section id="zimmer" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">Zimmer, Suiten & Apartments</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Das Hotel Rheinpark Rees verfügt über 64 großzügige Nichtraucherzimmer, überwiegend mit direktem Rheinblick. 
          Genießen Sie den einmaligen Panorama-Rheinblick bei Ihrem Besuch im Hotel Rheinpark Rees am Rhein.
        </p>
        
        {/* Zimmertypen Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {roomTypes.map((type, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-semibold text-[var(--color-primary)]">
                    ab {type.price.double}€
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2">{type.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{type.description}</p>
                
                {/* Preise */}
                <div className="space-y-2 mb-4 text-sm">
                  {type.price.single && (
                    <div className="flex justify-between">
                      <span>Einzelbelegung</span>
                      <span className="font-medium">{type.price.single}€</span>
                    </div>
                  )}
                  {type.price.double && (
                    <div className="flex justify-between">
                      <span>Doppelbelegung</span>
                      <span className="font-medium">{type.price.double}€</span>
                    </div>
                  )}
                  {type.price.triple && (
                    <div className="flex justify-between">
                      <span>3er-Belegung</span>
                      <span className="font-medium">{type.price.triple}€</span>
                    </div>
                  )}
                </div>

                {/* Amenities */}
                <div className="space-y-2 mb-6">
                  {type.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                        <ChevronRight className="w-3 h-3 text-[var(--color-primary)]" />
                      </div>
                      {amenity}
                    </div>
                  ))}
                </div>

                <button className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors">
                  Zimmer buchen
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Standard Ausstattung */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-2xl font-serif mb-6">Standard Ausstattung</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {standardFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <ChevronRight className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="bg-[var(--color-primary)]/5 p-8 rounded-xl">
            <h3 className="text-2xl font-serif mb-6">Gut zu wissen</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Baby className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                <div>
                  <span className="block font-medium mb-1">Kinder</span>
                  <span className="text-gray-600 text-sm">{policies.children}</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Dog className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                <div>
                  <span className="block font-medium mb-1">Haustiere</span>
                  <span className="text-gray-600 text-sm">{policies.pets?.notes}</span>
                  <span className="block text-sm text-[var(--color-primary)]">{policies.pets?.fee}</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                <div>
                  <span className="block font-medium mb-1">Sonderkonditionen</span>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>{policies.specialRates?.groups}</li>
                    <li>{policies.specialRates?.business}</li>
                    <li>{policies.specialRates?.longStay}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 