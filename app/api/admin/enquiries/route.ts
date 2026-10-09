import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { deleteAllEnquiries, isStoreConfigured, listEnquiries } from '@/lib/stores';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  return NextResponse.json({ ok: true, storeConfigured: isStoreConfigured(), enquiries: await listEnquiries() });
}

export async function DELETE(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  await deleteAllEnquiries();
  return NextResponse.json({ ok: true });
}
