export default function Footer() {
    return (
        <footer style={{ background: '#0a0a0a', padding: '3rem 0', position: 'relative' }}>
            <div style={{ width: '60px', height: '2px', background: '#c8a44d', margin: '0 auto 2rem', opacity: 0.3 }} />
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", color: 'rgba(232,224,208,0.25)', fontSize: '1rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                    "Every case has a solution. Every mystery has an answer."
                </p>
                <p style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.45rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,224,208,0.12)', marginBottom: '1.5rem' }}>
                    📍 21 Rajani Sen Road, Kolkata
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                    {[
                        { href: 'https://github.com/saptarshi-bisoi', icon: 'fab fa-github' },
                        { href: 'https://www.linkedin.com/in/saptarshi-legend/', icon: 'fab fa-linkedin' },
                        { href: 'https://x.com/saptarshiBisoi', icon: 'fab fa-x-twitter' },
                        { href: 'https://www.instagram.com/aka.saptarshi/', icon: 'fab fa-instagram' },
                        { href: 'mailto:saptarshibisoi.official@gmail.com', icon: 'fas fa-envelope' },
                    ].map(s => (
                        <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer"
                            style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(200,164,77,0.15)', color: 'rgba(232,224,208,0.3)', textDecoration: 'none', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#c8a44d'; e.currentTarget.style.borderColor = '#c8a44d' }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(232,224,208,0.3)'; e.currentTarget.style.borderColor = 'rgba(200,164,77,0.15)' }}
                        ><i className={s.icon} /></a>
                    ))}
                </div>
                <p style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.45rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,224,208,0.12)' }}>
                    © {new Date().getFullYear()} Saptarshi Bisoi — All investigations reserved
                </p>
            </div>
        </footer>
    )
}
