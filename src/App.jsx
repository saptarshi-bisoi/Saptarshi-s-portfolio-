import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClassifiedFile from './components/ClassifiedFile'
import ProjectsArchive from './components/ProjectsArchive'
import EvidenceLocker from './components/EvidenceLocker'
import InvestigationHistory from './components/InvestigationHistory'
import Education from './components/Education'
import FieldInvestigations from './components/FieldInvestigations'
import CinematicCaseFiles from './components/CinematicCaseFiles'
import Contact from './components/Contact'
import Footer from './components/Footer'
import InvestigationAudio from './components/InvestigationAudio'
import SmoothScroll from './components/SmoothScroll'

import MissionTracker from './components/MissionTracker'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import IntroSequence from './components/IntroSequence'
export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem('introPlayed') !== 'true'
  })

  useEffect(() => {
    if (!showIntro) {
      sessionStorage.setItem('introPlayed', 'true')
    }
  }, [showIntro])

  return (
    <InvestigationAudio>
      <SmoothScroll>
        <AnimatePresence mode="wait">
          {showIntro && <IntroSequence key="intro" onComplete={() => setShowIntro(false)} />}
        </AnimatePresence>

        {!showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Navbar />
            <Hero />
            <ClassifiedFile />
            <ProjectsArchive />
            <EvidenceLocker />
            <InvestigationHistory />
            <FieldInvestigations />
            <CinematicCaseFiles />
            <Education />
            <Contact />
            <Footer />
            <MissionTracker />
          </motion.div>
        )}
      </SmoothScroll>
    </InvestigationAudio>
  )
}
