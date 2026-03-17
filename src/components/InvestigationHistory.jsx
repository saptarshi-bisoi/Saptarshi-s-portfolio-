import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const missions = [
    {
        id: 'M-01',
        role: 'Technical Lead', 
        org: 'TechTribe ICVP',
        period: 'Jul 2025 — Present', 
        type: 'Operation Leader',
        desc: 'Directing all technical field operations for the tech club. Orchestrating hackathons, managing the developer syndicate, and engineering the club\'s digital footprint.',
        status: 'ACTIVE', 
        statusColor: '#2b7a2b', // Faded green
        align: 'left'
    },
    {
        id: 'M-02',
        role: 'Open Source Contributor', 
        org: 'Open Source Connect',
        period: '2024 — Present', 
        type: 'Global Informant',
        desc: 'Collaborating securely with developers across borders on open-source repositories. Recognized internationally as a NexFellow contributor.',
        status: 'ACTIVE', 
        statusColor: '#2b7a2b',
        align: 'right'
    },
    {
        id: 'M-03',
        role: 'Web Development Intern', 
        org: 'Ardent Computech Pvt Ltd',
        period: 'May 2025 — Jun 2025', 
        type: 'Field Agent',
        desc: 'Investigated frontend anomalies, constructed responsive architectural layouts, and delivered classified production UI components under tight deadlines.',
        status: 'CLOSED', 
        statusColor: '#8a2b2b', // Faded red
        align: 'left'
    },
];

export default function InvestigationHistory() {
    const containerRef = useRef(null);
    
    // Track scroll progress within this specific section to draw the line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" ref={containerRef} style={{
            position: 'relative',
            backgroundColor: '#161210', // Deep charcoal board
            padding: '10rem 1.5rem',
            overflow: 'hidden'
        }}>
            {/* Ambient Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(138, 90, 68, 0.08) 0%, rgba(20, 15, 12, 0.95) 100%)',
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '8rem' }}
                >
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(232,224,208,0.5)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        // Department Personnel Log
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#e8dcc4', margin: 0, fontWeight: 900 }}>
                        INVESTIGATION <span style={{ color: 'var(--color-gold)' }}>HISTORY</span>
                    </h2>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'rgba(232,224,208,0.7)', marginTop: '1rem', fontStyle: 'italic' }}>
                        A classified timeline of missions undertaken and cases closed.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                    
                    {/* The Central Line Background (Faint) */}
                    <div className="timeline-line-bg" style={{
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-1px',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        backgroundColor: 'rgba(200, 164, 77, 0.1)',
                    }} />

                    {/* The Animated Draw Line */}
                    <motion.div style={{
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-1px',
                        top: 0,
                        height: lineHeight,
                        width: '2px',
                        background: 'linear-gradient(to bottom, rgba(200, 164, 77, 0.8), rgba(180, 40, 40, 0.8))',
                        boxShadow: '0 0 10px rgba(200, 164, 77, 0.5)',
                        zIndex: 1
                    }} />

                    {/* Missions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                        {missions.map((m, i) => (
                            <TimelineItem key={m.id} mission={m} index={i} />
                        ))}
                    </div>

                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .timeline-line-bg { left: 30px !important; margin-left: 0 !important; }
                    .timeline-card-wrapper { 
                        width: 100% !important; 
                        padding-left: 60px !important;
                        justify-content: flex-start !important;
                    }
                    .timeline-node { left: 30px !important; margin-left: -9px !important; }
                    .timeline-card { width: 100% !important; }
                }
            `}</style>
        </section>
    );
}

// Sub-component for individual timeline entries
function TimelineItem({ mission }) {
    const isLeft = mission.align === 'left';
    
    return (
        <div style={{ 
            position: 'relative', 
            display: 'flex', 
            justifyContent: isLeft ? 'flex-start' : 'flex-end',
            width: '100%'
        }} className="timeline-card-wrapper">
            
            {/* The Glowing Node */}
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-9px',
                    marginTop: '-9px',
                    width: '18px', // Slightly larger for better visibility over the line
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#161210',
                    border: '3px solid var(--color-gold)',
                    zIndex: 5,
                    boxShadow: '0 0 15px rgba(200, 164, 77, 0.6)'
                }}
                className="timeline-node"
            />

            {/* The Card */}
            <motion.div 
                initial={{ opacity: 0, x: isLeft ? -50 : 50, rotate: isLeft ? -2 : 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: isLeft ? -1 : 1 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                whileHover={{ scale: 1.02, rotate: 0, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
                transition={{ type: 'spring', stiffness: 50, damping: 12, delay: 0.1 }}
                style={{
                    width: '45%',
                    backgroundColor: '#e8dcc4', // Parchment paper
                    backgroundImage: 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)',
                    backgroundSize: '10px 10px',
                    padding: '2rem',
                    borderRadius: '2px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                    color: '#2a201c',
                    position: 'relative',
                    zIndex: 2
                }}
                className="timeline-card"
            >
                {/* Red Target Reticle Watermark (Subtle) */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '150px',
                    height: '150px',
                    border: '1px solid rgba(180,40,40,0.05)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}>
                    <div style={{ position: 'absolute', top: '-10px', bottom: '-10px', left: '50%', width: '1px', background: 'rgba(180,40,40,0.05)' }} />
                    <div style={{ position: 'absolute', left: '-10px', right: '-10px', top: '50%', height: '1px', background: 'rgba(180,40,40,0.05)' }} />
                </div>

                {/* Header block */}
                <div style={{ borderBottom: '2px solid rgba(0,0,0,0.8)', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 'bold', color: '#5a4a42', display: 'block', marginBottom: '4px' }}>OPERATION ID: {mission.id}</span>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, m: 0 }}>{mission.org}</h3>
                    </div>
                    
                    {/* Status Stamp */}
                    <div style={{ 
                        border: `2px solid ${mission.statusColor}`,
                        padding: '3px 8px',
                        color: mission.statusColor,
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        letterSpacing: '1px',
                        transform: 'rotate(5deg)',
                        mixBlendMode: 'multiply',
                        opacity: 0.8
                    }}>
                        {mission.status}
                    </div>
                </div>

                {/* Meta details */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 'bold', color: '#111', background: 'rgba(0,0,0,0.05)', padding: '4px 8px', border: '1px solid rgba(0,0,0,0.1)' }}>
                        {mission.role}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#5a4a42', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <i className="fas fa-clock" /> {mission.period}
                    </span>
                </div>

                {/* Typewriter Description */}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.6, backgroundColor: 'rgba(0,0,0,0.02)', padding: '1rem', borderLeft: '3px solid #654321', margin: 0 }}>
                    {mission.desc}
                </p>

            </motion.div>
        </div>
    );
}
