export const runtime = 'edge';

export async function GET() {
    return new Response(JSON.stringify({
        status: 'ok',
        version: '4.0',
        info: 'Naked Response - No Imports'
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

