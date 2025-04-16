import { ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { AIChatBot } from '../Chat/AIChatBot';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <main>{children}</main>
      <Footer />
      <AIChatBot />
    </div>
  );
}