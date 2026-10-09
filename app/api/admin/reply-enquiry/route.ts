import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getEnquiry, markEnquiryReplied } from '@/lib/stores';
import { sendMail } from '@/lib/mailer';
import { enquiryReplyEmail } from '@/lib/emailTemplates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Admin: reply to an enquiry by email and mark it replied. */
export async function POST(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;

  let body: { id?: string; message?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 }); }
  const message = String(body.message || '').trim().slice(0, 6000);
  if (message.length < 2) return NextResponse.json({ ok: false, error: 'empty-message' }, { status: 400 });

  const enquiry = await getEnquiry(String(body.id || ''));
  if (!enquiry) return NextResponse.json({ ok: false, error: 'enquiry-not-found' }, { status: 404 });

  const mail = enquiryReplyEmail(enquiry, message);
  const r = await sendMail({ to: enquiry.email, replyTo: process.env.CONTACT_EMAIL || undefined, ...mail });
  if (!r.sent) return NextResponse.json({ ok: false, error: 'email-failed', reason: r.reason }, { status: 502 });
  await markEnquiryReplied(enquiry.id);
  return NextResponse.json({ ok: true });
}
