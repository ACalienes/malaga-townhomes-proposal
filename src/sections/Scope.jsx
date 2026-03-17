import { useState } from 'react'
import { motion, AnimatePresence, useTransform } from 'framer-motion'
import useContentOverflow from '../hooks/useContentOverflow.js'
import theme from '../theme.js'

const ease = theme.easing

export default function Scope({ progress }) {
  const { scope, formatSpecs } = theme
  const [expandedPhase, setExpandedPhase] = useState(null)
  const [hoveredPhase, setHoveredPhase] = useState(null)
  const { contentRef, overflow } = useContentOverflow()

  const labelOpacity = useTransform(progress, [0, 0.04], [0, 1])
  const headingOpacity = useTransform(progress, [0.02, 0.08], [0, 1])
  const headingY = useTransform(progress, [0.02, 0.08], [20, 0])
  const dividerScale = useTransform(progress, [0.05, 0.12], [0, 1])

  // All cards + exclusions + specs fade in before 0.32, scroll starts at 0.32
  const contentY = useTransform(progress, [0.32, 0.90], [0, -overflow])

  return (
    <section className="relative w-full h-full overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Fixed header */}
      <div className="relative z-20 text-center pt-14 sm:pt-16 px-6 pb-6" style={{ background: 'var(--color-bg)' }}>
        <motion.div className="section-label glow-text" style={{ opacity: labelOpacity }}>
          {scope.label}
        </motion.div>
        <motion.h2 className="section-heading" style={{ opacity: headingOpacity, y: headingY }}>
          {scope.headline}
        </motion.h2>
        <motion.div
          style={{
            width: '60px', height: '1px',
            background: 'var(--color-accent-pop)',
            margin: '0 auto 0',
            transformOrigin: 'left',
            boxShadow: '0 0 12px color-mix(in srgb, var(--color-accent-pop) 30%, transparent)',
            scaleX: dividerScale,
          }}
        />
      </div>
      <div className="header-fade-mask" />

      {/* Scrolling content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-6 pb-64"
        style={{ y: contentY }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          {scope.phases.map((phase, i) => {
            const isOpen = expandedPhase === i
            const isHovered = hoveredPhase === i
            const isLight = isOpen || isHovered
            const cardStart = 0.08 + i * 0.05
            const cardEnd = cardStart + 0.06
            return (
              <motion.div
                key={i}
                className="cursor-pointer overflow-hidden"
                style={{
                  background: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(20,20,20,0.5)',
                  backdropFilter: 'blur(16px)',
                  borderLeft: isLight ? '2px solid var(--color-accent-pop)' : '2px solid transparent',
                  borderTop: `1px solid ${isLight ? 'var(--color-accent-pop)' : 'var(--color-border)'}`,
                  borderRight: `1px solid ${isLight ? 'var(--color-accent-pop)' : 'var(--color-border)'}`,
                  borderBottom: `1px solid ${isLight ? 'var(--color-accent-pop)' : 'var(--color-border)'}`,
                  boxShadow: isLight ? '0 8px 32px rgba(201,169,110,0.15)' : 'none',
                  transition: 'all 0.3s',
                  opacity: useTransform(progress, [cardStart, cardEnd], [0, 1]),
                  y: useTransform(progress, [cardStart, cardEnd], [20, 0]),
                }}
                onMouseEnter={() => setHoveredPhase(i)}
                onMouseLeave={() => setHoveredPhase(null)}
                onClick={() => setExpandedPhase(isOpen ? null : i)}
              >
                <div className="p-6 flex items-start gap-5">
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '32px', fontWeight: 700,
                    color: isLight ? '#1a1a18' : 'var(--color-accent-pop)',
                    opacity: isLight ? 0.15 : 0.4, lineHeight: 1,
                    flexShrink: 0, minWidth: '40px',
                    transition: 'color 0.3s, opacity 0.3s',
                  }}>
                    {phase.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <div style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '18px', fontWeight: 700,
                          color: isLight ? '#1a1a18' : 'var(--color-text)',
                          marginBottom: '4px',
                          transition: 'color 0.3s',
                        }}>
                          {phase.title}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px', fontWeight: 500,
                          color: isLight ? '#8a7a52' : 'var(--color-accent-pop)',
                          letterSpacing: '0.05em', opacity: 0.8,
                          transition: 'color 0.3s',
                        }}>
                          {phase.subtitle}
                        </div>
                      </div>
                      <div style={{
                        color: isLight ? '#8a7a52' : 'var(--color-text-muted)',
                        fontSize: '20px',
                        transition: 'transform 0.3s, color 0.3s',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        flexShrink: 0, marginLeft: '12px',
                      }}>
                        +
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-6" style={{ paddingLeft: 'calc(40px + 1.5rem + 20px)' }}>
                        <div style={{
                          width: '40px', height: '1px',
                          background: '#c9a96e',
                          opacity: 0.4, marginBottom: '16px',
                        }} />
                        {phase.intro && (
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '13px', lineHeight: 1.7,
                            color: '#4a4a45',
                            marginBottom: '12px',
                          }}>
                            {phase.intro}
                          </p>
                        )}
                        {(phase.groups || []).map((group, gi) => (
                          <div key={gi} style={{ marginBottom: gi < (phase.groups.length - 1) ? '16px' : 0 }}>
                            <div style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '10px', fontWeight: 700,
                              letterSpacing: '0.1em', textTransform: 'uppercase',
                              color: '#8a7a52',
                              marginBottom: '6px',
                              marginTop: gi > 0 ? '4px' : 0,
                            }}>
                              {group.heading}
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {group.items.map((item, j) => (
                                <li key={j} style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '13px', lineHeight: 1.7,
                                  color: '#3a3a35',
                                  padding: '3px 0',
                                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                                }}>
                                  <span style={{ color: '#c9a96e', fontSize: '12px', marginTop: '3px', flexShrink: 0 }}>&#10003;</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {scope.exclusions && (
          <motion.div
            className="max-w-4xl mx-auto mt-12"
            style={{
              opacity: useTransform(progress, [0.22, 0.28], [0, 1]),
            }}
          >
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '12px',
            }}>
              Not Included
            </div>
            {scope.exclusions.map((ex, i) => (
              <div key={i} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px', lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                marginBottom: '3px',
                paddingLeft: '12px',
                borderLeft: '1px solid var(--color-border)',
              }}>
                {ex}
              </div>
            ))}
          </motion.div>
        )}

        {/* Delivery Specifications */}
        {formatSpecs && (
          <motion.div
            className="max-w-4xl mx-auto mt-12"
            style={{
              opacity: useTransform(progress, [0.26, 0.32], [0, 1]),
            }}
          >
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '12px',
            }}>
              Delivery Specifications
            </div>
            {formatSpecs.map((spec, i) => (
              <div key={i} className="flex justify-between" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px', lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                padding: '4px 0',
                borderBottom: '1px solid color-mix(in srgb, var(--color-border) 30%, transparent)',
              }}>
                <span style={{ fontWeight: 600 }}>{spec.format}</span>
                <span>{spec.spec}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
