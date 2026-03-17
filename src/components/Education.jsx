import { motion } from 'framer-motion'

const records = [
    { institution: 'Iswar Chandra Vidyasagar Polytechnic', degree: 'Diploma in Computer Science', period: '2023 — 2026', status: 'IN PROGRESS', statusClass: 'stamp-progress', progress: 80, icon: 'fa-microchip' },
    { institution: 'Goaltore High School (H.S.)', degree: 'Higher Secondary', period: '2019 — 2023', status: 'CERTIFIED', statusClass: 'stamp-solved', progress: 100, icon: 'fa-school' },
]

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.5 },
})

export default function Education() {
    return (
        <section id="education" className="section-pad">
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
                <motion.div {...fadeIn()} className="section-header">
                    <span className="section-tag">// Training Division</span>
                    <h2>Training <span className="accent">Records</span></h2>
                    <p className="section-desc">Academic certifications and professional training progression.</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '640px', margin: '0 auto' }}>
                    {records.map((r, i) => (
                        <motion.div key={r.degree} {...fadeIn(i * 0.12)} whileHover={{ y: -4 }}
                            className="card" style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
                            {/* Icon */}
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                <i className={`fas ${r.icon}`} style={{ color: 'var(--color-gold)', fontSize: '1.25rem' }} />
                            </div>

                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>{r.degree}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(42,42,42,0.5)', marginBottom: '1rem' }}>{r.institution}</p>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(42,42,42,0.4)' }}>
                                    <i className="fas fa-calendar" style={{ marginRight: '4px', color: 'var(--color-gold)', opacity: 0.5 }} /> {r.period}
                                </span>
                                <span className={`stamp ${r.statusClass}`}>{r.status}</span>
                            </div>

                            {/* Progress bar */}
                            <div style={{ height: '6px', background: 'rgba(0,0,0,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${r.progress}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                                    style={{ height: '100%', borderRadius: '3px', background: r.progress === 100 ? 'var(--color-blue)' : 'var(--color-gold)' }}
                                />
                            </div>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(42,42,42,0.3)', marginTop: '0.5rem' }}>{r.progress}% Complete</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
