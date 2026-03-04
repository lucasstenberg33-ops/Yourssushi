import { NextResponse } from 'next/server';
import contactData from '../../../data/contact.json';

export const runtime = 'edge';

export async function GET() {
    return NextResponse.json(contactData);
}

export async function PUT() {
    return NextResponse.json({ message: 'Editing not available in cloud mode' }, { status: 503 });
}
