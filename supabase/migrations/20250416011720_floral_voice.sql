/*
  # Hotels Database Schema

  1. New Tables
    - hotels (main hotel information)
    - hotel_images (hotel image gallery)
    - hotel_rooms (room types and details)
    - hotel_amenities (hotel features and facilities)
    - hotel_sections (content sections like welcome, about etc)
    - hotel_packages (special offers and arrangements)
    - hotel_contacts (contact information)
    - hotel_policies (rules and policies)
    - hotel_locations (address and coordinates)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create custom types
CREATE TYPE room_category AS ENUM ('standard', 'comfort', 'deluxe', 'suite', 'apartment');
CREATE TYPE section_type AS ENUM ('welcome', 'rooms', 'wellness', 'dining', 'meetings', 'location');
CREATE TYPE policy_type AS ENUM ('checkin', 'checkout', 'cancellation', 'pets', 'children', 'payment');

-- Hotels table
CREATE TABLE hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  rating numeric(2,1),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  branding jsonb DEFAULT '{}'::jsonb,
  active boolean DEFAULT true
);

-- Hotel locations
CREATE TABLE hotel_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  address text NOT NULL,
  city text NOT NULL,
  zip text NOT NULL,
  country text NOT NULL,
  latitude numeric,
  longitude numeric,
  created_at timestamptz DEFAULT now()
);

-- Hotel images
CREATE TABLE hotel_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt text,
  title text,
  section text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Hotel rooms
CREATE TABLE hotel_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  category room_category NOT NULL,
  size numeric,
  max_occupancy integer,
  price_single numeric,
  price_double numeric,
  amenities jsonb DEFAULT '[]'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Hotel amenities
CREATE TABLE hotel_amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  category text NOT NULL,
  name text NOT NULL,
  description text,
  icon text,
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Hotel sections
CREATE TABLE hotel_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  type section_type NOT NULL,
  title text NOT NULL,
  content text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Hotel packages
CREATE TABLE hotel_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  title text NOT NULL,
  subtitle text,
  description text,
  price numeric NOT NULL,
  includes jsonb DEFAULT '[]'::jsonb,
  valid_from date,
  valid_until date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Hotel contacts
CREATE TABLE hotel_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  type text NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Hotel policies
CREATE TABLE hotel_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  type policy_type NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_policies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON hotels
  FOR SELECT TO public
  USING (active = true);

CREATE POLICY "Allow authenticated users to manage hotels" ON hotels
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Similar policies for related tables
CREATE POLICY "Public read access" ON hotel_locations FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON hotel_images FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON hotel_rooms FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON hotel_amenities FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON hotel_sections FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON hotel_packages FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON hotel_contacts FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON hotel_policies FOR SELECT TO public USING (true);

-- Authenticated users can manage all tables
CREATE POLICY "Authenticated users can manage" ON hotel_locations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON hotel_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON hotel_rooms FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON hotel_amenities FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON hotel_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON hotel_packages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON hotel_contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON hotel_policies FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create functions for automatic updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_hotels_updated_at
    BEFORE UPDATE ON hotels
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotel_rooms_updated_at
    BEFORE UPDATE ON hotel_rooms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotel_sections_updated_at
    BEFORE UPDATE ON hotel_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotel_packages_updated_at
    BEFORE UPDATE ON hotel_packages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotel_policies_updated_at
    BEFORE UPDATE ON hotel_policies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();