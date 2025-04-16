-- Create tables for About, Team, Awards, Jobs, and Contacts

-- About content table
CREATE TABLE about (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  history text NOT NULL,
  philosophy text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members table
CREATE TABLE team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  image_url text NOT NULL,
  bio text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Awards table
CREATE TABLE awards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  year integer NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Jobs table
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  requirements jsonb DEFAULT '[]'::jsonb,
  benefits jsonb DEFAULT '[]'::jsonb,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contacts table
CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access" ON about FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON team_members FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON awards FOR SELECT TO public USING (true);
CREATE POLICY "Public read access" ON jobs FOR SELECT TO public USING (active = true);
CREATE POLICY "Allow contact creation" ON contacts FOR INSERT TO public WITH CHECK (true);

-- Authenticated users can manage all tables
CREATE POLICY "Authenticated users can manage" ON about FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON awards FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON jobs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage" ON contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert initial about content
INSERT INTO about (history, philosophy) VALUES (
  'Seit über 30 Jahren steht der Name Aaldering für erstklassige Hotellerie und exzellenten Service. Was als kleines Familienunternehmen begann, hat sich zu einer der führenden Hotelgruppen in Deutschland entwickelt.',
  'Wir glauben daran, dass jeder Aufenthalt in einem unserer Hotels ein besonderes Erlebnis sein sollte. Unser Ziel ist es, unseren Gästen nicht nur eine Unterkunft, sondern ein Zuhause auf Zeit zu bieten.'
);

-- Insert initial team members
INSERT INTO team_members (name, position, image_url, bio, sort_order) VALUES
  ('Michael Aaldering', 'Geschäftsführer', '/images/team/michael.jpg', 'Führt das Unternehmen in zweiter Generation.', 1),
  ('Anna Aaldering', 'Hotelmanagerin', '/images/team/anna.jpg', 'Verantwortlich für das operative Geschäft.', 2),
  ('Thomas Weber', 'Küchendirektor', '/images/team/thomas.jpg', 'Leitet die Gastronomie aller Häuser.', 3);

-- Insert initial awards
INSERT INTO awards (title, description, year, icon) VALUES
  ('5-Sterne Superior', 'DEHOGA Klassifizierung', 2024, '⭐'),
  ('Best Luxury Hotel', '2023 Travel Awards', 2023, '🏆'),
  ('Green Hotel', 'Nachhaltigkeitszertifikat', 2023, '🌿'),
  ('2 Michelin Sterne', 'Restaurant Excellence', 2023, '👨‍🍳');

-- Insert initial jobs
INSERT INTO jobs (title, location, type, description, requirements, benefits) VALUES
  (
    'Rezeptionist (m/w/d)',
    'Hotel Rheinpark Rees',
    'Vollzeit',
    'Wir suchen eine engagierte Persönlichkeit für unsere Rezeption.',
    '["Abgeschlossene Ausbildung im Hotelgewerbe", "Sehr gute Deutsch- und Englischkenntnisse", "Serviceorientierung"]',
    '["Überdurchschnittliche Bezahlung", "Betriebliche Altersvorsorge", "Weiterbildungsmöglichkeiten"]'
  ),
  (
    'Koch (m/w/d)',
    'Atlanta Hotel Leipzig',
    'Vollzeit',
    'Für unser Restaurant suchen wir einen erfahrenen Koch.',
    '["Abgeschlossene Ausbildung als Koch", "Berufserfahrung in der gehobenen Gastronomie", "Kreativität und Teamfähigkeit"]',
    '["Leistungsgerechte Vergütung", "Flexible Arbeitszeiten", "Mitarbeiterrabatte"]'
  ),
  (
    'Zimmermädchen (m/w/d)',
    'Hotel Am Luisenplatz',
    'Teilzeit',
    'Zur Verstärkung unseres Housekeeping-Teams suchen wir motivierte Mitarbeiter.',
    '["Berufserfahrung im Housekeeping", "Zuverlässigkeit", "Qualitätsbewusstsein"]',
    '["Faire Bezahlung", "Familiäres Arbeitsumfeld", "Kostenlose Verpflegung"]'
  );