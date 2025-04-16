import { ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-start justify-center pt-32">
      <div className="absolute inset-0">
        <div className="relative w-full h-full overflow-hidden">
          <iframe 
            className="absolute top-1/2 left-1/2 w-screen h-screen -translate-x-1/2 -translate-y-1/2 scale-[4] md:scale-[1.5] object-cover"
            style={{ pointerEvents: 'none' }}
            src="https://www.youtube.com/embed/ZmzFgE-2Zyc?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=ZmzFgE-2Zyc&playsinline=1&enablejsapi=1&version=3&iv_load_policy=3"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>

      <div className="relative z-20 custom-container text-center text-white max-w-4xl px-4">
        <h1 className="text-4xl md:text-6xl font-serif mb-8 leading-tight animate-fade-in">
          Luxuriöse Auszeit <br className="hidden md:block" />
          <span className="text-secondary">in bester Lage</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Entdecken Sie unsere einzigartigen Hotels und erleben Sie unvergessliche Momente
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="#hotels" className="btn-primary group inline-flex items-center">
            Unsere Hotels
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/booking" className="btn-secondary group inline-flex items-center">
            Jetzt Buchen
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}