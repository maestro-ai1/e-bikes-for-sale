import type { Metadata } from 'next';
import HomeView from '@/components/HomeView';

export const metadata: Metadata = {
  alternates: { canonical: 'https://ebikesforsale.com.au/' },
};

export default function HomePage() {
  return <HomeView />;
}
