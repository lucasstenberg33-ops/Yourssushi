import { NextResponse } from 'next/server';
import { getHours, saveHours } from '@/lib/data';

export async function GET() {
    const hours = getHours();
    return NextResponse.json(hours);
}

export async function PUT(request: Request) {
    const data = await request.json();
    saveHours(data);
    return NextResponse.json({ success: true });
}
