import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.23, 1, 0.32, 1]

const sections = [
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'scope', label: 'Scope' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'proof', label: 'Why Kameha' },
  { id: 'context', label: 'Market' },
  { id: 'investment', label: 'Investment' },
  { id: 'printEstimate', label: 'Print' },
  { id: 'nextSteps', label: 'Contact' },
]

export default function DotNav() {
  const [activeSection, setActiveSection] = useState('')
  const [pastHero, setPastHero] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    let raf
    const check = () => {
      const active = window.__deckActiveScene || ''
      setActiveSection(active)
      setPastHero(active !== '' && active !== 'hero')
      raf = requestAnimationFrame(check)
    }
    raf = requestAnimationFrame(check)
    return () => cancelAnimationFrame(raf)
  }, [])

  const scrollTo = useCallback((id) => {
    window.__deckScrollTo?.(id)
  }, [])

  return (
    <AnimatePresence>
      {pastHero && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4"
          aria-label="Section navigation"
        >
          {sections.map((item) => {
            const isActive = activeSection === item.id
            return (
              <div key={item.id} className="relative flex items-center">
                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.2, ease }}
                      className="absolute right-full mr-3 whitespace-nowrap pointer-events-none"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-label={`Go to ${item.label}`}
                  aria-current={isActive ? 'true' : undefined}
                  style={{ width: '20px', height: '20px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <motion.span
                    animate={{
                      width: isActive ? 8 : 6,
                      height: isActive ? 8 : 6,
                      backgroundColor: isActive ? 'var(--color-accent-pop)' : 'var(--color-border)',
                    }}
                    transition={{ duration: 0.3, ease }}
                    whileHover={{ backgroundColor: 'var(--color-accent-pop)', scale: 1.3 }}
                    style={{ borderRadius: '50%', display: 'block', filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))' }}
                  />
                  {isActive && (
                    <motion.span
                      layoutId="nav-ring"
                      className="absolute"
                      style={{
                        width: 16, height: 16, borderRadius: '50%',
                        border: '1px solid color-mix(in srgb, var(--color-accent-pop) 25%, transparent)',
                        animation: 'dotPulse 2.5s ease-in-out infinite',
                      }}
                      transition={{ duration: 0.4, ease }}
                    />
                  )}
                </button>
              </div>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
