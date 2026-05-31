import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">San Blueprints</span>
          <span className="footer-tagline">Free growth blueprints. No gates.</span>
        </div>

        <div className="footer-links">
          <a href="#blueprints" className="footer-link">Blueprints</a>
          <a href="#" className="footer-link">Twitter</a>
          <a href="#" className="footer-link">Discord</a>
        </div>

        <span className="footer-copy">&copy; {new Date().getFullYear()} San Blueprints. All rights reserved.</span>
      </div>
    </motion.footer>
  )
}
