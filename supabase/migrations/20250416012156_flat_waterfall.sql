/*
  # Insert Hotel Data
  
  1. Data Insertion
    - Insert example hotel (Hotel Rheinpark Rees)
    - Insert all related data (locations, rooms, amenities etc.)
    
  2. Notes
    - Using UUID for all IDs
    - All relationships are maintained through foreign keys
    - JSON data is properly formatted for Postgres
*/

-- Set the hotel UUID constant for referencing
DO $$
DECLARE
  hotel_id uuid;
BEGIN
  -- Insert main hotel and store its ID
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

  -- Insert hotel location
  INSERT INTO hotel_locations (hotel_id, address, city, zip, country, latitude, longitude) VALUES (
    hotel_id,
    'Rheinpromenade 11',
    'Rees',
    '46459',
    'Deutschland',
    51.7519,
    6.4037
  );

  -- Insert hotel contacts
  INSERT INTO hotel_contacts (hotel_id, type, value) VALUES
    (hotel_id, 'phone', '02851 / 58 80'),
    (hotel_id, 'email', 'info@hotel-rheinpark.de'),
    (hotel_id, 'facebook', 'https://facebook.com/hotelrheinpark'),
    (hotel_id, 'instagram', 'https://instagram.com/rheinparkrees'),
    (hotel_id, 'twitter', 'https://twitter.com/rheinparkrees');

  -- Insert hotel policies
  INSERT INTO hotel_policies (hotel_id, type, content) VALUES
    (hotel_id, 'checkin', '{"from": "15:00", "until": "22:00", "lateCheckIn": "Nach Absprache möglich"}'::jsonb),
    (hotel_id, 'checkout', '{"until": "11:00", "lateCheckOut": "Nach Verfügbarkeit (Aufpreis)"}'::jsonb),
    (hotel_id, 'pets', '{"allowed": true, "fee": "15€ pro Nacht", "notes": "Hunde willkommen, bitte vorher anmelden"}'::jsonb),
    (hotel_id, 'payment', '{"methods": ["Mastercard", "Visa", "American Express", "EC-Karte", "Bar"], "prePayment": "Keine Vorauszahlung erforderlich"}'::jsonb);

  -- Insert hotel sections
  INSERT INTO hotel_sections (hotel_id, type, title, content, metadata) VALUES
    (hotel_id, 'welcome', 'Willkommen im Hotel Rheinpark Rees am Rhein', 'Erleben Sie Gastfreundschaft direkt am Rhein. Unser Haus verbindet modernen Komfort mit rheinischer Herzlichkeit.', 
      '{
        "highlights": [
          {"icon": "Star", "title": "Best-Preis-Garantie!", "description": "Direktbucher erhalten immer den besten Preis"},
          {"icon": "Waves", "title": "Wellness mit Aussicht", "description": "Großer Wellnessbereich mit Rheinblick"},
          {"icon": "Hotel", "title": "Luxuriöse Unterkünfte", "description": "Drei Wellness-Suiten & geräumige Ferienwohnungen"}
        ]
      }'::jsonb
    ),
    (hotel_id, 'wellness', 'Wellness am Niederrhein', 'Machen Sie Urlaub vom Alltag und entspannen Sie am schönen Niederrhein im Wellnesshotel am Rhein!',
      '{
        "features": [
          "Hallenbad mit Gegenstromanlage",
          "Finnische Sauna mit Rheinblick",
          "Zwei moderne Whirlpools",
          "Massageräume mit Rheinblick"
        ],
        "openingHours": {
          "weekdays": "12:00 - 19:30 Uhr",
          "weekend": "12:00 - 21:30 Uhr"
        }
      }'::jsonb
    );

  -- Insert hotel rooms
  INSERT INTO hotel_rooms (hotel_id, name, description, category, size, max_occupancy, price_single, price_double, amenities) VALUES
    (hotel_id, 'Wellness-Suite', 'Unsere drei Wellness-Suiten sind mit Liebe zum Detail eingerichtet und verfügen neben einer luxuriösen Ausstattung über große Flatscreen-Fernseher, einen Whirlpool, tlw. eine Dampfdusche und Sauna und viele weitere Annehmlichkeiten.', 'suite', 45, 2, null, 240.00,
      '[
        "Whirlpool",
        "Teilweise Dampfdusche",
        "Teilweise Sauna",
        "Luxuriöse Ausstattung"
      ]'::jsonb
    ),
    (hotel_id, 'Deluxezimmer XL', 'Unsere Deluxezimmer XL verfügen ebenfalls über einen separaten Wohn- / Schlafbereich. Diese Zimmer ohne Balkon bieten Ausblick zur Parkseite des Hotels.', 'deluxe', 35, 2, 103.00, 119.50,
      '[
        "Separater Wohn-/Schlafbereich",
        "Parkblick",
        "Hosenbügler",
        "Personenwaage"
      ]'::jsonb
    );

  -- Insert hotel amenities
  INSERT INTO hotel_amenities (hotel_id, category, name, description, icon) VALUES
    (hotel_id, 'general', 'WLAN', 'Kostenloses WLAN im ganzen Haus', 'Wifi'),
    (hotel_id, 'wellness', 'Sauna', 'Finnische Sauna mit Rheinblick', 'Waves'),
    (hotel_id, 'dining', 'Restaurant', 'À-la-carte Restaurant mit Rheinblick', 'UtensilsCrossed'),
    (hotel_id, 'service', '24h Rezeption', 'Rund um die Uhr für Sie da', 'Clock');

  -- Insert hotel packages
  INSERT INTO hotel_packages (hotel_id, title, subtitle, description, price, includes, valid_from, valid_until) VALUES
    (hotel_id, 'Wellness Exklusiv', 'Für ein bisschen Luxus zwischendurch', 'Wellnessangebot am Niederrhein inkl. Hotel', 222.00,
      '[
        "2 Übernachtung inkl. Frühstück",
        "Nutzung des Wellnessbereichs",
        "1x 60 min. Massage"
      ]'::jsonb,
      '2024-01-01',
      '2024-12-31'
    );

END $$;