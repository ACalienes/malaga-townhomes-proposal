import { motion, useTransform } from 'framer-motion'
import theme from '../theme.js'

export default function ImageDivider({ progress, imageKey }) {
  const y = useTransform(progress, [0, 1], [0, -30])

  return (
    <section className="relative w-full h-full overflow-hidden">
      {/* Full-viewport image with subtle parallax */}
      <motion.img
        src={theme.images[imageKey]}
        alt=""
        className="w-full h-full object-cover"
        style={{
          y,
          scale: 1.05,
        }}
      />

      {/* Radial gradient overlay: lighter center, darker edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 100%)',
        }}
      />

      {/* Subtle property address */}
      <div className="absolute inset-0 flex items-end justify-center pb-12 pointer-events-none">
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-muted)',
            opacity: 0.5,
          }}
        >
          {theme.propertyAddress}
        </span>
      </div>
    </section>
  )
}
