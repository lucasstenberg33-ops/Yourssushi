import { NextResponse } from 'next/server';
import { getAbout, saveAbout } from '@/lib/data';

export async function GET() {
    const about = getAbout();
    return NextResponse.json(about);
}

export async function PUT(request: Request) {
    const data = await request.json();
    saveAbout(data);
    return NextResponse.json({ success: true });
}
