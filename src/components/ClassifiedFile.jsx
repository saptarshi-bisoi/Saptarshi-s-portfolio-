import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ClassifiedFile() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate dust particles for background ambiance
        const pt = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 5
        }));
        setParticles(pt);
    }, []);

    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="about" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#1a1412', // Dark cork-board/wood background
            padding: '6rem 1rem'
        }}>
            {/* Ambient Background Texture */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(138, 90, 68, 0.1) 0%, rgba(20, 15, 12, 0.9) 80%)',
                mixBlendMode: 'multiply',
                pointerEvents: 'none'
            }} />

            {/* Floating Dust Particles */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
                        animate={{ opacity: [0, 0.3, 0], y: [`${p.y}vh`, `${p.y - 10}vh`] }}
                        transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            backgroundColor: 'rgba(232, 224, 208, 0.3)',
                            borderRadius: '50%',
                            filter: 'blur(1px)' // Soft focus dust
                        }}
                    />
                ))}
            </div>

            {/* Parallax Container for the Document */}
            <motion.div
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                    position: 'relative',
                    maxWidth: '800px',
                    width: '100%',
                    zIndex: 10
                }}
            >
                {/* The Paper Document */}
                <div style={{
                    backgroundColor: '#e8dcc4', // Aged parchment color
                    backgroundImage: 'radial-gradient(#d4c5ab 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    padding: 'clamp(2rem, 5vw, 4rem)',
                    borderRadius: '2px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 20px 20px 60px rgba(0,0,0,0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                    color: '#2a201c', // Dark faded ink
                }}>
                    {/* Coffee Stain Effect (Top Right) */}
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        border: '8px solid rgba(101, 67, 33, 0.1)',
                        filter: 'blur(2px)',
                        pointerEvents: 'none'
                    }} />
                    
                    {/* Second subtle coffee ring */}
                    <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '-30px',
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        border: '4px solid rgba(101, 67, 33, 0.08)',
                        filter: 'blur(1px)',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }} />

                    {/* Paper Fold Crease */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: '30%',
                        width: '1px',
                        background: 'linear-gradient(to right, rgba(0,0,0,0.05), transparent)',
                        pointerEvents: 'none'
                    }} />

                    {/* Red Thumbtack */}
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#a00',
                        borderRadius: '50%',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.5), inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,100,100,0.5)',
                        zIndex: 20
                    }}>
                        <div style={{ position: 'absolute', top: '10px', left: '6px', width: '1px', height: '15px', background: 'rgba(0,0,0,0.2)', transform: 'rotate(20deg)', zIndex: -1 }} />
                    </div>

                    {/* CLASSIFIED Stamp */}
                    <motion.div
                        initial={{ scale: 2, opacity: 0, rotate: -15 }}
                        whileInView={{ scale: 1, opacity: 0.7, rotate: -15 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 10 }}
                        style={{
                            position: 'absolute',
                            top: '40px',
                            right: '30px',
                            color: '#c22',
                            border: '4px solid #c22',
                            padding: '5px 15px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            letterSpacing: '4px',
                            zIndex: 10,
                            pointerEvents: 'none',
                            mixBlendMode: 'multiply',
                            filter: 'contrast(1.5) blur(0.5px)'
                        }}
                    >
                        CLASSIFIED
                    </motion.div>

                    {/* Document Content Container */}
                    <motion.div
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        style={{ position: 'relative', zIndex: 5 }}
                    >
                        {/* Header Box */}
                        <motion.div variants={itemVariants} style={{ borderBottom: '2px solid #3a2a22', paddingBottom: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 'bold', margin: 0, letterSpacing: '2px' }}>PERSONNEL FILE</h2>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', margin: '4px 0 0 0', opacity: 0.7 }}>DEPT. OF DIGITAL INVESTIGATIONS</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 'bold', margin: 0 }}>CASE ID: SB-001</p>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', margin: '4px 0 0 0', opacity: 0.7 }}>STATUS: ACTIVE</p>
                            </div>
                        </motion.div>

                        {/* Profile Info */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                            <div>
                                <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#5a4a42', marginBottom: '4px', fontWeight: 'bold' }}>SUBJECT NAME:</label>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: 0, color: '#1a100c' }}>SAPTARSHI BISOI</h3>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#5a4a42', marginBottom: '4px', fontWeight: 'bold' }}>DESIGNATION:</label>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', margin: 0, fontWeight: 'bold' }}>Digital Investigator — Frontend Developer</p>
                                </motion.div>
                            </div>

                            {/* Typewriter Description */}
                            <motion.div variants={itemVariants}>
                                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#5a4a42', marginBottom: '8px', fontWeight: 'bold' }}>BACKGROUND REPORT:</label>
                                <div style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    padding: '1rem',
                                    backgroundColor: 'rgba(0,0,0,0.03)',
                                    borderLeft: '3px solid #654321',
                                    position: 'relative'
                                }}>
                                    <p style={{ margin: 0 }}>A developer who approaches programming like solving a mystery — observing systems, tracing clues in code, debugging anomalies, and delivering elegant, optimized solutions.</p>
                                    
                                    {/* Hover Interactive Note */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        style={{
                                            position: 'absolute',
                                            bottom: '-20px',
                                            right: '-20px',
                                            backgroundColor: '#fffae6',
                                            padding: '8px 12px',
                                            border: '1px solid #ccc',
                                            boxShadow: '2px 4px 10px rgba(0,0,0,0.2)',
                                            fontFamily: '"Caveat", cursive', // Handwriting font
                                            fontSize: '1.1rem',
                                            color: '#0055a4', // Blue ink
                                            transform: 'rotate(-4deg)',
                                            zIndex: 20,
                                            cursor: 'help'
                                        }}
                                    >
                                        Highly resourceful in tight spots. - Chief Insp.
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Core Data Grids */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                            <motion.div variants={itemVariants}>
                                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#5a4a42', marginBottom: '8px', fontWeight: 'bold', borderBottom: '1px solid #c0b090', paddingBottom: '4px' }}>KNOWN ALIASES / SKILLS</label>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 'bold', lineHeight: 1.8 }}>
                                    HTML • CSS • JavaScript<br/>
                                    React • UI/UX • AI Integration
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants} style={{ position: 'relative' }}>
                                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#5a4a42', marginBottom: '8px', fontWeight: 'bold', borderBottom: '1px solid #c0b090', paddingBottom: '4px' }}>INVESTIGATION METHOD</label>
                                <ol style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', margin: '0', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                                    <li>Observe the system</li>
                                    <li>Gather evidence</li>
                                    <li>Test hypotheses</li>
                                    <li>Close the case</li>
                                </ol>

                                {/* Hover Interactive Note */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '-30px',
                                        backgroundColor: '#fffae6',
                                        padding: '4px 8px',
                                        border: '1px solid #ccc',
                                        boxShadow: '2px 4px 10px rgba(0,0,0,0.2)',
                                        fontFamily: '"Caveat", cursive', // Handwriting font
                                        fontSize: '1rem',
                                        color: '#a00', // Red ink
                                        transform: 'rotate(8deg)',
                                        zIndex: 20,
                                        cursor: 'help'
                                    }}
                                >
                                    Methodical.
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Footer / Location / Signature */}
                        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#5a4a42', marginBottom: '4px', fontWeight: 'bold' }}>BASE OF OPERATIONS</label>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', margin: 0, fontWeight: 'bold' }}>Kolkata, India</p>
                            </div>
                            
                            <div style={{ textAlign: 'right' }}>
                                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#5a4a42', marginBottom: '0', fontWeight: 'bold' }}>AUTHORIZED SIGNATURE</label>
                                <p style={{ 
                                    fontFamily: '"Caveat", cursive', // Signature font
                                    fontSize: '1.8rem', 
                                    margin: '-5px 0 0 0', 
                                    color: '#0b2b54', // Dark blue ink
                                    transform: 'rotate(-2deg)'
                                }}>
                                    "Solved digital mysteries from Kolkata to the DOM."
                                </p>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </motion.div>

            {/* Front Vignette */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)',
                pointerEvents: 'none',
                zIndex: 20
            }} />
        </section>
    );
}
