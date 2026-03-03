import { NextResponse } from 'next/server';
import { getMenu, saveMenu } from '@/lib/data';

export async function GET() {
  const menu = getMenu();
  return NextResponse.json(menu);
}

export async function PUT(request: Request) {
  const data = await request.json();
  saveMenu(data);
  return NextResponse.json({ success: true });
}
