import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { deleteEnquiry, getEnquiry } from '@/lib/stores';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  const enquiry = await getEnquiry(decodeURIComponent(id));
  if (!enquiry) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  return NextResponse.json({ ok: true, enquiry });
}

export async function DELETE(request: Request, { params }: Ctx) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  await deleteEnquiry(decodeURIComponent(id));
  return NextResponse.json({ ok: true });
}
