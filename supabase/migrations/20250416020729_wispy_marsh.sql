/*
  # Migrate Hotels Data from hotels.ts
  
  1. Changes
    - Delete existing hotels and related data
    - Import hotels from hotels.ts with all related data:
      - Locations
      - Sections (welcome, rooms, wellness, etc.)
      - Rooms with amenities
      - Contacts
      - Policies
    
  2. Data Organization
    - Maintain all relationships
    - Preserve nested data structure
    - Keep all metadata
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

  -- Insert welcome section
  INSERT INTO hotel_sections (hotel_id, type, title, content, metadata) VALUES (
    hotel_id,
    'welcome',
    'Willkommen im Hotel Rheinpark Rees am Rhein',
    'Erleben Sie Gastfreundschaft direkt am Rhein. Unser Haus verbindet modernen Komfort mit rheinischer Herzlichkeit.',
    '{
      "intro": "Entdecken Sie unsere einzigartigen Hotels und erleben Sie unvergessliche Momente",
      "highlights": [
        {"icon": "Star", "title": "Best-Preis-Garantie!", "description": "Direktbucher erhalten immer den besten Preis"},
        {"icon": "Waves", "title": "Wellness mit Aussicht", "description": "Großer Wellnessbereich mit Rheinblick"},
        {"icon": "Hotel", "title": "Luxuriöse Unterkünfte", "description": "Drei Wellness-Suiten & geräumige Ferienwohnungen"},
        {"icon": "Wifi", "title": "Kostenfreies W-LAN", "description": "Im gesamten Haus verfügbar"},
        {"icon": "Coffee", "title": "24/7 Verpflegung", "description": "Snackautomat im Lobbybereich"},
        {"icon": "Spa", "title": "Wellness & Massage", "description": "Vielfältige Anwendungen buchbar"},
        {"icon": "UtensilsCrossed", "title": "Panorama-Restaurant", "description": "Frühstücksrestaurant mit Terrasse"},
        {"icon": "Dumbbell", "title": "Fitness", "description": "Kleiner Fitnessbereich"},
        {"icon": "Users", "title": "Tagungen", "description": "Perfekter Partner für Ihre Veranstaltungen"},
        {"icon": "BedDouble", "title": "Komfortable Zimmer", "description": "Geräumig und modern eingerichtet"},
        {"icon": "HeartHandshake", "title": "Service", "description": "Zuvorkommender Service"}
      ]
    }'::jsonb
  );

  -- Insert wellness section
  INSERT INTO hotel_sections (hotel_id, type, title, content, metadata) VALUES (
    hotel_id,
    'wellness',
    'Wellness am Niederrhein',
    'Im unteren Geschoss befinden sich zwei liebevoll eingerichtete Massageräume mit direktem Blick auf den Rhein, Umkleideräume für Damen und Herren, ein WC, ein gemütlicher Wartebereich und natürlich zwei traumhafte Balkone.',
    '{
      "intro": "Machen Sie Urlaub vom Alltag und entspannen Sie am schönen Niederrhein im Wellnesshotel am Rhein!",
      "features": [
        "Hallenbad mit Gegenstromanlage",
        "Finnische Sauna mit Rheinblick",
        "Zwei moderne Whirlpools",
        "Schwalldusche",
        "Massageräume mit Rheinblick",
        "Ruhebereich mit Gas-Kamin",
        "Kleine Bibliothek",
        "Kaffee- und Getränkeecke",
        "Fitnessbereich",
        "Panorama-Terrasse"
      ],
      "openingHours": {
        "weekdays": "12:00 - 19:30 Uhr",
        "weekend": "12:00 - 21:30 Uhr"
      }
    }'::jsonb
  );

  -- Insert rooms
  INSERT INTO hotel_rooms (hotel_id, name, description, category, size, max_occupancy, price_single, price_double, amenities) VALUES
    (hotel_id, 'Wellness-Suite', 
     'Unsere drei Wellness-Suiten sind mit Liebe zum Detail eingerichtet und verfügen neben einer luxuriösen Ausstattung über große Flatscreen-Fernseher, einen Whirlpool, tlw. eine Dampfdusche und Sauna und viele weitere Annehmlichkeiten.',
     'suite', 45, 2, NULL, 240.00,
     '["Whirlpool", "Teilweise Dampfdusche", "Teilweise Sauna", "Luxuriöse Ausstattung"]'::jsonb),
    (hotel_id, 'Rheinblick Suite',
     'Unsere Rheinblick Suite bietet einen separat gestalteten Wohn- / Schlafbereich sowie einen Balkon, von dem aus Sie den Rheinblick genießen können.',
     'suite', 40, 2, 125.00, 125.00,
     '["Separater Wohn-/Schlafbereich", "Balkon mit Rheinblick", "Hosenbügler", "Personenwaage"]'::jsonb),
    (hotel_id, 'Deluxezimmer XL',
     'Unsere Deluxezimmer XL verfügen ebenfalls über einen separaten Wohn- / Schlafbereich. Diese Zimmer ohne Balkon bieten Ausblick zur Parkseite des Hotels.',
     'deluxe', 35, 2, 103.00, 119.50,
     '["Separater Wohn-/Schlafbereich", "Parkblick", "Hosenbügler", "Personenwaage"]'::jsonb);

  -- Insert contacts
  INSERT INTO hotel_contacts (hotel_id, type, value) VALUES
    (hotel_id, 'phone', '02851 / 58 80'),
    (hotel_id, 'email', 'info@hotel-rheinpark.de'),
    (hotel_id, 'facebook', 'https://facebook.com/hotelrheinpark'),
    (hotel_id, 'instagram', 'https://instagram.com/rheinparkrees'),
    (hotel_id, 'twitter', 'https://twitter.com/rheinparkrees');

  -- Insert policies
  INSERT INTO hotel_policies (hotel_id, type, content) VALUES
    (hotel_id, 'checkin', '{"from": "15:00", "until": "22:00", "lateCheckIn": "Nach Absprache möglich"}'::jsonb),
    (hotel_id, 'checkout', '{"until": "11:00", "lateCheckOut": "Nach Verfügbarkeit (Aufpreis)"}'::jsonb),
    (hotel_id, 'pets', '{"allowed": true, "fee": "15€ pro Nacht", "notes": "Hunde willkommen, bitte vorher anmelden"}'::jsonb),
    (hotel_id, 'payment', '{"methods": ["Mastercard", "Visa", "American Express", "EC-Karte", "Bar"], "prePayment": "Keine Vorauszahlung erforderlich"}'::jsonb);

END $$;