import { useParams } from 'react-router-dom';
import { useHotels } from '../hooks/useHotels';
import { useTheme } from '../context/ThemeContext';
import { NotFound } from '../components/NotFound';
import { useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

// Import components
import { HeroSection } from '../components/HotelDetail/HeroSection';
import { Navigation } from '../components/HotelDetail/Navigation';
import { WelcomeSection } from '../components/HotelDetail/WelcomeSection';
import { HotelHighlights } from '../components/HotelDetail/HotelHighlights';
import { RoomsSection } from '../components/HotelDetail/RoomsSection';
import { WellnessSection } from '../components/HotelDetail/WellnessSection';
import { RestaurantSection } from '../components/HotelDetail/RestaurantSection';
import { MeetingsSection } from '../components/HotelDetail/MeetingsSection';
import { PackagesSection } from '../components/HotelDetail/PackagesSection';
import { ContactSection } from '../components/HotelDetail/ContactSection';

interface WelcomeContent {
  title: string;
  text: string;
}

interface Hotel {
  id: string;
  name: string;
  description: string;
  rating: number;
  branding?: {
    primaryColor: string;
    secondaryColor?: string;
  };
  location?: {
    address: string;
    city: string;
    zip: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  sections?: {
    welcome?: {
      title?: string;
      intro?: string;
      content?: WelcomeContent[];
      highlights?: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
      images?: Array<{
        url: string;
      }>;
    };
  };
  rooms?: {
    total: number;
    standardFeatures?: string[];
    policies?: {
      children?: string;
      pets?: {
        notes?: string;
        fee?: string;
      };
      specialRates?: {
        groups?: string;
        business?: string;
        longStay?: string;
      };
    };
  };
  amenities?: {
    wellness?: {
      title?: string;
      intro?: string;
      description?: string;
      features?: string[];
      areas?: Array<{
        name: string;
        description: string;
        image: string;
      }>;
      openingHours?: {
        weekdays?: string;
        weekend?: string;
      };
      pricing?: {
        hotelGuests?: {
          dayPass?: string;
          whirlpool?: string;
        };
        externalGuests?: {
          weekday?: {
            dayPass?: string;
            whirlpool?: string;
          };
          weekend?: {
            dayPass?: string;
            whirlpool?: string;
          };
        };
      };
      images?: Array<{
        url: string;
        alt: string;
      }>;
    };
    business?: {
      meetingRooms?: Array<{
        name: string;
        area: string;
        height: string;
        capacity: {
          theater: string;
          banquet: string;
        };
      }>;
      equipment?: string[];
    };
  };
  restaurant?: {
    title?: string;
    intro?: string;
    description?: string;
    features?: string[];
    quote?: {
      text?: string;
      author?: string;
    };
    images?: Array<{
      url: string;
      alt: string;
    }>;
    openingHours?: {
      current?: {
        validUntil?: string;
        times?: Array<{
          days: string;
          hours: string;
          kitchen?: string;
        }>;
      };
      breakfast?: {
        weekday?: string;
        weekend?: string;
      };
    };
    menus?: { [key: string]: { title: string; url: string } };
    brochures?: { [key: string]: { title: string; url: string } };
    contact?: {
      phone?: string;
      email?: string;
    };
  };
  packages?: {
    title?: string;
    subtitle?: string;
    intro?: string;
    description?: string;
    standardPackages?: Array<{
      title: string;
      subtitle: string;
      image: string;
      price: string;
      includes: string[];
    }>;
    wellnessSuitePackages?: Array<{
      title: string;
      subtitle: string;
      image: string;
      price: string;
      includes: string[];
    }>;
    additionalServices?: {
      title: string;
      description: string;
      bookableExtras: string[];
    };
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  policies?: {
    checkIn?: {
      from?: string;
    };
    checkOut?: {
      until?: string;
    };
  };
  images?: Array<{
    url: string;
  }>;
}

export function HotelDetail() {
  const { hotelId } = useParams();
  const { hotels, loading, error } = useHotels();
  const hotel = hotels.find(h => h.id === hotelId) as Hotel | undefined;
  const { setTheme } = useTheme();

  useEffect(() => {
    if (hotel?.branding) {
      setTheme({
        primary: hotel.branding.primaryColor,
        secondary: hotel.branding.secondaryColor || '#c4984d'
      });
    } else {
      // Reset to default theme if no hotel found
      setTheme({
        primary: '#0069b3',
        secondary: '#c4984d'
      });
    }

    // Cleanup function to reset theme when component unmounts
    return () => {
      setTheme({
        primary: '#0069b3',
        secondary: '#c4984d'
      });
    };
  }, [hotel, setTheme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!hotel) {
    return <NotFound />;
  }

  const welcomeContent = Array.isArray(hotel.sections?.welcome?.content) 
    ? hotel.sections.welcome.content 
    : [];

  return (
    <div className="hotel-page min-h-screen bg-white">
      <HeroSection hotel={{
        name: hotel.name,
        description: hotel.description,
        rating: hotel.rating,
        rooms: { total: hotel.rooms?.total || 0 },
        location: { city: hotel.location?.city || '' },
        policies: {
          checkIn: { from: hotel.policies?.checkIn?.from || '' },
          checkOut: { until: hotel.policies?.checkOut?.until || '' }
        },
        sections: {
          welcome: {
            images: hotel.sections?.welcome?.images
          }
        },
        images: hotel.images
      }} />
      
      <Navigation />
      
      <WelcomeSection 
        welcomeContent={welcomeContent}
        welcomeTitle={hotel.sections?.welcome?.title}
        welcomeIntro={hotel.sections?.welcome?.intro}
        highlights={hotel.sections?.welcome?.highlights}
      />

      <HotelHighlights highlights={hotel.sections?.welcome?.highlights || []} />

      <RoomsSection 
        roomTypes={hotel.rooms?.standardFeatures?.map(feature => ({
          name: feature,
          description: '',
          image: '',
          price: { double: '0' },
          amenities: []
        })) || []}
        standardFeatures={hotel.rooms?.standardFeatures || []}
        policies={{
          children: hotel.rooms?.policies?.children,
          pets: hotel.rooms?.policies?.pets,
          specialRates: hotel.rooms?.policies?.specialRates
        }}
      />

      <WellnessSection 
        title={hotel.amenities?.wellness?.title}
        intro={hotel.amenities?.wellness?.intro}
        description={hotel.amenities?.wellness?.description}
        features={hotel.amenities?.wellness?.features}
        areas={hotel.amenities?.wellness?.areas}
        openingHours={hotel.amenities?.wellness?.openingHours}
        pricing={hotel.amenities?.wellness?.pricing}
        images={hotel.amenities?.wellness?.images}
      />

      <RestaurantSection 
        title={hotel.restaurant?.title}
        intro={hotel.restaurant?.intro}
        description={hotel.restaurant?.description}
        features={hotel.restaurant?.features}
        quote={hotel.restaurant?.quote}
        images={hotel.restaurant?.images}
        openingHours={hotel.restaurant?.openingHours}
        menus={hotel.restaurant?.menus}
        brochures={hotel.restaurant?.brochures}
        contact={hotel.restaurant?.contact}
      />

      <MeetingsSection 
        meetingRooms={hotel.amenities?.business?.meetingRooms || []}
        meetingAmenities={hotel.amenities?.business?.equipment || []}
        images={hotel.images}
      />

      <PackagesSection 
        title={hotel.packages?.title}
        subtitle={hotel.packages?.subtitle}
        intro={hotel.packages?.intro}
        description={hotel.packages?.description}
        standardPackages={hotel.packages?.standardPackages}
        wellnessSuitePackages={hotel.packages?.wellnessSuitePackages}
        additionalServices={hotel.packages?.additionalServices}
      />

      <ContactSection 
        title="Kontakt & Anfahrt"
        subtitle="So erreichen Sie uns"
        contactInfo={{
          address: `${hotel.location?.address || ''}, ${hotel.location?.zip || ''} ${hotel.location?.city || ''}`,
          phone: hotel.contact?.phone || '',
          email: hotel.contact?.email || '',
          website: hotel.contact?.website || '',
          openingHours: `Check-in ab ${hotel.policies?.checkIn?.from || ''}, Check-out bis ${hotel.policies?.checkOut?.until || ''}`
        }}
        mapUrl={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
          `${hotel.location?.address || ''}, ${hotel.location?.zip || ''} ${hotel.location?.city || ''}`
        )}`}
      />
    </div>
  );
}