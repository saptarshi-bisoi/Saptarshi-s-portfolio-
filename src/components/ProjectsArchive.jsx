import { motion } from 'framer-motion';
import { useState } from 'react';

const cases = [
    {
        id: 'SB-001',
        title: 'MediScan AI — Brain Tumor Detection',
        tags: ['HTML5', 'JavaScript', 'React', 'Google Gemini AI', 'Flask'],
        desc: 'An AI-powered medical imaging tool that detects and classifies brain tumor patterns of MRI scans using Google Gemini Vision. Built for educational and research exploration.',
        status: 'SOLVED',
        statusColor: '#2b7a2b',
        github: 'https://github.com/saptarshi-bisoi/Mediscan-AI',
        live: 'https://mediscan-ai-tumor.vercel.app/',
        rotation: -2,
    },
    {
        id: 'SB-002',
        title: 'Happy Holi Studio',
        tags: ['React', 'Google Gemini AI', 'CSS3', 'Vite'],
        desc: 'An interactive AI-powered studio that lets users dive into the colorful chaos of Holi. Generates custom messages, customizes color themes, and delivers dynamic festive animations.',
        status: 'SOLVED',
        statusColor: '#2b7a2b',
        github: 'https://github.com/saptarshi-bisoi/Happy-Holi',
        live: 'https://happy-holi-studio.vercel.app/studio',
        rotation: 1,
    },
    {
        id: 'SB-003',
        title: 'Age Calculator Web App',
        tags: ['JavaScript', 'HTML5', 'CSS3', 'DOM', 'Date API'],
        desc: 'A precise, polished age calculator that breaks down your exact age in years, months, days, hours, and seconds. Handles leap years and edge cases with clean time mathematics.',
        status: 'SOLVED',
        statusColor: '#2b7a2b',
        github: 'https://github.com/saptarshi-bisoi/Age--Calculator-',
        live: 'https://age-calculator-z66d.vercel.app/',
        rotation: -1,
    },
    {
        id: 'SB-004',
        title: 'Designer Portfolio Website',
        tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
        desc: 'A modern, responsive portfolio website built with Next.js and TypeScript, featuring smooth animations, dark mode, and elegant motion design to showcase creative and development work.',
        status: 'IN PROGRESS',
        statusColor: '#b8860b',
        github: 'https://github.com/saptarshi-bisoi/Designer-portfolio-website',
        live: 'https://saptarshi-designer.vercel.app/',
        rotation: 2,
    },
    {
        id: 'SB-005',
        title: 'Dice of Wisdom',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'REST API', 'DOM'],
        desc: 'A fun, interactive dice game that rolls and delivers random wisdom quotes fetched live from the Advice Slip API. Features smooth dice animations, a clean responsive UI, and real-time API calls.',
        status: 'SOLVED',
        statusColor: '#2b7a2b',
        github: 'https://github.com/saptarshi-bisoi/Dice-Of-Wisdom',
        live: 'https://dice-of-wisdom.vercel.app/',
        rotation: -2,
    },
];

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { delay, duration: 0.6, ease: "easeOut" },
});

export default function ProjectsArchive() {
    const [particles] = useState(() => Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * 5
    })));

    return (
        <section id="projects" style={{
            position: 'relative',
            backgroundColor: '#161210', // Deep charcoal/board
            padding: '8rem 1.5rem',
            overflow: 'hidden'
        }}>
            {/* Ambient Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 0%, rgba(138, 90, 68, 0.15) 0%, rgba(20, 15, 12, 0.95) 100%)',
                pointerEvents: 'none'
            }} />

            {/* Dust Particles */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
                        animate={{ opacity: [0, 0.4, 0], y: [`${p.y}vh`, `${p.y - 10}vh`] }}
                        transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            backgroundColor: 'rgba(232, 224, 208, 0.3)',
                            borderRadius: '50%',
                            filter: 'blur(1px)'
                        }}
                    />
                ))}
            </div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                {/* Header Section */}
                <motion.div {...fadeIn()} style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(232,224,208,0.5)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        // Department of Archives
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#e8dcc4', margin: 0, fontWeight: 900 }}>
                        CASE <span style={{ color: 'var(--color-gold)' }}>FILES</span>
                    </h2>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'rgba(232,224,208,0.7)', marginTop: '1rem', fontStyle: 'italic' }}>
                        "Every project is a mystery investigated and solved."
                    </p>

                    {/* Red SVG connecting line from header to grid */}
                    <div style={{ position: 'absolute', left: '50%', top: '100%', bottom: '-5rem', width: '2px', background: 'linear-gradient(to bottom, rgba(180,40,40,0.8), transparent)', transform: 'translateX(-50%)' }} />
                </motion.div>

                {/* Grid of Case Files */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem 2rem' }}>
                    {cases.map((c, i) => (
                        <motion.div
                            key={c.id}
                            {...fadeIn(i * 0.15)}
                            whileHover={{
                                scale: 1.02,
                                rotate: 0,
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 10px 10px 30px rgba(0,0,0,0.5)'
                            }}
                            style={{
                                backgroundColor: '#e8dcc4', // Parchment
                                backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)',
                                backgroundSize: '15px 15px',
                                padding: '2.5rem 2rem 2rem',
                                borderRadius: '2px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                                position: 'relative',
                                transform: `rotate(${c.rotation}deg)`, // Slight tilt
                                color: '#2a201c',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                            className="case-file-card" // Used for hover targeting
                        >
                            {/* Red Thumbtack */}
                            <div style={{
                                position: 'absolute',
                                top: '12px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '10px',
                                height: '10px',
                                backgroundColor: '#a00',
                                borderRadius: '50%',
                                boxShadow: '0 3px 5px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(0,0,0,0.3), inset 1px 1px 3px rgba(255,100,100,0.5)',
                            }} />

                            {/* Header: ID and Status */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid rgba(0,0,0,0.8)', paddingBottom: '0.8rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 'bold', color: '#5a4a42' }}>CASE ID</label>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px' }}>{c.id}</span>
                                </div>
                                <div style={{
                                    border: `3px solid ${c.statusColor}`,
                                    padding: '4px 10px',
                                    color: c.statusColor,
                                    fontFamily: 'var(--font-mono)',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    letterSpacing: '2px',
                                    transform: 'rotate(5deg)',
                                    mixBlendMode: 'multiply',
                                    opacity: 0.85
                                }}>
                                    {c.status}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.2 }}>
                                {c.title}
                            </h3>

                            {/* Description (Typewriter look) */}
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', backgroundColor: 'rgba(0,0,0,0.03)', padding: '1rem', borderLeft: '3px solid #654321' }}>
                                {c.desc}
                            </p>

                            {/* Evidence Tags */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 'bold', color: '#5a4a42', marginBottom: '0.5rem' }}>EVIDENCE LOG (TECH)</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {c.tags.map(t => (
                                        <span key={t} style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.7rem',
                                            color: '#111',
                                            background: '#d4c5ab', // Darker parchment tag
                                            padding: '4px 8px',
                                            border: '1px solid rgba(0,0,0,0.2)',
                                            boxShadow: '1px 1px 0 rgba(0,0,0,0.1)'
                                        }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', borderTop: '1px dashed rgba(0,0,0,0.2)', paddingTop: '1.5rem' }}>
                                <a href={c.live} target="_blank" rel="noopener noreferrer"
                                    style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.1em', color: '#e8dcc4', background: '#2a201c', padding: '10px', textDecoration: 'none', transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.target.style.background = '#4a3a30'}
                                    onMouseLeave={e => e.target.style.background = '#2a201c'}
                                >
                                    OPEN CASE FILE
                                </a>
                                <a href={c.github} target="_blank" rel="noopener noreferrer"
                                    style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.1em', color: '#2a201c', background: 'transparent', border: '2px solid #2a201c', padding: '8px', textDecoration: 'none', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.target.style.background = '#2a201c'; e.target.style.color = '#e8dcc4'; }}
                                    onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#2a201c'; }}
                                >
                                    VIEW SOURCE
                                </a>
                            </div>

                            {/* Hover Reveal Stamp (Hidden by default, shown via CSS on hover) */}
                            <div className="hover-stamp" style={{
                                position: 'absolute',
                                bottom: '40%',
                                right: '10%',
                                border: '3px solid rgba(180,40,40,0.4)',
                                color: 'rgba(180,40,40,0.4)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                padding: '5px 10px',
                                transform: 'rotate(-15deg)',
                                pointerEvents: 'none',
                                opacity: 0,
                                transition: 'opacity 0.3s'
                            }}>
                                REVIEWED
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Injected CSS for hover effects */}
            <style>{`
                .case-file-card:hover .hover-stamp {
                    opacity: 1 !important;
                }
            `}</style>
        </section>
    );
}
