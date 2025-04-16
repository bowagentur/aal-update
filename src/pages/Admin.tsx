import { useState, useEffect } from 'react';
import { hotels } from '../data/hotels';
import { ChevronDown, Save, Plus, Trash, Image, Edit, Check, Copy, Loader2, Search, Hotel } from 'lucide-react';
import { Disclosure } from '@headlessui/react';
import { AIChatSettings } from '../components/Admin/AIChatSettings';

interface PageContent {
  title: string;
  content: any;
}

const defaultPages = {
  about: {
    title: 'Über uns',
    content: {
      history: 'Seit über 30 Jahren steht der Name Aaldering für erstklassige Hotellerie...',
      philosophy: 'Wir glauben daran, dass jeder Aufenthalt in einem unserer Hotels...',
      team: [
        {
          name: 'Michael Aaldering',
          position: 'Geschäftsführer',
          image: ''
        },
        {
          name: 'Anna Aaldering',
          position: 'Hotelmanagerin',
          image: ''
        }
      ]
    }
  },
  jobs: {
    title: 'Karriere',
    content: {
      intro: 'Werden Sie Teil unseres Teams...',
      jobs: [
        {
          title: 'Rezeptionist (m/w/d)',
          location: 'Hotel Rheinpark Rees',
          type: 'Vollzeit',
          description: 'Wir suchen eine engagierte Persönlichkeit für unsere Rezeption.'
        }
      ]
    }
  }
};

const emptyHotel = {
  id: '',
  name: '',
  description: '',
  rating: 0,
  branding: {
    logo: '/logos/default_logo.png',
    primaryColor: '#0069b3',
    secondaryColor: '#c4984d'
  },
  location: {
    city: '',
    address: '',
    zip: '',
    country: 'Deutschland',
    email: ''
  },
  contact: {
    phone: '',
    email: '',
    social: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  }
};

// Neue Hilfsfunktion für leere Sektionen
const createEmptySection = (type: string) => {
  const baseSection = {
    title: '',
    text: '',
    images: []
  };

  const sectionTypes = {
    welcome: {
      ...baseSection,
      intro: '',
      highlights: [],
      content: []
    },
    apartments: {
      ...baseSection
    },
    rooms: {
      ...baseSection,
      features: [],
      types: []
    },
    wellness: {
      ...baseSection,
      features: [],
      openingHours: {}
    },
    // ... weitere Sektionstypen nach Bedarf
  };

  return sectionTypes[type] || baseSection;
};

// Neue Interface für die KI-Chat-Einstellungen
interface AIChatSettings {
  botName: string;
  avatarUrl: string;
  defaultLanguage: string;
  maxHistoryLength: number;
  responseDelay: number;
  greetingMessage: string;
  fallbackMessage: string;
  prompts: Array<{
    id: string;
    title: string;
    content: string;
    category: 'greeting' | 'faq' | 'booking' | 'custom';
  }>;
}

export function Admin() {
  const [activeTab, setActiveTab] = useState<'hotels' | 'pages' | 'jobs' | 'ai-chat'>('hotels');
  const [hotelData, setHotelData] = useState(hotels);
  const [pages, setPages] = useState<Record<string, PageContent>>(defaultPages);
  const [newHotel, setNewHotel] = useState(emptyHotel);
  const [isAddingHotel, setIsAddingHotel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | null;
  }>({ message: '', type: null });
  const [aiChatSettings, setAIChatSettings] = useState<AIChatSettings>({
    botName: 'Aalbert',
    avatarUrl: '/images/aalbert-avatar.png',
    defaultLanguage: 'de',
    maxHistoryLength: 10,
    responseDelay: 1000,
    greetingMessage: 'Hallo! Ich bin Aalbert, Ihr virtueller Concierge.',
    fallbackMessage: 'Entschuldigung, ich konnte Ihre Anfrage nicht verstehen.',
    prompts: []
  });

  useEffect(() => {
    // Load data from localStorage if available
    const savedData = localStorage.getItem('adminData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setHotelData(parsedData.hotels || hotels);
      setPages(parsedData.pages || defaultPages);
    }
  }, []);

  // Vereinfachte Benachrichtigungsfunktion
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: null });
    }, 3000);
  };

  // Optimierte Save-Funktion mit Feedback
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const dataToSave = {
        hotels: hotelData,
        pages: pages
      };
      localStorage.setItem('adminData', JSON.stringify(dataToSave));
      showNotification('Änderungen wurden erfolgreich gespeichert', 'success');
    } catch (error) {
      showNotification('Fehler beim Speichern der Änderungen', 'error');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSection = (hotelIndex: number) => {
    const sectionType = prompt('Bitte Sektionstyp eingeben (welcome, apartments, rooms, etc.):');
    if (!sectionType) return;

    const updatedHotels = [...hotelData];
    updatedHotels[hotelIndex].sections = {
      ...updatedHotels[hotelIndex].sections,
      [sectionType]: createEmptySection(sectionType)
    };
    setHotelData(updatedHotels);
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="custom-container">
        {/* Benachrichtigungskomponente */}
        {notification.type && (
          <div
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all transform 
              ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
              text-white`}
          >
            {notification.message}
          </div>
        )}

        {/* Header mit Suche und Speichern */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-serif">Verwaltung</h1>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg 
                hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isLoading ? 'Wird gespeichert...' : 'Änderungen speichern'}
            </button>
          </div>

          {/* Suchleiste */}
          <div className="relative">
            <input
              type="text"
              placeholder="Hotels, Seiten oder Stellenangebote durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {/* Verbesserte Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex p-1">
            {['hotels', 'pages', 'jobs', 'ai-chat'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors
                  ${activeTab === tab 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {tab === 'hotels' && 'Hotelverwaltung'}
                {tab === 'pages' && 'Seitenverwaltung'}
                {tab === 'jobs' && 'Stellenangebote'}
                {tab === 'ai-chat' && 'Aalbert KI-Chat'}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Tab */}
        {activeTab === 'hotels' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">Hotels verwalten</h2>
              <button
                onClick={() => setIsAddingHotel(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Neues Hotel
              </button>
            </div>

            {/* Hotel List */}
            <div className="space-y-4">
              {hotelData.map((hotel, index) => (
                <Disclosure key={hotel.id}>
                  {({ open }) => (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <Disclosure.Button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <img 
                            src={hotel.branding.logo} 
                            alt={hotel.name} 
                            className="w-12 h-12 object-contain"
                          />
                          <span className="font-medium text-lg">{hotel.name}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 transform ${open ? 'rotate-180' : ''}`} />
                      </Disclosure.Button>

                      <Disclosure.Panel className="px-6 py-4 border-t">
                        <div className="grid gap-6">
                          {/* Basic Info */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Grundinformationen</h3>
                            <div className="grid gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hotel-ID</label>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                                <input
                                  type="text"
                                  value={hotel.id}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].id = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                  type="text"
                                  value={hotel.name}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].name = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                                <textarea
                                  value={hotel.description}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].description = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  rows={3}
                                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bewertung</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="5"
                                  value={hotel.rating}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].rating = parseFloat(e.target.value);
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Location */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Standort</h3>
                            <div className="grid gap-4">
                              {Object.entries(hotel.location).map(([key, value]) => (
                                <div key={key}>
                                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                    {key}
                                  </label>
                                  <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => {
                                      const updatedHotels = [...hotelData];
                                      updatedHotels[index].location[key] = e.target.value;
                                      setHotelData(updatedHotels);
                                    }}
                                    className="w-full px-4 py-2 border rounded-lg"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Hotelbereiche */}
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-medium">Hotelbereiche</h3>
                              <button
                                onClick={() => handleAddSection(index)}
                                className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                                Bereich hinzufügen
                              </button>
                            </div>

                            {Object.entries(hotel.sections).map(([sectionKey, section]) => {
                              const sectionNames = {
                                welcome: "Willkommen",
                                apartments: "Apartments",
                                family: "Familie",
                                surroundings: "Umgebung",
                                rooms: "Zimmer & Suiten",
                                wellness: "Wellness & Spa",
                                dining: "Restaurant & Bar",
                                meetings: "Tagungen",
                                exterior: "Außenansicht",
                                location: "Lage & Anreise"
                              };

                              return (
                                <Disclosure key={sectionKey}>
                                  {({ open }) => (
                                    <div className="mb-4">
                                      <Disclosure.Button className="w-full px-4 py-2 bg-gray-100 rounded-lg flex justify-between items-center">
                                        <span>{sectionNames[sectionKey] || section.title || sectionKey}</span>
                                        <div className="flex items-center gap-2">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (confirm(`Möchten Sie den Bereich "${sectionNames[sectionKey]}" wirklich löschen?`)) {
                                                const updatedHotels = [...hotelData];
                                                delete updatedHotels[index].sections[sectionKey];
                                                setHotelData(updatedHotels);
                                              }
                                            }}
                                            className="text-red-500 hover:text-red-700 p-1"
                                          >
                                            <Trash className="w-4 h-4" />
                                          </button>
                                          <ChevronDown className={`w-5 h-5 transform ${open ? 'rotate-180' : ''}`} />
                                        </div>
                                      </Disclosure.Button>

                                      <Disclosure.Panel className="p-4 border border-t-0 rounded-b-lg">
                                        <div className="grid gap-4">
                                          {/* Basis-Felder */}
                                          <div className="grid gap-4">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Überschrift</label>
                                              <input
                                                type="text"
                                                value={section.title}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].sections[sectionKey].title = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>

                                            {section.intro !== undefined && (
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Einleitung</label>
                                                <textarea
                                                  value={section.intro}
                                                  onChange={(e) => {
                                                    const updatedHotels = [...hotelData];
                                                    updatedHotels[index].sections[sectionKey].intro = e.target.value;
                                                    setHotelData(updatedHotels);
                                                  }}
                                                  rows={2}
                                                  className="w-full px-4 py-2 border rounded-lg"
                                                />
                                              </div>
                                            )}

                                            {section.text !== undefined && (
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                                                <textarea
                                                  value={section.text}
                                                  onChange={(e) => {
                                                    const updatedHotels = [...hotelData];
                                                    updatedHotels[index].sections[sectionKey].text = e.target.value;
                                                    setHotelData(updatedHotels);
                                                  }}
                                                  rows={4}
                                                  className="w-full px-4 py-2 border rounded-lg"
                                                />
                                              </div>
                                            )}
                                          </div>

                                          {/* Highlights */}
                                          {section.highlights && (
                                            <div>
                                              <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Highlights</label>
                                                <button
                                                  onClick={() => {
                                                    const updatedHotels = [...hotelData];
                                                    if (!updatedHotels[index].sections[sectionKey].highlights) {
                                                      updatedHotels[index].sections[sectionKey].highlights = [];
                                                    }
                                                    updatedHotels[index].sections[sectionKey].highlights.push({
                                                      icon: '',
                                                      title: '',
                                                      description: ''
                                                    });
                                                    setHotelData(updatedHotels);
                                                  }}
                                                  className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                                                >
                                                  <Plus className="w-4 h-4" />
                                                  Highlight hinzufügen
                                                </button>
                                              </div>
                                              <div className="space-y-2">
                                                {section.highlights.map((highlight, highlightIndex) => (
                                                  <div key={highlightIndex} className="grid gap-2">
                                                    <div className="flex gap-2">
                                                      <input
                                                        type="text"
                                                        value={highlight.title}
                                                        placeholder="Titel"
                                                        onChange={(e) => {
                                                          const updatedHotels = [...hotelData];
                                                          updatedHotels[index].sections[sectionKey].highlights[highlightIndex].title = e.target.value;
                                                          setHotelData(updatedHotels);
                                                        }}
                                                        className="flex-1 px-4 py-2 border rounded-lg"
                                                      />
                                                      <input
                                                        type="text"
                                                        value={highlight.icon}
                                                        placeholder="Icon"
                                                        onChange={(e) => {
                                                          const updatedHotels = [...hotelData];
                                                          updatedHotels[index].sections[sectionKey].highlights[highlightIndex].icon = e.target.value;
                                                          setHotelData(updatedHotels);
                                                        }}
                                                        className="w-32 px-4 py-2 border rounded-lg"
                                                      />
                                                    </div>
                                                    <input
                                                      type="text"
                                                      value={highlight.description}
                                                      placeholder="Beschreibung"
                                                      onChange={(e) => {
                                                        const updatedHotels = [...hotelData];
                                                        updatedHotels[index].sections[sectionKey].highlights[highlightIndex].description = e.target.value;
                                                        setHotelData(updatedHotels);
                                                      }}
                                                      className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                    <div className="flex justify-end">
                                                      <button
                                                        onClick={() => {
                                                          const updatedHotels = [...hotelData];
                                                          updatedHotels[index].sections[sectionKey].highlights.splice(highlightIndex, 1);
                                                          setHotelData(updatedHotels);
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                      >
                                                        <Trash className="w-5 h-5" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          )}

                                          {/* Bilder */}
                                          {section.images && (
                                            <div>
                                              <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Bilder</label>
                                                <button
                                                  onClick={() => {
                                                    const updatedHotels = [...hotelData];
                                                    if (!updatedHotels[index].sections[sectionKey].images) {
                                                      updatedHotels[index].sections[sectionKey].images = [];
                                                    }
                                                    updatedHotels[index].sections[sectionKey].images.push({
                                                      url: '',
                                                      alt: '',
                                                      title: ''
                                                    });
                                                    setHotelData(updatedHotels);
                                                  }}
                                                  className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                                                >
                                                  <Plus className="w-4 h-4" />
                                                  Bild hinzufügen
                                                </button>
                                              </div>
                                              <div className="space-y-2">
                                                {section.images.map((image, imageIndex) => (
                                                  <div key={imageIndex} className="grid gap-2">
                                                    <input
                                                      type="text"
                                                      value={image.url}
                                                      placeholder="Bild-URL"
                                                      onChange={(e) => {
                                                        const updatedHotels = [...hotelData];
                                                        updatedHotels[index].sections[sectionKey].images[imageIndex].url = e.target.value;
                                                        setHotelData(updatedHotels);
                                                      }}
                                                      className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                    <input
                                                      type="text"
                                                      value={image.alt}
                                                      placeholder="Alternativtext"
                                                      onChange={(e) => {
                                                        const updatedHotels = [...hotelData];
                                                        updatedHotels[index].sections[sectionKey].images[imageIndex].alt = e.target.value;
                                                        setHotelData(updatedHotels);
                                                      }}
                                                      className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                    <input
                                                      type="text"
                                                      value={image.title}
                                                      placeholder="Bildtitel"
                                                      onChange={(e) => {
                                                        const updatedHotels = [...hotelData];
                                                        updatedHotels[index].sections[sectionKey].images[imageIndex].title = e.target.value;
                                                        setHotelData(updatedHotels);
                                                      }}
                                                      className="w-full px-4 py-2 border rounded-lg"
                                                    />
                                                    <div className="flex justify-end">
                                                      <button
                                                        onClick={() => {
                                                          const updatedHotels = [...hotelData];
                                                          updatedHotels[index].sections[sectionKey].images.splice(imageIndex, 1);
                                                          setHotelData(updatedHotels);
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                      >
                                                        <Trash className="w-5 h-5" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </Disclosure.Panel>
                                    </div>
                                  )}
                                </Disclosure>
                              );
                            })}
                          </div>

                          {/* Branding */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Branding</h3>
                            <div className="grid gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                                <input
                                  type="text"
                                  value={hotel.branding.logo}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].branding.logo = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Primärfarbe</label>
                                  <input
                                    type="color"
                                    value={hotel.branding.primaryColor}
                                    onChange={(e) => {
                                      const updatedHotels = [...hotelData];
                                      updatedHotels[index].branding.primaryColor = e.target.value;
                                      setHotelData(updatedHotels);
                                    }}
                                    className="w-full h-10"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Sekundärfarbe</label>
                                  <input
                                    type="color"
                                    value={hotel.branding.secondaryColor}
                                    onChange={(e) => {
                                      const updatedHotels = [...hotelData];
                                      updatedHotels[index].branding.secondaryColor = e.target.value;
                                      setHotelData(updatedHotels);
                                    }}
                                    className="w-full h-10"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Zimmer & Preise */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Zimmer & Preise</h3>
                            <div className="grid gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gesamtanzahl Zimmer</label>
                                <input
                                  type="number"
                                  value={hotel.rooms.total}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].rooms.total = parseInt(e.target.value);
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>

                              {/* Zimmertypen */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <label className="block text-sm font-medium text-gray-700">Zimmertypen</label>
                                  <button
                                    onClick={() => {
                                      const updatedHotels = [...hotelData];
                                      updatedHotels[index].rooms.types.push({
                                        name: '',
                                        description: '',
                                        image: '',
                                        price: { single: 0, double: 0 },
                                        amenities: []
                                      });
                                      setHotelData(updatedHotels);
                                    }}
                                    className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                  >
                                    <Plus className="w-5 h-5" />
                                    Zimmertyp hinzufügen
                                  </button>
                                </div>

                                {hotel.rooms.types.map((roomType, typeIndex) => (
                                  <Disclosure key={typeIndex}>
                                    {({ open }) => (
                                      <div className="border rounded-lg mb-4">
                                        <Disclosure.Button className="w-full px-4 py-2 flex justify-between items-center">
                                          <span>{roomType.name || 'Neuer Zimmertyp'}</span>
                                          <ChevronDown className={`w-5 h-5 transform ${open ? 'rotate-180' : ''}`} />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="p-4">
                                          <div className="grid gap-4">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                              <input
                                                type="text"
                                                value={roomType.name}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].rooms.types[typeIndex].name = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                                              <textarea
                                                value={roomType.description}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].rooms.types[typeIndex].description = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                rows={3}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Bild-URL</label>
                                              <input
                                                type="text"
                                                value={roomType.image}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].rooms.types[typeIndex].image = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>

                                            {/* Preise */}
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-2">Preise</label>
                                              <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                  <label className="block text-sm text-gray-600 mb-1">Einzelzimmer</label>
                                                  <input
                                                    type="number"
                                                    value={roomType.price.single || 0}
                                                    onChange={(e) => {
                                                      const updatedHotels = [...hotelData];
                                                      updatedHotels[index].rooms.types[typeIndex].price.single = parseFloat(e.target.value);
                                                      setHotelData(updatedHotels);
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                  />
                                                </div>
                                                <div>
                                                  <label className="block text-sm text-gray-600 mb-1">Doppelzimmer</label>
                                                  <input
                                                    type="number"
                                                    value={roomType.price.double || 0}
                                                    onChange={(e) => {
                                                      const updatedHotels = [...hotelData];
                                                      updatedHotels[index].rooms.types[typeIndex].price.double = parseFloat(e.target.value);
                                                      setHotelData(updatedHotels);
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            {/* Ausstattung */}
                                            <div>
                                              <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Ausstattung</label>
                                                <button
                                                  onClick={() => {
                                                    const updatedHotels = [...hotelData];
                                                    updatedHotels[index].rooms.types[typeIndex].amenities.push('');
                                                    setHotelData(updatedHotels);
                                                  }}
                                                  className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                                >
                                                  <Plus className="w-5 h-5" />
                                                  Ausstattungsmerkmal hinzufügen
                                                </button>
                                              </div>
                                              {roomType.amenities.map((amenity, amenityIndex) => (
                                                <div key={amenityIndex} className="flex gap-2 mb-2">
                                                  <input
                                                    type="text"
                                                    value={amenity}
                                                    onChange={(e) => {
                                                      const updatedHotels = [...hotelData];
                                                      updatedHotels[index].rooms.types[typeIndex].amenities[amenityIndex] = e.target.value;
                                                      setHotelData(updatedHotels);
                                                    }}
                                                    className="flex-1 px-4 py-2 border rounded-lg"
                                                  />
                                                  <button
                                                    onClick={() => {
                                                      const updatedHotels = [...hotelData];
                                                      updatedHotels[index].rooms.types[typeIndex].amenities.splice(amenityIndex, 1);
                                                      setHotelData(updatedHotels);
                                                    }}
                                                    className="text-red-500 hover:text-red-700"
                                                  >
                                                    <Trash className="w-5 h-5" />
                                                  </button>
                                                </div>
                                              ))}
                                            </div>

                                            {/* Löschen Button */}
                                            <div className="flex justify-end">
                                              <button
                                                onClick={() => {
                                                  if (confirm('Möchten Sie diesen Zimmertyp wirklich löschen?')) {
                                                    const updatedHotels = [...hotelData];
                                                    updatedHotels[index].rooms.types.splice(typeIndex, 1);
                                                    setHotelData(updatedHotels);
                                                  }
                                                }}
                                                className="flex items-center gap-2 text-red-500 hover:text-red-700"
                                              >
                                                <Trash className="w-5 h-5" />
                                                Zimmertyp löschen
                                              </button>
                                            </div>
                                          </div>
                                        </Disclosure.Panel>
                                      </div>
                                    )}
                                  </Disclosure>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Ausstattungsmerkmale */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Ausstattungsmerkmale</h3>
                            <div className="grid gap-4">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <label className="block text-sm font-medium text-gray-700">Allgemeine Features</label>
                                  <button
                                    onClick={() => {
                                      const updatedHotels = [...hotelData];
                                      updatedHotels[index].features.push('');
                                      setHotelData(updatedHotels);
                                    }}
                                    className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                  >
                                    <Plus className="w-5 h-5" />
                                    Feature hinzufügen
                                  </button>
                                </div>
                                {hotel.features.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex gap-2 mb-2">
                                    <input
                                      type="text"
                                      value={feature}
                                      onChange={(e) => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].features[featureIndex] = e.target.value;
                                        setHotelData(updatedHotels);
                                      }}
                                      className="flex-1 px-4 py-2 border rounded-lg"
                                    />
                                    <button
                                      onClick={() => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].features.splice(featureIndex, 1);
                                        setHotelData(updatedHotels);
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash className="w-5 h-5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Parken */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Parken</h3>
                            <div className="grid gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Außenparkplätze</label>
                                <input
                                  type="text"
                                  value={hotel.parking.outdoor}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].parking.outdoor = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Garage/Tiefgarage</label>
                                <input
                                  type="text"
                                  value={hotel.parking.garage}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].parking.garage = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Kontakt */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Kontakt</h3>
                            <div className="grid gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                                <input
                                  type="tel"
                                  value={hotel.contact.phone}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].contact.phone = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                                <input
                                  type="email"
                                  value={hotel.contact.email}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].contact.email = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Social Media</label>
                                <div className="grid gap-2">
                                  <div>
                                    <label className="block text-sm text-gray-600 mb-1">Facebook</label>
                                    <input
                                      type="url"
                                      value={hotel.contact.social.facebook}
                                      onChange={(e) => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].contact.social.facebook = e.target.value;
                                        setHotelData(updatedHotels);
                                      }}
                                      className="w-full px-4 py-2 border rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm text-gray-600 mb-1">Instagram</label>
                                    <input
                                      type="url"
                                      value={hotel.contact.social.instagram}
                                      onChange={(e) => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].contact.social.instagram = e.target.value;
                                        setHotelData(updatedHotels);
                                      }}
                                      className="w-full px-4 py-2 border rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm text-gray-600 mb-1">Twitter</label>
                                    <input
                                      type="url"
                                      value={hotel.contact.social.twitter}
                                      onChange={(e) => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].contact.social.twitter = e.target.value;
                                        setHotelData(updatedHotels);
                                      }}
                                      className="w-full px-4 py-2 border rounded-lg"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Pakete & Angebote */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Pakete & Angebote</h3>
                            <div className="grid gap-4">
                              {/* Standard-Pakete */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <label className="block text-sm font-medium text-gray-700">Standard-Pakete</label>
                                  <button
                                    onClick={() => {
                                      const updatedHotels = [...hotelData];
                                      updatedHotels[index].packages.standardPackages.push({
                                        title: '',
                                        subtitle: '',
                                        description: '',
                                        includes: [],
                                        price: '',
                                        image: ''
                                      });
                                      setHotelData(updatedHotels);
                                    }}
                                    className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                  >
                                    <Plus className="w-5 h-5" />
                                    Paket hinzufügen
                                  </button>
                                </div>
                                {hotel.packages.standardPackages.map((pkg, pkgIndex) => (
                                  <Disclosure key={pkgIndex}>
                                    {({ open }) => (
                                      <div className="border rounded-lg mb-4">
                                        <Disclosure.Button className="w-full px-4 py-2 flex justify-between items-center">
                                          <span>{pkg.title || 'Neues Paket'}</span>
                                          <ChevronDown className={`w-5 h-5 transform ${open ? 'rotate-180' : ''}`} />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="p-4">
                                          <div className="grid gap-4">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                                              <input
                                                type="text"
                                                value={pkg.title}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].packages.standardPackages[pkgIndex].title = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Untertitel</label>
                                              <input
                                                type="text"
                                                value={pkg.subtitle}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].packages.standardPackages[pkgIndex].subtitle = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                                              <textarea
                                                value={pkg.description}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].packages.standardPackages[pkgIndex].description = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                rows={3}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Preis</label>
                                              <input
                                                type="text"
                                                value={pkg.price}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].packages.standardPackages[pkgIndex].price = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Bild-URL</label>
                                              <input
                                                type="text"
                                                value={pkg.image}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].packages.standardPackages[pkgIndex].image = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>

                                            {/* Inklusivleistungen */}
                                            <div>
                                              <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Inklusivleistungen</label>
                                                <button
                                                  onClick={() => {
                                                    const updatedHotels = [...hotelData];
                                                    updatedHotels[index].packages.standardPackages[pkgIndex].includes.push('');
                                                    setHotelData(updatedHotels);
                                                  }}
                                                  className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                                >
                                                  <Plus className="w-5 h-5" />
                                                  Leistung hinzufügen
                                                </button>
                                              </div>
                                              {pkg.includes.map((include, includeIndex) => (
                                                <div key={includeIndex} className="flex gap-2 mb-2">
                                                  <input
                                                    type="text"
                                                    value={include}
                                                    onChange={(e) => {
                                                      const updatedHotels = [...hotelData];
                                                      updatedHotels[index].packages.standardPackages[pkgIndex].includes[includeIndex] = e.target.value;
                                                      setHotelData(updatedHotels);
                                                    }}
                                                    className="flex-1 px-4 py-2 border rounded-lg"
                                                  />
                                                  <button
                                                    onClick={() => {
                                                      const updatedHotels = [...hotelData];
                                                      updatedHotels[index].packages.standardPackages[pkgIndex].includes.splice(includeIndex, 1);
                                                      setHotelData(updatedHotels);
                                                    }}
                                                    className="text-red-500 hover:text-red-700"
                                                  >
                                                    <Trash className="w-5 h-5" />
                                                  </button>
                                                </div>
                                              ))}
                                            </div>

                                            {/* Löschen Button */}
                                            <div className="flex justify-end">
                                              <button
                                                onClick={() => {
                                                  if (confirm('Möchten Sie dieses Paket wirklich löschen?')) {
                                                    const updatedHotels = [...hotelData];
                                                    updatedHotels[index].packages.standardPackages.splice(pkgIndex, 1);
                                                    setHotelData(updatedHotels);
                                                  }
                                                }}
                                                className="flex items-center gap-2 text-red-500 hover:text-red-700"
                                              >
                                                <Trash className="w-5 h-5" />
                                                Paket löschen
                                              </button>
                                            </div>
                                          </div>
                                        </Disclosure.Panel>
                                      </div>
                                    )}
                                  </Disclosure>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Gutscheine */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Gutscheine</h3>
                            <div className="grid gap-4">
                              {/* Gutschein-Kategorien */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <label className="block text-sm font-medium text-gray-700">Gutschein-Kategorien</label>
                                  <button
                                    onClick={() => {
                                      const updatedHotels = [...hotelData];
                                      updatedHotels[index].vouchers.categories.push({
                                        id: '',
                                        title: '',
                                        description: '',
                                        image: '',
                                        options: []
                                      });
                                      setHotelData(updatedHotels);
                                    }}
                                    className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                  >
                                    <Plus className="w-5 h-5" />
                                    Kategorie hinzufügen
                                  </button>
                                </div>

                                {hotel.vouchers.categories.map((category, catIndex) => (
                                  <Disclosure key={catIndex}>
                                    {({ open }) => (
                                      <div className="border rounded-lg mb-4">
                                        <Disclosure.Button className="w-full px-4 py-2 flex justify-between items-center">
                                          <span>{category.title || 'Neue Kategorie'}</span>
                                          <ChevronDown className={`w-5 h-5 transform ${open ? 'rotate-180' : ''}`} />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="p-4">
                                          <div className="grid gap-4">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                                              <input
                                                type="text"
                                                value={category.id}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].vouchers.categories[catIndex].id = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                                              <input
                                                type="text"
                                                value={category.title}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].vouchers.categories[catIndex].title = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                                              <textarea
                                                value={category.description}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].vouchers.categories[catIndex].description = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                rows={3}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>

                                            {/* Gutschein-Optionen */}
                                            <div>
                                              <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Gutschein-Optionen</label>
                                                <button
                                                  onClick={() => {
                                                    const updatedHotels = [...hotelData];
                                                    updatedHotels[index].vouchers.categories[catIndex].options.push({
                                                      id: '',
                                                      name: '',
                                                      price: 0,
                                                      description: '',
                                                      includes: []
                                                    });
                                                    setHotelData(updatedHotels);
                                                  }}
                                                  className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                                >
                                                  <Plus className="w-5 h-5" />
                                                  Option hinzufügen
                                                </button>
                                              </div>

                                              {category.options.map((option, optIndex) => (
                                                <div key={optIndex} className="border p-4 rounded-lg mb-2">
                                                  <div className="grid gap-3">
                                                    <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                      <input
                                                        type="text"
                                                        value={option.name}
                                                        onChange={(e) => {
                                                          const updatedHotels = [...hotelData];
                                                          updatedHotels[index].vouchers.categories[catIndex].options[optIndex].name = e.target.value;
                                                          setHotelData(updatedHotels);
                                                        }}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                      />
                                                    </div>
                                                    <div>
                                                      <label className="block text-sm font-medium text-gray-700 mb-1">Preis</label>
                                                      <input
                                                        type="number"
                                                        value={option.price}
                                                        onChange={(e) => {
                                                          const updatedHotels = [...hotelData];
                                                          updatedHotels[index].vouchers.categories[catIndex].options[optIndex].price = parseFloat(e.target.value);
                                                          setHotelData(updatedHotels);
                                                        }}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                      />
                                                    </div>
                                                    {/* Option löschen */}
                                                    <div className="flex justify-end">
                                                      <button
                                                        onClick={() => {
                                                          const updatedHotels = [...hotelData];
                                                          updatedHotels[index].vouchers.categories[catIndex].options.splice(optIndex, 1);
                                                          setHotelData(updatedHotels);
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                      >
                                                        <Trash className="w-5 h-5" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>

                                            {/* Kategorie löschen */}
                                            <div className="flex justify-end">
                                              <button
                                                onClick={() => {
                                                  if (confirm('Möchten Sie diese Kategorie wirklich löschen?')) {
                                                    const updatedHotels = [...hotelData];
                                                    updatedHotels[index].vouchers.categories.splice(catIndex, 1);
                                                    setHotelData(updatedHotels);
                                                  }
                                                }}
                                                className="flex items-center gap-2 text-red-500 hover:text-red-700"
                                              >
                                                <Trash className="w-5 h-5" />
                                                Kategorie löschen
                                              </button>
                                            </div>
                                          </div>
                                        </Disclosure.Panel>
                                      </div>
                                    )}
                                  </Disclosure>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Restaurant */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Restaurant</h3>
                            <div className="grid gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                                <input
                                  type="text"
                                  value={hotel.restaurant.title}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].restaurant.title = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Einleitung</label>
                                <textarea
                                  value={hotel.restaurant.intro}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].restaurant.intro = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  rows={3}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>

                              {/* Öffnungszeiten */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Öffnungszeiten</label>
                                {hotel.restaurant.openingHours.current.times.map((time, timeIndex) => (
                                  <div key={timeIndex} className="grid gap-2 mb-2">
                                    <input
                                      type="text"
                                      value={time.days}
                                      placeholder="Tage"
                                      onChange={(e) => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].restaurant.openingHours.current.times[timeIndex].days = e.target.value;
                                        setHotelData(updatedHotels);
                                      }}
                                      className="w-full px-4 py-2 border rounded-lg"
                                    />
                                    <input
                                      type="text"
                                      value={time.hours}
                                      placeholder="Öffnungszeiten"
                                      onChange={(e) => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].restaurant.openingHours.current.times[timeIndex].hours = e.target.value;
                                        setHotelData(updatedHotels);
                                      }}
                                      className="w-full px-4 py-2 border rounded-lg"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Check-in/Check-out Policies */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Check-in/Check-out</h3>
                            <div className="grid gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in ab</label>
                                <input
                                  type="text"
                                  value={hotel.policies.checkIn.from}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].policies.checkIn.from = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out bis</label>
                                <input
                                  type="text"
                                  value={hotel.policies.checkOut.until}
                                  onChange={(e) => {
                                    const updatedHotels = [...hotelData];
                                    updatedHotels[index].policies.checkOut.until = e.target.value;
                                    setHotelData(updatedHotels);
                                  }}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Nachhaltigkeit */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Nachhaltigkeit</h3>
                            <div className="grid gap-4">
                              {/* Zertifikate */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <label className="block text-sm font-medium text-gray-700">Zertifikate</label>
                                  <button
                                    onClick={() => {
                                      const updatedHotels = [...hotelData];
                                      updatedHotels[index].sustainability.certificates.push('');
                                      setHotelData(updatedHotels);
                                    }}
                                    className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                  >
                                    <Plus className="w-5 h-5" />
                                    Zertifikat hinzufügen
                                  </button>
                                </div>
                                {hotel.sustainability.certificates.map((cert, certIndex) => (
                                  <div key={certIndex} className="flex gap-2 mb-2">
                                    <input
                                      type="text"
                                      value={cert}
                                      onChange={(e) => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].sustainability.certificates[certIndex] = e.target.value;
                                        setHotelData(updatedHotels);
                                      }}
                                      className="flex-1 px-4 py-2 border rounded-lg"
                                    />
                                    <button
                                      onClick={() => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].sustainability.certificates.splice(certIndex, 1);
                                        setHotelData(updatedHotels);
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash className="w-5 h-5" />
                                    </button>
                                  </div>
                                ))}
                              </div>

                              {/* Maßnahmen */}
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <label className="block text-sm font-medium text-gray-700">Maßnahmen</label>
                                  <button
                                    onClick={() => {
                                      const updatedHotels = [...hotelData];
                                      updatedHotels[index].sustainability.measures.push('');
                                      setHotelData(updatedHotels);
                                    }}
                                    className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                  >
                                    <Plus className="w-5 h-5" />
                                    Maßnahme hinzufügen
                                  </button>
                                </div>
                                {hotel.sustainability.measures.map((measure, measureIndex) => (
                                  <div key={measureIndex} className="flex gap-2 mb-2">
                                    <input
                                      type="text"
                                      value={measure}
                                      onChange={(e) => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].sustainability.measures[measureIndex] = e.target.value;
                                        setHotelData(updatedHotels);
                                      }}
                                      className="flex-1 px-4 py-2 border rounded-lg"
                                    />
                                    <button
                                      onClick={() => {
                                        const updatedHotels = [...hotelData];
                                        updatedHotels[index].sustainability.measures.splice(measureIndex, 1);
                                        setHotelData(updatedHotels);
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash className="w-5 h-5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Saisonale Angebote */}
                          <div>
                            <h3 className="text-lg font-medium mb-4">Saisonale Angebote</h3>
                            <div className="grid gap-4">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <label className="block text-sm font-medium text-gray-700">Angebote</label>
                                  <button
                                    onClick={() => {
                                      const updatedHotels = [...hotelData];
                                      updatedHotels[index].seasonalOffers.push({
                                        title: '',
                                        period: '',
                                        includes: [],
                                        price: ''
                                      });
                                      setHotelData(updatedHotels);
                                    }}
                                    className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                  >
                                    <Plus className="w-5 h-5" />
                                    Angebot hinzufügen
                                  </button>
                                </div>

                                {hotel.seasonalOffers.map((offer, offerIndex) => (
                                  <Disclosure key={offerIndex}>
                                    {({ open }) => (
                                      <div className="border rounded-lg mb-4">
                                        <Disclosure.Button className="w-full px-4 py-2 flex justify-between items-center">
                                          <span>{offer.title || 'Neues Angebot'}</span>
                                          <ChevronDown className={`w-5 h-5 transform ${open ? 'rotate-180' : ''}`} />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="p-4">
                                          <div className="grid gap-4">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                                              <input
                                                type="text"
                                                value={offer.title}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].seasonalOffers[offerIndex].title = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Zeitraum</label>
                                              <input
                                                type="text"
                                                value={offer.period}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].seasonalOffers[offerIndex].period = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Preis</label>
                                              <input
                                                type="text"
                                                value={offer.price}
                                                onChange={(e) => {
                                                  const updatedHotels = [...hotelData];
                                                  updatedHotels[index].seasonalOffers[offerIndex].price = e.target.value;
                                                  setHotelData(updatedHotels);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg"
                                              />
                                            </div>

                                            {/* Inklusivleistungen */}
                                            <div>
                                              <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Inklusivleistungen</label>
                                                <button
                                                  onClick={() => {
                                                    const updatedHotels = [...hotelData];
                                                    updatedHotels[index].seasonalOffers[offerIndex].includes.push('');
                                                    setHotelData(updatedHotels);
                                                  }}
                                                  className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                                >
                                                  <Plus className="w-5 h-5" />
                                                  Leistung hinzufügen
                                                </button>
                                              </div>
                                              {offer.includes.map((include, includeIndex) => (
                                                <div key={includeIndex} className="flex gap-2 mb-2">
                                                  <input
                                                    type="text"
                                                    value={include}
                                                    onChange={(e) => {
                                                      const updatedHotels = [...hotelData];
                                                      updatedHotels[index].seasonalOffers[offerIndex].includes[includeIndex] = e.target.value;
                                                      setHotelData(updatedHotels);
                                                    }}
                                                    className="flex-1 px-4 py-2 border rounded-lg"
                                                  />
                                                  <button
                                                    onClick={() => {
                                                      const updatedHotels = [...hotelData];
                                                      updatedHotels[index].seasonalOffers[offerIndex].includes.splice(includeIndex, 1);
                                                      setHotelData(updatedHotels);
                                                    }}
                                                    className="text-red-500 hover:text-red-700"
                                                  >
                                                    <Trash className="w-5 h-5" />
                                                  </button>
                                                </div>
                                              ))}
                                            </div>

                                            {/* Angebot löschen */}
                                            <div className="flex justify-end">
                                              <button
                                                onClick={() => {
                                                  if (confirm('Möchten Sie dieses Angebot wirklich löschen?')) {
                                                    const updatedHotels = [...hotelData];
                                                    updatedHotels[index].seasonalOffers.splice(offerIndex, 1);
                                                    setHotelData(updatedHotels);
                                                  }
                                                }}
                                                className="flex items-center gap-2 text-red-500 hover:text-red-700"
                                              >
                                                <Trash className="w-5 h-5" />
                                                Angebot löschen
                                              </button>
                                            </div>
                                          </div>
                                        </Disclosure.Panel>
                                      </div>
                                    )}
                                  </Disclosure>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-end gap-4">
                            <button
                              onClick={() => {
                                const updatedHotels = hotelData.filter((_, i) => i !== index);
                                setHotelData(updatedHotels);
                              }}
                              className="flex items-center gap-2 text-red-500 hover:text-red-700"
                            >
                              <Trash className="w-5 h-5" />
                              Hotel löschen
                            </button>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        )}

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">Seitenverwaltung</h2>
              <button
                onClick={() => {
                  const pageName = prompt('Name der neuen Seite:');
                  if (pageName) {
                    setPages(prev => ({
                      ...prev,
                      [pageName.toLowerCase()]: {
                        title: pageName,
                        content: {
                          intro: '',
                          mainContent: '',
                          sections: []
                        }
                      }
                    }));
                  }
                }}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Neue Seite
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(pages).map(([key, page]) => (
                <div key={key} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Edit className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-medium">{page.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const newTitle = prompt('Neuer Seitentitel:', page.title);
                            if (newTitle) {
                              setPages(prev => ({
                                ...prev,
                                [key]: {
                                  ...prev[key],
                                  title: newTitle
                                }
                              }));
                            }
                          }}
                          className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-100"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Möchten Sie diese Seite wirklich löschen?')) {
                              const updatedPages = { ...pages };
                              delete updatedPages[key];
                              setPages(updatedPages);
                            }
                          }}
                          className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-gray-100"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      {Object.entries(page.content).map(([contentKey, content]) => (
                        <div key={contentKey} className="group">
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700 capitalize">
                              {contentKey}
                            </label>
                            {Array.isArray(content) && (
                              <button
                                onClick={() => {
                                  const updatedContent = [...content];
                                  updatedContent.push({
                                    title: '',
                                    text: '',
                                    image: ''
                                  });
                                  setPages(prev => ({
                                    ...prev,
                                    [key]: {
                                      ...prev[key],
                                      content: {
                                        ...prev[key].content,
                                        [contentKey]: updatedContent
                                      }
                                    }
                                  }));
                                }}
                                className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                              >
                                <Plus className="w-4 h-4" />
                                Abschnitt hinzufügen
                              </button>
                            )}
                          </div>

                          {typeof content === 'string' ? (
                            <div className="relative">
                              <textarea
                                value={content}
                                onChange={(e) => {
                                  setPages(prev => ({
                                    ...prev,
                                    [key]: {
                                      ...prev[key],
                                      content: {
                                        ...prev[key].content,
                                        [contentKey]: e.target.value
                                      }
                                    }
                                  }));
                                }}
                                rows={4}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                placeholder={`${contentKey} hier eingeben...`}
                              />
                              <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => navigator.clipboard.writeText(content)}
                                  className="p-1 text-gray-500 hover:text-primary rounded-md hover:bg-gray-100"
                                  title="Kopieren"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ) : Array.isArray(content) ? (
                            <div className="space-y-4">
                              {content.map((item, idx) => (
                                <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                                  <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium">Abschnitt {idx + 1}</h4>
                                    <button
                                      onClick={() => {
                                        const updatedContent = content.filter((_, i) => i !== idx);
                                        setPages(prev => ({
                                          ...prev,
                                          [key]: {
                                            ...prev[key],
                                            content: {
                                              ...prev[key].content,
                                              [contentKey]: updatedContent
                                            }
                                          }
                                        }));
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="grid gap-3">
                                    {Object.entries(item).map(([itemKey, itemValue]) => (
                                      <div key={itemKey}>
                                        <label className="block text-sm text-gray-600 mb-1 capitalize">
                                          {itemKey}
                                        </label>
                                        <input
                                          type="text"
                                          value={itemValue}
                                          onChange={(e) => {
                                            const updatedContent = [...content];
                                            updatedContent[idx] = {
                                              ...updatedContent[idx],
                                              [itemKey]: e.target.value
                                            };
                                            setPages(prev => ({
                                              ...prev,
                                              [key]: {
                                                ...prev[key],
                                                content: {
                                                  ...prev[key].content,
                                                  [contentKey]: updatedContent
                                                }
                                              }
                                            }));
                                          }}
                                          className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-500">
                              Komplexer Inhalt - Spezielle Bearbeitung erforderlich
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">Stellenangebote verwalten</h2>
              <button
                onClick={() => {
                  setPages(prev => ({
                    ...prev,
                    jobs: {
                      ...prev.jobs,
                      content: {
                        ...prev.jobs.content,
                        jobs: [
                          ...(prev.jobs.content.jobs || []),
                          {
                            title: '',
                            location: '',
                            type: 'Vollzeit',
                            description: ''
                          }
                        ]
                      }
                    }
                  }));
                }}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Neue Stelle ausschreiben
              </button>
            </div>

            <div className="space-y-4">
              {pages.jobs.content.jobs.map((job, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stellenbezeichnung
                      </label>
                      <input
                        type="text"
                        value={job.title}
                        onChange={(e) => {
                          const updatedJobs = [...pages.jobs.content.jobs];
                          updatedJobs[index].title = e.target.value;
                          setPages(prev => ({
                            ...prev,
                            jobs: {
                              ...prev.jobs,
                              content: {
                                ...prev.jobs.content,
                                jobs: updatedJobs
                              }
                            }
                          }));
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Einsatzort
                      </label>
                      <input
                        type="text"
                        value={job.location}
                        onChange={(e) => {
                          const updatedJobs = [...pages.jobs.content.jobs];
                          updatedJobs[index].location = e.target.value;
                          setPages(prev => ({
                            ...prev,
                            jobs: {
                              ...prev.jobs,
                              content: {
                                ...prev.jobs.content,
                                jobs: updatedJobs
                              }
                            }
                          }));
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Beschäftigungsart
                      </label>
                      <select
                        value={job.type}
                        onChange={(e) => {
                          const updatedJobs = [...pages.jobs.content.jobs];
                          updatedJobs[index].type = e.target.value;
                          setPages(prev => ({
                            ...prev,
                            jobs: {
                              ...prev.jobs,
                              content: {
                                ...prev.jobs.content,
                                jobs: updatedJobs
                              }
                            }
                          }));
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      >
                        <option value="Vollzeit">Vollzeit</option>
                        <option value="Teilzeit">Teilzeit</option>
                        <option value="Minijob">Minijob</option>
                        <option value="Ausbildung">Ausbildung</option>
                        <option value="Praktikum">Praktikum</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stellenbeschreibung
                      </label>
                      <textarea
                        value={job.description}
                        onChange={(e) => {
                          const updatedJobs = [...pages.jobs.content.jobs];
                          updatedJobs[index].description = e.target.value;
                          setPages(prev => ({
                            ...prev,
                            jobs: {
                              ...prev.jobs,
                              content: {
                                ...prev.jobs.content,
                                jobs: updatedJobs
                              }
                            }
                          }));
                        }}
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          const updatedJobs = pages.jobs.content.jobs.filter((_, i) => i !== index);
                          setPages(prev => ({
                            ...prev,
                            jobs: {
                              ...prev.jobs,
                              content: {
                                ...prev.jobs.content,
                                jobs: updatedJobs
                              }
                            }
                          }));
                        }}
                        className="flex items-center gap-2 text-red-500 hover:text-red-700"
                      >
                        <Trash className="w-5 h-5" />
                        Stelle entfernen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Chat Tab */}
        {activeTab === 'ai-chat' && <AIChatSettings />}
      </div>
    </div>
  );
}