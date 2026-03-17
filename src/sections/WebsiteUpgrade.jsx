import { motion, useTransform } from 'framer-motion'
import ScrollTextReveal from '../components/ScrollTextReveal.jsx'
import useContentOverflow from '../hooks/useContentOverflow.js'
import theme from '../theme.js'

export default function WebsiteUpgrade({ progress }) {
  const { websiteUpgrade } = theme
  const { contentRef, overflow } = useContentOverflow()

  const labelOpacity = useTransform(progress, [0, 0.05], [0, 1])
  const headingOpacity = useTransform(progress, [0.03, 0.10], [0, 1])
  const headingY = useTransform(progress, [0.03, 0.10], [20, 0])
  const dividerScale = useTransform(progress, [0.06, 0.14], [0, 1])

  // Scroll starts AFTER all content has faded in
  const contentY = useTransform(progress, [0.38, 0.92], [0, -overflow])

  return (
    <section className="relative w-full h-full overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Faded divider image */}
      <div className="absolute inset-0">
        <img src={theme.images.divider1} alt="" className="w-full h-full object-cover" style={{ opacity: 0.06 }} />
      </div>

      {/* Fixed header */}
      <div className="relative z-20 text-center pt-14 sm:pt-16 px-6 pb-8" style={{ background: 'var(--color-bg)' }}>
        <motion.div className="section-label glow-text" style={{ opacity: labelOpacity }}>
          {websiteUpgrade.label}
        </motion.div>
        <motion.h2 className="section-heading" style={{ opacity: headingOpacity, y: headingY }}>
          {websiteUpgrade.headline}
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

      {/* Scrolling content — all fade-ins complete before scroll starts at 0.38 */}
      <motion.div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-6 pb-96"
        style={{ y: contentY }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Current issues intro */}
          <motion.div
            style={{
              opacity: useTransform(progress, [0.08, 0.15], [0, 1]),
              y: useTransform(progress, [0.08, 0.15], [16, 0]),
            }}
          >
            <ScrollTextReveal
              text={websiteUpgrade.currentIssues.intro}
              progress={progress}
              range={[0.08, 0.20]}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px', lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '24px', textWrap: 'pretty',
              }}
            />
          </motion.div>

          {/* Issue list — headline + detail */}
          <motion.div
            style={{
              marginBottom: '40px',
              opacity: useTransform(progress, [0.14, 0.20], [0, 1]),
            }}
          >
            {websiteUpgrade.currentIssues.items.map((issue, i) => (
              <motion.div
                key={i}
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid color-mix(in srgb, var(--color-border) 40%, transparent)',
                  opacity: useTransform(progress, [0.14 + i * 0.02, 0.19 + i * 0.02], [0, 1]),
                }}
              >
                <div className="flex items-start gap-3">
                  <span style={{ color: '#c45c4c', fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>&#10005;</span>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '14px', fontWeight: 700,
                      color: 'var(--color-text)',
                      marginBottom: '4px',
                    }}>
                      {typeof issue === 'object' ? issue.headline : issue}
                    </div>
                    {typeof issue === 'object' && issue.detail && (
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px', lineHeight: 1.6,
                        color: 'var(--color-text-muted)',
                      }}>
                        {issue.detail}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            style={{
              width: '100%', height: '1px',
              background: 'var(--color-border)',
              marginBottom: '40px',
              opacity: useTransform(progress, [0.28, 0.31], [0, 0.5]),
            }}
          />

          {/* Proposal — fades in before scroll starts */}
          <motion.div
            style={{
              opacity: useTransform(progress, [0.29, 0.34], [0, 1]),
              y: useTransform(progress, [0.29, 0.34], [16, 0]),
            }}
          >
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--color-accent-pop)',
              marginBottom: '12px',
            }}>
              WHAT WE BUILD
            </div>
            <ScrollTextReveal
              text={websiteUpgrade.proposal.intro}
              progress={progress}
              range={[0.30, 0.38]}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px', lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '24px', textWrap: 'pretty',
              }}
            />
          </motion.div>

          {/* Proposal items */}
          <motion.div
            style={{
              opacity: useTransform(progress, [0.32, 0.37], [0, 1]),
            }}
          >
            {websiteUpgrade.proposal.items.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px', lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                  padding: '6px 0',
                  borderBottom: '1px solid color-mix(in srgb, var(--color-border) 40%, transparent)',
                  opacity: useTransform(progress, [0.32 + i * 0.008, 0.36 + i * 0.008], [0, 1]),
                }}
              >
                <span style={{ color: 'var(--color-accent-pop)', fontSize: '11px', flexShrink: 0, marginTop: '3px' }}>&#10003;</span>
                {item}
              </motion.div>
            ))}
          </motion.div>

          {/* Price block — visually separated */}
          <motion.div
            className="text-center"
            style={{
              marginTop: '60px',
              paddingTop: '48px',
              borderTop: '1px solid var(--color-border)',
              opacity: useTransform(progress, [0.35, 0.38], [0, 1]),
            }}
          >
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '8px',
            }}>
              ADD-ON
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 700,
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              marginBottom: '12px',
            }}>
              ${websiteUpgrade.price.toLocaleString()}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px', lineHeight: 1.6,
              color: 'var(--color-text-muted)',
              maxWidth: '400px',
              margin: '0 auto',
            }}>
              Included in Total Market Position and Full Production packages. Available separately as an add-on.
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
