import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET() {
    try {
        const ctx = getRequestContext();
        const env = ctx.env || {};
        const kvMatch = !!env.DATA_KV;
        return NextResponse.json({
            status: "ok",
            has_kv: kvMatch,
            keys: Object.keys(env)
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
    }
}
