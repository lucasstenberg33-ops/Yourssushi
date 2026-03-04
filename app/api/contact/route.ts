import { NextResponse } from 'next/server';
import { getContact, saveContact } from '@/lib/data';

export async function GET() {
    const contact = getContact();
    return NextResponse.json(contact);
}

export async function PUT(request: Request) {
    const data = await request.json();
    saveContact(data);
    return NextResponse.json({ success: true });
}
