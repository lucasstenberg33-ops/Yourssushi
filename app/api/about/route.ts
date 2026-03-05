import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sushinet.se';
        const res = await fetch(`${baseUrl}/data/about.json`);
        const fallbackData = await res.json();
        return NextResponse.json(fallbackData);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch static data" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    return NextResponse.json({ message: "KV disabled for test" });
}

