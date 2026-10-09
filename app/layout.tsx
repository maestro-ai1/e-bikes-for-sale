import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'e bikes for sale | Electric Bicycles Australia 2026',
  description: 'Buy e bikes for sale in Australia. Commuter, mountain & folding electric bicycles. EN15194 compliant with 10% discount on Bitcoin & USDT.',
  metadataBase: new URL('https://ebikesforsale.com.au'),
  keywords: [
    'e bikes for sale',
    'electric bicycles for sale',
    'bicycle mountain bike',
    'pedal ebike',
    'bike accessories',
    'e bike folding bike',
    'electric bikes for sale',
    'electric bike for sale',
    'road bikes',
    'helmets',
    'tyres for cycles',
    'online e bike shop'
  ],
  openGraph: {
    title: 'e bikes for sale | Australia Premier E-Bikes & Wholesale',
    description: 'High performance electric bicycles for sale in Australia. EN15194 compliant 250W pedelecs with fast Australia-wide dispatch.',
    url: 'https://ebikesforsale.com.au',
    siteName: 'e bikes for sale',
    type: 'website',
    locale: 'en_AU',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'e bikes for sale high performance Australian electric bicycle'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'e bikes for sale | Electric Bicycles Australia 2026',
    description: 'Buy e bikes for sale in Australia. Commuter, mountain & folding electric bicycles. EN15194 compliant with 10% discount on Bitcoin & USDT.',
    images: ['https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=80']
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className="scroll-smooth">
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans" suppressHydrationWarning>
        <AppProvider>
          <StructuredData />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
