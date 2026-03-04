import { NextResponse } from 'next/server';
import aboutData from '@/data/about.json';

export const runtime = 'edge';

export async function GET() {
    return NextResponse.json(aboutData);
}

export async function PUT() {
    return NextResponse.json({ message: 'Editing not available in cloud mode' }, { status: 503 });
}
