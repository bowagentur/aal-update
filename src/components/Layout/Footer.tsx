import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="custom-container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-xl mb-4">Hotels</h4>
            <ul className="space-y-2">
              <li><Link to="/hotels/rheinpark-rees" className="hover:text-secondary">Hotel Rheinpark Rees</Link></li>
              <li><Link to="/hotels/atlanta-leipzig" className="hover:text-secondary">Atlanta Hotel Leipzig</Link></li>
              <li><Link to="/hotels/dampfmuehle" className="hover:text-secondary">Hotel Dampfmühle</Link></li>
              <li><Link to="/hotels/luisenplatz" className="hover:text-secondary">Hotel Am Luisenplatz</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Restaurants & Mehr</h4>
            <ul className="space-y-2">
              <li><Link to="/restaurants/rheinart" className="hover:text-secondary">RheinArt Restaurant</Link></li>
              <li><Link to="/restaurants/bodega-scheffel" className="hover:text-secondary">Bodega im Scheffel</Link></li>
              <li><Link to="/hotels/bb-potsdam" className="hover:text-secondary">B&B Am Luisenplatz</Link></li>
              <li><Link to="/hotels/kamper-hof" className="hover:text-secondary">Hostel Kamper Hof</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Service</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-secondary">Über uns</Link></li>
              <li><Link to="/jobs" className="hover:text-secondary">Karriere</Link></li>
              <li><Link to="/contact" className="hover:text-secondary">Kontakt</Link></li>
              <li><Link to="/gutscheine" className="hover:text-secondary">Gutscheine</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li><Link to="/impressum" className="hover:text-secondary">Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-secondary">Datenschutz</Link></li>
              <li><Link to="/agb" className="hover:text-secondary">AGB</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}