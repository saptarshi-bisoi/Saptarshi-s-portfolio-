import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';

// ─── Constellation Nodes Data ────────────────────────────────
const NODES = [
    { id: 'html',   name: 'HTML5',      icon: 'fa-brands fa-html5',     color: '#e34f26', depth: 1.0, pos: [18, 28], desc: 'Semantic structure and the skeleton of every digital scene.', skillLevel: 95, projects: ['Designer Portfolio', 'Age Calculator'] },
    { id: 'css',    name: 'CSS3',       icon: 'fa-brands fa-css3-alt',  color: '#1572b6', depth: 0.7, pos: [34, 55], desc: 'Visual forensics — presentation layer of the investigation.', skillLevel: 90, projects: ['Happy Holi Studio', 'Designer Portfolio'] },
    { id: 'js',     name: 'JavaScript', icon: 'fa-brands fa-js',        color: '#c8a44d', depth: 1.0, pos: [52, 22], desc: 'Primary engine for logic, interaction, and dynamic behavior.', skillLevel: 88, projects: ['Dice of Wisdom', 'Age Calculator'] },
    { id: 'react',  name: 'React',      icon: 'fa-brands fa-react',     color: '#61dafb', depth: 0.9, pos: [70, 42], desc: 'Component architecture for reactive, state-driven interfaces.', skillLevel: 85, projects: ['MediScan AI', 'Designer Portfolio'] },
    { id: 'python', name: 'Python',     icon: 'fa-brands fa-python',    color: '#4b8bbe', depth: 0.6, pos: [82, 68], desc: 'Backend intelligence — data processing and algorithmic logic.', skillLevel: 80, projects: ['MediScan AI', 'Data Scripts'] },
    { id: 'git',    name: 'Git',        icon: 'fa-brands fa-git-alt',   color: '#f05032', depth: 0.8, pos: [25, 74], desc: 'Version history — every timeline and alternate reality tracked.', skillLevel: 90, projects: ['All Projects'] },
    { id: 'tw',     name: 'Tailwind',   icon: 'fa-solid fa-wind',       color: '#38bdf8', depth: 0.7, pos: [62, 72], desc: 'Utility-class rapid deployment for precise, tactical styling.', skillLevel: 85, projects: ['Designer Portfolio', 'Dashboard UI'] },
    { id: 'ts',     name: 'TypeScript', icon: 'fa-brands fa-js',        color: '#3178c6', depth: 0.5, pos: [10, 58], desc: 'Typed intelligence — enforcing contracts across the codebase.', skillLevel: 75, projects: ['Designer Portfolio', 'Enterprise Logic'] },
    { id: 'node',   name: 'Node.js',    icon: 'fa-brands fa-node-js',   color: '#68a063', depth: 0.6, pos: [44, 80], desc: 'Server-side runtime for high-performance back-channel operations.', skillLevel: 80, projects: ['Backend APIs', 'Automation Scripts'] },
    { id: 'figma',  name: 'Figma',      icon: 'fa-brands fa-figma',     color: '#a259ff', depth: 0.5, pos: [88, 25], desc: 'Design intelligence — visual prototyping and UI system architecture.', skillLevel: 85, projects: ['Web Designs', 'Asset Creation'] },
    { id: 'vite',   name: 'Vite',       icon: 'fa-solid fa-bolt',       color: '#bd34fe', depth: 0.4, pos: [76, 14], desc: 'Blazing-fast build system for rapid front-end field deployment.', skillLevel: 90, projects: ['Happy Holi Studio', 'Next Gen React'] },
    { id: 'gh',     name: 'GitHub',     icon: 'fa-brands fa-github',    color: '#c9d1d9', depth: 0.4, pos: [6,  20], desc: 'Central archive — collaborative case file management.', skillLevel: 95, projects: ['Open Source Connect', 'Version Control'] },
    { id: 'vercel', name: 'Vercel',     icon: 'fa-solid fa-triangle-exclamation', color: '#e8e0d0', depth: 0.5, pos: [90, 52], desc: 'Deployment intelligence — instant global delivery of investigation interfaces.', skillLevel: 90, projects: ['All Frontend Apps'] },
    { id: 'cpp',    name: 'C++',        icon: 'fa-solid fa-code',       color: '#00599c', depth: 0.45, pos: [40, 12], desc: 'Low-level systems language — precision engineering at the machine level.', skillLevel: 70, projects: ['Competitive Programming', 'Core Algorithms'] },
    { id: 'java',   name: 'Java',       icon: 'fa-brands fa-java',      color: '#f89820', depth: 0.55, pos: [15, 88], desc: 'Object-oriented powerhouse — platform-independent mission-critical logic.', skillLevel: 75, projects: ['Enterprise Systems', 'Desktop Tools'] },
];

const FLOAT_CONFIGS = NODES.map((_, i) => ({
    x:  [0, (i % 2 === 0 ? 1 : -1) * (6 + (i % 4) * 2), 0],
    y:  [0, (i % 3 === 0 ? -1 : 1) * (5 + (i % 3) * 3), 0],
    rot:[0, (i % 2 === 0 ? 3 : -3), 0],
    dur: 5 + (i % 5) * 1.4,
}));

const getDust = (isMobile) => Array.from({ length: isMobile ? 15 : 65 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2 + 0.5,
    dur: Math.random() * 30 + 15,
    del: Math.random() * 15,
    col: i % 4 === 0 ? 'rgba(56,189,248,0.6)'
       : i % 4 === 1 ? 'rgba(200,164,77,0.4)'
       : i % 4 === 2 ? 'rgba(97,218,251,0.35)'
       : 'rgba(255,255,255,0.2)',
}));

const CONNECTIONS = [
    ['html','css'],['html','js'],['js','react'],['js','ts'],
    ['react','tw'],['css','tw'],['python','node'],
    ['git','gh'],['vite','react'],['figma','react'],
    ['ts','react'],['node','react'],['git','js'],
];

// ─── Case Detail Modal Panel ─────────────────────────────
function CaseDetailPanel({ selectedNode, onClose }) {
    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!selectedNode) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', inset: 0,
                    zIndex: 99999, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(4, 6, 10, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '2rem'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                    className="case-detail-modal"
                    style={{
                        width: '100%', maxWidth: '500px',
                        background: '#0d1117',
                        border: `1px solid ${selectedNode.color}60`,
                        borderRadius: '4px',
                        padding: '2.5rem',
                        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), 0 0 30px ${selectedNode.color}20`,
                        position: 'relative',
                        overflow: 'hidden' // for scanline
                    }}
                >
                    {/* Inner Panel Scanline */}
                    <motion.div
                        animate={{ top: ['-10%', '110%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute', left: 0, right: 0, height: '2px',
                            background: `linear-gradient(90deg, transparent, ${selectedNode.color}80, transparent)`,
                            boxShadow: `0 0 10px ${selectedNode.color}`,
                            zIndex: 0, pointerEvents: 'none'
                        }}
                    />

                    {/* Close button */}
                    <button onClick={onClose} style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        background: 'transparent', border: 'none',
                        color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem',
                        cursor: 'pointer', zIndex: 10
                    }}>
                        <i className="fas fa-times" />
                    </button>

                    <div style={{ position: 'relative', zIndex: 2 }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: `1px solid ${selectedNode.color}40`, paddingBottom: '1rem' }}>
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                background: `radial-gradient(circle, ${selectedNode.color}30, transparent)`,
                                border: `1px solid ${selectedNode.color}80`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 0 15px ${selectedNode.color}40`
                            }}>
                                <i className={selectedNode.icon} style={{ fontSize: '1.8rem', color: selectedNode.color, textShadow: `0 0 10px ${selectedNode.color}80` }} />
                            </div>
                            <div>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em' }}>
                                    NODE CLASSIFICATION: TECH
                                </span>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#e8dcc4', margin: '0', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                    {selectedNode.name}
                                </h3>
                            </div>
                        </div>

                        {/* Description */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: selectedNode.color, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                                &gt; INTELLIGENCE BRIEF
                            </span>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(232,224,208,0.8)', lineHeight: 1.6, margin: 0 }}>
                                {selectedNode.desc}
                            </p>
                        </div>

                        {/* Skill Level Bar */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.1em' }}>
                                    [VERIFIED SKILL METRIC]
                                </span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#fff' }}>
                                    {selectedNode.skillLevel}%
                                </span>
                            </div>
                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${selectedNode.skillLevel}%` }}
                                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                    style={{ height: '100%', background: selectedNode.color, boxShadow: `0 0 10px ${selectedNode.color}` }}
                                />
                            </div>
                        </div>

                        {/* Projects Using Tech */}
                        <div>
                            <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(56,189,248,0.8)', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>
                                &gt; ESTABLISHED DATALINKS (PROJECTS)
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {selectedNode.projects.map(proj => (
                                    <span key={proj} style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                                        background: 'rgba(255,255,255,0.05)', color: '#e8dcc4',
                                        padding: '4px 8px', border: `1px solid rgba(255,255,255,0.1)`,
                                        borderRadius: '2px'
                                    }}>
                                        {proj}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ─── Scanner ring ───────────────────────────────────────
function ScannerRing() {
    return (
        <motion.div
            animate={{ scale: [0, 3.5], opacity: [0.7, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: 'easeOut' }}
            style={{
                position: 'absolute',
                width: 120, height: 120,
                borderRadius: '50%',
                border: '1px solid rgba(56,189,248,0.5)',
                boxShadow: '0 0 30px rgba(56,189,248,0.3), inset 0 0 15px rgba(56,189,248,0.1)',
                left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none', zIndex: 3,
            }}
        />
    );
}

// ─── Single Evidence Node ────────────────────────────────
function EvidenceNode({ node, floatCfg, activated, activationDelay, onClick }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 180, damping: 22 });
    const sy = useSpring(my, { stiffness: 180, damping: 22 });

    const size = 40 + node.depth * 36;           // 40–76px
    const glowSize = size * 1.8; // Larger glow for cinematic feel

    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        mx.set(dx); my.set(dy);
    }, [mx, my]);

    const handleMouseLeave = useCallback(() => {
        setHovered(false);
        mx.set(0); my.set(0);
    }, [mx, my]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0 }}
            animate={activated ? {
                opacity: node.depth * 0.55 + 0.45,
                scale: 1,
            } : {}}
            transition={{
                delay: activationDelay,
                type: 'spring', stiffness: 80, damping: 14,
            }}
            onClick={() => onClick(node)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                position: 'absolute',
                left: `${node.pos[0]}%`,
                top:  `${node.pos[1]}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: hovered ? 30 : Math.round(node.depth * 10),
                cursor: 'pointer', // Changed to pointer for clickability
            }}
        >
            <motion.div
                animate={{ x: floatCfg.x, y: floatCfg.y, rotate: floatCfg.rot }}
                transition={{ duration: floatCfg.dur, repeat: Infinity, ease: 'easeInOut' }}
                style={{ x: sx, y: sy }}
            >
                {/* Intense Outer Glow halo */}
                <motion.div
                    animate={hovered
                        ? { scale: [1, 1.4, 1], opacity: [0.6, 0.9, 0.6] }
                        : { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: hovered ? 1.5 : 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        width: glowSize, height: glowSize,
                        borderRadius: '50%',
                        left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: `radial-gradient(circle, ${node.color}60 0%, transparent 70%)`,
                        filter: `blur(${hovered ? 8 : 5}px)`,
                        pointerEvents: 'none',
                    }}
                />

                {/* Node Core */}
                <motion.div 
                    animate={hovered ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                        width: size, height: size,
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `radial-gradient(circle at 30% 30%, ${node.color}40, rgba(4,6,10,0.95))`,
                        border: `1.5px solid ${node.color}${ hovered ? '90' : '40'}`,
                        boxShadow: hovered
                            ? `0 0 30px ${node.color}80, inset 0 0 15px ${node.color}60`
                            : `0 0 15px ${node.color}30`,
                        transition: 'border 0.3s, box-shadow 0.3s',
                        backdropFilter: 'blur(8px)',
                        position: 'relative',
                    }}
                >
                    <i
                        className={node.icon}
                        style={{
                            color: node.color,
                            fontSize: size * 0.46,
                            textShadow: `0 0 ${hovered ? 15 : 5}px ${node.color}`,
                            transition: 'text-shadow 0.3s',
                        }}
                    />
                    {/* Blinking Dot Accent */}
                    <motion.div 
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                            position: 'absolute', top: 4, right: 5,
                            width: 5, height: 5, borderRadius: '50%',
                            background: node.color,
                            boxShadow: `0 0 6px ${node.color}`,
                        }} 
                    />
                </motion.div>

                {/* Status Tags */}
                <div style={{
                    textAlign: 'center', marginTop: 10,
                    fontFamily: 'var(--font-mono)',
                    fontSize: `${0.45 + node.depth * 0.15}rem`,
                    letterSpacing: '0.15em',
                    color: hovered ? node.color : `${node.color}90`,
                    textTransform: 'uppercase',
                    transition: 'all 0.3s',
                    textShadow: hovered ? `0 0 10px ${node.color}90` : 'none',
                    whiteSpace: 'nowrap',
                    background: hovered ? 'rgba(0,0,0,0.5)' : 'transparent',
                    padding: hovered ? '2px 6px' : '0',
                    borderRadius: '2px',
                    border: hovered ? `1px solid ${node.color}40` : 'none'
                }}>
                    {node.name}
                </div>

                {/* Hover Analysis Panel - Replaced by click modal, but keeping a tiny tooltip for info */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.94 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                bottom: `calc(100% + 20px)`,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 160,
                                background: 'rgba(5,7,12,0.95)',
                                border: `1px solid ${node.color}60`,
                                borderRadius: 2,
                                padding: '8px 10px',
                                boxShadow: `0 10px 30px rgba(0,0,0,0.8), 0 0 15px ${node.color}20`,
                                pointerEvents: 'none',
                                zIndex: 50,
                            }}
                        >
                            <span style={{ position:'absolute', top:0, left:0, width:4, height:4, background:node.color }}/>
                            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.45rem', letterSpacing:'0.1em', color:'var(--color-gold)', marginBottom:3 }}>
                                [ ACTIVE NODE ]
                            </div>
                            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'rgba(255,255,255,0.6)', lineHeight: 1.3 }}>
                                Click to access detailed case file.
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

// ─── Constellation Lines (Data Flow) ─────────────────────────────────
function ConstellationLines({ activated }) {
    const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]));
    return (
        <svg
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:1 }}
            preserveAspectRatio="none"
        >
            {CONNECTIONS.map(([a, b], i) => {
                const na = nodeMap[a], nb = nodeMap[b];
                if (!na || !nb) return null;
                return (
                    <g key={`${a}-${b}`}>
                        {/* Static faint background line */}
                        <motion.line
                            x1={`${na.pos[0]}%`} y1={`${na.pos[1]}%`}
                            x2={`${nb.pos[0]}%`} y2={`${nb.pos[1]}%`}
                            stroke={`rgba(56,189,248,0.15)`}
                            strokeWidth={1}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={activated ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ delay: 1.2 + i * 0.08, duration: 1, ease: 'easeOut' }}
                        />
                        {/* Animated pulsing data flow line overlay */}
                        {activated && (
                            <motion.line
                                x1={`${na.pos[0]}%`} y1={`${na.pos[1]}%`}
                                x2={`${nb.pos[0]}%`} y2={`${nb.pos[1]}%`}
                                stroke={`rgba(56,189,248,0.8)`}
                                strokeWidth={2}
                                strokeDasharray="10 60"
                                initial={{ strokeDashoffset: 70, opacity: 0 }}
                                animate={{ strokeDashoffset: 0, opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
                                style={{ filter: 'drop-shadow(0 0 4px rgba(56,189,248,0.8))' }}
                            />
                        )}
                    </g>
                );
            })}
        </svg>
    );
}


// ─── Main Export ─────────────────────────────────────────
export default function EvidenceLocker() {
    const sectionRef = useRef(null);
    const isInView  = useInView(sectionRef, { once:true, margin:'-100px' });
    const [activated,   setActivated]   = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
    const [dustParticles, setDustParticles] = useState([]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        setDustParticles(getDust(window.innerWidth < 768));
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Global Parallax Drift
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });
    
    // Reverse movement for the background stages
    const stageX = useTransform(smoothX, value => value * -0.02);
    const stageY = useTransform(smoothY, value => value * -0.02);

    useEffect(() => {
        if (isInView && !activated) setActivated(true);
    }, [isInView, activated]);

    const handleGlobalMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        mouseX.set(e.clientX - cx);
        mouseY.set(e.clientY - cy);
    };

    return (
        <section
            ref={sectionRef}
            id="skills"
            onMouseMove={handleGlobalMouseMove}
            style={{
                position:'relative',
                backgroundColor:'#05070a', // Deep cinematic intelligence dark
                padding:'6rem 0 4rem',
                overflow:'hidden',
                minHeight:'100vh',
            }}
        >
            <CaseDetailPanel selectedNode={selectedNode} onClose={() => setSelectedNode(null)} />

            {/* ── Immersive Vignette & Glow ── */}
            <div style={{
                position:'absolute', inset:0, pointerEvents:'none', zIndex: 5,
                boxShadow:'inset 0 0 150px rgba(0,0,0,0.9)',
            }}/>
            
            <div style={{
                position:'absolute', inset:0, pointerEvents:'none',
                background:'radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.08) 0%, rgba(200,164,77,0.03) 30%, transparent 80%)',
            }}/>

            {/* ── Cinematic Blueprint Grid ── */}
            <div style={{
                position:'absolute', inset:0, pointerEvents:'none',
                opacity: 0.8,
                backgroundImage:`
                    linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)
                `,
                backgroundSize:'60px 60px',
            }}/>
            {/* Fine Sub-grid */}
            <div style={{
                position:'absolute', inset:0, pointerEvents:'none',
                opacity: 0.3,
                backgroundImage:`
                    linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)
                `,
                backgroundSize:'15px 15px',
            }}/>

            {/* ── Full Screen Scanning Line Overlay ── */}
            {activated && (
                <motion.div
                    initial={{ top: '-10%' }}
                    animate={{ top: '110%' }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute', left: 0, right: 0, height: '4px',
                        background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent)',
                        boxShadow: '0 0 30px rgba(56,189,248,0.2)',
                        pointerEvents: 'none', zIndex: 10
                    }}
                />
            )}

            {/* ── Dust Particles ── */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1 }}>
                {dustParticles.map(p => (
                    <motion.div
                        key={p.id}
                        animate={{ opacity:[0,0.8,0], y:[`${p.y}%`, `${p.y-10}%`] }}
                        transition={{ duration:p.dur, repeat:Infinity, delay:p.del, ease:'linear' }}
                        style={{
                            position:'absolute', left:`${p.x}%`, top:`${p.y}%`,
                            width:p.s, height:p.s, borderRadius:'50%',
                            background:p.col, filter: isMobile ? 'none' : 'blur(1px)', // remove blur on mobile for perf
                        }}
                    />
                ))}
            </div>



            {/* ── Header ── */}
            <motion.div
                initial={{ opacity:0, y:24 }}
                animate={activated ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.8 }}
                style={{ textAlign:'center', padding:'0 1.5rem', marginBottom:'2.5rem', position:'relative', zIndex:20 }}
            >
                <div style={{
                    display: 'inline-block', padding: '4px 12px', border: '1px solid rgba(56,189,248,0.4)',
                    background: 'rgba(56,189,248,0.05)', borderRadius: '2px', marginBottom: '1rem'
                }}>
                    <p style={{
                        fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                        letterSpacing:'0.3em', color:'rgba(56,189,248,0.8)',
                        textTransform:'uppercase', margin: 0
                    }}><i className="fas fa-satellite-dish" style={{ marginRight: '8px' }}></i> Forensic Analysis Network</p>
                </div>
                <h2 style={{
                    fontFamily:'var(--font-heading)',
                    fontSize:'clamp(2.2rem,5vw,3.8rem)',
                    color:'#f0ece4', margin:0, fontWeight:900,
                    textShadow:'0 0 40px rgba(56,189,248,0.4)',
                }}>
                    EVIDENCE <span style={{ color:'var(--color-gold)', textShadow:'0 0 25px rgba(200,164,77,0.5)' }}>LOCKER</span>
                </h2>
            </motion.div>

            {/* ── Constellation Stage (With Parallax) ── */}
            <motion.div className="constellation-stage" style={{
                position:'relative',
                width:'100%',
                maxWidth:1100,
                margin:'0 auto',
                height:'clamp(520px, 65vh, 750px)',
                zIndex:10,
                x: stageX,
                y: stageY,
            }}>
                {/* Connection lines */}
                <ConstellationLines activated={activated} />

                {/* Scanner ring */}
                {activated && <ScannerRing />}

                {/* Evidence Nodes */}
                {NODES.map((node, i) => (
                    <EvidenceNode
                        key={node.id}
                        node={node}
                        floatCfg={FLOAT_CONFIGS[i]}
                        activated={activated}
                        activationDelay={0.6 + Math.random() * 0.9}
                        onClick={setSelectedNode}
                    />
                ))}
            </motion.div>

            {/* ── Status Bar ── */}
            <motion.div
                initial={{ opacity:0 }}
                animate={activated ? { opacity:1 } : {}}
                transition={{ delay:2.5 }}
                style={{
                    textAlign:'center', marginTop:'1.5rem',
                    fontFamily:'var(--font-mono)', fontSize:'0.6rem',
                    color:'rgba(56,189,248,0.6)', letterSpacing:'0.25em',
                    textTransform:'uppercase', position:'relative', zIndex:10,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                }}
            >
                <motion.div 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                    style={{ width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', boxShadow: '0 0 8px #38bdf8' }}
                />
                <span>{NODES.length} EVIDENCE NODES ACTIVE — CONSTELLATION MAPPED</span>
            </motion.div>

            <style>{`
                @media (max-width: 768px) {
                    .constellation-stage { transform: scale(0.65) !important; transform-origin: center center !important; height: 50vh !important; }
                    .case-detail-modal { padding: 1.5rem !important; margin: 1rem !important; }
                }
            `}</style>
        </section>
    );
}
