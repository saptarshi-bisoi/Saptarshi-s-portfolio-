import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

export default function MissionTracker() {
    const { scrollYProgress } = useScroll()


    const [percent, setPercent] = useState(0)
    const [filesReviewed, setFilesReviewed] = useState(1)
    const totalFiles = 7

    useEffect(() => {
        return scrollYProgress.onChange((v) => {
            const p = Math.round(v * 100)
            setPercent(p)
            
            // Map percentage to 7 files
            const current = Math.min(totalFiles, Math.max(1, Math.ceil(v * totalFiles)))
            setFilesReviewed(current)
        })
    }, [scrollYProgress])

    return (
        <div style={{
            position: 'fixed', bottom: '24px', left: '24px', zIndex: 100,
            pointerEvents: 'none', userSelect: 'none'
        }}>
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{
                    background: 'rgba(10,12,16,0.85)',
                    backdropFilter: 'blur(12px)',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border-gold)',
                    boxShadow: 'var(--shadow-card)',
                    minWidth: '220px'
                }}
            >
                <div style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.65rem', 
                    color: 'var(--color-gold)',
                    marginBottom: '8px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <span>INVESTIGATION STATUS: ONGOING</span>
                    <span>{percent}%</span>
                </div>

                {/* Progress Bar */}
                <div style={{ 
                    height: '6px', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginBottom: '10px'
                }}>
                    <motion.div 
                        style={{ 
                            height: '100%', 
                            background: 'var(--color-gold)',
                            width: `${percent}%`,
                            boxShadow: '0 0 10px var(--color-gold-dim)'
                        }} 
                    />
                </div>

                <div style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.55rem', 
                    color: 'var(--color-text-dim)',
                    letterSpacing: '0.1em'
                }}>
                    FILES REVIEWED: <span style={{ color: 'var(--color-text-light)' }}>{filesReviewed} / {totalFiles}</span>
                    <div style={{ marginTop: '4px', opacity: 0.4 }}>
                        [ { '█'.repeat(Math.floor(percent/10)) }{ '░'.repeat(10 - Math.floor(percent/10)) } ]
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
