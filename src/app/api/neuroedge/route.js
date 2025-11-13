import { NextResponse } from 'next/server';
export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  const p = b.prompt || '';
  if (!p) return NextResponse.json({ reply: 'Please provide a prompt' });
  return NextResponse.json({ reply: 'NeuroEdge (mock): ' + p });
}
