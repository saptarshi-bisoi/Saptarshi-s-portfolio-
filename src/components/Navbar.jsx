import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
    { href: '#about', label: 'Dossier' },
    { href: '#projects', label: 'Case Files' },
    { href: '#skills', label: 'Toolkit' },
    { href: '#experience', label: 'Missions' },
    { href: '#education', label: 'Training' },
    { href: '#contact', label: 'Dispatch' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', h)
        return () => window.removeEventListener('scroll', h)
    }, [])

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed', top: '20px', left: 0, right: 0, zIndex: 100,
                display: 'flex', justifyContent: 'center', pointerEvents: 'none'
            }}
        >
            {/* Ambient Background Glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '600px', height: '100px', background: 'radial-gradient(ellipse at center, rgba(200,164,77,0.1) 0%, transparent 70%)',
                filter: 'blur(20px)', zIndex: -1, opacity: scrolled ? 1 : 0.6, transition: 'opacity 0.5s'
            }} />

            <div style={{
                display: 'flex', alignItems: 'center', pointerEvents: 'auto',
                background: 'rgba(10,12,16,0.85)', backdropFilter: 'blur(16px)',
                padding: '4px 8px', borderRadius: '100px', border: '1px solid var(--color-border-gold)',
                boxShadow: scrolled ? 'var(--shadow-glow)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                {/* Logo Section */}
                <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '0 12px 0 6px', borderRight: '1px solid var(--color-border)' }}>
                    <div style={{ width: '30px', height: '30px', background: 'var(--color-gold-dim)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border-gold)', overflow: 'hidden' }}>
                        <img src="/logo-main.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </a>

                {/* Main Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 12px', position: 'relative' }} className="hidden-mobile">
                    {/* Decorative Corner Marks (Inner) */}
                    <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--color-gold)', fontSize: '8px', opacity: 0.4 }}><i className="fas fa-plus" /></div>
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: 'var(--color-gold)', fontSize: '8px', opacity: 0.4 }}><i className="fas fa-plus" /></div>

                    {links.map((l) => (
                        <a key={l.href} href={l.href}
                            className="navbar-link"
                            style={{
                                fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '0.05em', color: 'var(--color-text-dim)',
                                padding: '10px 16px', borderRadius: '20px', textDecoration: 'none', display: 'flex', alignItems: 'center',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = 'var(--color-text-light)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = 'var(--color-text-dim)';
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            {l.label}
                            <span className="letter-shortcut" style={{ border: '1px solid var(--color-border-gold)', marginLeft: '8px', padding: '1px 5px', fontSize: '0.55rem', borderRadius: '3px', opacity: 0.5 }}>
                                {l.label.charAt(0)}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Contact/Dispatch Button */}
                <a href="#contact" className="show-mobile" style={{ textDecoration: 'none' }}>
                  <button style={{ background: 'var(--color-gold)', color: 'var(--color-bg)', border: 'none', padding: '8px 16px', borderRadius: '100px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>
                    DISPATCH
                  </button>
                </a>

                <button onClick={() => setOpen(!open)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--color-gold)', fontSize: '1rem', cursor: 'pointer', padding: '0 12px' }}
                    className="show-mobile"
                    aria-label="Menu"
                >
                    <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`} />
                </button>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        style={{
                            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                            width: '240px', background: 'var(--color-bg)', border: '1px solid var(--color-border-gold)',
                            borderRadius: '12px', marginTop: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-card)',
                            zIndex: 101, pointerEvents: 'auto'
                        }}
                    >
                        {links.map(l => (
                            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                                style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 1.5rem',
                                    fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--color-text-dim)',
                                    textDecoration: 'none', borderBottom: '1px solid var(--color-border)'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.background = 'rgba(200,164,77,0.05)' }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-dim)'; e.currentTarget.style.background = 'transparent' }}
                            >
                                {l.label}
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', opacity: 0.4 }}>[{l.label.charAt(0)}]</span>
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 768px) { .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }

        .navbar-link:hover {
            box-shadow: inset 0 0 10px rgba(200,164,77,0.05);
        }
      `}</style>
        </motion.nav>
    )
}
