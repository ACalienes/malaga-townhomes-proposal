import { motion, useTransform } from 'framer-motion'
import ScrollTextReveal from '../components/ScrollTextReveal.jsx'
import theme from '../theme.js'

export default function Opportunity({ progress }) {
  const { opportunity } = theme

  const labelOpacity = useTransform(progress, [0, 0.06], [0, 1])
  const headingOpacity = useTransform(progress, [0.03, 0.10], [0, 1])
  const headingY = useTransform(progress, [0.03, 0.10], [20, 0])
  const dividerScale = useTransform(progress, [0.08, 0.16], [0, 1])

  return (
    <section className="relative w-full h-full flex items-center overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <img src={theme.images.opportunity} alt="" className="w-full h-full object-cover" style={{ opacity: 0.12 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div className="section-label glow-text" style={{ opacity: labelOpacity }}>
            {opportunity.label}
          </motion.div>

          <motion.h2 className="section-heading" style={{ opacity: headingOpacity, y: headingY }}>
            {opportunity.headline}
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

          {opportunity.paragraphs.map((p, i) => {
            const pStart = 0.14 + i * 0.30
            const pEnd = pStart + 0.28
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

          <motion.div
            className="flex items-center justify-center gap-8 mt-12"
            style={{
              opacity: useTransform(progress, [0.35, 0.45], [0, 1]),
            }}
          >
            {[
              { value: '2', label: 'Residences' },
              { value: '~$13.5M', label: 'Sellout' },
              { value: 'Coral Gables', label: 'Florida' },
            ].map((stat, i, arr) => (
              <div key={i} className="flex items-center gap-8">
                <div className="text-center">
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px', fontWeight: 700,
                    color: 'var(--color-accent-pop)',
                    letterSpacing: '-0.02em',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginTop: '4px',
                  }}>
                    {stat.label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{
                    width: '1px', height: '28px',
                    background: 'var(--color-accent-pop)',
                    opacity: 0.2,
                  }} />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
