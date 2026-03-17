import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DetectiveBackground from './DetectiveBackground'

const quotes = [
    "Observe carefully.",
    "Deduce precisely.",
    "Deploy intelligently.",
]

export default function Hero() {
    const [qi, setQi] = useState(0)
    const [text, setText] = useState('')

    useEffect(() => {
        const q = quotes[qi]
        let i = 0; setText('')
        const iv = setInterval(() => {
            setText(q.slice(0, i + 1)); i++
            if (i >= q.length) { clearInterval(iv); setTimeout(() => setQi((qi + 1) % quotes.length), 2200) }
        }, 55)
        return () => clearInterval(iv)
    }, [qi])

    return (
        <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '6rem 1.5rem' }}>
            
            <DetectiveBackground />

            {/* Subtle vignette */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />

            {/* Detective Identity Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '640px', width: '100%' }}
            >
                {/* Radar scanner (Centered behind the text) */}
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: -1, pointerEvents: 'none', width: 'clamp(300px, 60vw, 600px)', aspectRatio: '1/1' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(200, 164, 77, 0.15)', position: 'relative', boxShadow: '0 0 40px rgba(200, 164, 77, 0.05) inset' }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            style={{ position: 'absolute', top: '50%', left: '50%', width: '50%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200, 164, 77, 0.4))', transformOrigin: 'left center' }}
                        />
                    </div>
                </div>

                {/* Classification */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    style={{ marginBottom: '2rem' }}>
                    <span className="case-label">Classification: Level 5 — Active</span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, color: 'var(--color-text-light)', lineHeight: 0.95, marginBottom: '1rem' }}
                >
                    Saptarshi<br />
                    <span style={{ color: 'var(--color-gold)' }}>Bisoi</span>
                </motion.h1>

                {/* Gold divider */}
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.5 }}
                    className="gold-line" style={{ marginBottom: '1.25rem' }} />

                {/* Title */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-dim)', marginBottom: '0.5rem' }}>
                    Digital Investigator — Frontend Developer & Designer
                </motion.p>

                {/* Typewriter */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-text-dim)', fontStyle: 'italic', height: '28px', marginBottom: '2.5rem' }}>
                    "{text}<span style={{ display: 'inline-block', width: '2px', height: '16px', background: 'var(--color-gold)', marginLeft: '2px', verticalAlign: 'text-bottom', animation: 'pulse 1s infinite' }} />"
                </motion.p>

                {/* 3 Investigation buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}
                >
                    <motion.a href="#projects" className="btn btn-gold" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                        <i className="fas fa-folder-open" /> Case Files
                    </motion.a>
                    <motion.a href="#skills" className="btn btn-outline" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                        <i className="fas fa-toolbox" /> Evidence Toolkit
                    </motion.a>
                    <motion.a href="#experience" className="btn btn-outline" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                        <i className="fas fa-clock-rotate-left" /> Investigation Log
                    </motion.a>
                </motion.div>

                {/* Location */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,224,208,0.15)', marginTop: '3rem' }}>
                    📍 21 Rajani Sen Road, Kolkata
                </motion.p>

                {/* Curiosity Hook Line */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--color-text-dim)', fontStyle: 'italic', marginTop: '2.5rem', marginBottom: '1rem' }}>
                    "Every bug is a mystery. Every interface is a puzzle."
                </motion.p>

            </motion.div>

            {/* Scroll hint (Positioned at absolute bottom) */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
                <motion.p animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(232,224,208,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    ▼ Begin Investigation
                </motion.p>
            </motion.div>

            <style>{`@keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0 } }`}</style>
        </section>
    )
}
