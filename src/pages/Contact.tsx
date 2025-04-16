export function Contact() {
  return (
    <div className="min-h-screen py-16">
      <div className="custom-container">
        <h1 className="text-4xl font-serif mb-8">Kontakt</h1>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Schreiben Sie uns</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
              >
                Nachricht senden
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Kontaktinformationen</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Hauptverwaltung</h3>
                <p className="text-gray-600">
                  Aaldering Hotels GmbH<br />
                  Musterstraße 123<br />
                  47533 Kleve<br />
                  Deutschland
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Kontakt</h3>
                <p className="text-gray-600">
                  Tel: +49 (0) 2821 12345-0<br />
                  Fax: +49 (0) 2821 12345-99<br />
                  E-Mail: info@aaldering-hotels.de
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Öffnungszeiten</h3>
                <p className="text-gray-600">
                  Montag - Freitag: 09:00 - 18:00 Uhr<br />
                  Samstag: 10:00 - 14:00 Uhr<br />
                  Sonntag: geschlossen
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}