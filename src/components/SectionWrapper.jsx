import { motion } from 'framer-motion'
import theme from '../theme.js'

export default function SectionWrapper({ children, id, className = '', fullBleed = false, dark = true }) {
  return (
    <motion.section
      id={id}
      className={`relative ${className}`}
      style={{ background: dark ? 'var(--color-bg)' : 'var(--color-bg-light)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: theme.easing }}
    >
      {fullBleed ? children : (
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-16 sm:py-20">
          {children}
        </div>
      )}
    </motion.section>
  )
}
