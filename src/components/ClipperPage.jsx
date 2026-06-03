import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from './SEO'

export default function ClipperPage() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="clipper-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <SEO
        title="CLIPR — AI Clip Cutter | San Blueprints"
        description="Upload any video. AI analyzes motion, audio peaks, and scene changes to extract your most viral-worthy clips — free, no watermark."
      />
      <button className="clipper-back-btn" onClick={() => navigate('/')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        San Blueprints
      </button>
      <iframe
        src="/clipper.html"
        className="clipper-iframe"
        title="CLIPR — AI Clip Cutter"
        allow="autoplay; microphone; camera; display-capture"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
      />
    </motion.div>
  )
}
