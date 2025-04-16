import { useParams } from 'react-router-dom';
import { hotels, defaultHotel } from '../data/hotels';
import { useTheme } from '../context/ThemeContext';
import { NotFound } from '../components/NotFound';
import { useEffect } from 'react';
import { 
  Wifi, 
  Utensils, 
  MapPin, 
  Star, 
  ChevronRight, 
  Clock, 
  CreditCard, 
  Dog, 
  Waves,
  Phone, 
  Mail, 
  Building,
  Calendar,
  Heart,
  Baby,
  Users,
  Check,
  Plus,
  ChevronDown,
  Hotel,
  Coffee,
  Droplets,
  UtensilsCrossed,
  Dumbbell,
  BedDouble,
  HeartHandshake
} from 'lucide-react';
import { Disclosure } from '@headlessui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export function HotelDetail() {
  const { hotelId } = useParams();
  const hotel = hotels.find(h => h.id === hotelId);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (hotel?.branding) {
      setTheme({
        primary: hotel.branding.primaryColor,
        secondary: hotel.branding.secondaryColor
      });
    } else {
      // Reset to default theme if no hotel found
      setTheme({
        primary: defaultHotel.branding.primaryColor,
        secondary: defaultHotel.branding.secondaryColor
      });
    }

    // Cleanup function to reset theme when component unmounts
    return () => {
      setTheme({
        primary: defaultHotel.branding.primaryColor,
        secondary: defaultHotel.branding.secondaryColor
      });
    };
  }, [hotel, setTheme]);

  if (!hotel) {
    return <NotFound />;
  }

  // Sicherer Zugriff auf verschachtelte Eigenschaften
  const welcomeImage = hotel.sections?.welcome?.images?.[0]?.url ?? hotel.images?.[0]?.url;
  const roomTypes = hotel.rooms?.types ?? [];
  const roomFeatures = hotel.rooms?.features ?? [];
  const meetingRooms = hotel.amenities?.business?.meetingRooms ?? [];
  const meetingAmenities = hotel.amenities?.business?.equipment ?? [];

  return (
    <div className="hotel-page min-h-screeLn bg-white">
      {/* Hero Section mit großem Bild und überlappendem Content */}
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

      {/* Hauptnavigation - Updated positioning and z-index */}
      <div className=" top-[60px] md:top-0 bg-white shadow-sm z-30 mt-[60px] md:mt-[40px]">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 md:gap-8 overflow-x-auto py-3 md:py-4 scrollbar-hide">
            <a href="#uebersicht" className="text-[var(--color-primary)] font-medium whitespace-nowrap text-sm md:text-base">Übersicht</a>
            <a href="#zimmer" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Zimmer</a>
            <a href="#wellness" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Wellness & Spa</a>
            <a href="#restaurant" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Restaurant</a>
            <a href="#tagungen" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Tagungen</a>
            <a href="#gutscheine" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Gutscheine</a>
            <a href="#kontakt" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Kontakt</a>
          </div>
        </div>
      </div>

      {/* Welcome Section - Updated margin */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Text */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                {hotel.sections.welcome.title}
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                {hotel.sections.welcome.intro}
              </p>
            </div>

            {/* Location & Gastronomy Grid */}
            <div className="grid md:grid-cols-2 gap-12">
              {hotel.sections.welcome.content.map((section, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-serif mb-4">{section.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{section.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-12">
            Hotelleistungen auf einen Blick
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hotel.sections.welcome.highlights.map((highlight, index) => {
              const IconComponent = {
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
              }[highlight.icon];

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

      {/* Highlights Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Waves className="w-8 h-8" />, title: "Wellness", text: "2.000m² Spa-Bereich" },
              { icon: <Utensils className="w-8 h-8" />, title: "Restaurant", text: "Regionale Küche" },
              { icon: <Wifi className="w-8 h-8" />, title: "Services", text: "Kostenfreies WLAN" }
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 group-hover:bg-[var(--color-primary)]/5">
                  <div className="text-[var(--color-primary)] mb-4">{item.icon}</div>
                  <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dekorative Trenner */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>

      {/* Zimmer & Suiten */}
      <section id="zimmer" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">Zimmer, Suiten & Apartments</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Das Hotel Rheinpark Rees verfügt über 64 großzügige Nichtraucherzimmer, überwiegend mit direktem Rheinblick. 
            Genießen Sie den einmaligen Panorama-Rheinblick bei Ihrem Besuch im Hotel Rheinpark Rees am Rhein.
          </p>
          
          {/* Zimmertypen Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {hotel.rooms.types.map((type, index) => (
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
                {hotel.rooms.standardFeatures.map((feature, index) => (
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
                    <span className="text-gray-600 text-sm">{hotel.rooms.policies.children}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Dog className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                  <div>
                    <span className="block font-medium mb-1">Haustiere</span>
                    <span className="text-gray-600 text-sm">{hotel.rooms.policies.pets.notes}</span>
                    <span className="block text-sm text-[var(--color-primary)]">{hotel.rooms.policies.pets.fee}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                  <div>
                    <span className="block font-medium mb-1">Sonderkonditionen</span>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>{hotel.rooms.policies.specialRates.groups}</li>
                      <li>{hotel.rooms.policies.specialRates.business}</li>
                      <li>{hotel.rooms.policies.specialRates.longStay}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dekorativer Trenner */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>

      {/* Wellness & Spa */}
      <section id="wellness" className="py-20 bg-white-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">{hotel.amenities.wellness.title}</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">{hotel.amenities.wellness.intro}</p>

          {/* Hauptbeschreibung mit Bild */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">{hotel.amenities.wellness.description}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {hotel.amenities.wellness.features.map((feature, index) => (
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
                src={hotel.amenities.wellness.images[0].url}
                alt={hotel.amenities.wellness.images[0].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Wellness-Bereiche */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {hotel.amenities.wellness.areas.map((area, index) => (
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
                    <p className="text-gray-600">{hotel.amenities.wellness.openingHours.weekdays}</p>
                    <p className="text-gray-600">{hotel.amenities.wellness.openingHours.weekend}</p>
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
                        {hotel.amenities.wellness.pricing.hotelGuests.dayPass}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Whirlpool</span>
                      <span>{hotel.amenities.wellness.pricing.hotelGuests.whirlpool}</span>
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
                          <span>{hotel.amenities.wellness.pricing.externalGuests.weekday.dayPass}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Whirlpool</span>
                          <span>{hotel.amenities.wellness.pricing.externalGuests.weekday.whirlpool}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-gray-600">Freitag - Sonntag & Feiertage</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Tageskarte</span>
                          <span>{hotel.amenities.wellness.pricing.externalGuests.weekend.dayPass}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Whirlpool</span>
                          <span>{hotel.amenities.wellness.pricing.externalGuests.weekend.whirlpool}</span>
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

      {/* Dekorativer Trenner */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>

      {/* Restaurant & Kulinarik */}
      <section id="restaurant" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">{hotel.restaurant.title}</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">{hotel.restaurant.intro}</p>

          {/* Hauptinfo mit Bildern */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <p className="text-gray-600 leading-relaxed">{hotel.restaurant.description}</p>
              
              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                {hotel.restaurant.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <Utensils className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Zitat */}
              <blockquote className="border-l-4 border-[var(--color-primary)] pl-4 italic">
                <p className="text-gray-600 mb-2">{hotel.restaurant.quote.text}</p>
                <footer className="text-sm text-gray-500">- {hotel.restaurant.quote.author}</footer>
              </blockquote>
            </div>

            {/* Bildergalerie */}
            <div className="grid gap-4">
              {hotel.restaurant.images.map((image, index) => (
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
                  <p className="text-sm text-gray-500 mb-3">Bis zum {hotel.restaurant.openingHours.current.validUntil}</p>
                  <div className="space-y-4">
                    {hotel.restaurant.openingHours.current.times.map((time, index) => (
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
                    <p>{hotel.restaurant.openingHours.breakfast.weekday}</p>
                    <p>{hotel.restaurant.openingHours.breakfast.weekend}</p>
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
                    {Object.values(hotel.restaurant.menus).map((menu, index) => (
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
                    {Object.values(hotel.restaurant.brochures).map((brochure, index) => (
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
                  href={`tel:${hotel.restaurant.contact.phone}`}
                  className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                >
                  <Phone className="w-5 h-5" />
                  {hotel.restaurant.contact.phone}
                </a>
                <a 
                  href={`mailto:${hotel.restaurant.contact.email}`}
                  className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                >
                  <Mail className="w-5 h-5" />
                  {hotel.restaurant.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dekorativer Trenner */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>

      {/* Tagungen & Events */}
      <section id="tagungen" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Tagungen & Events</h2>

          {/* Räume Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {meetingRooms.map((room, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-[3/2] relative overflow-hidden">
                  <img 
                    src={hotel.images?.[index + 3]?.url || hotel.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-serif text-white">{room.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block text-gray-500">Fläche</span>
                      <span className="font-medium">{room.area} m²</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Höhe</span>
                      <span className="font-medium">{room.height} m</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Theater</span>
                      <span className="font-medium">{room.capacity.theater} Pers.</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Bankett</span>
                      <span className="font-medium">{room.capacity.banquet} Pers.</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ausstattung */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-serif mb-6">Tagungsausstattung</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {meetingAmenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <span className="text-gray-600">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Dekorativer Trenner */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>

      {/* Packages & Arrangements */}
      <section id="arrangements" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">{hotel.packages.title}</h2>
          <h3 className="text-xl text-[var(--color-primary)] text-center mb-6">{hotel.packages.subtitle}</h3>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-6">
            {hotel.packages.intro}
          </p>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            {hotel.packages.description}
          </p>

          {/* All Packages Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[...hotel.packages.standardPackages, ...hotel.packages.wellnessSuitePackages].map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <h3 className="text-white text-xl font-serif mb-2">{pkg.title}</h3>
                    <p className="text-white/90 text-sm">{pkg.subtitle}</p>
                  </div>
                </div>
                <div className="p-6">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between items-center mb-4">
                          <span className="text-[var(--color-primary)] font-semibold">{pkg.price}</span>
                          <ChevronDown 
                            className={`w-5 h-5 text-[var(--color-primary)] transition-transform ${
                              open ? 'transform rotate-180' : ''
                            }`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          <ul className="space-y-2 mb-4">
                            {pkg.includes.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-600">
                                <Check className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <button className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors">
                            Jetzt anfragen
                          </button>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services (Collapsible) */}
          <div className="max-w-3xl mx-auto">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full bg-gray-50 hover:bg-gray-100 px-6 py-4 rounded-xl flex justify-between items-center">
                    <h3 className="text-xl font-serif">{hotel.packages.additionalServices.title}</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-[var(--color-primary)] transition-transform ${
                        open ? 'transform rotate-180' : ''
                      }`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 py-4 bg-gray-50 mt-2 rounded-xl">
                    <p className="text-gray-600 mb-6">{hotel.packages.additionalServices.description}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {hotel.packages.additionalServices.bookableExtras.map((extra, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Plus className="w-5 h-5 text-[var(--color-primary)]" />
                          <span className="text-gray-600">{extra}</span>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </section>

      {/* Contact & Map Section (Last) */}
      <section id="kontakt" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Kontakt</h2>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-2">{hotel.name}</h3>
                      <p className="text-gray-600">{hotel.location?.address}</p>
                      <p className="text-gray-600">{hotel.location?.zip} {hotel.location?.city}</p>
                      <p className="text-gray-600">{hotel.location?.country}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <a 
                      href={`tel:${hotel.contact?.phone}`} 
                      className="flex items-center gap-4 hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Phone className="w-6 h-6 text-[var(--color-primary)]" />
                      <span>{hotel.contact?.phone}</span>
                    </a>
                    <a 
                      href={`mailto:${hotel.contact?.email}`} 
                      className="flex items-center gap-4 hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                      <span>{hotel.contact?.email}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-serif mb-4">Öffnungszeiten</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in</span>
                    <span>ab {hotel.policies?.checkIn?.from}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out</span>
                    <span>bis {hotel.policies?.checkOut?.until}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerClassName="w-full h-full"
                  center={{
                    lat: hotel.location?.coordinates?.latitude ?? 51.7519,
                    lng: hotel.location?.coordinates?.longitude ?? 6.4037,
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: hotel.location?.coordinates?.latitude ?? 51.7519,
                      lng: hotel.location?.coordinates?.longitude ?? 6.4037,
                    }}
                  />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}