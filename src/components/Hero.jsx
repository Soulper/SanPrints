import { motion } from 'framer-motion'

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 3,
  duration: Math.random() * 4 + 3,
}))

export default function Hero() {
  const scrollToBlueprints = () => {
    document.getElementById('blueprints')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="particle-field">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="hero-grid-bg" />

      <div className="hero-content container">
        <div className="hero-badge">100% Free — No Email Required</div>

        <h1 className="hero-title">
          <span className="glow-text">San Blueprints</span>
        </h1>

        <p className="hero-description">
          Free, battle-tested growth blueprints for Instagram, TikTok, YouTube, and more.
          No fluff. No gates. Just strategies that work.
        </p>

        <button className="btn-primary hero-cta-btn" onClick={scrollToBlueprints}>
          Get BPs
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>

        <p className="hero-footnote">
          6 free blueprints · Instant access · Updated regularly
        </p>
      </div>
    </motion.section>
  )
}
