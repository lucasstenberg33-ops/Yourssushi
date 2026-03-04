import { NextResponse } from 'next/server';
import hoursData from '@/data/hours.json';

export const runtime = 'edge';

export async function GET() {
    return NextResponse.json(hoursData);
}

export async function PUT() {
    return NextResponse.json({ message: 'Editing not available in cloud mode' }, { status: 503 });
}
