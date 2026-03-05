import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        version: '2.0',
        message: 'Worker is running with edge runtime'
    });
}

