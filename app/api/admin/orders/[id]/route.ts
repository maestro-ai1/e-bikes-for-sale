import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { deleteOrder, getOrder } from '@/lib/stores';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  const order = await getOrder(decodeURIComponent(id));
  if (!order) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  return NextResponse.json({ ok: true, order });
}

export async function DELETE(request: Request, { params }: Ctx) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  await deleteOrder(decodeURIComponent(id));
  return NextResponse.json({ ok: true });
}
