import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useAudio } from './InvestigationAudio'

const FILMS = [
    {
        id: 'film-01',
        title: 'Feludar Goyendagiri',
        img: '/film-01.png',
        influence: 'Shows how establishing character quirks early strengthens audience connection.'
    },
    {
        id: 'film-02',
        title: 'Double Feluda',
        img: '/film-02.png',
        influence: 'Demonstrates handling multiple intertwined plots within the same cinematic space.'
    },
    {
        id: 'film-03',
        title: 'Feluda Ferot',
        img: '/film-03.png',
        influence: 'A modern adaptation that preserves the nostalgic core while updating visual language.'
    },
    {
        id: 'film-04',
        title: 'Shabash Feluda',
        img: '/film-04.png',
        influence: 'A study in high-stakes pacing and intense, action-oriented mystery storytelling.'
    },
    {
        id: 'film-05',
        title: 'Shabash Feluda (Variant)',
        img: '/film-05.png',
        influence: 'Showcases how bold visual framing and lighting can amplify the mood of a thriller.'
    },
    ...[
        'audio-case-01.png',
        'audio-case-02.png',
        'audio-case-03.png',
        'audio-case-04.png',
        'audio-case-05.png',
        'audio-case-06.png',
        'audio-case-07.png',
        'audio-case-08.png'
    ].map((imgUrl, i) => ({
        id: `audio-case-${i}`,
        title: `Audio Case File 00${i + 1}`,
        img: `/${imgUrl}`,
        influence: 'Thrilling audio investigations that rely purely on sound design, voice modulation, and atmosphere to build tension.'
    }))
]

export default function CinematicCaseFiles() {
    const [selected, setSelected] = useState(null)
    const [showAll, setShowAll] = useState(false)
    const { playSFX } = useAudio()

    const handleOpen = (f) => {
        playSFX('paper')
        setSelected(f)
    }



    return (
        <section id="cinematic" className="section-pad" style={{ background: 'var(--color-bg)', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="section-tag">// Archive Entry #05</span>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'var(--color-text-light)' }}>
                        Cinematic <span className="accent">Case Files</span>
                    </h2>
                    <p className="section-desc" style={{ maxWidth: '600px', margin: '1rem auto' }}>
                        Films and series that shaped my sense of storytelling, mystery design, and visual thinking.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '30px'
                }}>
                    {(showAll ? FILMS : FILMS.slice(0, 5)).map((f, i) => (
                        <div key={f.id} className="flip-card"
                            onMouseEnter={() => playSFX('paper')}
                            onClick={() => handleOpen(f)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="flip-card-inner">
                                {/* Front Side: Poster */}
                                <div className="flip-card-front" style={{
                                    background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                }}>
                                    <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        padding: '20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))'
                                    }}>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'white' }}>{f.title}</h3>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '0.1em' }}>VIEW NOTES</div>
                                    </div>
                                </div>

                                {/* Back Side: Investigation Note */}
                                <div className="flip-card-back" style={{
                                    background: 'var(--color-parchment)',
                                    color: 'var(--color-text-dark)',
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 0)',
                                    backgroundSize: '20px 20px'
                                }}>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-red)', marginBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                        INVESTIGATION NOTE: {f.id}
                                    </div>
                                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '1rem' }}>{f.title}</h4>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Influence</div>
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.8 }}>{f.influence}</p>

                                    <div style={{ marginTop: 'auto', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', opacity: 0.4 }}>
                                        REF: CINETEST-B-0{i + 1}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {FILMS.length > 5 && (
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button
                            className="btn-primary"
                            onClick={() => {
                                playSFX('click')
                                setShowAll(!showAll)
                            }}
                            style={{
                                padding: '12px 30px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.9rem',
                                letterSpacing: '0.1em'
                            }}
                        >
                            {showAll ? 'LESS FILES' : 'VIEW ALL FILES'}
                        </button>
                    </div>
                )}
            </div>

            {/* Case File Drawer Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1000,
                            background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'absolute', top: 0, right: 0, bottom: 0,
                                width: '100%', maxWidth: '500px',
                                background: 'var(--color-bg)', borderLeft: '1px solid var(--color-border-gold)',
                                padding: '4rem 2rem', overflowY: 'auto',
                                boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelected(null)}
                                style={{ position: 'absolute', top: '30px', left: '30px', background: 'none', border: 'none', color: 'var(--color-gold)', fontSize: '1.5rem', cursor: 'pointer' }}
                            >
                                <i className="fas fa-arrow-left" />
                            </button>

                            <div style={{ marginTop: '2rem' }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>// ARCHIVE REPORT</div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-text-light)', marginBottom: '2rem' }}>CASE FILE: {selected.title}</h2>

                                <div style={{ width: '100%', height: '300px', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem', border: '1px solid var(--color-border)' }}>
                                    <img src={selected.img} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>

                                <div style={{ fontFamily: 'var(--font-mono)', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <h4 style={{ color: 'var(--color-red)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>OBJECTIVE</h4>
                                        <p style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>Study world-building and narrative pacing through visual storytelling.</p>
                                    </div>
                                    <div>
                                        <h4 style={{ color: 'var(--color-red)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>INFLUENCE REPORT</h4>
                                        <p style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>{selected.influence}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .flip-card {
                    perspective: 1000px;
                    height: 400px;
                }
                .flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
                    transform-style: preserve-3d;
                }
                .flip-card:hover .flip-card-inner {
                    transform: rotateY(180deg);
                }
                .flip-card-front, .flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                }
                .flip-card-back {
                    transform: rotateY(180deg);
                }
            `}</style>
        </section>
    )
}
