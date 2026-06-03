import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToBlueprints = () => {
    setMenuOpen(false)
    if (isHome) {
      document.getElementById('blueprints')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <svg className="navbar-logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          San Blueprints
        </Link>

        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`navbar-toggle-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`navbar-toggle-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`navbar-toggle-bar ${menuOpen ? 'open' : ''}`} />
        </button>

        <div className={`navbar-menu ${menuOpen ? 'navbar-menu-open' : ''}`}>
          {isHome ? (
            <button className="navbar-link" onClick={scrollToBlueprints}>
              Blueprints
            </button>
          ) : (
            <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          )}
          <Link
            to="/clipper"
            className={`navbar-link ${location.pathname === '/clipper' ? 'navbar-link-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Clipper
          </Link>
          {isHome ? (
            <button className="btn-primary navbar-cta" onClick={scrollToBlueprints}>
              Get BPs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          ) : (
            <Link to="/#blueprints" className="btn-primary navbar-cta" onClick={() => setMenuOpen(false)}>
              Get BPs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
