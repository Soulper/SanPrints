import { motion } from 'framer-motion'
import BlueprintCard from './BlueprintCard'

const blueprints = [
  {
    title: 'Escape View Jail Blueprint',
    description:
      'Break out of the view jail and get your content recommended again. A targeted strategy to reset the algorithm and regain reach.',
    slug: 'escape-view-jail',
    pdfPath: '/pdfs/Escape View Jail Blueprint.pdf',
  },
  {
    title: 'Ultimate Instagram Blueprint',
    description:
      'A comprehensive Instagram growth engine — from profile optimization to content architecture designed for compounding reach.',
    slug: 'ultimate-instagram',
    pdfPath: '/pdfs/Ultimate Instagram Blueprint.pdf',
  },
  {
    title: 'Ultimate TikTok Growth Blueprint (2026)',
    description:
      'Dominate the TikTok algorithm in 2026. Proven strategies for viral velocity, engagement loops, and follower growth.',
    slug: 'ultimate-tiktok-growth',
    pdfPath: '/pdfs/Ultimate TikTok Growth Blueprint (2026).pdf',
  },
  {
    title: 'Viral Hook Blueprint',
    description:
      'Craft hooks that stop the scroll and force engagement. A systematic framework for writing viral-worthy openers.',
    slug: 'viral-hook',
    pdfPath: '/pdfs/Viral Hook Blueprint.pdf',
  },
  {
    title: 'YouTube Warm Up Blueprint',
    description:
      'Properly warm up a YouTube channel before going live. Build watch time, authority, and algorithmic trust from day one.',
    slug: 'youtube-warmup',
    pdfPath: '/pdfs/Youtube Warm up Blueprint.pdf',
  },
]

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function MethodsGrid() {
  return (
    <motion.section
      id="blueprints"
      className="methods section-padding"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={sectionVariants}
    >
      <div className="container">
        <motion.div className="methods-header" variants={childVariants}>
          <span className="section-label">The Blueprints</span>
          <h2 className="section-title">All <span className="glow-text">free</span>, all proven</h2>
          <p className="section-subtitle">
            Every blueprint is a battle-tested system. Pick your platform and start growing — no email required.
          </p>
        </motion.div>

        <motion.div className="methods-grid" variants={childVariants}>
          {blueprints.map((bp) => (
            <BlueprintCard key={bp.slug} {...bp} />
          ))}
        </motion.div>

        <motion.div className="methods-footer" variants={childVariants}>
          <span className="methods-count">{blueprints.length} of {blueprints.length} blueprints available</span>
          <div className="methods-progress">
            <div className="methods-progress-bar" style={{ width: '100%' }} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
