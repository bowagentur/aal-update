export function About() {
  return (
    <div className="min-h-screen py-16">
      <div className="custom-container">
        <h1 className="text-4xl font-serif mb-8">Über Aaldering Hotels</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif mb-4">Unsere Geschichte</h2>
            <p className="text-gray-600 mb-6">
              Seit über 30 Jahren steht der Name Aaldering für erstklassige Hotellerie und exzellenten Service. 
              Was als kleines Familienunternehmen begann, hat sich zu einer der führenden Hotelgruppen in Deutschland entwickelt.
            </p>
            <p className="text-gray-600">
              Unsere Hotels verbinden traditionelle Gastfreundschaft mit modernem Komfort und schaffen so einzigartige Erlebnisse für unsere Gäste.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-serif mb-4">Unsere Philosophie</h2>
            <p className="text-gray-600 mb-6">
              Wir glauben daran, dass jeder Aufenthalt in einem unserer Hotels ein besonderes Erlebnis sein sollte. 
              Unser Ziel ist es, unseren Gästen nicht nur eine Unterkunft, sondern ein Zuhause auf Zeit zu bieten.
            </p>
            <p className="text-gray-600">
              Nachhaltigkeit, Qualität und persönlicher Service stehen dabei im Mittelpunkt unseres Handelns.
            </p>
          </div>
        </div>

        {/* Team Sektion */}
        <div className="mt-16">
          <h2 className="text-3xl font-serif mb-8 text-center">Unser Führungsteam</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gray-200"></div>
              <h3 className="text-xl font-serif mb-2">Michael Aaldering</h3>
              <p className="text-gray-600">Geschäftsführer</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gray-200"></div>
              <h3 className="text-xl font-serif mb-2">Anna Aaldering</h3>
              <p className="text-gray-600">Hotelmanagerin</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gray-200"></div>
              <h3 className="text-xl font-serif mb-2">Thomas Weber</h3>
              <p className="text-gray-600">Küchendirektor</p>
            </div>
          </div>
        </div>

        {/* Auszeichnungen Sektion */}
        <div className="mt-16">
          <h2 className="text-3xl font-serif mb-8 text-center">Unsere Auszeichnungen</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-2">⭐</div>
              <h3 className="font-serif mb-2">5-Sterne Superior</h3>
              <p className="text-gray-600 text-sm">DEHOGA Klassifizierung</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="font-serif mb-2">Best Luxury Hotel</h3>
              <p className="text-gray-600 text-sm">2023 Travel Awards</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-2">🌿</div>
              <h3 className="font-serif mb-2">Green Hotel</h3>
              <p className="text-gray-600 text-sm">Nachhaltigkeitszertifikat</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-2">👨‍🍳</div>
              <h3 className="font-serif mb-2">2 Michelin Sterne</h3>
              <p className="text-gray-600 text-sm">Restaurant Excellence</p>
            </div>
          </div>
        </div>

        {/* Kontakt Sektion */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-serif mb-4">Kontaktieren Sie uns</h2>
          <p className="text-gray-600 mb-6">
            Haben Sie Fragen? Unser Team steht Ihnen gerne zur Verfügung.
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Kontakt aufnehmen
          </button>
        </div>
      </div>
    </div>
  );
}