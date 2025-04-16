import { Bed, Star, Crown, Phone, Wine, Tv, Wifi } from 'lucide-react';

export function RoomTypes() {
  const features = [
    { icon: <Phone className="w-8 h-8" />, title: 'Telefon', description: 'Nur in den Suiten verfügbar' },
    { icon: <Wine className="w-8 h-8" />, title: 'Minibar', description: 'In Comfort, Superior und Suiten' },
    { icon: <Tv className="w-8 h-8" />, title: 'TV', description: 'Flachbildfernseher in allen Zimmern' },
    { icon: <Wifi className="w-8 h-8" />, title: 'WLAN', description: 'Kostenloses WLAN überall' }
  ];

  const roomTypes = [
    { icon: <Bed className="w-8 h-8" />, title: 'Standard- & Superiorzimmer', description: 'Komfortabel & Modern' },
    { icon: <Star className="w-8 h-8" />, title: 'Comfort Doppelzimmer', description: 'Geräumig & Elegant' },
    { icon: <Bed className="w-8 h-8" />, title: 'Comfort Doppelzimmer', description: 'Geräumig & Elegant' },
    { icon: <Crown className="w-8 h-8" />, title: 'Suite', description: 'Luxuriös & Exklusiv' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="custom-container">
        <div className="room-types max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif mb-6">Zimmertypen</h2>

          {/* Room Features Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Room Types Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomTypes.map((room, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4 text-primary">
                  {room.icon}
                </div>
                <h3 className="font-medium mb-2">{room.title}</h3>
                <p className="text-gray-600">{room.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}