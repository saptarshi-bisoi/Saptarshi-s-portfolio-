import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useAudio } from './InvestigationAudio'

const DEVFEST_CAROUSEL = [
    '/devfest-kolkata-1.webp',
    '/devfest-kolkata-2.webp',
    '/devfest-kolkata-3.webp',
    '/devfest-kolkata-4.webp',
    '/devfest-kolkata-5.webp',
    '/devfest-kolkata-6.webp',
    '/devfest-kolkata-7.webp',
]

const MISSIONS = [
    {
        id: '001',
        title: 'DevFest Kolkata 2025',
        location: 'Kolkata, IN',
        date: '21 Dec 2025',
        img: DEVFEST_CAROUSEL[0],
        carousel: DEVFEST_CAROUSEL,
        objective: 'Attend Google Developer Groups DevFest Kolkata 2025 — explore cutting-edge web & AI technologies.',
        findings: 'Networked with developers, attended AI/ML sessions, captured the community energy across 7 field-evidence frames.'
    },
    {
        id: '002',
        title: 'Midnight Hackathon',
        location: 'Innovation Hub',
        date: '2024',
        img: '/mission-hackathon.png',
        carousel: null,
        objective: 'Build a functional prototype within 24 hours.',
        findings: 'Implemented real-time data sync, survived on caffeine, and learned deep async patterns.'
    },
    {
        id: '003',
        title: 'Tech Meetup',
        location: 'Community Center',
        date: '2023',
        img: '/mission-meetup.png',
        carousel: null,
        objective: 'Connect with local developers and share knowledge on React patterns.',
        findings: 'Discussed architectural trade-offs and built a stronger local developer network.'
    },
    {
        id: '004',
        title: 'Coding Workshop',
        location: 'Institute of Tech',
        date: '2023',
        img: '/mission-workshop.png',
        carousel: null,
        objective: 'Mentor junior developers in modern CSS and responsive design.',
        findings: 'Successfully guided 20+ students through complex layout puzzles.'
    }
]

// ── Carousel sub-component ───────────────────────────────────────────────────
function DevFestCarousel({ images }) {
    const [current, setCurrent] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length])
    const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length])

    // Auto-advance every 2.5 s — pause on hover
    useEffect(() => {
        if (isHovered) return
        const t = setInterval(next, 2500)
        return () => clearInterval(t)
    }, [isHovered, next])

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#111' }}
        >
            <AnimatePresence mode="wait">
                <motion.img
                    key={current}
                    src={images[current]}
                    alt={`DevFest photo ${current + 1}`}
                    loading="lazy"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.08) contrast(1.1)', display: 'block' }}
                />
            </AnimatePresence>

            {/* Prev / Next buttons */}
            <button
                onClick={e => { e.stopPropagation(); prev() }}
                style={arrowBtn('left')}
                aria-label="Previous"
            >‹</button>
            <button
                onClick={e => { e.stopPropagation(); next() }}
                style={arrowBtn('right')}
                aria-label="Next"
            >›</button>

            {/* Dot indicators */}
            <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px', zIndex: 5 }}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={e => { e.stopPropagation(); setCurrent(i) }}
                        style={{
                            width: i === current ? '18px' : '6px',
                            height: '6px',
                            borderRadius: '3px',
                            background: i === current ? 'var(--color-gold, #c8a44d)' : 'rgba(255,255,255,0.4)',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'width 0.3s, background 0.3s'
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Film-strip overlay badge */}
            <div style={{
                position: 'absolute', top: '8px', left: '8px',
                background: 'rgba(0,0,0,0.7)', color: 'var(--color-gold, #c8a44d)',
                fontFamily: 'var(--font-mono, monospace)', fontSize: '0.5rem',
                padding: '3px 7px', letterSpacing: '0.08em', borderRadius: '2px',
                backdropFilter: 'blur(4px)', border: '1px solid rgba(200,164,77,0.3)'
            }}>
                {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>
        </div>
    )
}

function arrowBtn(side) {
    return {
        position: 'absolute',
        top: '50%',
        [side]: '6px',
        transform: 'translateY(-50%)',
        background: 'rgba(0,0,0,0.55)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '50%',
        width: '26px',
        height: '26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        lineHeight: 1,
        cursor: 'pointer',
        zIndex: 5,
        backdropFilter: 'blur(4px)',
        transition: 'background 0.2s'
    }
}


export default function FieldInvestigations() {
    const [selected, setSelected] = useState(null)
    const [lightboxIndex, setLightboxIndex] = useState(0)
    const { playSFX } = useAudio()

    const handleSelect = (m) => {
        playSFX('shutter')
        setSelected(m)
        setLightboxIndex(0)
    }

    const lightboxImages = selected?.carousel ?? (selected ? [selected.img] : [])

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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: '48px 32px',
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

                            {/* Image or Carousel */}
                            <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#eee' }}>
                                {m.carousel ? (
                                    <DevFestCarousel images={m.carousel} />
                                ) : (
                                    <img src={m.img} alt={m.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.1) contrast(1.1)' }} />
                                )}
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

            {/* ── Lightbox / Mission Detail Drawer ── */}
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
                            maxWidth: '860px', width: '100%',
                            display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) 1fr',
                            borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                        onClick={e => e.stopPropagation()}
                        className="mission-lightbox-grid"
                    >
                        {/* Left panel — carousel or single image */}
                        <div style={{ background: '#000', position: 'relative', minHeight: '320px' }}>
                            {lightboxImages.length > 1 ? (
                                <LightboxCarousel
                                    images={lightboxImages}
                                    index={lightboxIndex}
                                    setIndex={setLightboxIndex}
                                />
                            ) : (
                                <img src={selected.img} alt={selected.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
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
                                LOCATION: {selected.location}<br />
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

                            {selected.carousel && (
                                <div style={{ marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(0,0,0,0.4)' }}>
                                    📷 {selected.carousel.length} FIELD EVIDENCE FRAMES — use ‹ › to navigate
                                </div>
                            )}

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
                @media (max-width: 700px) {
                    .mission-lightbox-grid {
                        grid-template-columns: 1fr !important;
                        max-height: 90vh;
                        overflow-y: auto;
                    }
                    .mission-detail-content { padding: 1.5rem !important; }
                }
            `}</style>
        </section>
    )
}

// ── Lightbox-sized carousel (inside the modal) ────────────────────────────────
function LightboxCarousel({ images, index, setIndex }) {
    const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
    const next = () => setIndex(i => (i + 1) % images.length)

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '320px', background: '#000', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
                <motion.img
                    key={index}
                    src={images[index]}
                    alt={`Evidence ${index + 1}`}
                    loading="lazy"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
            </AnimatePresence>

            <button onClick={prev} style={{ ...arrowBtn('left'), width: '32px', height: '32px', fontSize: '1.2rem' }}>‹</button>
            <button onClick={next} style={{ ...arrowBtn('right'), width: '32px', height: '32px', fontSize: '1.2rem' }}>›</button>

            {/* Counter */}
            <div style={{
                position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.7)', color: 'var(--color-gold, #c8a44d)',
                fontFamily: 'var(--font-mono, monospace)', fontSize: '0.55rem',
                padding: '4px 10px', borderRadius: '2px', letterSpacing: '0.1em',
                border: '1px solid rgba(200,164,77,0.3)'
            }}>
                {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>

            {/* Thumbnail strip */}
            <div style={{
                position: 'absolute', bottom: '38px', left: 0, right: 0,
                display: 'flex', justifyContent: 'center', gap: '4px', padding: '4px'
            }}>
                {images.map((src, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                            width: '32px', height: '24px', overflow: 'hidden',
                            border: i === index ? '2px solid var(--color-gold, #c8a44d)' : '2px solid rgba(255,255,255,0.15)',
                            cursor: 'pointer', opacity: i === index ? 1 : 0.55,
                            transition: 'opacity 0.2s, border 0.2s', borderRadius: '2px', flexShrink: 0
                        }}
                    >
                        <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                ))}
            </div>
        </div>
    )
}
