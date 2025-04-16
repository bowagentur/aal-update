export interface Hotel {
  id: string;
  name: string;
  description: string;
  rating: number;
  imageUrl: string;
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  };
  location: {
    city: string;
    address: string;
    zip: string;
    country: string;
    email: string;
  };
  sections: {
    welcome: Section;
    rooms: Section;
    wellness: Section;
    dining: Section;
    meetings: Section;
    location: Section;
  };
  rooms: {
    total: number;
    types: string[];
    features: string[];
  };
  policies: {
    checkIn: {
      from: string;
      until: string;
    };
    checkOut: {
      from: string;
      until: string;
    };
    pets: {
      allowed: boolean;
      fee: string;
    };
  };
  meetingRooms: {
    name: string;
    area: number;
    height: number;
    capacity: {
      theater: number;
      banquet: number;
    };
  }[];
  meetingAmenities: string[];
  amenities: {
    wellness: {
      features: string[];
      openingHours: string;
    };
    dining: {
      restaurants: {
        name: string;
        type: string;
        openingHours: string;
      }[];
    };
  };
  contact: {
    phone: string;
    email: string;
  };
  images: {
    url: string;
    alt: string;
    title: string;
  }[];
}

interface Section {
  title: string;
  text: string;
  images: {
    url: string;
    alt: string;
    title: string;
  }[];
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface RoomType {
  icon: string;
  title: string;
  description: string;
}

export interface Event {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface Testimonial {
  content: string;
  author: {
    name: string;
    location: string;
    avatarUrl: string;
  };
}