import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';

// ─── Constellation Nodes ────────────────────────────────
// position: [x%, y%]  |  depth: 1=close, 0=far
const NODES = [
    { id: 'html',   name: 'HTML5',      icon: 'fa-brands fa-html5',     color: '#e34f26', depth: 1.0, pos: [18, 28], desc: 'Semantic structure and the skeleton of every digital scene.' },
    { id: 'css',    name: 'CSS3',       icon: 'fa-brands fa-css3-alt',  color: '#1572b6', depth: 0.7, pos: [34, 55], desc: 'Visual forensics — presentation layer of the investigation.' },
    { id: 'js',     name: 'JavaScript', icon: 'fa-brands fa-js',        color: '#c8a44d', depth: 1.0, pos: [52, 22], desc: 'Primary engine for logic, interaction, and dynamic behavior.' },
    { id: 'react',  name: 'React',      icon: 'fa-brands fa-react',     color: '#61dafb', depth: 0.9, pos: [70, 42], desc: 'Component architecture for reactive, state-driven interfaces.' },
    { id: 'python', name: 'Python',     icon: 'fa-brands fa-python',    color: '#4b8bbe', depth: 0.6, pos: [82, 68], desc: 'Backend intelligence — data processing and algorithmic logic.' },
    { id: 'git',    name: 'Git',        icon: 'fa-brands fa-git-alt',   color: '#f05032', depth: 0.8, pos: [25, 74], desc: 'Version history — every timeline and alternate reality tracked.' },
    { id: 'tw',     name: 'Tailwind',   icon: 'fa-solid fa-wind',       color: '#38bdf8', depth: 0.7, pos: [62, 72], desc: 'Utility-class rapid deployment for precise, tactical styling.' },
    { id: 'ts',     name: 'TypeScript', icon: 'fa-brands fa-js',        color: '#3178c6', depth: 0.5, pos: [10, 58], desc: 'Typed intelligence — enforcing contracts across the codebase.' },
    { id: 'node',   name: 'Node.js',    icon: 'fa-brands fa-node-js',   color: '#68a063', depth: 0.6, pos: [44, 80], desc: 'Server-side runtime for high-performance back-channel operations.' },
    { id: 'figma',  name: 'Figma',      icon: 'fa-brands fa-figma',     color: '#a259ff', depth: 0.5, pos: [88, 25], desc: 'Design intelligence — visual prototyping and UI system architecture.' },
    { id: 'vite',   name: 'Vite',       icon: 'fa-solid fa-bolt',       color: '#bd34fe', depth: 0.4, pos: [76, 14], desc: 'Blazing-fast build system for rapid front-end field deployment.' },
    { id: 'gh',      name: 'GitHub',  icon: 'fa-brands fa-github',    color: '#c9d1d9', depth: 0.4, pos: [6,  20], desc: 'Central archive — collaborative case file management platform.' },
    { id: 'vercel',  name: 'Vercel',  icon: 'fa-solid fa-triangle-exclamation', color: '#e8e0d0', depth: 0.5, pos: [90, 52], desc: 'Deployment intelligence — instant global delivery of investigation interfaces.' },
    { id: 'cpp',     name: 'C++',     icon: 'fa-solid fa-code',       color: '#00599c', depth: 0.45, pos: [40, 12], desc: 'Low-level systems language — precision engineering at the machine level.' },
    { id: 'java',    name: 'Java',    icon: 'fa-brands fa-java',      color: '#f89820', depth: 0.55, pos: [15, 88], desc: 'Object-oriented powerhouse — platform-independent mission-critical logic.' },
];

// fixed float paths per node (so they don't re-randomize)
const FLOAT_CONFIGS = NODES.map((_, i) => ({
    x:  [0, (i % 2 === 0 ? 1 : -1) * (6 + (i % 4) * 2), 0],
    y:  [0, (i % 3 === 0 ? -1 : 1) * (5 + (i % 3) * 3), 0],
    rot:[0, (i % 2 === 0 ? 3 : -3), 0],
    dur: 5 + (i % 5) * 1.4,
}));

// ─── Pixel dust ─────────────────────────────────────────
const DUST = Array.from({ length: 55 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 1.6 + 0.4,
    dur: Math.random() * 22 + 12,
    del: Math.random() * 9,
    col: i % 4 === 0 ? 'rgba(56,189,248,0.55)'
       : i % 4 === 1 ? 'rgba(200,164,77,0.35)'
       : i % 4 === 2 ? 'rgba(97,218,251,0.3)'
       : 'rgba(255,255,255,0.15)',
}));

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
                border: '1.5px solid rgba(56,189,248,0.6)',
                boxShadow: '0 0 20px rgba(56,189,248,0.25), inset 0 0 15px rgba(56,189,248,0.1)',
                left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none', zIndex: 3,
            }}
        />
    );
}

// ─── Single Evidence Node ────────────────────────────────
function EvidenceNode({ node, floatCfg, activated, activationDelay }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 180, damping: 22 });
    const sy = useSpring(my, { stiffness: 180, damping: 22 });

    const size = 40 + node.depth * 36;           // 40–76px
    const glowSize = size * 1.6;

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
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                position: 'absolute',
                left: `${node.pos[0]}%`,
                top:  `${node.pos[1]}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: hovered ? 30 : Math.round(node.depth * 10),
                cursor: 'crosshair',
            }}
        >
            {/* Idle float wrapper */}
            <motion.div
                animate={{ x: floatCfg.x, y: floatCfg.y, rotate: floatCfg.rot }}
                transition={{ duration: floatCfg.dur, repeat: Infinity, ease: 'easeInOut' }}
                style={{ x: sx, y: sy }}
            >
                {/* Outer glow halo */}
                <motion.div
                    animate={hovered
                        ? { scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }
                        : { scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }}
                    transition={{ duration: hovered ? 1.2 : 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        width: glowSize, height: glowSize,
                        borderRadius: '50%',
                        left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: `radial-gradient(circle, ${node.color}50 0%, transparent 70%)`,
                        filter: `blur(${hovered ? 6 : 4}px)`,
                        pointerEvents: 'none',
                    }}
                />

                {/* Icon circle */}
                <div style={{
                    width: size, height: size,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `radial-gradient(circle at 35% 35%, ${node.color}22, rgba(4,6,10,0.85))`,
                    border: `1px solid ${node.color}${ hovered ? '80' : '35'}`,
                    boxShadow: hovered
                        ? `0 0 24px ${node.color}60, 0 0 8px ${node.color}40 inset`
                        : `0 0 10px ${node.color}20`,
                    transition: 'border 0.3s, box-shadow 0.3s',
                    backdropFilter: 'blur(6px)',
                    position: 'relative',
                }}>
                    <i
                        className={node.icon}
                        style={{
                            color: node.color,
                            fontSize: size * 0.46,
                            filter: `drop-shadow(0 0 ${hovered ? 10 : 4}px ${node.color}90)`,
                            transition: 'filter 0.3s',
                        }}
                    />
                    {/* Tiny dot accent */}
                    <div style={{
                        position: 'absolute', top: 4, right: 5,
                        width: 4, height: 4, borderRadius: '50%',
                        background: node.color, opacity: 0.6,
                        boxShadow: `0 0 4px ${node.color}`,
                    }} />
                </div>

                {/* Name tag below */}
                <div style={{
                    textAlign: 'center', marginTop: 6,
                    fontFamily: 'var(--font-mono)',
                    fontSize: `${0.48 + node.depth * 0.18}rem`,
                    letterSpacing: '0.1em',
                    color: hovered ? node.color : `${node.color}90`,
                    textTransform: 'uppercase',
                    transition: 'color 0.3s',
                    textShadow: hovered ? `0 0 10px ${node.color}80` : 'none',
                    whiteSpace: 'nowrap',
                }}>
                    {node.name}
                </div>

                {/* Hover Analysis Panel */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.94 }}
                            transition={{ duration: 0.22 }}
                            style={{
                                position: 'absolute',
                                bottom: `calc(100% + 14px)`,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 190,
                                background: 'rgba(4,6,10,0.96)',
                                border: `1px solid ${node.color}40`,
                                borderRadius: 4,
                                padding: '10px 12px',
                                boxShadow: `0 8px 30px rgba(0,0,0,0.7), 0 0 15px ${node.color}15`,
                                pointerEvents: 'none',
                                zIndex: 50,
                            }}
                        >
                            {/* Corner marks */}
                            <span style={{ position:'absolute', top:3, left:3, width:6, height:6, borderTop:`1px solid ${node.color}70`, borderLeft:`1px solid ${node.color}70` }}/>
                            <span style={{ position:'absolute', bottom:3, right:3, width:6, height:6, borderBottom:`1px solid ${node.color}70`, borderRight:`1px solid ${node.color}70` }}/>

                            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.48rem', letterSpacing:'0.2em', color:'rgba(56,189,248,0.6)', marginBottom:4, textTransform:'uppercase' }}>
                                ▷ ANALYZED TOOL
                            </div>
                            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', fontWeight:700, color: node.color, marginBottom:5, letterSpacing:'0.05em' }}>
                                {node.name}
                            </div>
                            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.57rem', color:'rgba(240,236,228,0.65)', lineHeight:1.45 }}>
                                {node.desc}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

// ─── Constellation Lines ─────────────────────────────────
// Draw faint connecting lines between nearby nodes for the constellation feel
const CONNECTIONS = [
    ['html','css'],['html','js'],['js','react'],['js','ts'],
    ['react','tw'],['css','tw'],['python','node'],
    ['git','gh'],['vite','react'],['figma','react'],
    ['ts','react'],['node','react'],['git','js'],
];

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
                    <motion.line
                        key={`${a}-${b}`}
                        x1={`${na.pos[0]}%`} y1={`${na.pos[1]}%`}
                        x2={`${nb.pos[0]}%`} y2={`${nb.pos[1]}%`}
                        stroke={`rgba(56,189,248,0.12)`}
                        strokeWidth={0.8}
                        strokeDasharray="3 6"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={activated ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ delay: 1.2 + i * 0.08, duration: 0.8, ease: 'easeOut' }}
                    />
                );
            })}
        </svg>
    );
}

// ─── Init Overlay ────────────────────────────────────────
function InitOverlay({ onDone }) {
    const [step, setStep] = useState(0);
    const lines = [
        'EVIDENCE SYSTEM INITIALIZING...',
        'LOADING CONSTELLATION DATA',
        'MAPPING EVIDENCE NODES',
        'SYSTEM READY',
    ];
    useEffect(() => {
        if (step < lines.length) {
            setTimeout(() => setStep(s => s + 1), 480);
        } else {
            setTimeout(onDone, 300);
        }
    }, [step]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
                position:'absolute', inset:0, zIndex:60,
                display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center',
                background: 'rgba(2,4,8,0.92)',
                gap:'0.55rem',
                fontFamily:'var(--font-mono)',
                backdropFilter:'blur(2px)',
            }}
        >
            {/* Radial pulse */}
            <motion.div
                animate={{ scale:[0.3,2.5], opacity:[0.5,0] }}
                transition={{ duration:2.5, repeat:Infinity, ease:'easeOut' }}
                style={{
                    position:'absolute',
                    width:200, height:200,
                    borderRadius:'50%',
                    border:'1px solid rgba(56,189,248,0.5)',
                    left:'50%', top:'50%',
                    transform:'translate(-50%,-50%)',
                    pointerEvents:'none',
                }}
            />
            <motion.div
                animate={{ scale:[0.3,2], opacity:[0.3,0] }}
                transition={{ duration:2.5, repeat:Infinity, ease:'easeOut', delay:0.5 }}
                style={{
                    position:'absolute',
                    width:120, height:120,
                    borderRadius:'50%',
                    border:'1px solid rgba(200,164,77,0.4)',
                    left:'50%', top:'50%',
                    transform:'translate(-50%,-50%)',
                    pointerEvents:'none',
                }}
            />

            {lines.slice(0, step).map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity:0, x:-12 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ duration:0.3 }}
                    style={{
                        fontSize: i === 0 ? '0.95rem' : '0.62rem',
                        color: i === 0 ? '#38bdf8' : 'rgba(200,164,77,0.65)',
                        letterSpacing: i === 0 ? '0.3em' : '0.18em',
                        textTransform:'uppercase',
                        textShadow: i === 0 ? '0 0 18px rgba(56,189,248,0.8)' : 'none',
                    }}
                >
                    {i === 0 ? `▶ ${line}` : `  › ${line}`}
                </motion.div>
            ))}
            <motion.span
                animate={{ opacity:[1,0,1] }}
                transition={{ duration:0.7, repeat:Infinity }}
                style={{ color:'#38bdf8', fontSize:'1rem', marginTop:'0.3rem' }}
            >_</motion.span>
        </motion.div>
    );
}

// ─── Main Export ─────────────────────────────────────────
export default function EvidenceLocker() {
    const sectionRef = useRef(null);
    const isInView  = useInView(sectionRef, { once:true, margin:'-100px' });
    const [initialized, setInitialized] = useState(false);
    const [activated,   setActivated]   = useState(false);

    useEffect(() => {
        if (isInView && !initialized) setInitialized(true);
    }, [isInView]);

    const handleInitDone = () => setActivated(true);

    return (
        <section
            ref={sectionRef}
            id="skills"
            style={{
                position:'relative',
                backgroundColor:'#020408',
                padding:'6rem 0 4rem',
                overflow:'hidden',
                minHeight:'100vh',
            }}
        >
            {/* ── Dark gradient ── */}
            <div style={{
                position:'absolute', inset:0, pointerEvents:'none',
                background:'radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.04) 0%, rgba(200,164,77,0.025) 40%, transparent 70%)',
            }}/>

            {/* ── Grid ── */}
            <div style={{
                position:'absolute', inset:0, pointerEvents:'none',
                backgroundImage:`
                    linear-gradient(rgba(56,189,248,0.018) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(56,189,248,0.018) 1px, transparent 1px)
                `,
                backgroundSize:'55px 55px',
            }}/>

            {/* ── Dust Particles ── */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1 }}>
                {DUST.map(p => (
                    <motion.div
                        key={p.id}
                        animate={{ opacity:[0,0.7,0], y:[`${p.y}%`, `${p.y-14}%`] }}
                        transition={{ duration:p.dur, repeat:Infinity, delay:p.del, ease:'linear' }}
                        style={{
                            position:'absolute', left:`${p.x}%`, top:`${p.y}%`,
                            width:p.s, height:p.s, borderRadius:'50%',
                            background:p.col, filter:'blur(0.6px)',
                        }}
                    />
                ))}
            </div>

            {/* ── Init Overlay ── */}
            <AnimatePresence>
                {initialized && !activated && (
                    <InitOverlay key="init" onDone={handleInitDone} />
                )}
            </AnimatePresence>

            {/* ── Header ── */}
            <motion.div
                initial={{ opacity:0, y:24 }}
                animate={activated ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.8 }}
                style={{ textAlign:'center', padding:'0 1.5rem', marginBottom:'2.5rem', position:'relative', zIndex:10 }}
            >
                <p style={{
                    fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                    letterSpacing:'0.3em', color:'rgba(56,189,248,0.55)',
                    textTransform:'uppercase', marginBottom:'0.8rem',
                }}>// Evidence Constellation — Forensic Analysis System</p>
                <h2 style={{
                    fontFamily:'var(--font-heading)',
                    fontSize:'clamp(2.2rem,5vw,3.8rem)',
                    color:'#f0ece4', margin:0, fontWeight:900,
                    textShadow:'0 0 40px rgba(56,189,248,0.08)',
                }}>
                    EVIDENCE <span style={{ color:'var(--color-gold)', textShadow:'0 0 25px rgba(200,164,77,0.3)' }}>LOCKER</span>
                </h2>
                <motion.div
                    initial={{ scaleX:0 }}
                    animate={activated ? { scaleX:1 } : {}}
                    transition={{ duration:1.2, delay:0.3 }}
                    style={{
                        height:1,
                        background:'linear-gradient(90deg, transparent, rgba(56,189,248,0.45), rgba(200,164,77,0.3), transparent)',
                        margin:'1.5rem auto 0', maxWidth:420,
                    }}
                />
            </motion.div>

            {/* ── Constellation Stage ── */}
            <div style={{
                position:'relative',
                width:'100%',
                maxWidth:1100,
                margin:'0 auto',
                height:'clamp(520px, 65vh, 750px)',
                zIndex:10,
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
                    />
                ))}
            </div>

            {/* ── Status Bar ── */}
            <motion.div
                initial={{ opacity:0 }}
                animate={activated ? { opacity:1 } : {}}
                transition={{ delay:2.5 }}
                style={{
                    textAlign:'center', marginTop:'1.5rem',
                    fontFamily:'var(--font-mono)', fontSize:'0.58rem',
                    color:'rgba(56,189,248,0.3)', letterSpacing:'0.25em',
                    textTransform:'uppercase', position:'relative', zIndex:10,
                }}
            >
                <motion.span
                    animate={{ opacity:[1,0.3,1] }}
                    transition={{ duration:2.8, repeat:Infinity }}
                >
                    ● {NODES.length} EVIDENCE NODES ACTIVE — CONSTELLATION MAPPED
                </motion.span>
            </motion.div>
        </section>
    );
}
