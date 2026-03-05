export const runtime = 'edge';

export default function NotFound() {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>404 - Sidan hittades inte</h1>
            <p>Sidan du letar efter finns tyvärr inte.</p>
            <a href="/" style={{ color: '#d32f2f', textDecoration: 'underline' }}>Gå tillbaka till startsidan</a>
        </div>
    );
}
