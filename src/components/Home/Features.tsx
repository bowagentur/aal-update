export function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="custom-container">
        <h2 className="text-3xl font-serif text-center mb-12">Unsere Angebote</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Tagungen Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Tagungsraum" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif mb-3">Tagungen & Events</h3>
              <p className="text-gray-600 mb-4">
                Professionelle Räumlichkeiten für Ihre Veranstaltungen. Modernste Ausstattung und flexible Raumkonzepte.
              </p>
              <ul className="text-gray-600 mb-4">
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Moderne Konferenztechnik
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Catering-Service
                </li>
              </ul>
              <a href="/tagungen" className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors">
                Mehr erfahren
              </a>
            </div>
          </div>

          {/* Restaurants Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Restaurant" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif mb-3">Restaurants</h3>
              <p className="text-gray-600 mb-4">
                Kulinarische Vielfalt in allen unseren Häusern. Genießen Sie regionale und internationale Spezialitäten.
              </p>
              <ul className="text-gray-600 mb-4">
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Saisonale Menüs
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Regionale Produkte
                </li>
              </ul>
              <a href="/restaurants" className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors">
                Zur Speisekarte
              </a>
            </div>
          </div>

          {/* Online Buchung Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Online Buchung" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif mb-3">Online Buchung</h3>
              <p className="text-gray-600 mb-4">
                Einfach und schnell Ihren Aufenthalt buchen. Beste Preisgarantie und flexible Stornierung.
              </p>
              <ul className="text-gray-600 mb-4">
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Beste Preisgarantie
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Flexible Stornierung
                </li>
              </ul>
              <a href="/buchen" className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors">
                Jetzt buchen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}