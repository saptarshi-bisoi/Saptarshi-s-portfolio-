import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAudio } from './InvestigationAudio'

const MISSIONS = [
    {
        id: '001',
        title: 'DevFest Kolkata',
        location: 'Kolkata, IN',
        date: '2024',
        img: '/mission-devfest.png',
        objective: 'Attend developer conference and explore modern web technologies.',
        findings: 'Networked with developers, attended AI sessions, and discovered new tools for web development.'
    },
    {
        id: '002',
        title: 'Midnight Hackathon',
        location: 'Innovation Hub',
        date: '2024',
        img: '/mission-hackathon.png',
        objective: 'Build a functional prototype within 24 hours.',
        findings: 'Implemented real-time data sync, survived on caffeine, and learned deep async patterns.'
    },
    {
        id: '003',
        title: 'Tech Meetup',
        location: 'Community Center',
        date: '2023',
        img: '/mission-meetup.png',
        objective: 'Connect with local developers and share knowledge on React patterns.',
        findings: 'Discussed architectural trade-offs and built a stronger local developer network.'
    },
    {
        id: '004',
        title: 'Coding Workshop',
        location: 'Institue of Tech',
        date: '2023',
        img: '/mission-workshop.png',
        objective: 'Mentor junior developers in modern CSS and responsive design.',
        findings: 'Successfully guided 20+ students through complex layout puzzles.'
    }
]

export default function FieldInvestigations() {
    const [selected, setSelected] = useState(null)
    const { playSFX } = useAudio()

    const handleSelect = (m) => {
        playSFX('shutter')
        setSelected(m)
    }

    return (
        <section id="investigations" className="section-pad" style={{ background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
            <div className="dossier-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', zIndex: 0 }} />
            
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
                <div className="section-header" style={{ textAlign: 'left', marginBottom: '4rem' }}>
                    <span className="section-tag">// Archive Entry #04</span>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'var(--color-text-light)' }}>
                        Field <span className="accent">Investigations</span>
                    </h2>
                    <p className="section-desc" style={{ maxWidth: '500px', margin: '0.5rem 0' }}>
                        Documenting missions across the tech landscape — evidence of learning, building, and community engagement.
                    </p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', 
                    gap: '40px',
                    alignItems: 'start'
                }}>
                    {MISSIONS.map((m, i) => (
                        <motion.div 
                            key={m.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                            onMouseEnter={() => playSFX('click')}
                            style={{ 
                                background: 'white', 
                                padding: '12px 12px 60px 12px', 
                                boxShadow: 'var(--shadow-card)',
                                position: 'relative',
                                cursor: 'pointer',
                                transform: `rotate(${(i % 2 === 0 ? 1 : -1) * ((i % 3) + 1)}deg)`
                            }}
                            onClick={() => handleSelect(m)}
                        >
                            {/* Pin Icon */}
                            <div style={{ 
                                position: 'absolute', 
                                top: '-10px', 
                                left: '50%', 
                                transform: 'translateX(-50%)',
                                color: 'var(--color-red)',
                                fontSize: '1.2rem',
                                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }}>
                                <i className="fas fa-thumbtack" />
                            </div>

                            <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#eee' }}>
                                <img src={m.img} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.1) contrast(1.1)' }} />
                            </div>

                            <div style={{ marginTop: '12px' }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    Mission Log #{m.id}
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-text-dark)', margin: '4px 0' }}>
                                    {m.title}
                                </h3>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-red)', fontWeight: 700 }}>
                                    {m.location} • {m.date}
                                </div>
                            </div>

                            {/* Label Tape Effect */}
                            <div style={{ 
                                position: 'absolute', 
                                bottom: '15px', 
                                right: '-10px', 
                                background: 'var(--color-gold)', 
                                color: 'var(--color-bg)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.55rem',
                                padding: '4px 12px',
                                transform: 'rotate(-5deg)',
                                boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'
                            }}>
                                CLASSIFIED
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Mission Detail Drawer */}
            {selected && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ 
                        position: 'fixed', inset: 0, zIndex: 1000, 
                        background: 'rgba(10,12,16,0.95)', backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
                    }}
                    onClick={() => setSelected(null)}
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        style={{ 
                            background: 'var(--color-parchment)', 
                            maxWidth: '800px', width: '100%', 
                            display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr',
                            borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ background: '#000', height: '100%' }}>
                            <img src={selected.img} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="mission-detail-content" style={{ padding: '3rem', color: 'var(--color-text-dark)', position: 'relative' }}>
                            <button 
                                onClick={() => setSelected(null)}
                                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'rgba(0,0,0,0.3)' }}
                            >
                                <i className="fas fa-times" />
                            </button>

                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-red)', marginBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.1)', pb: '0.5rem' }}>
                                MISSION LOG #{selected.id} / CONFIDENTIAL
                            </div>

                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>{selected.title}</h2>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', opacity: 0.6, marginBottom: '2rem' }}>
                                LOCATION: {selected.location}<br/>
                                DATE: {selected.date}
                            </p>

                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>Objective</h4>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{selected.objective}</p>
                            </div>

                            <div>
                                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>Findings</h4>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{selected.findings}</p>
                            </div>

                            {/* Decorative Stamp */}
                            <div style={{ 
                                marginTop: '3rem', border: '3px solid var(--color-red)', color: 'var(--color-red)', 
                                padding: '10px 20px', display: 'inline-block', fontFamily: 'var(--font-mono)', 
                                fontWeight: 700, fontSize: '0.9rem', transform: 'rotate(-10deg)', opacity: 0.8 
                            }}>
                                VERIFIED
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    div[style*="gridTemplateColumns: minmax(300px, 1fr) 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                    .mission-detail-content { padding: 1.5rem !important; }
                }
            `}</style>
        </section>
    )
}
