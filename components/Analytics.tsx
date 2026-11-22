'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Google Analytics 4 and Microsoft Clarity. Each loads only when its ID is set in the Vercel environment
// (NEXT_PUBLIC_GA_MEASUREMENT_ID like G-XXXXXXXXXX, NEXT_PUBLIC_CLARITY_ID like abcd1234ef), so nothing runs until the owner supplies the IDs.
// The owner admin area is never tracked. Scripts load after the page is interactive, so they do not slow the first paint.
const GA_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '').trim();
const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_ID || '').trim();
const GA_OK = /^G-[A-Z0-9]{6,14}$/.test(GA_ID);
const CLARITY_OK = /^[a-z0-9]{6,14}$/.test(CLARITY_ID);

export default function Analytics() {
  const pathname = usePathname() || '';
  if (pathname.startsWith('/admin')) return null;
  if (!GA_OK && !CLARITY_OK) return null;
  return (
    <>
      {GA_OK && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {CLARITY_OK && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}
    </>
  );
}
