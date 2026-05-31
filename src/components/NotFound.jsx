import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from './SEO'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="notfound"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SEO
        title="404 — Page Not Found | San Methods"
        description="This page doesn't exist. The algorithm couldn't find it."
      />
      <div className="notfound-content">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">Lost in the <span className="glow-text">void</span></h1>
        <p className="notfound-desc">This page doesn't exist. The algorithm couldn't find it.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Return to base
        </button>
      </div>
    </motion.div>
  )
}
