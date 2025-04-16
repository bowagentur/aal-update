import { Star, Waves, Hotel, Wifi, Coffee, Droplets, UtensilsCrossed, Dumbbell, Users, BedDouble, HeartHandshake } from 'lucide-react';

interface HotelHighlightsProps {
  highlights: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export function HotelHighlights({ highlights }: HotelHighlightsProps) {
  const iconComponents: { [key: string]: any } = {
    Star, 
    Waves, 
    Hotel, 
    Wifi, 
    Coffee, 
    Spa: Droplets,
    UtensilsCrossed, 
    Dumbbell, 
    Users, 
    BedDouble,
    HeartHandshake
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif text-center mb-12">
          Hotelleistungen auf einen Blick
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => {
            const IconComponent = iconComponents[highlight.icon];

            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-medium mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-600">{highlight.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 