import { motion, useTransform } from 'framer-motion'
import ScrollTextReveal from '../components/ScrollTextReveal.jsx'
import theme from '../theme.js'

export default function MarketContext({ progress }) {
  const { marketContext } = theme
  const { benchmark } = marketContext

  const labelOpacity = useTransform(progress, [0, 0.05], [0, 1])
  const headingOpacity = useTransform(progress, [0.03, 0.10], [0, 1])
  const headingY = useTransform(progress, [0.03, 0.10], [20, 0])
  const dividerScale = useTransform(progress, [0.06, 0.14], [0, 1])

  return (
    <section className="relative w-full h-full flex items-center overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Faded divider image carried from previous section */}
      <div className="absolute inset-0">
        <img src={theme.images.divider2} alt="" className="w-full h-full object-cover" style={{ opacity: 0.06 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="text-center mb-8">
          <motion.div className="section-label glow-text" style={{ opacity: labelOpacity }}>
            {marketContext.label}
          </motion.div>
          <motion.h2 className="section-heading" style={{ opacity: headingOpacity, y: headingY }}>
            {marketContext.headline}
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

        {/* Paragraphs */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          {marketContext.paragraphs.map((p, i) => {
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

        {/* Visual benchmark */}
        <motion.div
          className="max-w-2xl mx-auto"
          style={{
            opacity: useTransform(progress, [0.25, 0.35], [0, 1]),
            y: useTransform(progress, [0.25, 0.35], [20, 0]),
          }}
        >
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { display: `$${benchmark.industryBudget.toLocaleString()}`, sub: `${benchmark.industryPercent}% of sellout`, muted: true },
              { display: `$${benchmark.recommendedPrice.toLocaleString()}`, sub: 'Our recommended', accent: true },
              { display: `${benchmark.recommendedPercent}%`, sub: 'Of sellout', muted: true },
            ].map((item, i) => (
              <motion.div
                key={i}
                style={{
                  opacity: useTransform(progress, [0.30 + i * 0.04, 0.38 + i * 0.04], [0, 1]),
                  y: useTransform(progress, [0.30 + i * 0.04, 0.38 + i * 0.04], [15, 0]),
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(28px, 4.5vw, 40px)', fontWeight: 700,
                  color: item.accent ? 'var(--color-accent-pop)' : 'var(--color-text-muted)',
                  opacity: item.muted ? 0.5 : 1,
                  letterSpacing: '-0.02em',
                }}>
                  {item.display}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  color: item.accent ? 'var(--color-accent-pop)' : 'var(--color-text-muted)',
                  marginTop: '4px',
                }}>
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual bar comparison */}
          <div className="mt-6 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Industry standard ({benchmark.industryPercent}% of ${(benchmark.sellout / 1000000).toFixed(1)}M)
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  ${benchmark.industryBudget.toLocaleString()}
                </span>
              </div>
              <div style={{ height: '3px', background: 'var(--color-border)', overflow: 'hidden' }}>
                <motion.div
                  style={{
                    height: '100%', background: 'var(--color-text-muted)', opacity: 0.3,
                    transformOrigin: 'left',
                    scaleX: useTransform(progress, [0.40, 0.60], [0, 1]),
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-accent-pop)' }}>
                  Market Position ({benchmark.recommendedPercent}% of sellout)
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-accent-pop)' }}>
                  ${benchmark.recommendedPrice.toLocaleString()}
                </span>
              </div>
              <div style={{ height: '3px', background: 'var(--color-border)', overflow: 'hidden' }}>
                <motion.div
                  style={{
                    height: '100%',
                    background: 'var(--color-accent-pop)',
                    transformOrigin: 'left',
                    width: `${(benchmark.recommendedPrice / benchmark.industryBudget) * 100}%`,
                    scaleX: useTransform(progress, [0.45, 0.65], [0, 1]),
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sources */}
        <motion.div
          className="max-w-2xl mx-auto mt-6 text-center"
          style={{
            opacity: useTransform(progress, [0.55, 0.65], [0, 1]),
          }}
        >
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--color-text-muted)', opacity: 0.6 }}>
            Sources: {marketContext.sources.join(' | ')}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
