export function Events() {
  const events = [
    {
      title: 'Sommerfest 2024',
      description: 'Genießen Sie einen unvergesslichen Abend mit kulinarischen Highlights und Live-Musik.',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Weinprobe im Rheinpark',
      description: 'Entdecken Sie erlesene Weine aus der Region in entspannter Atmosphäre.',
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Kochkurs mit Sternekoch',
      description: 'Lernen Sie die Geheimnisse der Haute Cuisine von unserem preisgekrönten Küchenchef.',
      imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="custom-container">
        <h2 className="text-3xl font-serif mb-8 text-center">Aktuelle Events & Angebote</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-serif mb-4">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <a href="#" className="text-primary hover:text-primary-dark">Mehr erfahren →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}