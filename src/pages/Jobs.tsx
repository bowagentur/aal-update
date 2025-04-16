export function Jobs() {
  const jobs = [
    {
      title: 'Rezeptionist (m/w/d)',
      location: 'Hotel Rheinpark Rees',
      type: 'Vollzeit',
      description: 'Wir suchen eine engagierte Persönlichkeit für unsere Rezeption.'
    },
    {
      title: 'Koch (m/w/d)',
      location: 'Atlanta Hotel Leipzig',
      type: 'Vollzeit',
      description: 'Für unser Restaurant suchen wir einen erfahrenen Koch.'
    },
    {
      title: 'Zimmermädchen (m/w/d)',
      location: 'Hotel Am Luisenplatz',
      type: 'Teilzeit',
      description: 'Zur Verstärkung unseres Housekeeping-Teams suchen wir motivierte Mitarbeiter.'
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="custom-container">
        <h1 className="text-4xl font-serif mb-8">Karriere bei Aaldering Hotels</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Werden Sie Teil unseres Teams und gestalten Sie mit uns die Zukunft der Hotellerie. 
          Wir bieten spannende Karrieremöglichkeiten und ein dynamisches Arbeitsumfeld.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-serif mb-2">{job.title}</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {job.location}
              </div>
              <div className="text-sm font-medium text-primary mb-4">{job.type}</div>
              <p className="text-gray-600 mb-6">{job.description}</p>
              <button className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
                Jetzt bewerben
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}