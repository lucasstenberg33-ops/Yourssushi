import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function GET() {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get('admin_session')?.value === 'authenticated';
  return NextResponse.json({ authenticated });
}
