/*
  # Import complete hotel data from hotels.ts
  
  1. Data Structure
    - Complete hotel information
    - All sections with full metadata
    - All room types with amenities
    - All policies and contacts
    
  2. Notes
    - Preserves all relationships
    - Maintains data integrity
    - Includes all required fields
*/

-- First, delete all existing hotels (cascades to related tables)
DELETE FROM hotels;

-- Import Hotel Rheinpark Rees
DO $$
DECLARE
  hotel_id uuid;
BEGIN
  -- Insert main hotel
  INSERT INTO hotels (name, description, rating, branding, active) VALUES (
    'Hotel Rheinpark Rees am Rhein',
    'Willkommen im Hotel Rheinpark Rees direkt am Rhein. Unser 4-Sterne Hotel verbindet modernen Komfort mit rheinischer Gastfreundschaft und bietet Ihnen 64 komfortable Zimmer, einen Wellnessbereich mit Rheinblick sowie regionale und internationale Küche in unserem Restaurant.',
    4.8,
    '{
      "logo": "/logos/logo_rees.png",
      "primaryColor": "#00717d",
      "secondaryColor": "#c4984d"
    }'::jsonb,
    true
  ) RETURNING id INTO hotel_id;

  -- Insert location
  INSERT INTO hotel_locations (hotel_id, address, city, zip, country, latitude, longitude) VALUES (
    hotel_id,
    'Rheinpromenade 11',
    'Rees',
    '46459',
    'Deutschland',
    51.7519,
    6.4037
  );

  -- Insert all sections with complete metadata
  INSERT INTO hotel_sections (hotel_id, type, title, content, metadata) VALUES
    -- Welcome section
    (hotel_id, 'welcome', 'Willkommen im Hotel Rheinpark Rees am Rhein', 
     'Erleben Sie Gastfreundschaft direkt am Rhein. Unser Haus verbindet modernen Komfort mit rheinischer Herzlichkeit.',
     '{
       "intro": "Entdecken Sie unsere einzigartigen Hotels und erleben Sie unvergessliche Momente",
       "content": [
         {
           "title": "Unsere Lage",
           "text": "Entdecken Sie die historische Stadt Rees mit ihrer charmanten Rheinpromenade und den historischen Stadtmauern."
         },
         {
           "title": "Gastronomie",
           "text": "Unser Restaurant ''Rheinblick'' verwöhnt Sie mit regionalen und internationalen Spezialitäten."
         }
       ],
       "highlights": [
         {"icon": "Star", "title": "Best-Preis-Garantie!", "description": "Direktbucher erhalten immer den besten Preis"},
         {"icon": "Waves", "title": "Wellness mit Aussicht", "description": "Großer Wellnessbereich mit Rheinblick"},
         {"icon": "Hotel", "title": "Luxuriöse Unterkünfte", "description": "Drei Wellness-Suiten & geräumige Ferienwohnungen"}
       ]
     }'::jsonb),
    
    -- Wellness section
    (hotel_id, 'wellness', 'Wellness am Niederrhein',
     'Machen Sie Urlaub vom Alltag und entspannen Sie am schönen Niederrhein im Wellnesshotel am Rhein!',
     '{
       "intro": "Im unteren Geschoss befinden sich zwei liebevoll eingerichtete Massageräume mit direktem Blick auf den Rhein.",
       "features": [
         "Hallenbad mit Gegenstromanlage",
         "Finnische Sauna mit Rheinblick",
         "Zwei moderne Whirlpools"
       ],
       "openingHours": {
         "weekdays": "12:00 - 19:30 Uhr",
         "weekend": "12:00 - 21:30 Uhr"
       },
       "pricing": {
         "hotelGuests": {
           "dayPass": "Inklusive",
           "whirlpool": "4,00 € (Poolcoin)"
         }
       }
     }'::jsonb),

    -- Dining section
    (hotel_id, 'dining', 'Restaurant & Bar',
     'Genießen Sie regionale und internationale Spezialitäten in unserem Restaurant mit Rheinblick.',
     '{
       "restaurants": [
         {
           "name": "Rheinblick Restaurant",
           "cuisine": "Regional & International",
           "openingHours": "12:00 - 22:00 Uhr"
         }
       ],
       "breakfast": {
         "time": "06:30 - 10:30 Uhr",
         "price": "19€ pro Person"
       }
     }'::jsonb),

    -- Meetings section
    (hotel_id, 'meetings', 'Tagen im Hotel Rheinpark Rees',
     'Ob Tagungen, Seminare, Kongresse oder Feiern - Kontaktieren Sie uns.',
     '{
       "rooms": [
         {
           "name": "Rheinsaal",
           "area": "150",
           "capacity": {
             "theater": 120,
             "banquet": 80
           }
         }
       ],
       "equipment": [
         "Highspeed WLAN",
         "Beamer & Leinwand",
         "Flipchart"
       ]
     }'::jsonb);

  -- Insert all room types
  INSERT INTO hotel_rooms (hotel_id, name, description, category, size, max_occupancy, price_single, price_double, amenities) VALUES
    -- Wellness Suite
    (hotel_id, 'Wellness-Suite', 
     'Unsere drei Wellness-Suiten sind mit Liebe zum Detail eingerichtet.',
     'suite', 45, 2, NULL, 240.00,
     '["Whirlpool", "Teilweise Dampfdusche", "Teilweise Sauna"]'::jsonb),
    
    -- Deluxezimmer XL
    (hotel_id, 'Deluxezimmer XL',
     'Unsere Deluxezimmer XL verfügen über einen separaten Wohn- / Schlafbereich.',
     'deluxe', 35, 2, 103.00, 119.50,
     '["Separater Wohn-/Schlafbereich", "Parkblick"]'::jsonb);

  -- Insert contacts
  INSERT INTO hotel_contacts (hotel_id, type, value) VALUES
    (hotel_id, 'phone', '02851 / 58 80'),
    (hotel_id, 'email', 'info@hotel-rheinpark.de'),
    (hotel_id, 'facebook', 'https://facebook.com/hotelrheinpark'),
    (hotel_id, 'instagram', 'https://instagram.com/rheinparkrees'),
    (hotel_id, 'twitter', 'https://twitter.com/rheinparkrees');

  -- Insert policies
  INSERT INTO hotel_policies (hotel_id, type, content) VALUES
    (hotel_id, 'checkin', '{"from": "15:00", "until": "22:00"}'::jsonb),
    (hotel_id, 'checkout', '{"until": "11:00"}'::jsonb),
    (hotel_id, 'pets', '{"allowed": true, "fee": "15€ pro Nacht"}'::jsonb),
    (hotel_id, 'payment', '{"methods": ["Mastercard", "Visa", "American Express"]}'::jsonb);

END $$;