import { Utensils, ChevronRight, Phone, Mail } from 'lucide-react';

interface Menu {
  title: string;
  url: string;
}

interface Brochure {
  title: string;
  url: string;
}

interface RestaurantSectionProps {
  title?: string;
  intro?: string;
  description?: string;
  features?: string[];
  quote?: {
    text?: string;
    author?: string;
  };
  images?: Array<{
    url: string;
    alt: string;
  }>;
  openingHours?: {
    current?: {
      validUntil?: string;
      times?: Array<{
        days: string;
        hours: string;
        kitchen?: string;
      }>;
    };
    breakfast?: {
      weekday?: string;
      weekend?: string;
    };
  };
  menus?: { [key: string]: Menu };
  brochures?: { [key: string]: Brochure };
  contact?: {
    phone?: string;
    email?: string;
  };
}

export function RestaurantSection({ 
  title, 
  intro, 
  description, 
  features, 
  quote, 
  images, 
  openingHours, 
  menus, 
  brochures, 
  contact 
}: RestaurantSectionProps) {
  return (
    <section id="restaurant" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">{title}</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">{intro}</p>

        {/* Hauptinfo mit Bildern */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <p className="text-gray-600 leading-relaxed">{description}</p>
            
            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <Utensils className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            {/* Zitat */}
            {quote && (
              <blockquote className="border-l-4 border-[var(--color-primary)] pl-4 italic">
                <p className="text-gray-600 mb-2">{quote.text}</p>
                <footer className="text-sm text-gray-500">- {quote.author}</footer>
              </blockquote>
            )}
          </div>

          {/* Bildergalerie */}
          <div className="grid gap-4">
            {images?.map((image, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Öffnungszeiten & Speisekarten */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Öffnungszeiten */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-serif mb-6">Öffnungszeiten</h3>
            <div className="space-y-6">
              {/* Aktuelle Zeiten */}
              <div>
                <p className="text-sm text-gray-500 mb-3">Bis zum {openingHours?.current?.validUntil}</p>
                <div className="space-y-4">
                  {openingHours?.current?.times?.map((time, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="font-medium">{time.days}</span>
                      <span className="text-gray-600">{time.hours}</span>
                      {time.kitchen && (
                        <span className="text-sm text-gray-500">Küche: {time.kitchen}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Frühstückszeiten */}
              <div className="pt-6 border-t">
                <h4 className="font-medium mb-3">Frühstück</h4>
                <div className="space-y-2 text-gray-600">
                  <p>{openingHours?.breakfast?.weekday}</p>
                  <p>{openingHours?.breakfast?.weekend}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Speisekarten & Broschüren */}
          <div className="bg-[var(--color-primary)]/5 rounded-xl p-8">
            <h3 className="text-2xl font-serif mb-6">Speisekarten & Broschüren</h3>
            <div className="grid gap-6">
              {/* Speisekarten */}
              <div>
                <h4 className="font-medium mb-4">Speisekarten</h4>
                <div className="space-y-3">
                  {menus && Object.values(menus).map((menu, index) => (
                    <a 
                      key={index}
                      href={menu.url}
                      className="flex items-center gap-3 text-gray-600 hover:text-[var(--color-primary)]"
                    >
                      <ChevronRight className="w-5 h-5" />
                      {menu.title} herunterladen
                    </a>
                  ))}
                </div>
              </div>

              {/* Broschüren */}
              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Broschüren</h4>
                <div className="space-y-3">
                  {brochures && Object.values(brochures).map((brochure, index) => (
                    <a 
                      key={index}
                      href={brochure.url}
                      className="flex items-center gap-3 text-gray-600 hover:text-[var(--color-primary)]"
                    >
                      <ChevronRight className="w-5 h-5" />
                      {brochure.title} herunterladen
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kontakt */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-serif mb-6">Reservierung</h3>
          <div className="space-y-4">
            <p className="text-gray-600">Wir freuen uns auf Ihre Reservierung!</p>
            <div className="flex items-center justify-center gap-8">
              <a 
                href={`tel:${contact?.phone}`}
                className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
              >
                <Phone className="w-5 h-5" />
                {contact?.phone}
              </a>
              <a 
                href={`mailto:${contact?.email}`}
                className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
              >
                <Mail className="w-5 h-5" />
                {contact?.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 