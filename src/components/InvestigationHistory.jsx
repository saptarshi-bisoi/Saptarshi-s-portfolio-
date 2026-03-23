import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const missions = [
    {
        id: 'M-01',
        role: 'Technical Lead', 
        org: 'TechTribe ICVP',
        period: 'Jul 2025 — Present', 
        type: 'Operation Leader',
        desc: "Directing all technical field operations for the tech club. Orchestrating hackathons, managing the developer syndicate, and engineering the club's digital footprint.",
        status: 'ACTIVE', 
        statusColor: '#2b7a2b', // Faded green
        align: 'left',
        image: '/techtribeImg02.jpg',
        logo: '/techtribeicvp_logo.jpg',
        rotation: -2
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
        align: 'right',
        image: '/open_source_connect_Img03.jpg',
        logo: '/open_source_connect_logo.jpg',
        rotation: 1
    },
    {
        id: 'M-03',
        role: 'Web Development Intern', 
        org: 'Ardent Computech Pvt Ltd',
        period: 'May 2025 — Jun 2025', 
        type: 'Field Agent',
        desc: 'Investigated frontend anomalies, constructed responsive architectural layouts, and delivered classified production UI components under tight deadlines.',
        status: 'VERIFIED', 
        statusColor: '#b8860b', // Faded gold
        align: 'left',
        image: '/CERTIFICATE_Ardent02_page-0001.jpg',
        logo: '/ardentinternships_logo.jpg',
        rotation: -1
    },
];

export default function InvestigationHistory() {
    const containerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Track scroll progress within this specific section to draw the line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedImage]);

    return (
        <section id="experience" ref={containerRef} style={{
            position: 'relative',
            backgroundColor: '#110e0c', // Deep cinematic charcoal
            padding: '10rem 1.5rem',
            overflow: 'hidden'
        }}>
            {/* Image Preview Modal (Lightbox) */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(10, 8, 7, 0.95)',
                            zIndex: 99999, // Ensure it's above everything including navbar
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem',
                            cursor: 'zoom-out',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <motion.img 
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            src={selectedImage}
                            alt="Full Screen Evidence"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(200, 164, 77, 0.2)',
                                borderRadius: '4px'
                            }}
                        />
                        
                        {/* Close Indicator */}
                        <div style={{ 
                            position: 'absolute', 
                            top: '2rem', 
                            right: '2rem', 
                            color: 'rgba(200, 164, 77, 0.8)', 
                            cursor: 'pointer', 
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '2px',
                            fontWeight: 'bold',
                            border: '1px solid rgba(200, 164, 77, 0.4)',
                            padding: '8px 16px',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: '2px'
                        }}>
                            [ ESC / CLICK AWAY ]
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ambient Background with subtle grain */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(138, 90, 68, 0.08) 0%, rgba(17, 14, 12, 0.95) 100%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* Fog overlay for atmosphere */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
                pointerEvents: 'none',
                zIndex: 1
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
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(200,164,77,0.5)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        // Department Personnel Log
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#e8dcc4', margin: 0, fontWeight: 900, textShadow: '0 5px 15px rgba(0,0,0,0.8)' }}>
                        INVESTIGATION <span style={{ color: 'var(--color-gold)' }}>HISTORY</span>
                    </h2>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'rgba(232,224,208,0.6)', marginTop: '1rem', fontStyle: 'italic' }}>
                        A classified timeline of missions undertaken and cases closed.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div style={{ position: 'relative', maxWidth: '850px', margin: '0 auto' }}>
                    
                    {/* The Central Line Background (Faint) */}
                    <div className="timeline-line-bg" style={{
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-1px',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        backgroundColor: 'rgba(200, 164, 77, 0.05)',
                    }} />

                    {/* The Animated Draw Line */}
                    <motion.div className="timeline-draw-line" style={{
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-1px',
                        top: 0,
                        height: lineHeight,
                        width: '2px',
                        background: 'linear-gradient(to bottom, rgba(200, 164, 77, 0.8) 0%, rgba(180, 40, 40, 0.8) 50%, rgba(200, 164, 77, 0.8) 100%)',
                        boxShadow: '0 0 15px rgba(200, 164, 77, 0.5)',
                        zIndex: 1
                    }} />

                    {/* Missions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                        {missions.map((m, i) => (
                            <TimelineItem 
                                key={m.id} 
                                mission={m} 
                                index={i} 
                                onImageClick={() => setSelectedImage(m.image)} 
                            />
                        ))}
                    </div>

                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .timeline-line-bg, .timeline-draw-line { left: 40px !important; margin-left: 0 !important; }
                    .timeline-card-wrapper { 
                        width: 100% !important; 
                        padding-left: 70px !important;
                        justify-content: flex-start !important;
                    }
                    .timeline-node { left: 40px !important; margin-left: -9px !important; }
                    .timeline-card { width: 100% !important; padding: 1.2rem !important; }
                }
            `}</style>
        </section>
    );
}

// Sub-component for individual timeline entries structured exactly like physical case files
function TimelineItem({ mission, index, onImageClick }) {
    const isLeft = mission.align === 'left';
    
    return (
        <div style={{ 
            position: 'relative', 
            display: 'flex', 
            justifyContent: isLeft ? 'flex-start' : 'flex-end',
            width: '100%',
            perspective: '1000px' // For subtle parallax/3D effect
        }} className="timeline-card-wrapper">
            
            {/* The Glowing Timeline Node */}
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '10%', // Positioned near the top of the card
                    marginLeft: '-9px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#110e0c',
                    border: '3px solid var(--color-gold)',
                    zIndex: 5,
                    boxShadow: '0 0 20px rgba(200, 164, 77, 0.8), inset 0 0 4px rgba(200, 164, 77, 0.5)'
                }}
                className="timeline-node"
            >
                {/* Connecting horizontal bracket (Desktop only) */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: isLeft ? 'auto' : '15px',
                    right: isLeft ? '15px' : 'auto',
                    width: '30px',
                    height: '2px',
                    backgroundColor: 'rgba(200, 164, 77, 0.3)',
                    marginTop: '-1px',
                    opacity: '0.5'
                }} className="hidden md:block" />
            </motion.div>

            {/* The Cinematic "Case File" Card */}
            <motion.div 
                initial={{ opacity: 0, x: isLeft ? -40 : 40, rotateY: isLeft ? 5 : -5 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ type: 'spring', stiffness: 50, damping: 15, delay: index * 0.1 }}
                whileHover="hover"
                style={{
                    width: '46%',
                    backgroundColor: '#181513', // Cinematic dark board/folder
                    border: '1px solid rgba(200, 164, 77, 0.15)',
                    padding: '2rem',
                    borderRadius: '4px',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.6)',
                    color: '#e8dcc4',
                    position: 'relative',
                    zIndex: 2,
                    transformStyle: 'preserve-3d'
                }}
                className="timeline-card cinematic-case-file"
            >
                {/* CSS Scanlines Overlay */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px) 0 0 / 100% 4px',
                    opacity: 0.6,
                    borderRadius: '4px'
                }} />

                {/* Hover Glow Spotlight */}
                <motion.div 
                    variants={{
                        hover: { opacity: 0.7, scale: 1.1 }
                    }}
                    style={{
                        position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
                        background: 'radial-gradient(circle at center, rgba(200,164,77,0.08) 0%, transparent 50%)',
                        pointerEvents: 'none', opacity: 0.2, transition: 'opacity 0.4s easeOut'
                    }}
                />

                {/* Header: Logo and Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
                    {/* Small Elegant Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ 
                            width: '40px', height: '40px', 
                            borderRadius: '4px', overflow: 'hidden', 
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            padding: '4px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <img src={mission.logo} alt="Organization Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.8, filter: 'grayscale(30%)' }} />
                        </div>
                        <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 'bold', color: 'rgba(200, 164, 77, 0.7)', letterSpacing: '2px', display: 'block', marginBottom: '2px' }}>
                                OP-ID: {mission.id}
                            </span>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 900, margin: 0, color: '#e8dcc4', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                {mission.org}
                            </h3>
                        </div>
                    </div>
                    
                    {/* Status Stamp */}
                    <div style={{ 
                        border: `2px solid ${mission.statusColor}`,
                        padding: '4px 10px',
                        color: mission.statusColor,
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        letterSpacing: '1px',
                        transform: 'rotate(8deg)',
                        opacity: 0.9,
                        textShadow: '0 0 8px rgba(0,0,0,0.5)',
                        boxShadow: `0 0 15px ${mission.statusColor}30, inset 0 0 8px ${mission.statusColor}30`,
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '2px'
                    }}>
                        {mission.status}
                    </div>
                </div>

                {/* MAIN EVIDENCE IMAGE (Physical Document) */}
                <motion.div 
                    onClick={onImageClick}
                    variants={{
                        hover: { 
                            rotate: 0, // Tilt correction 
                            scale: 1.05, 
                            y: -8, 
                            boxShadow: '0 30px 50px rgba(0,0,0,0.9), 0 0 30px rgba(200,164,77,0.15)'
                        }
                    }}
                    transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                    style={{
                        position: 'relative',
                        marginBottom: '2.5rem',
                        transform: `rotate(${mission.rotation}deg)`,
                        backgroundColor: '#e8dcc4', // Glossy photo border / parchment base
                        padding: '8px 8px 30px 8px', // Physical photo realistic border
                        borderRadius: '2px',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.2)',
                        zIndex: 15,
                        cursor: 'zoom-in' // Indicates it's clickable for preview
                    }}
                >
                    {/* Red Thumbtack / Pin */}
                    <div style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#8a2b2b',
                        borderRadius: '50%',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.8), inset -3px -3px 5px rgba(0,0,0,0.4), inset 2px 2px 5px rgba(255,100,100,0.4)',
                        zIndex: 11
                    }}>
                         {/* Pin highlight */}
                        <div style={{ position: 'absolute', top: '2px', left: '3px', width: '3px', height: '3px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%' }} />
                    </div>

                    <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#000', borderRadius: '1px' }}>
                        <motion.img 
                            src={mission.image} 
                            alt="Visual Evidence"
                            variants={{
                                hover: { filter: 'contrast(1.05) sepia(0) brightness(1)' } // Reveal details
                            }}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                display: 'block',
                                filter: 'contrast(1.1) sepia(0.2) brightness(0.85) saturate(0.9)', // Cinematic color grade
                                transition: 'filter 0.4s ease'
                            }} 
                        />
                        {/* Image Inner Vignette */}
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.7) 100%)', pointerEvents: 'none' }} />
                        
                        {/* Expand Icon Overlay on Hover */}
                        <motion.div
                            variants={{
                                hover: { opacity: 1 }
                            }}
                            initial={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'rgba(0,0,0,0.4)',
                                color: 'rgba(200, 164, 77, 0.9)',
                                pointerEvents: 'none',
                                backdropFilter: 'blur(2px)' // Slight blur for cinematic effect
                            }}
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <polyline points="9 21 3 21 3 15"></polyline>
                                <line x1="21" y1="3" x2="14" y2="10"></line>
                                <line x1="3" y1="21" x2="10" y2="14"></line>
                            </svg>
                        </motion.div>

                        {/* Faint Red Target Reticle */}
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            width: '100px', height: '100px', border: '1px solid rgba(180,40,40,0.15)', borderRadius: '50%', pointerEvents: 'none'
                        }}>
                             <div style={{ position: 'absolute', top: '-10px', bottom: '-10px', left: '50%', width: '1px', background: 'rgba(180,40,40,0.15)' }} />
                             <div style={{ position: 'absolute', left: '-10px', right: '-10px', top: '50%', height: '1px', background: 'rgba(180,40,40,0.15)' }} />
                        </div>
                    </div>
                </motion.div>

                {/* TYPEWRITER TEXT CONTENT (Mission Report) */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                    {/* Meta details */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1.2rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 'bold', color: '#161210', background: 'rgba(200, 164, 77, 0.9)', padding: '5px 10px', borderRadius: '1px', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            {mission.role}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(200, 164, 77, 0.7)', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(0,0,0,0.4)', padding: '5px 10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <i className="fas fa-clock" /> {mission.period}
                        </span>
                    </div>

                    {/* Report Description */}
                    <p style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.85rem', 
                        lineHeight: 1.7, 
                        color: 'rgba(232, 224, 208, 0.85)', 
                        backgroundColor: 'rgba(0,0,0,0.4)', 
                        padding: '1.5rem', 
                        borderLeft: '2px solid rgba(200, 164, 77, 0.5)', 
                        margin: 0,
                        textShadow: '0 1px 2px rgba(0,0,0,0.9)',
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
                    }}>
                        {mission.desc}
                    </p>
                </div>

            </motion.div>
        </div>
    );
}
