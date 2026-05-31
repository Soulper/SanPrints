import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function BlueprintCard({ title, description, slug, isComingSoon }) {
  const navigate = useNavigate()

  return (
    <motion.div
      className={`blueprint-card ${isComingSoon ? 'coming-soon' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="card-glow" />

      <div className="card-header">
        <div className="card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {isComingSoon ? (
              <>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </>
            ) : (
              <>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </>
            )}
          </svg>
        </div>
        {!isComingSoon && <span className="card-pill">PDF</span>}
      </div>

      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>

      <div className="card-stats">
        {isComingSoon ? (
          <span className="card-stat-label">In development</span>
        ) : (
          <>
            <span className="card-stat-label">Instant download</span>
            <span className="card-stat-sep">·</span>
            <span className="card-stat-label">PDF format</span>
          </>
        )}
      </div>

      {isComingSoon ? (
        <div className="card-coming-badge">Coming Soon</div>
      ) : (
        <button className="btn-primary card-btn" onClick={() => navigate(`/blueprint/${slug}`)}>
          View Blueprint
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      )}
    </motion.div>
  )
}
