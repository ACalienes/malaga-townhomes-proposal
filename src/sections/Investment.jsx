import { useState } from 'react'
import { motion, AnimatePresence, useTransform } from 'framer-motion'
import FlipDisplay from '../components/FlipDisplay.jsx'
import useContentOverflow from '../hooks/useContentOverflow.js'
import theme from '../theme.js'

const ease = theme.easing

export default function Investment({ progress }) {
  const { investment } = theme
  const packages = investment.packages || []
  const addOnList = investment.addOns || []
  const [selectedTier, setSelectedTier] = useState(
    packages.findIndex(p => p.recommended) >= 0
      ? packages.findIndex(p => p.recommended)
      : 0
  )
  const [expandedBreakdown, setExpandedBreakdown] = useState(null)
  const [addOns, setAddOns] = useState(
    addOnList.reduce((acc, item) => ({ ...acc, [item.title]: item.default }), {})
  )

  const { contentRef, overflow } = useContentOverflow()

  const basePrice = packages[selectedTier]?.price || 0
  const addOnTotal = addOnList.reduce((sum, a) => sum + (addOns[a.title] ? a.price : 0), 0)
  const total = basePrice + addOnTotal

  const labelOpacity = useTransform(progress, [0, 0.04], [0, 1])
  const headingOpacity = useTransform(progress, [0.02, 0.08], [0, 1])
  const headingY = useTransform(progress, [0.02, 0.08], [20, 0])
  const dividerScale = useTransform(progress, [0.05, 0.12], [0, 1])

  // All cards and total fade in before 0.35, scroll starts at 0.38
  const contentY = useTransform(progress, [0.38, 0.92], [0, -overflow])

  return (
    <section className="relative w-full h-full overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Fixed header */}
      <div className="relative z-20 text-center pt-14 sm:pt-16 px-6 pb-6" style={{ background: 'var(--color-bg)' }}>
        <motion.div
          className="section-label glow-text"
          style={{ opacity: labelOpacity }}
        >
          {investment.label}
        </motion.div>
        <motion.h2
          className="section-heading"
          style={{ opacity: headingOpacity, y: headingY }}
        >
          {investment.headline}
        </motion.h2>
        <motion.div
          className="section-divider"
          style={{
            transformOrigin: 'left',
            scaleX: dividerScale,
          }}
        />
      </div>
      <div className="header-fade-mask" />

      {/* Scrolling content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-6 pb-96"
        style={{ y: contentY }}
      >
        {/* Three pricing cards */}
        <div className="grid gap-5 max-w-5xl mx-auto md:grid-cols-3">
          {packages.map((pkg, i) => {
            const isSelected = selectedTier === i
            const cardStart = 0.10 + i * 0.06
            const cardEnd = cardStart + 0.08
            return (
              <motion.div
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedTier(i)}
                className={`relative text-left w-full overflow-hidden cursor-pointer ${isSelected ? 'shimmer-border' : ''}`}
                style={{
                  padding: '28px 24px',
                  background: isSelected ? 'color-mix(in srgb, var(--color-surface) 94%, var(--color-accent-pop) 6%)' : 'var(--color-surface)',
                  border: isSelected ? '1px solid var(--color-accent-pop)' : '1px solid var(--color-border)',
                  boxShadow: isSelected ? '0 4px 30px color-mix(in srgb, var(--color-accent-pop) 18%, transparent), 0 0 60px color-mix(in srgb, var(--color-accent-pop) 6%, transparent)' : 'none',
                  transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
                  opacity: useTransform(progress, [cardStart, cardEnd], [0, 1]),
                  y: useTransform(progress, [cardStart, cardEnd], [20, 0]),
                }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}
              >
                <div className="flex items-start justify-between gap-3" style={{ marginBottom: '6px' }}>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--color-accent-pop)',
                  }}>
                    {pkg.title}
                  </div>
                  {pkg.recommended && (
                    <div
                      style={{
                        background: 'var(--color-accent-pop)',
                        color: 'var(--color-bg)',
                        fontSize: '9px', fontWeight: 700,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        padding: '3px 8px',
                        fontFamily: 'var(--font-body)',
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Recommended
                    </div>
                  )}
                </div>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 700,
                  color: 'var(--color-text)', letterSpacing: '-0.02em',
                  lineHeight: 1.1, marginBottom: '8px',
                }}>
                  ${pkg.price.toLocaleString()}
                </div>

                {pkg.tag && (
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px', lineHeight: 1.5,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '20px',
                  }}>
                    {pkg.tag}
                  </div>
                )}

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {pkg.items.map((f, j) => (
                    <li key={j} style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      padding: '6px 0',
                      borderBottom: '1px solid var(--color-border)',
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                    }}>
                      <span style={{ color: 'var(--color-accent-pop)', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {pkg.phaseBreakdown && (
                  <div className="mt-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); setExpandedBreakdown(expandedBreakdown === i ? null : i) }}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px', fontWeight: 600,
                        color: 'var(--color-accent-pop)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        letterSpacing: '0.05em', padding: 0,
                      }}
                    >
                      {expandedBreakdown === i ? 'Hide breakdown' : 'View phase breakdown'}
                    </button>
                    <AnimatePresence>
                      {expandedBreakdown === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                            {pkg.phaseBreakdown.map((pb, k) => (
                              <div key={k} className="flex justify-between" style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '12px',
                                color: 'var(--color-text-secondary)',
                                padding: '3px 0',
                              }}>
                                <span>{pb.label}</span>
                                <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>${pb.price.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <motion.div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: '2px', background: 'var(--color-accent-pop)', transformOrigin: 'left' }}
                  initial={false}
                  animate={{ scaleX: isSelected ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Add-ons */}
        {addOnList.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10">
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              marginBottom: '12px', textAlign: 'center',
            }}>
              Add-Ons
            </div>
            {addOnList.map((addon, i) => {
              const addonStart = 0.28 + i * 0.04
              const addonEnd = addonStart + 0.06
              const isActive = addOns[addon.title]
              return (
                <motion.div
                  key={i}
                  className="flex items-center justify-between p-4 cursor-pointer"
                  style={{
                    background: isActive ? 'color-mix(in srgb, var(--color-surface) 94%, var(--color-accent-pop) 6%)' : 'var(--color-surface)',
                    border: `1px solid ${isActive ? 'var(--color-accent-pop)' : 'var(--color-border)'}`,
                    marginBottom: '6px',
                    transition: 'background 0.3s, border-color 0.3s',
                    opacity: useTransform(progress, [addonStart, addonEnd], [0, 1]),
                  }}
                  onClick={() => setAddOns(prev => ({ ...prev, [addon.title]: !prev[addon.title] }))}
                >
                  <div className="flex items-center gap-3">
                    <div style={{
                      width: '18px', height: '18px',
                      border: `1px solid ${isActive ? 'var(--color-accent-pop)' : 'var(--color-border)'}`,
                      background: isActive ? 'var(--color-accent-pop)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s', flexShrink: 0,
                    }}>
                      {isActive && (
                        <span style={{ color: 'var(--color-bg)', fontSize: '11px' }}>&#10003;</span>
                      )}
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 600, color: 'var(--color-text)' }}>
                      {addon.title}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: 'var(--color-accent-pop)', flexShrink: 0, marginLeft: '16px' }}>
                    +${addon.price.toLocaleString()}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Total — fades in before scroll starts */}
        <motion.div
          className="text-center mt-12"
          style={{
            opacity: useTransform(progress, [0.30, 0.36], [0, 1]),
          }}
        >
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            {packages[selectedTier]?.title}{addOnTotal > 0 ? ' + Add-Ons' : ''}
          </div>
          <div style={{ fontSize: 'clamp(48px, 7.5vw, 72px)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
            <FlipDisplay value={total} />
          </div>
        </motion.div>

        {/* Payment terms */}
        {investment.paymentTerms && (
          <div className="max-w-xl mx-auto mt-8 text-center">
            {investment.paymentTerms.map((term, i) => (
              <div key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '3px' }}>
                {term}
              </div>
            ))}
            {investment.printNote && (
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '11px',
                color: 'var(--color-text-muted)', marginTop: '12px',
                padding: '12px', border: '1px solid var(--color-border)', opacity: 0.8,
              }}>
                {investment.printNote}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </section>
  )
}
