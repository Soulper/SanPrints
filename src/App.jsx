import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MethodsGrid from './components/MethodsGrid'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import BlueprintViewer from './components/BlueprintViewer'
import NotFound from './components/NotFound'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

function PageWrap({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

function LandingPage() {
  return (
    <PageWrap>
      <SEO
        title="San Blueprints — Free Growth Blueprints"
        description="Free, battle-tested growth blueprints for Instagram, TikTok, YouTube, and more."
      />
      <Navbar />
      <Hero />
      <MethodsGrid />
      <Testimonials />
      <Footer />
    </PageWrap>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blueprint/:slug" element={<BlueprintViewer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}
