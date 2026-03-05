export const runtime = 'edge';

export async function GET() {
    return new Response(JSON.stringify({
        status: "ok",
        message: "Edge runtime is working with plain Response"
    }), {
        headers: { "content-type": "application/json" }
    });
}

