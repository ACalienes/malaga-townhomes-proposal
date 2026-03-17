import { motion } from 'framer-motion'
import theme from '../theme.js'

const ease = theme.easing

function WordReveal({ text, startDelay = 0.9, perWord = 0.07 }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: startDelay + i * perWord, duration: 0.7, ease }}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

export default function Hero() {
  const { hero, images } = theme

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background image with Ken Burns */}
      {images.hero && (
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt=""
            className="w-full h-full object-cover hero-image"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(10,10,10,0.7) 60%, var(--color-bg))',
          }} />
        </div>
      )}

      {/* Thin border frame inset */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '24px', left: '24px', right: '24px', bottom: '24px',
          border: '1px solid color-mix(in srgb, var(--color-accent-pop) 15%, transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2, ease }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Client logo */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, ease }}
        >
          <img
            src="/images/dwell-logo.png"
            alt="Dwell 365"
            className="mx-auto"
            style={{ height: '80px', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
          />
        </motion.div>

        <motion.div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--color-accent-pop)',
            marginBottom: '24px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease }}
        >
          {hero.eyebrow}
        </motion.div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(42px, 7.5vw, 80px)', fontWeight: 700,
            letterSpacing: '-0.01em', lineHeight: 1.05,
            color: 'var(--color-text)',
            marginBottom: '20px',
            textWrap: 'balance',
          }}
        >
          <WordReveal text={hero.headline} startDelay={0.7} perWord={0.12} />
        </h1>

        <motion.div
          className="glow-line"
          style={{
            width: '60px', height: '1px',
            background: 'var(--color-accent-pop)',
            margin: '0 auto 24px',
            transformOrigin: 'left',
            boxShadow: '0 0 12px color-mix(in srgb, var(--color-accent-pop) 30%, transparent)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.8, ease }}
        />

        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px', margin: '0 auto 16px',
            lineHeight: 1.7, textWrap: 'balance',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--color-accent-pop)',
            marginBottom: '40px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 2.0, duration: 0.8, ease }}
        >
          {hero.propertyDetail}
        </motion.div>

        <motion.div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.1em',
            color: 'var(--color-text-muted)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8, ease }}
        >
          {hero.footer}
        </motion.div>
      </div>
    </section>
  )
}
