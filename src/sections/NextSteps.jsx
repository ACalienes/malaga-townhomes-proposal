import { useState } from 'react'
import { motion, AnimatePresence, useTransform } from 'framer-motion'
import ScrollTextReveal from '../components/ScrollTextReveal.jsx'
import useContentOverflow from '../hooks/useContentOverflow.js'
import theme from '../theme.js'

const easing = theme.easing

export default function NextSteps({ progress }) {
  const { nextSteps, terms, agency } = theme
  const { contentRef, overflow } = useContentOverflow()

  const [accepted, setAccepted] = useState(false)
  const [accepting, setAccepting] = useState(false)
  const [showRevisionForm, setShowRevisionForm] = useState(false)
  const [revisionMessage, setRevisionMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const FORMSPREE_URL = nextSteps.formspreeEndpoint

  const handleAccept = async () => {
    if (accepting || accepted) return
    setAccepting(true)
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Malaga Townhomes Proposal - ACCEPTED',
          message: 'The client has accepted the Malaga Townhomes proposal.',
          source: 'malaga-townhomes-proposal',
          type: 'acceptance',
        }),
      })
      if (res.ok) setAccepted(true)
    } catch {
      window.location.href = nextSteps.ctaLink
    }
    setAccepting(false)
  }

  const handleSendRevision = async () => {
    if (!revisionMessage.trim() || sending) return
    setSending(true)
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Malaga Townhomes Proposal - Revision Request',
          message: revisionMessage,
          source: 'malaga-townhomes-proposal',
          type: 'revision',
        }),
      })
      if (res.ok) setSent(true)
    } catch {
      window.location.href = `${nextSteps.ctaSecondaryLink}&body=${encodeURIComponent(revisionMessage)}`
    }
    setSending(false)
  }

  const labelOpacity = useTransform(progress, [0, 0.05], [0, 1])
  const headingOpacity = useTransform(progress, [0.03, 0.10], [0, 1])
  const headingY = useTransform(progress, [0.03, 0.10], [20, 0])
  const dividerScale = useTransform(progress, [0.06, 0.14], [0, 1])

  const contentY = useTransform(progress, [0.42, 0.92], [0, -overflow])

  return (
    <section className="relative w-full h-full overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Fixed header */}
      <div className="relative z-20 text-center pt-14 sm:pt-16 px-6 pb-6" style={{ background: 'var(--color-bg)' }}>
        <motion.div className="section-label glow-text" style={{ opacity: labelOpacity }}>
          {nextSteps.label}
        </motion.div>
        <motion.h2 className="section-heading" style={{ opacity: headingOpacity, y: headingY }}>
          {nextSteps.headline}
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
        <div className="text-center max-w-2xl mx-auto">
          {nextSteps.paragraphs?.map((p, i) => {
            const pStart = 0.08 + i * 0.18
            const pEnd = pStart + 0.16
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
                  marginBottom: '20px',
                }}
              />
            )
          })}

          {/* Dual CTA */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            style={{
              opacity: useTransform(progress, [0.20, 0.28], [0, 1]),
              y: useTransform(progress, [0.20, 0.28], [10, 0]),
            }}
          >
            <motion.button
              type="button"
              onClick={handleAccept}
              className="cta-pulse"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: accepted ? 'var(--color-accent-pop)' : 'var(--color-bg)',
                background: accepted ? 'transparent' : 'var(--color-accent-pop)',
                border: accepted ? '1px solid var(--color-accent-pop)' : '1px solid transparent',
                padding: '16px 40px',
                cursor: accepted ? 'default' : 'pointer',
                transition: 'all 0.3s',
              }}
              whileHover={(!accepted && !accepting) ? { scale: 1.05 } : {}}
              whileTap={(!accepted && !accepting) ? { scale: 0.95 } : {}}
            >
              {accepted ? 'Proposal Accepted' : accepting ? 'Sending...' : nextSteps.cta}
            </motion.button>

            {nextSteps.ctaSecondary && (
              <motion.button
                type="button"
                onClick={() => setShowRevisionForm(!showRevisionForm)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '16px 40px',
                  cursor: 'pointer',
                  background: 'transparent',
                  transition: 'border-color 0.3s, color 0.3s',
                }}
                whileHover={{ scale: 1.05, borderColor: 'var(--color-accent-pop)' }}
                whileTap={{ scale: 0.95 }}
              >
                {nextSteps.ctaSecondary}
              </motion.button>
            )}
          </motion.div>

          {/* Acceptance Confirmation */}
          <AnimatePresence>
            {accepted && (
              <motion.div
                className="mx-auto mt-6"
                style={{
                  maxWidth: '500px',
                  padding: '24px',
                  background: 'color-mix(in srgb, var(--color-accent-pop) 8%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-accent-pop) 20%, transparent)',
                }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.35, ease: easing }}
              >
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px', fontWeight: 600,
                  color: 'var(--color-accent-pop)',
                  marginBottom: '8px',
                }}>
                  Thank you. We are excited to get started.
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px', lineHeight: 1.6,
                  color: 'var(--color-text-secondary)',
                }}>
                  Alex will follow up shortly with next steps to coordinate asset access with Thais and the construction team.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Revision Form */}
          <AnimatePresence>
            {showRevisionForm && (
              <motion.div
                className="text-left mx-auto mt-6"
                style={{ maxWidth: '500px' }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: easing }}
              >
                {sent ? (
                  <div
                    className="text-center"
                    style={{
                      padding: '24px',
                      background: 'color-mix(in srgb, var(--color-accent-pop) 8%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--color-accent-pop) 20%, transparent)',
                    }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px', fontWeight: 600,
                      color: 'var(--color-accent-pop)',
                    }}>
                      Message sent. We will be in touch shortly.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    padding: '24px',
                    background: 'color-mix(in srgb, var(--color-surface) 85%, transparent)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--color-border)',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px', fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: '12px',
                    }}>
                      What would you like to adjust?
                    </p>
                    <textarea
                      value={revisionMessage}
                      onChange={(e) => setRevisionMessage(e.target.value)}
                      placeholder="Share your thoughts here..."
                      style={{
                        width: '100%',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--color-text)',
                        background: 'color-mix(in srgb, var(--color-bg) 80%, transparent)',
                        border: '1px solid var(--color-border)',
                        padding: '14px 16px',
                        minHeight: '120px',
                        resize: 'vertical',
                        outline: 'none',
                        lineHeight: 1.6,
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-pop)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    />
                    <motion.button
                      type="button"
                      onClick={handleSendRevision}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px', fontWeight: 700,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        padding: '14px 32px',
                        marginTop: '12px',
                        background: 'var(--color-accent-pop)',
                        color: 'var(--color-bg)',
                        border: 'none',
                        cursor: (revisionMessage.trim() && !sending) ? 'pointer' : 'default',
                        opacity: (revisionMessage.trim() && !sending) ? 1 : 0.5,
                        transition: 'opacity 0.3s',
                      }}
                      whileHover={(revisionMessage.trim() && !sending) ? { scale: 1.03 } : {}}
                      whileTap={(revisionMessage.trim() && !sending) ? { scale: 0.97 } : {}}
                    >
                      {sending ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Appreciation */}
          {nextSteps.appreciation && (
            <motion.p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px', lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginTop: '40px',
                fontStyle: 'italic',
                opacity: useTransform(progress, [0.28, 0.36], [0, 1]),
              }}
            >
              {nextSteps.appreciation}
            </motion.p>
          )}

          {/* Validity Note */}
          {nextSteps.validityNote && (
            <motion.p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px', lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                marginTop: '16px',
                opacity: useTransform(progress, [0.32, 0.40], [0, 1]),
              }}
            >
              {nextSteps.validityNote}
            </motion.p>
          )}
        </div>

        {/* Terms */}
        {terms && (
          <motion.div
            className="max-w-2xl mx-auto mt-16 pt-10"
            style={{
              borderTop: '1px solid var(--color-border)',
              opacity: useTransform(progress, [0.34, 0.40], [0, 1]),
            }}
          >
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '12px',
            }}>
              {terms.title || 'Terms'}
            </div>
            {terms.items?.map((term, i) => (
              <div key={i} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px', lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                marginBottom: '6px',
                paddingLeft: '12px',
                borderLeft: '1px solid var(--color-border)',
              }}>
                {term}
              </div>
            ))}
          </motion.div>
        )}

        {/* Footer */}
        <div className="text-center mt-16" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          color: 'var(--color-text-muted)',
          opacity: 0.6,
        }}>
          &copy; {new Date().getFullYear()} {agency.name}
        </div>
      </motion.div>
    </section>
  )
}
