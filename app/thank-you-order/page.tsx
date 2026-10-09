import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank you | e bikes for sale',
  robots: { index: false, follow: true },
};

export default function ThankYouOrderPage() {
  return (
    <main id="main" className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#2E6B4D]" aria-hidden="true" />
        <h1 className="text-2xl font-black text-gray-900">Thank you for your order</h1>
        <p className="text-sm leading-relaxed text-gray-700">We have received your order and sent a confirmation to your email. Watch for a follow-up email from us with the payment details for your order.</p>
        <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-[#1E4733] px-5 font-black text-white hover:bg-[#2E6B4D]">Back to the shop</Link>
      </div>
    </main>
  );
}
