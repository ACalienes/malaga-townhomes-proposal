import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] origin-left"
      style={{
        height: '2px',
        scaleX,
        backgroundColor: 'var(--color-accent-pop)',
        boxShadow: '0 0 8px color-mix(in srgb, var(--color-accent-pop) 40%, transparent)',
      }}
    />
  )
}
