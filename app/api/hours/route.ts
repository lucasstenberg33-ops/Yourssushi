import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET() {
    try {
        const ctx = getRequestContext();
        const kv = ctx.env.DATA_KV as any;
        if (kv) {
            const data = await kv.get('hours');
            if (data) {
                return NextResponse.json(JSON.parse(data));
            }
        }
    } catch (error) {
        // Fallback to local data if KV is unavailable (e.g. dev environment)
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sushinet.se';
    const res = await fetch(`${baseUrl}/data/hours.json`);
    const fallbackData = await res.json();
    return NextResponse.json(fallbackData);
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const ctx = getRequestContext();
        const kv = ctx.env.DATA_KV as any;
        if (kv) {
            await kv.put('hours', JSON.stringify(data));
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'KV database not found' }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update KV' }, { status: 500 });
    }
}

