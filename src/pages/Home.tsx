import { HeroSection } from '../components/Home/HeroSection';
import { HotelGrid } from '../components/Home/HotelGrid';
import { RoomTypes } from '../components/Home/RoomTypes';
import { Apartments } from '../components/Home/Apartments';
import { Events } from '../components/Home/Events';
import { Features } from '../components/Home/Features';
import { Testimonials } from '../components/Home/Testimonials';
import { Career } from '../components/Home/Career';

export function Home() {
  return (
    <>
      <HeroSection />
      <HotelGrid />
      <RoomTypes />
      <Apartments />
      <Events />
      <Features />
      <Testimonials />
      <Career />
    </>
  );
}