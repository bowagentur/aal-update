import { Link, useLocation } from 'react-router-dom';
import { hotels, defaultHotel } from '../../data/hotels';
import { useState, useEffect } from 'react';

export function Header() {
  const location = useLocation();
  
  const currentHotel = hotels.find(hotel => {
    // Prüfe ob die URL den Hotel-ID enthält
    return location.pathname.includes(`/hotels/${hotel.id}`);
  });
  
  // Debug-Log um zu sehen, was gefunden wird
  console.log('Current hotel:', currentHotel);
  console.log('Current hotel social:', currentHotel?.contact?.social);
  
  // Hole die Branding-Farben vom aktuellen Hotel oder nutze die Standard-Farben
  const primaryColor = currentHotel?.branding?.primaryColor || defaultHotel.branding.primaryColor;
  const secondaryColor = currentHotel?.branding?.secondaryColor || defaultHotel.branding.secondaryColor;
  const displayLogo = currentHotel?.branding?.logo || defaultHotel.branding.logo;

  // Debug-Log
  console.log('Current path:', location.pathname);
  console.log('Found hotel:', currentHotel?.id);
  console.log('Using logo:', currentHotel?.branding?.logo || defaultHotel.branding.logo);

  // Neue State für aktuelle Sprache
  const [currentLanguage, setCurrentLanguage] = useState('de');

  return (
    <>
      {/* Main Header */}
      <header className="bg-gradient-to-b from-white via-gray-50 to-gray-100 relative">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-10">
            <div 
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 150%, ${primaryColor}40 0%, transparent 50%),
                  radial-gradient(circle at 80% -50%, ${secondaryColor}40 0%, transparent 50%)
                `
              }}
            />
          </div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23000000" fill-opacity="0.03" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3C/g%3E%3C/svg%3E")'
          }} />
        </div>

        <div className="container mx-auto px-4 py-4 relative">
          <div className="flex items-center justify-between">
            {/* Simplified Logo without hover effects */}
            <Link to="/" className="flex items-center">
              <img 
                src={displayLogo} 
                alt="Hotel Logo" 
                className="w-[200px] md:w-[350px] h-auto"
              />
            </Link>

            {/* Neue Header Widgets */}
            <div className="hidden md:flex items-center gap-6">
              {/* Wetter Widget */}
              <div className="relative group">
                {/* Verbesserte Shine-Animation */}
                <div 
                  className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `
                      linear-gradient(
                        90deg,
                        ${primaryColor}10,
                        ${secondaryColor}10 45%,
                        ${primaryColor}20 55%,
                        ${secondaryColor}10
                      )
                    `,
                    filter: 'blur(8px)'
                  }}
                />
                <div className="bg-white/80 backdrop-blur rounded-xl p-3 flex items-center gap-3 shadow-sm border border-white/20 relative transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
                  <svg 
                    className="w-7 h-7 text-yellow-500 transition-transform duration-300 group-hover:rotate-[360deg]" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <div>
                    <p className="text-lg font-medium bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">22°C</p>
                    <p className="text-sm text-gray-600">Sonnig</p>
                  </div>
                </div>
              </div>

              {/* Hotel Schnellauswahl */}
              <div className="relative group">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r" style={{
                  backgroundImage: `linear-gradient(to right, ${primaryColor}20, ${secondaryColor}20)`,
                  filter: 'blur(8px)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }} />
                <button 
                  className="bg-white/80 backdrop-blur rounded-xl p-3 flex items-center gap-2 shadow-sm border border-white/20 relative transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
                  style={{ color: primaryColor }}
                >
                  <span className="font-medium">Hotels entdecken</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 top-full mt-2 w-80 bg-white/90 backdrop-blur-md rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/20 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium" style={{ color: primaryColor }}>Unsere Hotels</p>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto py-1">
                    {hotels.map((hotel, index) => (
                      <Link
                        key={hotel.id}
                        to={`/hotels/${hotel.id}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors relative group/item"
                      >
                        {/* Hotel Info */}
                        <div className="flex-grow min-w-0">
                          <p className="font-medium text-gray-900">
                            {hotel.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {hotel.location?.city}, {hotel.location?.country}
                          </p>
                        </div>

                        {/* Arrow Icon */}
                        <svg 
                          className="w-5 h-5 text-gray-400 transform transition-transform group-hover/item:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>

                        {/* Hover Overlay */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${primaryColor}05, ${secondaryColor}10)`,
                          }}
                        />
                      </Link>
                    ))}
                  </div>
                  {/* Footer mit "Alle Hotels anzeigen" Link */}
                  <Link 
                    to="/hotels" 
                    className="block p-3 text-center text-sm font-medium border-t border-gray-100 hover:bg-gray-50 transition-colors"
                    style={{ color: primaryColor }}
                  >
                    Alle Hotels anzeigen
                  </Link>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="relative group flex items-center gap-3">
                {(currentHotel?.contact?.social?.facebook || defaultHotel.contact.social.facebook) && (
                  <a 
                    href={currentHotel?.contact?.social?.facebook || defaultHotel.contact.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100"
                    style={{ color: primaryColor }}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {(currentHotel?.contact?.social?.instagram || defaultHotel.contact.social.instagram) && (
                  <a 
                    href={currentHotel?.contact?.social?.instagram || defaultHotel.contact.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100"
                    style={{ color: primaryColor }}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                )}
                {(currentHotel?.contact?.social?.twitter || defaultHotel.contact.social.twitter) && (
                  <a 
                    href={currentHotel?.contact?.social?.twitter || defaultHotel.contact.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100"
                    style={{ color: primaryColor }}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                )}
              </div>

              {/* Neuer Sprachwechsel-Button */}
              <div className="relative group">
                <button 
                  className="bg-white/80 backdrop-blur rounded-xl p-3 flex items-center gap-2 shadow-sm border border-white/20 relative transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
                  style={{ color: primaryColor }}
                >
                  <span className="font-medium uppercase">{currentLanguage}</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown für Sprachwahl */}
                <div className="absolute right-0 top-full mt-2 w-40 bg-white/90 backdrop-blur-md rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/20 overflow-hidden z-50">
                  <div className="py-1">
                    {[
                      { code: 'de', name: 'Deutsch' },
                      { code: 'en', name: 'English' },
                      { code: 'nl', name: 'Nederlands' }
                    ].map((language) => (
                      <button
                        key={language.code}
                        onClick={() => setCurrentLanguage(language.code)}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          currentLanguage === language.code ? 'text-primary font-medium' : 'text-gray-700'
                        }`}
                      >
                        <span>{language.name}</span>
                        {currentLanguage === language.code && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
}