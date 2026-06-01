import { useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion } from 'framer-motion'
import SEO from './SEO'
import Footer from './Footer'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const blueprints = [
  {
    slug: 'escape-view-jail',
    title: 'Escape View Jail Blueprint',
    pdfPath: '/pdfs/Escape View Jail Blueprint.pdf',
  },
  {
    slug: 'ultimate-instagram',
    title: 'Ultimate Instagram Blueprint',
    pdfPath: '/pdfs/Ultimate Instagram Blueprint.pdf',
  },
  {
    slug: 'ultimate-tiktok-growth',
    title: 'Ultimate TikTok Growth Blueprint (2026)',
    pdfPath: '/pdfs/Ultimate TikTok Growth Blueprint (2026).pdf',
  },
  {
    slug: 'viral-hook',
    title: 'Viral Hook Blueprint',
    pdfPath: '/pdfs/Viral Hook Blueprint.pdf',
  },
  {
    slug: 'youtube-warmup',
    title: 'YouTube Warm Up Blueprint',
    pdfPath: '/pdfs/Youtube Warm up Blueprint.pdf',
  },
]

export default function BlueprintViewer() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const bp = blueprints.find((b) => b.slug === slug)

  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1)
  const [loading, setLoading] = useState(true)
  const viewerRef = useRef(null)

  const onLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages)
    setLoading(false)
  }, [])

  const goToPrev = () => setPageNumber((p) => Math.max(p - 1, 1))
  const goToNext = () => setPageNumber((p) => Math.min(p + 1, numPages))

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3))
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5))

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  if (!bp) {
    return (
      <motion.div
        className="viewer-error"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SEO
          title="404 — Blueprint Not Found | San Blueprints"
          description="The requested blueprint could not be found."
        />
        <div className="viewer-error-content">
          <h2>Blueprint not found</h2>
          <p>The method you're looking for doesn't exist yet.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Back to blueprints
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      ref={viewerRef}
    >
      <SEO
        title={`${bp.title} | San Blueprints`}
        description={`View the ${bp.title} — a free, battle-tested growth blueprint.`}
      />

      <header className="viewer-header glass">
        <button className="viewer-back" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back
        </button>

        <h1 className="viewer-title">{bp.title}</h1>

        <div className="viewer-actions">
          <a href={bp.pdfPath} download className="btn-primary viewer-download">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
        </div>
      </header>

      <div className="viewer-toolbar glass">
        <button className="toolbar-btn" onClick={goToPrev} disabled={pageNumber <= 1}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <span className="toolbar-page-info">
          Page {pageNumber} of {numPages || '—'}
        </span>

        <button className="toolbar-btn" onClick={goToNext} disabled={pageNumber >= numPages}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        <div className="toolbar-divider" />

        <button className="toolbar-btn" onClick={zoomOut} disabled={scale <= 0.5}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </button>

        <span className="toolbar-zoom-label">{Math.round(scale * 100)}%</span>

        <button className="toolbar-btn" onClick={zoomIn} disabled={scale >= 3}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </button>

        <button className="toolbar-btn toolbar-fullscreen" onClick={toggleFullscreen}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        </button>
      </div>

      <main className="viewer-body">
        {loading && (
          <div className="viewer-loading">
            <div className="viewer-spinner" />
            <span>Loading blueprint...</span>
          </div>
        )}

        <Document
          file={bp.pdfPath}
          onLoadSuccess={onLoadSuccess}
          loading={null}
          className="viewer-document"
        >
          <Page pageNumber={pageNumber} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </main>

      <Footer />
    </motion.div>
  )
}
