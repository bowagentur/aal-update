export const hotels = [
  {
    id: "rheinpark-rees",
    name: "Hotel Rheinpark Rees am Rhein",
    description: "Willkommen im Hotel Rheinpark Rees direkt am Rhein. Unser 4-Sterne Hotel verbindet modernen Komfort mit rheinischer Gastfreundschaft und bietet Ihnen 64 komfortable Zimmer, einen Wellnessbereich mit Rheinblick sowie regionale und internationale Küche in unserem Restaurant.",
    rating: 4.8,
    location: {
      city: "Rees",
      address: "Rheinpromenade 11",
      zip: "46459",
      country: "Deutschland",
      email: "info@hotel-rheinpark.de"
    },
    sections: {
      welcome: {
        title: "Willkommen im Hotel Rheinpark Rees am Rhein",
        intro: "Erleben Sie Gastfreundschaft direkt am Rhein. Unser Haus verbindet modernen Komfort mit rheinischer Herzlichkeit.",
        content: [
          {
            title: "Unsere Lage",
            text: "Entdecken Sie die historische Stadt Rees mit ihrer charmanten Rheinpromenade und den historischen Stadtmauern. Unser Hotel liegt ideal für Ausflüge in die Region, sei es mit dem Fahrrad entlang des Rheinradwegs oder zu den nahegelegenen Städten wie Emmerich, Kleve oder Xanten."
          },
          {
            title: "Gastronomie",
            text: "Unser Restaurant 'Rheinblick' verwöhnt Sie mit regionalen und internationalen Spezialitäten. Genießen Sie Ihr Dinner mit einem grandiosen Blick auf den Rhein. Die Riverside Bar ist der perfekte Ort für einen Aperitif oder einen entspannten Ausklang des Tages."
          }
        ],
        images: [
          {
            url: "/header_rees.png",
            alt: "Außenansicht bei Sonnenuntergang",
            title: "Unser Hotel am Rhein"
          }
        ],
        highlights: [
          {
            icon: "Star",
            title: "Best-Preis-Garantie!",
            description: "Direktbucher erhalten immer den besten Preis"
          },
          {
            icon: "Waves",
            title: "Wellness mit Aussicht",
            description: "Großer Wellnessbereich mit Rheinblick"
          },
          {
            icon: "Hotel",
            title: "Luxuriöse Unterkünfte",
            description: "Drei Wellness-Suiten & geräumige Ferienwohnungen"
          },
          {
            icon: "Wifi",
            title: "Kostenfreies W-LAN",
            description: "Im gesamten Haus verfügbar"
          },
          {
            icon: "Coffee",
            title: "24/7 Verpflegung",
            description: "Snackautomat im Lobbybereich"
          },
          {
            icon: "Spa",
            title: "Wellness & Massage",
            description: "Vielfältige Anwendungen buchbar"
          },
          {
            icon: "UtensilsCrossed",
            title: "Panorama-Restaurant",
            description: "Frühstücksrestaurant mit Terrasse"
          },
          {
            icon: "Dumbbell",
            title: "Fitness",
            description: "Kleiner Fitnessbereich"
          },
          {
            icon: "Users",
            title: "Tagungen",
            description: "Perfekter Partner für Ihre Veranstaltungen"
          },
          {
            icon: "BedDouble",
            title: "Komfortable Zimmer",
            description: "Geräumig und modern eingerichtet"
          },
          {
            icon: "HeartHandshake",
            title: "Service",
            description: "Zuvorkommender Service"
          }
        ]
      },
      apartments: {
        title: "Unsere Apartments",
        text: "Großzügig geschnittene Apartments mit vollausgestatteter Küche und separatem Wohnbereich bieten Ihnen alle Annehmlichkeiten für einen längeren Aufenthalt.",
        images: [
          {
            url: "/rees/Appartement_ReesAmRhein_Wohnraum.jpg",
            alt: "Heller Wohnbereich mit Küche",
            title: "Wohn- und Kochbereich"
          },
          {
            url: "/Appartement_ReesAmRhein_Wohnraum-2.jpg",
            alt: "Gemütliche Sitzecke",
            title: "Entspannungsbereich"
          }
        ]
      },
      family: {
        title: "Familienfreundlich",
        text: "Speziell für Familien bieten wir geräumige Apartments mit separatem Kinderzimmer.",
        images: [
          {
            url: "/Appartement_ReesAmRhein_Schlafzimmer-Kinder.jpg",
            alt: "Kinderzimmer mit zwei Betten",
            title: "Kinderzimmer"
          },
          {
            url: "/IMG_4986.JPG",
            alt: "Familienfreundlicher Außenbereich",
            title: "Außenanlage"
          }
        ]
      },
      surroundings: {
        title: "Umgebung & Ausblick",
        text: "Genießen Sie den einzigartigen Blick auf den Rhein und die historische Stadt Rees.",
        images: [
          {
            url: "/IMG_5022.JPG",
            alt: "Panoramablick auf den Rhein",
            title: "Rheinpanorama"
          },
          {
            url: "/IMG_5027.JPG",
            alt: "Historische Stadtansicht",
            title: "Stadt Rees"
          }
        ]
      },
      rooms: {
        title: "Zimmer & Suiten",
        text: "Unsere individuell eingerichteten Zimmer und Suiten bieten Ihnen höchsten Komfort und eine entspannende Atmosphäre. Die meisten unserer Zimmer verfügen über einen direkten Rheinblick und laden zum Verweilen ein.",
        images: [
          {
            url: "/http://localhost:5173/Bild_3.jpgrees/AHRR-DeluxeZimmerRheinblick.jpg",
            alt: "Deluxe Zimmer mit Rheinblick",
            title: "Deluxe Zimmer"
          },
          {
            url: "/rees/AHRR-DeluxeZimmerXL.jpg",
            alt: "Geräumiges Deluxe XL Zimmer",
            title: "Deluxe XL Zimmer"
          },
          {
            url: "/rees/AHRR-SuiteNiederrhein.jpg",
            alt: "Luxuriöse Niederrhein Suite",
            title: "Suite Niederrhein"
          },
          {
            url: "/rees/AHRR-Doppelzimmer.jpg",
            alt: "Komfortables Doppelzimmer",
            title: "Doppelzimmer"
          }
        ]
      },
      wellness: {
        title: "Wellness & Entspannung",
        text: "In unserem Wellnessbereich finden Sie Ruhe und Entspannung. Genießen Sie unseren Innenpool mit Gegenstromanlage, die finnische Sauna oder lassen Sie sich bei einer wohltuenden Massage verwöhnen.",
        images: [
          {
            url: "/rees/AHRR-Wellnessbereich.jpg",
            alt: "Entspannender Wellnessbereich",
            title: "Wellnessbereich"
          },
          {
            url: "/rees/AHRR-Wellnessbereich_2.jpg",
            alt: "Sauna und Ruhebereich",
            title: "Sauna"
          },
          {
            url: "/rees/AHRR-Wellnessbereich_3.jpg",
            alt: "Pool mit Gegenstromanlage",
            title: "Schwimmbad"
          },
          {
            url: "/rees/AHRR-Wellnessbereich_4.jpg",
            alt: "Entspannungsliegen mit Ausblick",
            title: "Ruhebereich"
          }
        ]
      },
      dining: {
        title: "Restaurant & Bar",
        text: "Genießen Sie regionale und internationale Spezialitäten in unserem Restaurant mit Rheinblick oder entspannen Sie in unserer stilvollen Bar.",
        images: [
          {
            url: "/rees/AHRR-Restaurant.jpg",
            alt: "Elegantes Restaurant mit Rheinblick",
            title: "Restaurant"
          },
          {
            url: "/rees/AHRR-Restaurant (2).jpg",
            alt: "Gemütlicher Restaurantbereich",
            title: "Restaurantbereich"
          },
          {
            url: "/rees/AHRR-Bar.jpg",
            alt: "Stilvolle Hotelbar",
            title: "Bar"
          }
        ]
      },
      meetings: {
        title: "Tagungen & Events",
        text: "Unsere modernen Tagungsräume bieten den perfekten Rahmen für Ihre Veranstaltung.",
        images: [
          {
            url: "/rees/AHRR-Tagungsraum.jpg",
            alt: "Moderner Tagungsraum",
            title: "Tagungsraum"
          },
          {
            url: "/rees/AHRR-Tagungsraum (2).jpg",
            alt: "Konferenzraum mit Tageslicht",
            title: "Konferenzraum"
          }
        ]
      },
      exterior: {
        title: "Außenansicht",
        text: "Das Hotel Rheinpark Rees - Ihre erste Adresse am Niederrhein.",
        images: [
          {
            url: "/rees/AHRR-Aussen.jpg",
            alt: "Hotelansicht von außen",
            title: "Hotelansicht"
          },
          {
            url: "/rees/AHRR-Aussen (2).jpg",
            alt: "Hotel mit Rheinpromenade",
            title: "Rheinpromenade"
          }
        ]
      },
      location: {
        title: "Lage & Umgebung",
        text: "Entdecken Sie die historische Stadt Rees mit ihrer charmanten Rheinpromenade und den historischen Stadtmauern. Unser Hotel liegt ideal für Ausflüge in die Region, sei es mit dem Fahrrad entlang des Rheinradwegs oder zu den nahegelegenen Städten wie Emmerich, Kleve oder Xanten.",
        images: [
          {
            url: "https://www.hotel-rheinpark.de/images/rees-aerial.jpg",
            alt: "Luftaufnahme von Rees",
            title: "Historisches Rees"
          },
          {
            url: "https://www.hotel-rheinpark.de/images/rhine-promenade.jpg",
            alt: "Rheinpromenade bei Sonnenuntergang",
            title: "Rheinpromenade"
          }
        ]
      }
    },
    images: [
      {
        url: "/2017.01_Apartment_Rees_Bilderrahmen.jpg",
        alt: "Eleganter Eingangsbereich mit Rees Bilderrahmen",
        title: "Willkommen in Rees"
      },
      {
        url: "/2018.04_Appartement_ReesAmRhein_Wohnraum_2.jpg",
        alt: "Moderner Wohnbereich mit viel Licht",
        title: "Komfortabler Wohnbereich"
      },
      {
        url: "/Appartement_ReesAmRhein_Badezimmer.jpg",
        alt: "Stilvolles Badezimmer mit Regendusche",
        title: "Modernes Badezimmer"
      },
      {
        url: "/Appartement_ReesAmRhein_Schlafzimmer-Eltern.jpg",
        alt: "Gemütliches Schlafzimmer mit Ausblick",
        title: "Komfortables Schlafzimmer"
      },
      {
        url: "/Appartement_ReesAmRhein_Terrasse.jpg",
        alt: "Sonnige Terrasse mit Rheinblick",
        title: "Terrasse am Rhein"
      }
    ],
    features: [
      "Empfangshalle (Lobby 24h besetzt)",
      "Bar, Frühstücksrestaurant und Terrasse",
      "Wi-Fi kostenlos im ganzen Hotel",
      "5 Tagungs- und Gruppenräume",
      "2 Fahrstühle",
      "1. Minibarfüllung inklusive",
      "Fahrradverleihstation"
    ],
    rooms: {
      total: 64,
      types: [
        {
          name: "Wellness-Suiten",
          description: "Unsere drei Wellness-Suiten sind mit Liebe zum Detail eingerichtet und verfügen neben einer luxuriösen Ausstattung über große Flatscreen-Fernseher, einen Whirlpool, tlw. eine Dampfdusche und Sauna und viele weitere Annehmlichkeiten.",
          image: "/rees/AHRR-SuiteNiederrhein.jpg",
          price: {
            double: 240.00
          },
          amenities: [
            "Whirlpool",
            "Teilweise Dampfdusche",
            "Teilweise Sauna",
            "Luxuriöse Ausstattung"
          ]
        },
        {
          name: "Rheinblick Suite",
          description: "Unsere Rheinblick Suite bietet einen separat gestalteten Wohn- / Schlafbereich sowie einen Balkon, von dem aus Sie den Rheinblick genießen können.",
          image: "/rees/AHRR-DeluxeZimmerRheinblick.jpg",
          price: {
            single: 125.00,
            double: 125.00
          },
          amenities: [
            "Separater Wohn-/Schlafbereich",
            "Balkon mit Rheinblick",
            "Hosenbügler",
            "Personenwaage"
          ]
        },
        {
          name: "Deluxezimmer XL",
          description: "Unsere Deluxezimmer XL verfügen ebenfalls über einen separaten Wohn- / Schlafbereich. Diese Zimmer ohne Balkon bieten Ausblick zur Parkseite des Hotels.",
          image: "/rees/AHRR-DeluxeZimmerXL.jpg",
          price: {
            single: 103.00,
            double: 119.50
          },
          amenities: [
            "Separater Wohn-/Schlafbereich",
            "Parkblick",
            "Hosenbügler",
            "Personenwaage"
          ]
        },
        {
          name: "Deluxezimmer",
          description: "Die Deluxezimmer verfügen teilweise über ein Tageslichtbad und sind in der Raumaufteilung großzügiger gestaltet.",
          image: "/rees/AHRR-Doppelzimmer.jpg",
          price: {
            single: 101.00,
            double: 117.50
          },
          amenities: [
            "Teilweise Tageslichtbad",
            "Großzügige Raumaufteilung",
            "Hosenbügler",
            "Personenwaage"
          ]
        },
        {
          name: "Komfortzimmer",
          description: "Unsere Komfortzimmer in den ersten drei Etagen verfügen zum Großteil über einen Austritt oder Balkon und teilweise seitlichem Rheinblick. Die Komfortzimmer im Obergeschoss verfügen überwiegend über ein Tageslichtbad.",
          image: "/rees/AHRR-Doppelzimmer_2.jpg",
          price: {
            single: 81.00,
            double: 99.50
          },
          amenities: [
            "Teilweise Balkon/Austritt",
            "Teilweise seitlicher Rheinblick",
            "Wahl zwischen getrennten Betten oder Doppelbett",
            "Teilweise Tageslichtbad im OG"
          ]
        },
        {
          name: "Apartments",
          description: "Die beiden Apartments Kreis Kleve und Rees am Rhein bieten Ihnen möbliertes Wohnen auf Zeit, perfekt für einen Urlaub mit der Familie.",
          image: "/rees/AHRR-Einzelzimmer.jpg",
          price: {
            double: 70.00,
            triple: 85.00
          },
          amenities: [
            "Überdachter Carport",
            "Separater Eingang",
            "Vollausgestattete Küche",
            "Ideal für Langzeitaufenthalte"
          ]
        }
      ],
      standardFeatures: [
        "Bad mit Badewanne oder Dusche und WC",
        "Zimmer-Safe",
        "Fön und Schminkspiegel",
        "Telefon",
        "Kostenfreies W-LAN",
        "Schreibtisch und Sitzgelegenheit",
        "Flatscreen-Fernseher",
        "Radio, Kabel TV",
        "Minibar"
      ],
      policies: {
        children: "Kinder bis 6 Jahre übernachten kostenfrei im Zimmer der Eltern",
        pets: {
          allowed: true,
          fee: "ab 8,00 € pro Nacht (ohne Futter)",
          notes: "Zimmerreinigung nach antiallergischen Gesichtspunkten"
        },
        specialRates: {
          groups: "Gruppentarife auf Anfrage",
          business: "Firmenkundenkonditionen auf Anfrage",
          longStay: "Sonderpreise für Aufenthalte über 14 Tage möglich"
        }
      }
    },
    parking: {
      outdoor: "Kostenfreie Parkplätze (begrenzt)",
      garage: "Tiefgarage (8,-€ pro Nacht)"
    },
    contact: {
      phone: "02851 / 58 80",
      email: "info@hotel-rheinpark.de",
      social: {
        facebook: "https://facebook.com/hotelrheinpark",
        instagram: "https://instagram.com/rheinparkrees",
        twitter: "https://twitter.com/rheinparkrees"
      }
    },
    amenities: {
      wellness: {
        title: "Wellness am Niederrhein",
        intro: "Machen Sie Urlaub vom Alltag und entspannen Sie am schönen Niederrhein im Wellnesshotel am Rhein!",
        description: "Im unteren Geschoss befinden sich zwei liebevoll eingerichtete Massageräume mit direktem Blick auf den Rhein, Umkleideräume für Damen und Herren, ein WC, ein gemütlicher Wartebereich und natürlich zwei traumhafte Balkone. Auf der oberen Etage, somit im höchsten Geschoss des Hotels mit atemberaubenden Panorama-Rheinblick, erwartet Sie ein Ruhe- und Entspannungsbereich mit Gas-Kamin, kleiner Bibliothek, eine kleine Kaffee- und Getränkeecke, sowie der Nassbereich mit Sauna, Schwalldusche und zwei modernen Whirlpools.",
        areas: [
          {
            name: "Sauna",
            description: "Auch von hier genießen Sie die tolle Aussicht auf den Rheinverlauf.",
            image: "/rees/AHRR-Wellnessbereich_3.jpg"
          },
          {
            name: "Ruhebereich",
            description: "Entspannen Sie in unserem Ruhebereich - Ob Energie tanken nach einem Saunagang oder einfach mal auf der Relax-Liege abschalten. Unsere gemütliche Couchecke vor dem Gas-Kamin mit kleiner Bibliothek eignet sich ebenfalls perfekt zum relaxen.",
            image: "/rees/AHRR-Wellnessbereich_2.jpg"
          },
          {
            name: "Fitnessbereich",
            description: "Powern Sie sich doch in unserem kleinen (aber feinen) Fitnessbereich aus. Nach dem Workout geht es dann wahlweise in den Sauna oder in den Relaxbereich.",
            image: "/rees/AHRR-Wellnessbereich.jpg"
          }
        ],
        features: [
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
        openingHours: {
          weekdays: "Sonntag bis Donnerstag: 12:00 - 19:30 Uhr",
          weekend: "Freitag und Samstag: 12:00 - 21:30 Uhr"
        },
        pricing: {
          hotelGuests: {
            dayPass: "Inklusive",
            whirlpool: "4,00 € (Poolcoin)"
          },
          externalGuests: {
            weekday: {
              dayPass: "12,50 €",
              whirlpool: "8,00 € (Poolcoin)"
            },
            weekend: {
              dayPass: "16,50 €",
              whirlpool: "8,00 € (Poolcoin)"
            }
          }
        },
        images: [
          {
            url: "/rees/AHRR-Wellnessbereich_4.jpg",
            alt: "Entspannungsliegen im Wellnessbereich",
            title: "Relaxbereich"
          },
          {
            url: "/Wellness-ausblick.jpg",
            alt: "Panoramablick auf den Rhein",
            title: "Aussicht vom Wellnessbereich"
          }
        ]
      },
      dining: {
        restaurants: [
          {
            name: "Rheinblick Restaurant",
            cuisine: "Regional & International",
            openingHours: "12:00 - 22:00 Uhr",
            description: "Gehobene Küche mit Panoramablick auf den Rhein"
          },
          {
            name: "Riverside Bar",
            type: "Cocktail & Weinbar",
            openingHours: "17:00 - 01:00 Uhr"
          }
        ],
        breakfast: {
          time: "06:30 - 10:30 Uhr",
          price: "19€ pro Person",
          features: [
            "Reichhaltiges Frühstücksbuffet",
            "Regionale Spezialitäten",
            "Frische Eierspeisen",
            "Glutenfreie Optionen"
          ]
        }
      },
      business: {
        title: "Tagen im Hotel Rheinpark Rees",
        intro: "Ob Tagungen, Seminare, Kongresse oder Feiern - Kontaktieren Sie uns.",
        description: "Unsere 5 Tagungs- und Gruppenräume für bis zu 120 Personen geben Ihrer Tagung das optimale Umfeld. Alle Räume haben Tageslicht, verfügen über modernste Informations- und Kommunikationstechnik und sind teils klimatisiert.",
        highlights: [
          "Tagungsräume mit Rheinblick",
          "Modernste Technik",
          "Klimatisierte Räume",
          "Tageslicht in allen Räumen",
          "Sonnenterrasse mit Rheinblick"
        ],
        meetingRooms: [
          {
            name: "Rheinsaal",
            area: "150",
            height: "3.5",
            capacity: {
              theater: 120,
              banquet: 80,
              classroom: 60,
              ushape: 40
            },
            features: ["Rheinblick", "Klimaanlage", "Verdunkelung"]
          },
          {
            name: "Hansesaal",
            area: "80",
            height: "3.2",
            capacity: {
              theater: 60,
              banquet: 40
            }
          }
        ],
        pricing: {
          additionalRoom: "85,00 € je Raum und Tag",
          packages: {
            fullDay: {
              from: "59,00 €",
              includes: [
                "Tagungsraum mit Standardtechnik",
                "2 Kaffeepausen",
                "Mittagessen",
                "Mineralwasser und Apfelsaft"
              ]
            },
            halfDay: {
              from: "49,00 €",
              includes: [
                "Tagungsraum mit Standardtechnik",
                "1 Kaffeepause",
                "Mittagessen",
                "Mineralwasser und Apfelsaft"
              ]
            }
          }
        },
        equipment: [
          "Highspeed WLAN",
          "Beamer & Leinwand",
          "Flipchart",
          "Moderationskoffer",
          "Rednerpult",
          "Beschallungsanlage"
        ],
        location: {
          access: {
            car: "A3 (Arnheim-Köln)",
            airports: [
              {
                name: "Düsseldorf",
                distance: "80 km"
              },
              {
                name: "Amsterdam",
                distance: "130 km"
              },
              {
                name: "Weeze",
                distance: "25 km"
              }
            ],
            parking: "Kostenfreie Parkplätze verfügbar"
          }
        },
        services: {
          catering: [
            "Individuelle Menüs und Buffets",
            "Stehempfänge",
            "Kaffeepausen",
            "Abendveranstaltungen"
          ],
          activities: [
            "Touren in die Region Niederrhein",
            "Ausflüge ins Ruhrgebiet",
            "Besuche in Holland",
            "Stadtführungen in Düsseldorf"
          ],
          contact: {
            phone: "02851-5880",
            email: "tagung@hotel-rheinpark.de"
          }
        },
        documents: {
          brochure: "/downloads/tagungslocations-broschuere.pdf",
          factsheet: "/downloads/tagungsmappe.pdf"
        }
      },
      activities: {
        inHouse: [
          "Fahrradverleih",
          "E-Bike Ladestation",
          "Bibliothek",
          "Billard"
        ],
        nearby: [
          {
            activity: "Rheinpromenade",
            distance: "0m",
            description: "Direkt vor der Tür"
          },
          {
            activity: "Golfplatz",
            distance: "5km",
            description: "18-Loch Anlage"
          },
          {
            activity: "Radwege",
            distance: "0m",
            description: "Direkter Zugang zum Rheinradweg"
          }
        ]
      }
    },
    policies: {
      checkIn: {
        from: "15:00",
        until: "22:00",
        lateCheckIn: "Nach Absprache möglich"
      },
      checkOut: {
        until: "11:00",
        lateCheckOut: "Nach Verfügbarkeit (Aufpreis)"
      },
      pets: {
        allowed: true,
        fee: "15€ pro Nacht",
        notes: "Hunde willkommen, bitte vorher anmelden"
      },
      cancellation: {
        deadline: "48 Stunden vor Anreise",
        conditions: "Kostenlose Stornierung bis 48h vor Anreise"
      },
      payment: {
        methods: [
          "Mastercard",
          "Visa",
          "American Express",
          "EC-Karte",
          "Bar"
        ],
        prePayment: "Keine Vorauszahlung erforderlich"
      }
    },
    sustainability: {
      certificates: [
        "ISO 14001",
        "Green Hotel Certification"
      ],
      measures: [
        "100% Ökostrom",
        "Regionale Produkte",
        "Wassersparende Armaturen",
        "E-Ladesäulen",
        "Recycling-Programm"
      ]
    },
    seasonalOffers: [
      {
        title: "Rheinromantik",
        period: "Mai bis September",
        includes: [
          "2 Übernachtungen",
          "Sektempfang",
          "Candle-Light Dinner",
          "Spa-Zugang"
        ],
        price: "ab 299€ pro Person"
      },
      {
        title: "Winterzauber",
        period: "November bis Februar",
        includes: [
          "3 Übernachtungen",
          "Glühweinempfang",
          "Wellness-Massage",
          "Wintermenü"
        ],
        price: "ab 399€ pro Person"
      }
    ],
    branding: {
      logo: "/logos/logo_rees.png",
      primaryColor: "#00717d",
      secondaryColor: "#c4984d"
    },
    vouchers: {
      categories: [
        {
          id: "wellness",
          title: "Wellness & Spa",
          description: "Verschenken Sie Entspannung und Wohlbefinden",
          image: "/platzhalter.png",
          options: [
            {
              id: "day-spa",
              name: "Day Spa Deluxe",
              price: 129,
              description: "Ganztägiger Spa-Zugang, 60min Massage & Prosecco",
              includes: ["Spa-Zugang", "60min Massage", "Bademantel", "Prosecco"]
            },
            {
              id: "couples",
              name: "Romantic Spa für Zwei",
              price: 249,
              description: "Gemeinsame Auszeit mit Partner-Massage",
              includes: ["Spa-Zugang", "Partner-Massage", "Champagner", "Früchte"]
            }
          ]
        },
        {
          id: "dining",
          title: "Kulinarik",
          description: "Genussmomente zum Verschenken",
          image: "/platzhalter.png",
          options: [
            {
              id: "gourmet",
              name: "Gourmet Dinner",
              price: 89,
              description: "4-Gang Menü mit Weinbegleitung",
              includes: ["4-Gang Menü", "Weinbegleitung", "Aperitif", "Kaffee"]
            },
            {
              id: "brunch",
              name: "Luxus Brunch",
              price: 49,
              description: "Reichhaltiges Brunch-Buffet mit Prosecco",
              includes: ["Brunch-Buffet", "Prosecco", "Kaffee-Flat", "Live-Cooking"]
            }
          ]
        },
        {
          id: "hotel",
          title: "Hotel & Arrangements",
          description: "Unvergessliche Auszeiten",
          image: "/platzhalter.png",
          options: [
            {
              id: "romantic",
              name: "Romantische Auszeit",
              price: 299,
              description: "2 Übernachtungen mit Verwöhnprogramm",
              includes: ["2 Übernachtungen", "Candle-Light Dinner", "Spa-Zugang", "Champagner"]
            },
            {
              id: "wellness-break",
              name: "Wellness Kurzurlaub",
              price: 399,
              description: "3 Tage Entspannung pur",
              includes: ["3 Übernachtungen", "Massage", "Spa-Zugang", "Frühstück"]
            }
          ]
        }
      ],
      benefits: [
        {
          icon: "Calendar",
          title: "3 Jahre gültig",
          text: "Flexible Einlösung"
        },
        {
          icon: "Heart",
          title: "Persönlich gestalten",
          text: "Mit individueller Grußbotschaft"
        }
      ]
    },
    restaurant: {
      title: "Lassen Sie sich kulinarisch verwöhnen",
      intro: "Genießen Sie im Restaurant mit Hotelbar und auf unserer Terrasse abwechslungsreiche, kreative Gastronomie und kulinarische Leckerbissen mit herrlichem Ausblick auf den Rheinverlauf und die Rheinauen.",
      description: "Das Restaurant und die Außenterrasse laden ein zum ausgiebigen Frühstück, einem leichten Mittagessen, Kaffee und Kuchen oder einem Dinner am Abend. Von unserem Serviceteam bestens ver- und umsorgt.",
      quote: {
        text: "Das Essen soll zuerst das Auge erfreuen und dann den Magen.",
        author: "Goethe"
      },
      features: [
        "Restaurant mit Rheinblick",
        "Sonnenterrasse",
        "Hotelbar",
        "Spezialisten für private Feiern",
        "All you can eat Angebote (mit Reservierung)"
      ],
      openingHours: {
        current: {
          validUntil: "05.03.2025",
          times: [
            {
              days: "Mittwoch & Donnerstag",
              hours: "17:00 – 21:00 Uhr",
              kitchen: "17:00 – 21:00 Uhr"
            },
            {
              days: "Freitag",
              hours: "15:00 - 21:00 Uhr",
              kitchen: "17:00 – 21:00 Uhr"
            },
            {
              days: "Samstag",
              hours: "12:00 – 21:00 Uhr",
              kitchen: "12:30 – 21:00 Uhr"
            },
            {
              days: "Sonntag bis Dienstag",
              hours: "Ruhetag"
            }
          ]
        },
        future: {
          validFrom: "05.03.2025",
          times: [
            {
              days: "Mittwoch & Donnerstag",
              hours: "17:00 – 21:00 Uhr",
              kitchen: "17:00 – 21:00 Uhr"
            },
            {
              days: "Freitag",
              hours: "15:00 - 21:00 Uhr",
              kitchen: "17:00 – 21:00 Uhr"
            },
            {
              days: "Samstag & Sonntag",
              hours: "12:00 – 21:00 Uhr",
              kitchen: "12:30 – 21:00 Uhr"
            },
            {
              days: "Montag & Dienstag",
              hours: "Ruhetag"
            }
          ]
        },
        breakfast: {
          weekday: "Mo. - Fr.: 6:00 - 10:00 Uhr",
          weekend: "Sa., So. und Feiertags: 7:00 - 11:00 Uhr"
        }
      },
      menus: {
        dining: {
          title: "Speisekarte",
          url: "/downloads/speisekarte.pdf"
        },
        drinks: {
          title: "Getränkekarte",
          url: "/downloads/getraenkekarte.pdf"
        },
        kids: {
          title: "Kinderkarte",
          url: "/downloads/kinderkarte.pdf"
        }
      },
      brochures: {
        arrangements: {
          title: "Arrangementflyer",
          url: "/downloads/arrangements.pdf"
        },
        conference: {
          title: "Tagungsbroschüre",
          url: "/downloads/tagung.pdf"
        },
        hotel: {
          title: "Hausprospekt",
          url: "/downloads/hotel.pdf"
        }
      },
      contact: {
        phone: "+49 (0) 28 51 / 58 80",
        email: "info@rheinart-rees.de"
      },
      images: [
        {
          url: "/rees/AHRR-Restaurant.jpg",
          alt: "Restaurant mit Rheinblick",
          title: "Unser Restaurant"
        },
        {
          url: "/rees/AHRR-Restaurant_2.jpg",
          alt: "Gläser Restaurantbereich",
          title: "Gläser Restaurantbereich"
        }
      ]
    },
    packages: {
      title: "Hotelangebote am Niederrhein",
      subtitle: "ARRANGEMENTS AUF EINEN BLICK",
      intro: "Egal ob Aktivurlaub, Kurztrip oder Wellness-Wochenende - Wir heißen Sie herzlich Willkommen am Niederrhein und halten neben gemütlichen Zimmern und kulinarischen Köstlichkeiten auch verschiedene Wellnessangebote für Sie bereit.",
      description: "Mit Liebe zum Detail haben wir verschiedene Angebote für Sie geschnürt. Vom romantischen Kurzurlaub bis hin zum Familienurlaub mit Zoobesuch und weiteren tollen Ausflugszielen. Ist das passende für Sie nicht dabei? Dann schreiben Sie uns über das Kontaktformular, wir unterbreiten Ihnen gerne auch ein individuelles Angebot.",
      standardPackages: [
        {
          title: "Wellness Exklusiv",
          subtitle: "Für ein bisschen Luxus zwischendurch",
          description: "Wellnessangebot am Niederrhein inkl. Hotel",
          includes: [
            "2 Übernachtung inkl. Frühstück",
            "Nutzung des Wellnessbereichs",
            "1x 60 min. Massage"
          ],
          price: "ab 222,00 € p.P.",
          image: "/rees/platzhalter.png"
        },
        {
          title: "Erholung Pur",
          subtitle: "Lassen Sie die Seele baumeln",
          includes: [
            "2 x Übernachtung im Komfortdoppelzimmer",
            "2 x Teilnahme am Frühstücksbuffet",
            "1 x Eintritt in die Saunalandschaft Embricana"
          ],
          price: "ab 151,00 € p.P.",
          image: "/rees/platzhalter.png"
        },
        // ... add other standard packages ...
      ],
      wellnessSuitePackages: [
        {
          title: "Wellness-Suite",
          subtitle: "Innehalten und Relaxen",
          description: "Urlaubsstimmung am Niederrhein",
          includes: [
            "Nutzung des Wellnessbereichs",
            "1x 60 min. Entspannungs- oder klassische Massage (zur Wahl)"
          ],
          image: "/rees/platzhalter.png"
        },
        // ... add other wellness suite packages ...
      ],
      additionalServices: {
        title: "Zimmerupgrade? Kein Problem!",
        description: "Gegen einen kleinen Aufpreis bieten wir Ihnen ein Zimmer Ihrer gewünschter Kategorie an. Fragen Sie uns einfach bei Ihrer Buchung. Tel. 02851 / 5880",
        bookableExtras: [
          "Nachtwächterführung",
          'Rheinführung mit "Hein vom Rhein"',
          "Segwaytour",
          "Schiffrundfahrten",
          "Städteführungen",
          "Golfen z.B. beim GC Wasserburg Anholt"
        ]
      }
    }
  }
];

// Add a default hotel for fallback
export const defaultHotel = {
  branding: {
    logo: "/logos/default_logo.png",
    primaryColor: "#0069b3",
    secondaryColor: "#c4984d"
  },
  contact: {
    phone: "+49 123 456789",
    email: "info@hotelgroup.de",
    social: {
      facebook: "https://facebook.com/hotelgroup",
      instagram: "https://instagram.com/hotelgroup",
      twitter: "https://twitter.com/hotelgroup"
    }
  }
};