import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  website: string;
  openingHours: string;
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  contactInfo: ContactInfo;
  mapUrl?: string;
}

export function ContactSection({ 
  title, 
  subtitle, 
  contactInfo,
  mapUrl 
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">{title}</h2>
        <h3 className="text-xl text-[var(--color-primary)] text-center mb-12">{subtitle}</h3>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-serif mb-6">Kontaktinformationen</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold mb-1">Adresse</h5>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold mb-1">Telefon</h5>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold mb-1">E-Mail</h5>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold mb-1">Website</h5>
                    <p className="text-gray-600">{contactInfo.website}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold mb-1">Öffnungszeiten</h5>
                    <p className="text-gray-600">{contactInfo.openingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-serif mb-6">Kontaktformular</h4>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Betreff
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors"
                >
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h4 className="text-xl font-serif mb-6">Lage</h4>
            {mapUrl ? (
              <iframe
                src={mapUrl}
                width="100%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            ) : (
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Karte wird geladen...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 