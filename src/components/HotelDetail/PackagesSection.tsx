import { ChevronDown, Check, Plus } from 'lucide-react';
import { Disclosure } from '@headlessui/react';

interface Package {
  title: string;
  subtitle: string;
  image: string;
  price: string;
  includes: string[];
}

interface AdditionalService {
  title: string;
  description: string;
  bookableExtras: string[];
}

interface PackagesSectionProps {
  title?: string;
  subtitle?: string;
  intro?: string;
  description?: string;
  standardPackages?: Package[];
  wellnessSuitePackages?: Package[];
  additionalServices?: AdditionalService;
}

export function PackagesSection({ 
  title, 
  subtitle, 
  intro, 
  description, 
  standardPackages = [], 
  wellnessSuitePackages = [], 
  additionalServices 
}: PackagesSectionProps) {
  const allPackages = [...standardPackages, ...wellnessSuitePackages];

  return (
    <section id="arrangements" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">{title}</h2>
        <h3 className="text-xl text-[var(--color-primary)] text-center mb-6">{subtitle}</h3>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-6">
          {intro}
        </p>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          {description}
        </p>

        {/* All Packages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {allPackages.map((pkg, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-white text-xl font-serif mb-2">{pkg.title}</h3>
                  <p className="text-white/90 text-sm">{pkg.subtitle}</p>
                </div>
              </div>
              <div className="p-6">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between items-center mb-4">
                        <span className="text-[var(--color-primary)] font-semibold">{pkg.price}</span>
                        <ChevronDown 
                          className={`w-5 h-5 text-[var(--color-primary)] transition-transform ${
                            open ? 'transform rotate-180' : ''
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <ul className="space-y-2 mb-4">
                          {pkg.includes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600">
                              <Check className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <button className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors">
                          Jetzt anfragen
                        </button>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services (Collapsible) */}
        {additionalServices && (
          <div className="max-w-3xl mx-auto">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full bg-gray-50 hover:bg-gray-100 px-6 py-4 rounded-xl flex justify-between items-center">
                    <h3 className="text-xl font-serif">{additionalServices.title}</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-[var(--color-primary)] transition-transform ${
                        open ? 'transform rotate-180' : ''
                      }`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 py-4 bg-gray-50 mt-2 rounded-xl">
                    <p className="text-gray-600 mb-6">{additionalServices.description}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {additionalServices.bookableExtras.map((extra, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Plus className="w-5 h-5 text-[var(--color-primary)]" />
                          <span className="text-gray-600">{extra}</span>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        )}
      </div>
    </section>
  );
} 