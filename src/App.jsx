import { useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import LoadingOverlay from './components/LoadingOverlay.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CursorSpotlight from './components/CursorSpotlight.jsx'
import DotNav from './components/DotNav.jsx'
import DeckController from './components/DeckController.jsx'

export default function App() {
  const reduced = useReducedMotion()

  return (
    <>
      <LoadingOverlay />
      <ScrollProgress />
      {!reduced && <CursorSpotlight />}
      <DotNav />
      <Navbar />
      <DeckController />
    </>
  )
}
