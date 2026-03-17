import { motion, useTransform } from 'framer-motion'
import ExpandableCard from '../components/ExpandableCard.jsx'
import useContentOverflow from '../hooks/useContentOverflow.js'
import theme from '../theme.js'

export default function Approach({ progress }) {
  const { approach } = theme
  const { contentRef, overflow } = useContentOverflow()

  const labelOpacity = useTransform(progress, [0, 0.05], [0, 1])
  const headingOpacity = useTransform(progress, [0.03, 0.10], [0, 1])
  const headingY = useTransform(progress, [0.03, 0.10], [20, 0])
  const dividerScale = useTransform(progress, [0.06, 0.14], [0, 1])

  // Scroll starts after all cards have faded in
  const contentY = useTransform(progress, [0.38, 0.90], [0, -overflow])

  return (
    <section className="relative w-full h-full overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Fixed header */}
      <div className="relative z-20 text-center pt-16 sm:pt-20 px-6 pb-6" style={{ background: 'var(--color-bg)' }}>
        <motion.div className="section-label glow-text" style={{ opacity: labelOpacity }}>
          {approach.label}
        </motion.div>
        <motion.h2 className="section-heading" style={{ opacity: headingOpacity, y: headingY }}>
          {approach.headline}
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
        <div className="grid gap-4 max-w-4xl mx-auto">
          {approach.cards.map((card, i) => {
            const cardStart = 0.10 + i * 0.06
            const cardEnd = cardStart + 0.08
            return (
              <motion.div
                key={i}
                style={{
                  opacity: useTransform(progress, [cardStart, cardEnd], [0, 1]),
                  y: useTransform(progress, [cardStart, cardEnd], [20, 0]),
                }}
              >
                <ExpandableCard index={i} expandedContent={card.expanded}>
                  {({ active }) => (
                    <>
                      <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '16px', fontWeight: 700,
                        color: 'var(--color-text)',
                        marginBottom: '6px', transition: 'color 0.3s',
                      }}>
                        {card.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px', lineHeight: 1.6,
                        color: 'var(--color-text-secondary)',
                        transition: 'color 0.3s',
                      }}>
                        {card.detail}
                      </div>
                    </>
                  )}
                </ExpandableCard>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
