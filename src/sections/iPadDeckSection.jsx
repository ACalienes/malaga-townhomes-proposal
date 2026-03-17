import { useState } from 'react'
import { motion, useTransform } from 'framer-motion'
import ScrollTextReveal from '../components/ScrollTextReveal.jsx'
import IPadMockup from '../components/iPadMockup.jsx'
import useContentOverflow from '../hooks/useContentOverflow.js'
import theme from '../theme.js'

const FEATURE_SCREENS = ['rooms', 'specs', 'floorplan', 'brand', 'photos']

export default function IPadDeckSection({ progress }) {
  const { ipadDeck } = theme
  const { contentRef, overflow } = useContentOverflow()
  const [activeFeature, setActiveFeature] = useState(0)

  const labelOpacity = useTransform(progress, [0, 0.04], [0, 1])
  const headingOpacity = useTransform(progress, [0.02, 0.08], [0, 1])
  const headingY = useTransform(progress, [0.02, 0.08], [20, 0])
  const dividerScale = useTransform(progress, [0.04, 0.10], [0, 1])

  /*
   * Layout timeline (7.0 weight = ~700vh of scroll):
   *
   * 0.00–0.08  Header fades in
   * 0.06–0.22  Intro + paragraphs fade in
   * 0.20–0.26  Build note + dual-use fade in
   * 0.24–0.95  Content scrolls (contentY)
   * 0.38–0.44  iPad fades in (after text scrolls away)
   * 0.38–0.44  Feature cards fade in
   * 0.60–0.70  Closing statement
   * 0.70–0.78  Price tag
   * 0.90–0.96  iPad fades out
   */
  const contentY = useTransform(progress, [0.24, 0.95], [0, -overflow])

  // iPad visible for the entire feature-card + closing zone
  const ipadOpacity = useTransform(progress, [0.38, 0.44, 0.90, 0.96], [0, 1, 1, 0])
  const ipadScale = useTransform(progress, [0.38, 0.44], [0.95, 1])

  return (
    <section className="relative w-full h-full overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* iPad mockup — positioned absolutely, does NOT scroll with content */}
      <motion.div
        style={{
          position: 'absolute',
          left: '3%',
          top: '40%',
          width: '50%',
          maxWidth: '720px',
          transform: 'translateY(-50%)',
          zIndex: 5,
          opacity: ipadOpacity,
          scale: ipadScale,
        }}
      >
        <IPadMockup activeScreen={FEATURE_SCREENS[activeFeature]} />
        <div style={{
          textAlign: 'center', marginTop: '10px',
          fontFamily: 'var(--font-body)',
          fontSize: '10px', fontStyle: 'italic',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.02em',
        }}>
          {ipadDeck.disclaimer}
        </div>
      </motion.div>

      {/* Fixed header */}
      <div className="relative z-20 text-center pt-14 sm:pt-16 px-6 pb-8" style={{ background: 'var(--color-bg)' }}>
        <motion.div className="section-label glow-text" style={{ opacity: labelOpacity }}>
          {ipadDeck.label}
        </motion.div>
        <motion.h2 className="section-heading" style={{ opacity: headingOpacity, y: headingY }}>
          {ipadDeck.headline}
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
        className="relative z-10 w-full pt-6 pb-96 px-6 sm:px-10 lg:px-12"
        style={{ y: contentY }}
      >
        {/* Intro + paragraphs — full width, centered */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            style={{
              opacity: useTransform(progress, [0.06, 0.12], [0, 1]),
            }}
          >
            <ScrollTextReveal
              text={ipadDeck.intro}
              progress={progress}
              range={[0.06, 0.18]}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px', lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                fontStyle: 'italic',
                textWrap: 'pretty',
              }}
            />
          </motion.div>

          {ipadDeck.paragraphs.map((p, i) => (
            <motion.div
              key={i}
              style={{
                opacity: useTransform(progress, [0.12 + i * 0.05, 0.17 + i * 0.05], [0, 1]),
              }}
            >
              <ScrollTextReveal
                text={p}
                progress={progress}
                range={[0.12 + i * 0.05, 0.22 + i * 0.05]}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px', lineHeight: 1.8,
                  color: 'var(--color-text-secondary)',
                  marginBottom: '20px', textWrap: 'pretty',
                }}
              />
            </motion.div>
          ))}

          {/* Build note */}
          <motion.div
            className="mb-6"
            style={{
              opacity: useTransform(progress, [0.20, 0.24], [0, 1]),
            }}
          >
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px', lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              padding: '16px 20px',
              borderLeft: '2px solid var(--color-accent-pop)',
              background: 'color-mix(in srgb, var(--color-surface) 60%, transparent)',
            }}>
              {ipadDeck.buildNote}
            </div>
          </motion.div>

          {/* Dual-use callout — large bottom margin to clear before iPad appears */}
          <motion.div
            className="text-center"
            style={{
              marginBottom: '30vh',
              opacity: useTransform(progress, [0.22, 0.26], [0, 1]),
            }}
          >
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px', lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              padding: '16px 20px',
              border: '1px solid var(--color-border)',
              background: 'color-mix(in srgb, var(--color-surface) 60%, transparent)',
            }}>
              {ipadDeck.dualUse}
            </div>
          </motion.div>
        </div>

        {/* Feature cards — pushed to the right so iPad has room on the left */}
        <motion.div
          style={{
            opacity: useTransform(progress, [0.38, 0.44], [0, 1]),
          }}
        >
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            textAlign: 'right', marginBottom: '12px',
            paddingRight: '4px',
            marginLeft: '54%',
          }}>
            SELECT A FEATURE TO PREVIEW
          </div>

          <div style={{
            marginLeft: '54%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {ipadDeck.features.map((feature, i) => {
              const isActive = activeFeature === i
              return (
                <motion.div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveFeature(i)}
                  style={{
                    background: isActive
                      ? 'color-mix(in srgb, var(--color-surface) 90%, var(--color-accent-pop) 10%)'
                      : 'color-mix(in srgb, var(--color-surface) 60%, transparent)',
                    border: isActive
                      ? '1px solid var(--color-accent-pop)'
                      : '1px solid var(--color-border)',
                    padding: '16px 18px',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
                    boxShadow: isActive
                      ? '0 4px 20px color-mix(in srgb, var(--color-accent-pop) 12%, transparent)'
                      : 'none',
                  }}
                  whileHover={{
                    borderColor: 'var(--color-accent-pop)',
                    y: -2,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '15px', fontWeight: 700,
                        color: 'var(--color-text)',
                        marginBottom: '6px',
                      }}>
                        {feature.title}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px', lineHeight: 1.7,
                        color: 'var(--color-text-secondary)',
                      }}>
                        {feature.description}
                      </div>
                    </div>
                    <div style={{
                      width: '24px', height: '24px',
                      borderRadius: '50%',
                      border: isActive ? 'none' : '1px solid var(--color-border)',
                      background: isActive ? 'var(--color-accent-pop)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: '2px',
                      transition: 'all 0.3s',
                    }}>
                      {isActive && (
                        <span style={{ color: 'var(--color-bg)', fontSize: '11px', fontWeight: 700 }}>&#10003;</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Closing statement — right side to sit beside iPad */}
        <motion.div
          className="mt-12"
          style={{
            marginLeft: '54%',
            opacity: useTransform(progress, [0.60, 0.68], [0, 1]),
          }}
        >
          <ScrollTextReveal
            text={ipadDeck.closingStatement}
            progress={progress}
            range={[0.60, 0.76]}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px', lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              fontStyle: 'italic',
              textWrap: 'pretty',
            }}
          />
        </motion.div>

        {/* Price tag — right side */}
        <motion.div
          className="mt-8"
          style={{
            marginLeft: '54%',
            textAlign: 'center',
            opacity: useTransform(progress, [0.70, 0.76], [0, 1]),
          }}
        >
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: '4px',
          }}>
            ADD-ON
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(36px, 5.5vw, 52px)', fontWeight: 700,
            color: 'var(--color-text)',
            letterSpacing: '-0.02em',
          }}>
            ${ipadDeck.price.toLocaleString()}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
