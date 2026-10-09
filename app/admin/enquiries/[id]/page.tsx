'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAdmin } from '@/components/admin/AdminProvider';
import { Card, Notice, StatusBadge, when } from '@/components/admin/bits';
import type { StoredEnquiry } from '@/lib/stores';

export default function EnquiryDetail() {
  const { id } = useParams<{ id: string }>();
  const { api } = useAdmin();
  const [e, setE] = useState<StoredEnquiry | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    api<{ enquiry: StoredEnquiry }>(`/api/admin/enquiries/${id}`).then((r) => (r.status === 404 ? setMissing(true) : setE(r.data.enquiry)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (missing) return <Notice tone="err">Enquiry not found. <Link href="/admin/enquiries" className="underline">Back</Link></Notice>;
  if (!e) return <p className="text-gray-400">Loading…</p>;

  return (
    <div className="space-y-5">
      <Link href="/admin/enquiries" className="inline-block py-2 text-sm text-emerald-300 hover:underline">← All enquiries</Link>
      <div className="flex flex-wrap items-center gap-3"><h1 className="text-2xl font-black">{e.name}</h1><StatusBadge status={e.status} /><span className="text-sm capitalize text-gray-400">{e.type} · {when(e.createdAt)}</span></div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Contact">
          <p><a className="text-emerald-300 hover:underline" href={`mailto:${e.email}`}>{e.email}</a></p>
          {e.phone && <p>{e.phone}</p>}
          {e.meta && Object.entries(e.meta).map(([k, v]) => <p key={k} className="text-sm text-gray-300"><span className="text-gray-400">{k}:</span> {v}</p>)}
        </Card>
        <Card title="Message"><p className="whitespace-pre-wrap text-gray-200">{e.message}</p></Card>
      </div>
      <Link href={`/admin/reply-enquiry?id=${encodeURIComponent(e.id)}`} className="inline-flex min-h-11 items-center rounded-xl bg-[#2E6B4D] px-5 font-black text-white hover:bg-[#256041]">{e.status === 'replied' ? 'Reply again' : 'Reply'}</Link>
    </div>
  );
}
