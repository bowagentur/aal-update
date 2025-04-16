import { MapPin, Star, Clock } from 'lucide-react';

interface HeroSectionProps {
  hotel: {
    name: string;
    description: string;
    rating: number;
    rooms: {
      total: number;
    };
    location: {
      city: string;
    };
    policies: {
      checkIn: {
        from: string;
      };
      checkOut: {
        until: string;
      };
    };
    sections?: {
      welcome?: {
        images?: Array<{
          url: string;
        }>;
      };
    };
    images?: Array<{
      url: string;
    }>;
  };
}

export function HeroSection({ hotel }: HeroSectionProps) {
  const welcomeImage = hotel.sections?.welcome?.images?.[0]?.url ?? hotel.images?.[0]?.url;

  return (
    <div className="relative mb-[calc(25vh+60px)] md:mb-[25vh]">
      {/* Hauptbild */}
      <div className="h-[80vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src={welcomeImage}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Überlappende Info-Box */}
      <div className="absolute bottom-0 left-0 right-0 z-20 transform translate-y-1/2">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Hotel Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">{hotel.location?.city}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif mb-4">{hotel.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="h-6 w-px bg-gray-200" />
                  <span className="text-gray-600">{hotel.rooms?.total} Zimmer</span>
                </div>
                <p className="text-gray-600 line-clamp-2">{hotel.description}</p>
              </div>

              {/* Quick Info */}
              <div className="flex-shrink-0 w-full md:w-72 border-t md:border-l md:border-t-0 pt-4 md:pt-0 md:pl-8 mt-4 md:mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[var(--color-primary)]/5 rounded-lg">
                    <Clock className="w-6 h-6 text-[var(--color-primary)] mx-auto mb-2" />
                    <span className="block text-sm font-medium">Check-in</span>
                    <span className="text-xs text-gray-600">ab {hotel.policies?.checkIn?.from}</span>
                  </div>
                  <div className="text-center p-4 bg-[var(--color-primary)]/5 rounded-lg">
                    <Clock className="w-6 h-6 text-[var(--color-primary)] mx-auto mb-2" />
                    <span className="block text-sm font-medium">Check-out</span>
                    <span className="text-xs text-gray-600">bis {hotel.policies?.checkOut?.until}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 rounded-lg transition-colors">
                  Jetzt buchen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 