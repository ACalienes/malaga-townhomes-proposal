import { motion, useTransform } from 'framer-motion'
import AnimatedCounter from '../components/AnimatedCounter.jsx'
import ScrollTextReveal from '../components/ScrollTextReveal.jsx'
import theme from '../theme.js'

export default function Proof({ progress }) {
  const { proof } = theme

  const labelOpacity = useTransform(progress, [0, 0.06], [0, 1])
  const headingOpacity = useTransform(progress, [0.03, 0.10], [0, 1])
  const headingY = useTransform(progress, [0.03, 0.10], [20, 0])
  const dividerScale = useTransform(progress, [0.06, 0.14], [0, 1])

  return (
    <section className="relative w-full h-full flex items-center overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <img src={theme.images.divider2} alt="" className="w-full h-full object-cover" style={{ opacity: 0.10 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="text-center mb-8">
          <motion.div className="section-label glow-text" style={{ opacity: labelOpacity }}>
            {proof.label}
          </motion.div>
          <motion.h2 className="section-heading" style={{ opacity: headingOpacity, y: headingY }}>
            {proof.headline}
          </motion.h2>
          <motion.div
            style={{
              width: '60px', height: '1px',
              background: 'var(--color-accent-pop)',
              margin: '0 auto 32px',
              transformOrigin: 'left',
              boxShadow: '0 0 12px color-mix(in srgb, var(--color-accent-pop) 30%, transparent)',
              scaleX: dividerScale,
            }}
          />
        </div>

        {proof.paragraphs && (
          <div className="max-w-4xl mx-auto text-center mb-8">
            {proof.paragraphs.map((p, i) => {
              const pStart = 0.10 + i * 0.22
              const pEnd = pStart + 0.20
              return (
                <ScrollTextReveal
                  key={i}
                  text={p}
                  progress={progress}
                  range={[pStart, pEnd]}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px', lineHeight: 1.8,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '20px', textWrap: 'pretty',
                  }}
                />
              )
            })}
          </div>
        )}

        {proof.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {proof.stats.map((stat, i) => (
              <motion.div
                key={i}
                style={{
                  opacity: useTransform(progress, [0.30 + i * 0.06, 0.40 + i * 0.06], [0, 1]),
                  y: useTransform(progress, [0.30 + i * 0.06, 0.40 + i * 0.06], [20, 0]),
                  background: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
                  border: '1px solid var(--color-border)',
                  padding: '20px 16px',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(32px, 4.5vw, 44px)', fontWeight: 800,
                  color: 'var(--color-accent-pop)',
                  letterSpacing: '-0.02em',
                }}>
                  {stat.static ? stat.suffix : <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px', fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  marginTop: '8px', textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {proof.clients && (
          <motion.div
            className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mt-10"
            style={{
              opacity: useTransform(progress, [0.55, 0.65], [0, 1]),
            }}
          >
            {proof.clients.map((client, i) => (
              <div key={i} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                padding: '6px 16px',
                border: '1px solid var(--color-border)',
              }}>
                {client}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
