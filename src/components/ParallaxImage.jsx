import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import theme from '../theme.js'

export default function ParallaxImage({ src, position = 'center center', opacity = 0.65 }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [100, -100])

  if (!src) return null

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden relative"
      style={{ height: 'clamp(250px, 40vw, 400px)' }}
    >
      <motion.div
        className="absolute"
        style={{ y, top: '-100px', left: 0, right: 0, bottom: '-100px' }}
      >
        <motion.img
          src={src}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ objectPosition: position }}
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: theme.easing }}
        />
      </motion.div>

      {/* Top/bottom gradient bleeds for seamless transitions */}
      <div className="absolute top-0 inset-x-0 pointer-events-none z-10"
        style={{ height: '25%', background: 'linear-gradient(to bottom, var(--color-bg), transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 pointer-events-none z-10"
        style={{ height: '25%', background: 'linear-gradient(to top, var(--color-bg), transparent)' }} />
    </div>
  )
}
