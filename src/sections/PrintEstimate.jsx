import { motion, useTransform } from 'framer-motion'
import useContentOverflow from '../hooks/useContentOverflow.js'
import theme from '../theme.js'

export default function PrintEstimate({ progress }) {
  const data = theme.printEstimate
  const { contentRef, overflow } = useContentOverflow()

  const labelOpacity = useTransform(progress, [0, 0.05], [0, 1])
  const headingOpacity = useTransform(progress, [0.03, 0.10], [0, 1])
  const headingY = useTransform(progress, [0.03, 0.10], [20, 0])
  const dividerScale = useTransform(progress, [0.06, 0.14], [0, 1])

  const contentY = useTransform(progress, [0.38, 0.92], [0, -overflow])

  return (
    <section className="relative w-full h-full overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Fixed header */}
      <div className="relative z-20 text-center pt-14 sm:pt-16 px-6 pb-6" style={{ background: 'var(--color-bg)' }}>
        <motion.div
          className="section-label glow-text"
          style={{ opacity: labelOpacity }}
        >
          {data.label}
        </motion.div>
        <motion.h2
          className="section-heading"
          style={{ opacity: headingOpacity, y: headingY }}
        >
          {data.headline}
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
        {/* Intro text */}
        <motion.div
          className="max-w-3xl mx-auto mb-8 text-center"
          style={{
            opacity: useTransform(progress, [0.10, 0.18], [0, 1]),
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'var(--color-text-secondary)',
            marginBottom: '16px',
          }}>
            {data.intro}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
          }}>
            {data.managementNote}
          </p>
        </motion.div>

        {/* Product categories */}
        <div className="space-y-6 mb-10">
          {data.categories.map((category, i) => {
            const cardStart = 0.16 + i * 0.06
            const cardEnd = cardStart + 0.08
            return (
              <motion.div
                key={i}
                className="overflow-hidden"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  opacity: useTransform(progress, [cardStart, cardEnd], [0, 1]),
                  y: useTransform(progress, [cardStart, cardEnd], [20, 0]),
                }}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        marginBottom: '4px',
                      }}>
                        {category.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.5,
                      }}>
                        {category.spec}
                      </p>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.05em',
                    }}>
                      {category.vendor}
                    </div>
                  </div>

                  {/* Quantity tiers */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {category.tiers.map((tier, j) => (
                      <div
                        key={j}
                        className="text-center p-3"
                        style={{
                          background: 'var(--color-bg)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'var(--color-text-muted)',
                          letterSpacing: '0.05em',
                          marginBottom: '4px',
                        }}>
                          QTY {tier.qty}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '20px',
                          fontWeight: 700,
                          color: 'var(--color-accent-pop)',
                          marginBottom: '2px',
                        }}>
                          ${tier.total.toLocaleString()}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          color: 'var(--color-text-muted)',
                        }}>
                          ${tier.perUnit}/ea
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Summary totals */}
        <motion.div
          className="mb-10"
          style={{
            background: 'color-mix(in srgb, var(--color-surface) 94%, var(--color-accent-pop) 6%)',
            border: '1px solid var(--color-accent-pop)',
            opacity: useTransform(progress, [0.28, 0.36], [0, 1]),
            y: useTransform(progress, [0.28, 0.36], [20, 0]),
          }}
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-text)',
              }}>
                {data.summary.label}
              </h3>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-accent-pop)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                Per Kit Total
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {data.summary.tiers.map((tier, i) => (
                <div
                  key={i}
                  className="text-center p-3"
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                  }}>
                    QTY {tier.qty}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '2px',
                  }}>
                    ${tier.total.toLocaleString()}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--color-accent-pop)',
                    fontWeight: 600,
                  }}>
                    ${tier.perUnit}/kit
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Welcome packet */}
        <motion.div
          className="mb-8"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            opacity: useTransform(progress, [0.32, 0.40], [0, 1]),
            y: useTransform(progress, [0.32, 0.40], [20, 0]),
          }}
        >
          <div className="p-5 sm:p-6">
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-text)',
              marginBottom: '12px',
            }}>
              {data.welcomePacket.title}
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              marginBottom: '16px',
            }}>
              {data.welcomePacket.intro}
            </p>

            <div className="grid sm:grid-cols-2 gap-2 mb-4">
              {data.welcomePacket.components.map((component, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    padding: '4px 0',
                  }}
                >
                  <span style={{ color: 'var(--color-accent-pop)', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>&#10003;</span>
                  {component}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--color-accent-pop)',
              }}>
                {data.welcomePacket.estimatedRange} per packet
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
              }}>
                {data.welcomePacket.status}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          style={{
            opacity: useTransform(progress, [0.34, 0.42], [0, 1]),
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            lineHeight: 1.6,
            color: 'var(--color-text-muted)',
            opacity: 0.8,
          }}>
            {data.disclaimer}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}