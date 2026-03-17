import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sequenceLines = [
    "Loading Investigator Profile...",
    "Accessing Case Files...",
    "Decrypting archives...",
    "Investigator credentials verified.",
    "Welcome, Visitor."
]

export default function IntroSequence({ onComplete }) {
    const [completedLines, setCompletedLines] = useState([])
    const [currentText, setCurrentText] = useState('')
    const [lineIndex, setLineIndex] = useState(0)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (lineIndex >= sequenceLines.length) {
            const t = setTimeout(() => setIsExiting(true), 500)
            return () => clearTimeout(t)
        }

        const fullLine = sequenceLines[lineIndex]
        let charIndex = 0
        setCurrentText('')

        const typeInterval = setInterval(() => {
            setCurrentText(fullLine.slice(0, charIndex + 1))
            charIndex++

            if (charIndex >= fullLine.length) {
                clearInterval(typeInterval)
                setCompletedLines(prev => [...prev, fullLine])
                setTimeout(() => setLineIndex(prev => prev + 1), 250)
            }
        }, 30) // Fast typing

        return () => clearInterval(typeInterval)
    }, [lineIndex])

    useEffect(() => {
        if (isExiting) {
            const t = setTimeout(() => onComplete(), 800) // smooth exit via AnimatePresence
            return () => clearTimeout(t)
        }
    }, [isExiting, onComplete])

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: '#050505',
                        color: 'var(--color-gold, #e8e0d0)',
                        fontFamily: 'var(--font-mono, monospace)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        zIndex: 9999,
                        padding: '2rem',
                        fontSize: 'clamp(0.85rem, 2vw, 1.1rem)'
                    }}
                >
                    <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
                        {completedLines.map((line, i) => (
                            <div key={i} style={{ marginBottom: '0.75rem', opacity: 0.8 }}>
                                <span style={{ opacity: 0.4, marginRight: '0.75rem' }}>&gt;</span>{line}
                            </div>
                        ))}
                        {lineIndex < sequenceLines.length && (
                            <div style={{ marginBottom: '0.75rem' }}>
                                <span style={{ opacity: 0.4, marginRight: '0.75rem' }}>&gt;</span>
                                {currentText}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                                    style={{ display: 'inline-block', width: '0.6em', height: '1.2em', backgroundColor: 'var(--color-gold, #e8e0d0)', verticalAlign: 'middle', marginLeft: '6px' }}
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
