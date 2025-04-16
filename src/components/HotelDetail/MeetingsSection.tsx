import { ChevronRight } from 'lucide-react';

interface MeetingRoom {
  name: string;
  area: string;
  height: string;
  capacity: {
    theater: string;
    banquet: string;
  };
}

interface MeetingsSectionProps {
  meetingRooms: MeetingRoom[];
  meetingAmenities: string[];
  images?: Array<{
    url: string;
  }>;
}

export function MeetingsSection({ meetingRooms, meetingAmenities, images }: MeetingsSectionProps) {
  return (
    <section id="tagungen" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Tagungen & Events</h2>

        {/* Räume Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {meetingRooms.map((room, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[3/2] relative overflow-hidden">
                <img 
                  src={images?.[index + 3]?.url}
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
  );
} 