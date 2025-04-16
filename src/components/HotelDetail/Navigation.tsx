export function Navigation() {
  return (
    <div className="top-[60px] md:top-0 bg-white shadow-sm z-30 mt-[60px] md:mt-[40px]">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 md:gap-8 overflow-x-auto py-3 md:py-4 scrollbar-hide">
          <a href="#uebersicht" className="text-[var(--color-primary)] font-medium whitespace-nowrap text-sm md:text-base">Übersicht</a>
          <a href="#zimmer" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Zimmer</a>
          <a href="#wellness" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Wellness & Spa</a>
          <a href="#restaurant" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Restaurant</a>
          <a href="#tagungen" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Tagungen</a>
          <a href="#gutscheine" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Gutscheine</a>
          <a href="#kontakt" className="text-gray-600 hover:text-[var(--color-primary)] whitespace-nowrap text-sm md:text-base">Kontakt</a>
        </div>
      </div>
    </div>
  );
} 