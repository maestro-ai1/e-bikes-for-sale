import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';

/** First line of every admin route: 503 if ADMIN_PASSCODE is unset (never open), 401 if wrong, null if OK. */
export function checkAdminPasscode(request: Request): NextResponse | null {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) return NextResponse.json({ ok: false, error: 'admin-not-configured' }, { status: 503 });
  const given = request.headers.get('x-admin-passcode') || '';
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  const same = a.length === b.length && timingSafeEqual(a, b);
  if (!same) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  return null;
}
