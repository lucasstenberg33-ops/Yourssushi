import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET() {
    try {
        const { env } = await getCloudflareContext();
        if (env.DATA_KV) {
            const kv = env.DATA_KV as any;
            const data = await kv.get('about');
            if (data) {
                return NextResponse.json(JSON.parse(data));
            }
        }
    } catch (error) {
        // Fallback
    }

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
    try {
        const data = await request.json();
        const { env } = await getCloudflareContext();
        if (env.DATA_KV) {
            const kv = env.DATA_KV as any;
            await kv.put('about', JSON.stringify(data));
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'KV database not found' }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update KV' }, { status: 500 });
    }
}
