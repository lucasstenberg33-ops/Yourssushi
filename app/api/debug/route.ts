export async function GET() {
    return new Response(JSON.stringify({
        status: 'ok',
        version: '5.0',
        info: 'OpenNext migration'
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
