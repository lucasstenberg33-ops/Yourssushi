import { NextResponse } from 'next/server';
import { getSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Fel lösenord' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  const cookie = getSessionCookie();
  response.cookies.set(cookie.name, cookie.value, cookie);
  return response;
}
