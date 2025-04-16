import { Waves, Clock } from 'lucide-react';

interface WellnessArea {
  name: string;
  description: string;
  image: string;
}

interface WellnessSectionProps {
  title?: string;
  intro?: string;
  description?: string;
  features?: string[];
  areas?: WellnessArea[];
  openingHours?: {
    weekdays?: string;
    weekend?: string;
  };
  pricing?: {
    hotelGuests?: {
      dayPass?: string;
      whirlpool?: string;
    };
    externalGuests?: {
      weekday?: {
        dayPass?: string;
        whirlpool?: string;
      };
      weekend?: {
        dayPass?: string;
        whirlpool?: string;
      };
    };
  };
  images?: Array<{
    url: string;
    alt: string;
  }>;
}

export function WellnessSection({ 
  title, 
  intro, 
  description, 
  features, 
  areas, 
  openingHours, 
  pricing,
  images 
}: WellnessSectionProps) {
  return (
    <section id="wellness" className="py-20 bg-white-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">{title}</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">{intro}</p>

        {/* Hauptbeschreibung mit Bild */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">{description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <Waves className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden h-[400px]">
            <img 
              src={images?.[0]?.url}
              alt={images?.[0]?.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Wellness-Bereiche */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {areas?.map((area, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-3">{area.name}</h3>
                <p className="text-gray-600 text-sm">{area.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Öffnungszeiten & Preise */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Öffnungszeiten */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-serif mb-6">Öffnungszeiten</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-[var(--color-primary)]" />
                <div>
                  <p className="text-gray-600">{openingHours?.weekdays}</p>
                  <p className="text-gray-600">{openingHours?.weekend}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preise */}
          <div className="bg-[var(--color-primary)]/5 rounded-xl p-8">
            <h3 className="text-2xl font-serif mb-6">Preise</h3>
            <div className="space-y-6">
              {/* Hotelgäste */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium mb-3">Für Hotelgäste</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Wellnessbereich</span>
                    <span className="font-medium text-[var(--color-primary)]">
                      {pricing?.hotelGuests?.dayPass}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Whirlpool</span>
                    <span>{pricing?.hotelGuests?.whirlpool}</span>
                  </div>
                </div>
              </div>

              {/* Externe Gäste */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium mb-3">Für externe Gäste</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="mb-2 text-gray-600">Montag - Donnerstag</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Tageskarte</span>
                        <span>{pricing?.externalGuests?.weekday?.dayPass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Whirlpool</span>
                        <span>{pricing?.externalGuests?.weekday?.whirlpool}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-gray-600">Freitag - Sonntag & Feiertage</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Tageskarte</span>
                        <span>{pricing?.externalGuests?.weekend?.dayPass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Whirlpool</span>
                        <span>{pricing?.externalGuests?.weekend?.whirlpool}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 