import { motion, useTransform } from 'framer-motion'
import useContentOverflow from '../hooks/useContentOverflow.js'
import theme from '../theme.js'

/* Parse "Weeks X-Y" into { start, end } */
function parseWeeks(timeframe) {
  const match = timeframe.match(/(\d+)\s*-\s*(\d+)/)
  if (!match) return { start: 1, end: 16 }
  return { start: parseInt(match[1], 10), end: parseInt(match[2], 10) }
}

const TOTAL_WEEKS = 16

export default function Timeline({ progress }) {
  const { timeline } = theme
  const { contentRef, overflow } = useContentOverflow()

  // Header animations
  const labelOpacity = useTransform(progress, [0, 0.05], [0, 1])
  const headingOpacity = useTransform(progress, [0.03, 0.10], [0, 1])
  const headingY = useTransform(progress, [0.03, 0.10], [20, 0])
  const dividerScale = useTransform(progress, [0.06, 0.14], [0, 1])

  // Gantt bar animations (stagger 0.10 to 0.35)
  const barScales = timeline.steps.map((_, i) => {
    const start = 0.10 + i * (0.25 / timeline.steps.length)
    const end = start + 0.10
    return useTransform(progress, [start, end], [0, 1])
  })

  // Card animations (stagger 0.20 to 0.40 — all before scroll)
  const cardAnimations = timeline.steps.map((_, i) => {
    const start = 0.20 + i * (0.20 / timeline.steps.length)
    const end = start + 0.10
    return {
      opacity: useTransform(progress, [start, end], [0, 1]),
      y: useTransform(progress, [start, end], [16, 0]),
    }
  })

  // Scroll starts after all cards visible
  const contentY = useTransform(progress, [0.45, 0.90], [0, -overflow])

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1)

  return (
    <section className="relative w-full h-full overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Background image carried from divider */}
      <div className="absolute inset-0">
        <img src={theme.images.divider1} alt="" className="w-full h-full object-cover" style={{ opacity: 0.08 }} />
      </div>

      {/* Fixed header */}
      <div className="relative z-20 text-center pt-12 sm:pt-16 px-6 pb-4" style={{ background: 'var(--color-bg)' }}>
        <motion.div className="section-label glow-text" style={{ opacity: labelOpacity }}>
          {timeline.label}
        </motion.div>
        <motion.h2 className="section-heading" style={{ opacity: headingOpacity, y: headingY }}>
          {timeline.headline}
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
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-2 pb-64"
        style={{ y: contentY }}
      >
        {/* Gantt Chart */}
        <div className="max-w-4xl mx-auto mb-6">
          {/* Week markers */}
          <div className="flex" style={{ paddingLeft: '100px' }}>
            {weeks.map((w) => (
              <div
                key={w}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.02em',
                }}
              >
                {w}
              </div>
            ))}
          </div>

          {/* Phase bars */}
          <div className="flex flex-col gap-2 mt-3">
            {timeline.steps.map((step, i) => {
              const { start, end } = parseWeeks(step.timeframe)
              const leftPct = ((start - 1) / TOTAL_WEEKS) * 100
              const widthPct = ((end - start + 1) / TOTAL_WEEKS) * 100
              const isAddOn = !step.core

              return (
                <div key={i} className="flex items-center" style={{ height: '34px' }}>
                  {/* Phase label */}
                  <div
                    style={{
                      width: '100px',
                      flexShrink: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: isAddOn ? 'var(--color-text-muted)' : 'var(--color-accent-pop)',
                      opacity: isAddOn ? 0.6 : (i === 0 ? 1 : 0.8),
                      paddingRight: '12px',
                      textAlign: 'right',
                    }}
                  >
                    {isAddOn ? 'Add-On' : `Phase ${step.number}`}
                  </div>

                  {/* Bar track */}
                  <div className="relative flex-1" style={{ height: '100%' }}>
                    <motion.div
                      style={{
                        position: 'absolute',
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                        top: '4px',
                        bottom: '4px',
                        background: isAddOn
                          ? 'repeating-linear-gradient(90deg, var(--color-accent-pop) 0px, var(--color-accent-pop) 6px, transparent 6px, transparent 10px)'
                          : 'var(--color-accent-pop)',
                        opacity: isAddOn ? 0.35 : (i === 0 ? 1 : 0.7),
                        borderRadius: '2px',
                        transformOrigin: 'left',
                        scaleX: barScales[i],
                        willChange: 'transform',
                        boxShadow: isAddOn ? 'none' : `0 0 8px color-mix(in srgb, var(--color-accent-pop) ${i === 0 ? 20 : 14}%, transparent)`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Phase Cards - 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {timeline.steps.map((step, i) => {
            const isAddOn = !step.core
            return (
              <motion.div
                key={i}
                style={{
                  background: 'color-mix(in srgb, var(--color-surface) 60%, transparent)',
                  border: isAddOn
                    ? '1px dashed var(--color-border)'
                    : '1px solid var(--color-border)',
                  padding: '24px',
                  opacity: cardAnimations[i].opacity,
                  y: cardAnimations[i].y,
                }}
              >
                {/* Phase label */}
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isAddOn ? 'var(--color-text-muted)' : 'var(--color-accent-pop)',
                  marginBottom: '6px',
                }}>
                  {isAddOn ? 'ADD-ON' : `PHASE ${step.number}`}
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: isAddOn ? 'var(--color-text-secondary)' : 'var(--color-text)',
                  marginBottom: '8px',
                }}>
                  {step.title}
                </div>

                {/* Timeframe pill */}
                {step.timeframe && (
                  <div style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    padding: '3px 12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '999px',
                    letterSpacing: '0.03em',
                    marginBottom: '10px',
                  }}>
                  {step.timeframe}
                  </div>
                )}

                {/* Description */}
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                }}>
                  {step.description}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
