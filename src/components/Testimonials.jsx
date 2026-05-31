import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'Followed the no-warmup blueprint and hit 12k followers in my first month. This is the real deal.',
    author: 'Alex M.',
    role: 'Content Creator',
  },
  {
    quote: 'The growth blueprint completely changed how I think about content architecture. My engagement rate tripled.',
    author: 'Sarah K.',
    role: 'Brand Strategist',
  },
  {
    quote: 'I was stuck at 2k for a year. Three weeks into the system and I\'m already seeing compound growth.',
    author: 'Marcus J.',
    role: 'Digital Entrepreneur',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Testimonials() {
  return (
    <motion.section
      className="testimonials section-padding"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      <div className="container">
        <div className="testimonials-header">
          <span className="section-label">Social Proof</span>
          <h2 className="section-title">Results that <span className="glow-text">speak</span></h2>
          <p className="section-subtitle">
            Real people, real numbers. These blueprints are battle-tested.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <motion.div key={t.author} className="testimonial-card glass neon-glow" variants={item}>
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.author}</span>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
