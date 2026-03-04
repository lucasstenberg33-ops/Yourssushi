import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({ message: 'API not available in edge mode' }, { status: 503 });
}

export async function PUT() {
  return NextResponse.json({ message: 'API not available in edge mode' }, { status: 503 });
}
