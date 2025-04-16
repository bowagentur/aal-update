import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Home, Info, Briefcase, Mail, Building2 } from 'lucide-react';
import { useHotels } from '../../hooks/useHotels';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHotelsMenuOpen, setIsHotelsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { hotels } = useHotels();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { path: '/', label: 'Startseite', icon: Home },
    { path: '/about', label: 'Über uns', icon: Info },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/contact', label: 'Kontakt', icon: Mail }
  ];

  const renderMenuItem = (item: { path: string; label: string; icon: any }, mobile = false) => (
    <li className="flex items-center">
      <Link 
        to={item.path} 
        className={`
          nav-link hover:text-[#c4984d] transition-colors duration-200 flex items-center gap-2
          ${mobile ? 'block text-lg py-2 px-4 w-full hover:bg-gray-50 rounded-md' : ''}
        `}
        onClick={() => mobile && setIsMobileMenuOpen(false)}
      >
        {item.icon && <item.icon className="h-5 w-5" />}
        {item.label}
      </Link>
    </li>
  );

  const renderHotelDropdown = (mobile = false) => (
    <div className={mobile ? 'pl-4 space-y-4 pb-3' : 'grid grid-cols-2 gap-6'}>
      <div className={mobile ? '' : 'px-6'}>
        {!mobile && <h3 className="font-semibold text-lg mb-4 text-gray-800">Unsere Hotels</h3>}
        <div className={mobile ? '' : 'space-y-6'}>
          {hotels.map(hotel => (
            <Link 
              key={hotel.id}
              to={`/hotels/${hotel.id}`}
              className={`
                flex items-start hover:bg-gray-50 rounded-md transition-colors duration-200
                ${mobile ? 'space-x-3 p-2' : 'space-x-4 p-3'}
              `}
              onClick={() => mobile && setIsMobileMenuOpen(false)}
            >
              <img 
                src={hotel.branding?.logo ?? '/logos/default_logo.png'} 
                alt={hotel.name} 
                className={`object-contain rounded-md ${mobile ? 'w-20 h-14' : 'w-24 h-16'}`}
              />
              <div>
                <h4 className="font-medium text-[#c4984d] group-hover/item:text-[#ab813d] transition-colors duration-200">
                  {hotel.name}
                </h4>
                <p className="text-sm text-gray-600">{hotel.location?.city}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {!mobile && (
        <div className="px-6">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Aktuelle Angebote</h3>
          <div className="bg-gradient-to-br from-[#f5e6cc] to-[#f9f2e6] p-4 rounded-lg">
            <p className="text-[#c4984d] font-medium mb-2">Sommer Special 2025</p>
            <p className="text-sm text-gray-700 mb-3">
              Buchen Sie jetzt Ihren Sommerurlaub und sparen Sie bis zu 20%
            </p>
            <Link 
              to="/angebote" 
              className="text-sm text-[#c4984d] hover:text-[#ab813d] font-medium inline-flex items-center"
            >
              Mehr erfahren
              <ChevronDown className="ml-1 h-4 w-4 rotate-[-90deg]" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      {/* Mobile Menu Button - positioned above header with animation */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed right-8 top-12 m-2 p-2.5 rounded-full hover:bg-gray-100 z-60 transition-all duration-300 ease-in-out bg-white shadow-md"
        aria-label="Toggle menu"
      >
        <div className="relative w-7 h-7">
          <span className={`
            absolute left-0 block h-0.5 w-7 bg-gray-600 transform transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'}
          `}></span>
          <span className={`
            absolute left-0 block h-0.5 w-7 bg-gray-600 top-3 transform transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}
          `}></span>
          <span className={`
            absolute left-0 block h-0.5 w-7 bg-gray-600 transform transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'}
          `}></span>
        </div>
      </button>

      <div className="custom-container relative bg-white">
        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-wrap items-center justify-center space-x-8 py-4 text-lg font-medium">
          <li>{renderMenuItem(menuItems[0])}</li>
          <li className="relative flex items-center group">
            <button 
              className="flex items-center nav-link hover:text-[var(--color-secondary)] transition-colors duration-200 py-2"
              onClick={() => setIsHotelsMenuOpen(!isHotelsMenuOpen)}
            >
              Hotels
              <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-lg rounded-md py-4 mt-1 z-50">
              {renderHotelDropdown()}
            </div>
          </li>
          {menuItems.slice(1).map(item => (
            <li key={item.path}>{renderMenuItem(item)}</li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-lg z-50">
            <div className="h-full w-full flex flex-col max-w-md mx-auto bg-white shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] translate-x-0 transition-all duration-300">
              <div className="p-6 flex justify-between items-center border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <h2 className="font-semibold text-2xl text-gray-800">Menü</h2>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 hover:bg-gray-100/80 rounded-full transition-all duration-200 active:scale-95"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              {/* Scrollable Menu Content */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-4">
                  {menuItems.map((item, index) => (
                    <li key={item.path} className="transform transition-transform active:scale-98">
                      <Link 
                        to={item.path}
                        className="flex items-center gap-3 w-full text-lg py-3.5 px-4 rounded-xl hover:bg-gray-50/80 active:bg-gray-100/80 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="h-6 w-6 text-[#c4984d]" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="border-y border-gray-100 py-4 my-4">
                    <button 
                      className="flex items-center justify-between w-full text-lg py-3.5 px-4 rounded-xl hover:bg-gray-50/80 active:bg-gray-100/80 transition-all duration-200 hover:shadow-md group"
                      onClick={() => setIsHotelsMenuOpen(!isHotelsMenuOpen)}
                    >
                      <span className="flex items-center gap-3">
                        <Building2 className="h-6 w-6 text-[#c4984d]" />
                        Hotels
                      </span>
                      <ChevronDown 
                        className={`h-5 w-5 transform transition-transform duration-300 text-[#c4984d] ${
                          isHotelsMenuOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
                        }`} 
                      />
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isHotelsMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {renderHotelDropdown(true)}
                    </div>
                  </li>
                </ul>
              </div>

              {/* Fixed Contact Box at Bottom - Modified to be more compact */}
              <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm p-4 sticky bottom-0 z-10">
                {hotels.map(hotel => (
                  <Link 
                    key={hotel.id}
                    to={`/hotels/${hotel.id}`}
                    className={`
                      flex items-start hover:bg-gray-50 rounded-md transition-colors duration-200
                      ${isMobile ? 'space-x-3 p-2' : 'space-x-4 p-3'}
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <img 
                      src={hotel.branding?.logo ?? '/logos/default_logo.png'} 
                      alt={hotel.name} 
                      className={`object-contain rounded-md ${isMobile ? 'w-20 h-14' : 'w-24 h-16'}`}
                    />
                    <div>
                      <h4 className="font-medium text-[#c4984d] group-hover/item:text-[#ab813d] transition-colors duration-200">
                        {hotel.name}
                      </h4>
                      <p className="text-sm text-gray-600">{hotel.location?.city}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}