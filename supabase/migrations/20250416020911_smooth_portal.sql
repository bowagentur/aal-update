/*
  # Sync Hotel Data with hotels.ts
  
  1. Changes
    - Delete existing data
    - Import complete hotel data from hotels.ts including:
      - All sections (welcome, rooms, wellness, dining, etc.)
      - All room types with full details
      - All amenities and features
      - All policies and contacts
    
  2. Data Organization
    - Maintain all relationships
    - Preserve all metadata
    - Keep all nested structures
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

  -- Insert all sections
  INSERT INTO hotel_sections (hotel_id, type, title, content, metadata) VALUES
    -- Welcome section
    (hotel_id, 'welcome', 'Willkommen im Hotel Rheinpark Rees am Rhein', 
     'Erleben Sie Gastfreundschaft direkt am Rhein. Unser Haus verbindet modernen Komfort mit rheinischer Herzlichkeit.',
     '{
       "intro": "Entdecken Sie unsere einzigartigen Hotels und erleben Sie unvergessliche Momente",
       "content": [
         {
           "title": "Unsere Lage",
           "text": "Entdecken Sie die historische Stadt Rees mit ihrer charmanten Rheinpromenade und den historischen Stadtmauern. Unser Hotel liegt ideal für Ausflüge in die Region, sei es mit dem Fahrrad entlang des Rheinradwegs oder zu den nahegelegenen Städten wie Emmerich, Kleve oder Xanten."
         },
         {
           "title": "Gastronomie",
           "text": "Unser Restaurant ''Rheinblick'' verwöhnt Sie mit regionalen und internationalen Spezialitäten. Genießen Sie Ihr Dinner mit einem grandiosen Blick auf den Rhein. Die Riverside Bar ist der perfekte Ort für einen Aperitif oder einen entspannten Ausklang des Tages."
         }
       ],
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
     }'::jsonb),
    
    -- Wellness section
    (hotel_id, 'wellness', 'Wellness am Niederrhein',
     'Machen Sie Urlaub vom Alltag und entspannen Sie am schönen Niederrhein im Wellnesshotel am Rhein!',
     '{
       "intro": "Im unteren Geschoss befinden sich zwei liebevoll eingerichtete Massageräume mit direktem Blick auf den Rhein, Umkleideräume für Damen und Herren, ein WC, ein gemütlicher Wartebereich und natürlich zwei traumhafte Balkone.",
       "areas": [
         {
           "name": "Sauna",
           "description": "Auch von hier genießen Sie die tolle Aussicht auf den Rheinverlauf.",
           "image": "/rees/AHRR-Wellnessbereich_3.jpg"
         },
         {
           "name": "Ruhebereich",
           "description": "Entspannen Sie in unserem Ruhebereich - Ob Energie tanken nach einem Saunagang oder einfach mal auf der Relax-Liege abschalten.",
           "image": "/rees/AHRR-Wellnessbereich_2.jpg"
         },
         {
           "name": "Fitnessbereich",
           "description": "Powern Sie sich doch in unserem kleinen (aber feinen) Fitnessbereich aus.",
           "image": "/rees/AHRR-Wellnessbereich.jpg"
         }
       ],
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
         "weekdays": "Sonntag bis Donnerstag: 12:00 - 19:30 Uhr",
         "weekend": "Freitag und Samstag: 12:00 - 21:30 Uhr"
       },
       "pricing": {
         "hotelGuests": {
           "dayPass": "Inklusive",
           "whirlpool": "4,00 € (Poolcoin)"
         },
         "externalGuests": {
           "weekday": {
             "dayPass": "12,50 €",
             "whirlpool": "8,00 € (Poolcoin)"
           },
           "weekend": {
             "dayPass": "16,50 €",
             "whirlpool": "8,00 € (Poolcoin)"
           }
         }
       }
     }'::jsonb),

    -- Dining section
    (hotel_id, 'dining', 'Restaurant & Bar',
     'Genießen Sie regionale und internationale Spezialitäten in unserem Restaurant mit Rheinblick oder entspannen Sie in unserer stilvollen Bar.',
     '{
       "restaurants": [
         {
           "name": "Rheinblick Restaurant",
           "cuisine": "Regional & International",
           "openingHours": "12:00 - 22:00 Uhr",
           "description": "Gehobene Küche mit Panoramablick auf den Rhein"
         },
         {
           "name": "Riverside Bar",
           "type": "Cocktail & Weinbar",
           "openingHours": "17:00 - 01:00 Uhr"
         }
       ],
       "breakfast": {
         "time": "06:30 - 10:30 Uhr",
         "price": "19€ pro Person",
         "features": [
           "Reichhaltiges Frühstücksbuffet",
           "Regionale Spezialitäten",
           "Frische Eierspeisen",
           "Glutenfreie Optionen"
         ]
       }
     }'::jsonb),

    -- Meetings section
    (hotel_id, 'meetings', 'Tagen im Hotel Rheinpark Rees',
     'Ob Tagungen, Seminare, Kongresse oder Feiern - Kontaktieren Sie uns.',
     '{
       "intro": "Unsere 5 Tagungs- und Gruppenräume für bis zu 120 Personen geben Ihrer Tagung das optimale Umfeld.",
       "highlights": [
         "Tagungsräume mit Rheinblick",
         "Modernste Technik",
         "Klimatisierte Räume",
         "Tageslicht in allen Räumen",
         "Sonnenterrasse mit Rheinblick"
       ],
       "rooms": [
         {
           "name": "Rheinsaal",
           "area": "150",
           "height": "3.5",
           "capacity": {
             "theater": 120,
             "banquet": 80,
             "classroom": 60,
             "ushape": 40
           }
         },
         {
           "name": "Hansesaal",
           "area": "80",
           "height": "3.2",
           "capacity": {
             "theater": 60,
             "banquet": 40
           }
         }
       ]
     }'::jsonb);

  -- Insert all room types
  INSERT INTO hotel_rooms (hotel_id, name, description, category, size, max_occupancy, price_single, price_double, amenities) VALUES
    -- Wellness Suite
    (hotel_id, 'Wellness-Suite', 
     'Unsere drei Wellness-Suiten sind mit Liebe zum Detail eingerichtet und verfügen neben einer luxuriösen Ausstattung über große Flatscreen-Fernseher, einen Whirlpool, tlw. eine Dampfdusche und Sauna und viele weitere Annehmlichkeiten.',
     'suite', 45, 2, NULL, 240.00,
     '["Whirlpool", "Teilweise Dampfdusche", "Teilweise Sauna", "Luxuriöse Ausstattung"]'::jsonb),
    
    -- Rheinblick Suite
    (hotel_id, 'Rheinblick Suite',
     'Unsere Rheinblick Suite bietet einen separat gestalteten Wohn- / Schlafbereich sowie einen Balkon, von dem aus Sie den Rheinblick genießen können.',
     'suite', 40, 2, 125.00, 125.00,
     '["Separater Wohn-/Schlafbereich", "Balkon mit Rheinblick", "Hosenbügler", "Personenwaage"]'::jsonb),
    
    -- Deluxezimmer XL
    (hotel_id, 'Deluxezimmer XL',
     'Unsere Deluxezimmer XL verfügen ebenfalls über einen separaten Wohn- / Schlafbereich. Diese Zimmer ohne Balkon bieten Ausblick zur Parkseite des Hotels.',
     'deluxe', 35, 2, 103.00, 119.50,
     '["Separater Wohn-/Schlafbereich", "Parkblick", "Hosenbügler", "Personenwaage"]'::jsonb),
    
    -- Deluxezimmer
    (hotel_id, 'Deluxezimmer',
     'Die Deluxezimmer verfügen teilweise über ein Tageslichtbad und sind in der Raumaufteilung großzügiger gestaltet.',
     'deluxe', 30, 2, 101.00, 117.50,
     '["Teilweise Tageslichtbad", "Großzügige Raumaufteilung", "Hosenbügler", "Personenwaage"]'::jsonb),
    
    -- Komfortzimmer
    (hotel_id, 'Komfortzimmer',
     'Unsere Komfortzimmer in den ersten drei Etagen verfügen zum Großteil über einen Austritt oder Balkon und teilweise seitlichem Rheinblick.',
     'comfort', 25, 2, 81.00, 99.50,
     '["Teilweise Balkon/Austritt", "Teilweise seitlicher Rheinblick", "Wahl zwischen getrennten Betten oder Doppelbett"]'::jsonb);

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
    (hotel_id, 'payment', '{"methods": ["Mastercard", "Visa", "American Express", "EC-Karte", "Bar"], "prePayment": "Keine Vorauszahlung erforderlich"}'::jsonb),
    (hotel_id, 'children', '{"policy": "Kinder bis 6 Jahre übernachten kostenfrei im Zimmer der Eltern"}'::jsonb),
    (hotel_id, 'cancellation', '{"deadline": "48 Stunden vor Anreise", "conditions": "Kostenlose Stornierung bis 48h vor Anreise"}'::jsonb);

END $$;