export function Career() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="custom-container">
        <h2 className="text-3xl font-serif mb-12 text-center">Karriere bei Aaldering Hotels</h2>
        <p className="text-lg mb-8 text-center">
          Wir suchen engagierte Mitarbeiter, die unsere Leidenschaft für Gastfreundschaft teilen. 
          Entdecken Sie unsere aktuellen Stellenangebote und werden Sie Teil unseres Teams!
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
          <a href="/jobs" className="btn-primary">Offene Stellen</a>
          <a href="/karriere" className="btn-secondary">Mehr erfahren</a>
        </div>
      </div>
    </section>
  );
}