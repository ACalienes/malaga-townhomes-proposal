import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import theme from '../theme.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const links = theme.nav.links

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    window.__deckScrollTo?.(id)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: '0 clamp(1.5rem, 4vw, 3rem)',
          height: '60px',
          background: scrolled
            ? 'var(--color-bg)'
            : 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.6) 70%, transparent 100%)',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
        }}
      >
        {/* Logo */}
        <img
          src={theme.agency.logoUrl}
          alt={theme.agency.name}
          style={{ height: '24px', width: 'auto' }}
        />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.1em',
                color: 'var(--color-text-secondary)',
                background: 'none', border: 'none', cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-pop)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          aria-label="Menu"
        >
          <div style={{ width: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ height: '2px', background: 'var(--color-text)', borderRadius: '1px', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none' }} />
            <span style={{ height: '2px', background: 'var(--color-text)', borderRadius: '1px', transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ height: '2px', background: 'var(--color-text)', borderRadius: '1px', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none' }} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: 'var(--color-bg)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px', fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'var(--color-text)',
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
