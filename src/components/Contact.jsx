import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeIn = (d = 0) => ({ initial: { opacity: 0, y: 25 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: d, duration: 0.5 } })

const iS = { width: '100%', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.1)', color: '#2a2a2a', fontFamily: 'var(--font-body)', fontSize: '0.875rem', padding: '10px 14px', borderRadius: '6px', outline: 'none' }
const lS = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(42,42,42,0.45)', marginBottom: '6px' }

const contacts = [
    { icon: 'fa-envelope', label: 'Email', value: 'saptarshibisoi.official@gmail.com', href: 'mailto:saptarshibisoi.official@gmail.com' },
    { icon: 'fa-brands fa-github', label: 'GitHub', value: 'saptarshi-bisoi', href: 'https://github.com/saptarshi-bisoi' },
    { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', value: 'saptarshi-legend', href: 'https://www.linkedin.com/in/saptarshi-legend/' },
    { icon: 'fa-brands fa-x-twitter', label: 'X (Twitter)', value: '@saptarshiBisoi', href: 'https://x.com/saptarshiBisoi' },
    { icon: 'fa-brands fa-instagram', label: 'Instagram', value: '@aka.saptarshi', href: 'https://www.instagram.com/aka.saptarshi/' },
]

export default function Contact() {
    const [done, setDone] = useState(false)
    const submit = (e) => { e.preventDefault(); setDone(true); setTimeout(() => setDone(false), 4000) }

    return (
        <section id="contact" className="section-pad">
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
                <motion.div {...fadeIn()} className="section-header">
                    <span className="section-tag">// Confidential Dispatch</span>
                    <h2>Submit a <span className="accent">Report</span></h2>
                    <p className="section-desc">Have a project idea or technical challenge? File a confidential investigation request.</p>
                </motion.div>

                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '2rem' }}>
                        {contacts.map((c, i) => (
                            <motion.a key={c.label} {...fadeIn(i * 0.08)} href={c.href} target="_blank" rel="noopener noreferrer"
                                className="card" style={{ padding: '1.25rem', textAlign: 'center', textDecoration: 'none' }} whileHover={{ y: -3 }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#121212', border: '1px solid rgba(200,164,77,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                                    <i className={`fas ${c.icon}`} style={{ color: '#c8a44d', fontSize: '0.9rem' }} />
                                </div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(42,42,42,0.35)', marginBottom: '4px' }}>{c.label}</div>
                                <div style={{ color: 'rgba(42,42,42,0.7)', fontSize: '0.7rem', fontWeight: 500, wordBreak: 'break-all' }}>{c.value}</div>
                            </motion.a>
                        ))}
                    </div>

                    <motion.form {...fadeIn(0.15)} onSubmit={submit} className="card" style={{ padding: '2rem', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>
                            <span className="case-label">Confidential Report</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div><label style={lS}>Investigator Name</label><input type="text" required placeholder="Your name" style={iS} /></div>
                            <div><label style={lS}>Comm Channel</label><input type="email" required placeholder="your@email.com" style={iS} /></div>
                        </div>
                        <div style={{ marginBottom: '16px' }}><label style={lS}>Case Subject</label><input type="text" required placeholder="Brief description" style={iS} /></div>
                        <div style={{ marginBottom: '1.5rem' }}><label style={lS}>Case Details</label><textarea required rows={5} placeholder="Describe the mystery..." style={{ ...iS, resize: 'vertical' }} /></div>
                        <div style={{ textAlign: 'center' }}>
                            <motion.button type="submit" className="btn btn-gold" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                                <i className="fas fa-paper-plane" /> Submit Report
                            </motion.button>
                        </div>
                        {done && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: 'var(--font-heading)', color: '#c8a44d', fontStyle: 'italic', fontSize: '0.9rem', marginTop: '1rem', textAlign: 'center' }}>✓ Report filed.</motion.p>}
                    </motion.form>
                </div>
            </div>
        </section>
    )
}
