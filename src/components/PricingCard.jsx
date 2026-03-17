import { motion } from 'framer-motion'

export default function PricingCard({ title, price, items, recommended = false, selected, onSelect, interactive = true }) {
  return (
    <motion.div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? onSelect : undefined}
      className={`relative text-left w-full overflow-hidden${interactive ? ' cursor-pointer' : ''}`}
      style={{
        padding: '32px 28px',
        background: selected
          ? 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent-pop) 12%, transparent) 0%, var(--color-surface) 100%)'
          : 'var(--color-surface)',
        border: selected
          ? '2px solid var(--color-accent-pop)'
          : '2px solid color-mix(in srgb, var(--color-border) 40%, transparent)',
        backdropFilter: 'blur(16px)',
        boxShadow: selected ? '0 0 20px color-mix(in srgb, var(--color-accent-pop) 8%, transparent)' : 'none',
        transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
      }}
      whileHover={interactive ? { scale: 1.02, boxShadow: '0 8px 40px rgba(0,0,0,0.15)' } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
    >
      {recommended && (
        <div
          className="absolute"
          style={{
            top: '16px', right: '16px',
            background: 'var(--color-accent-pop)',
            color: 'var(--color-bg)',
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '4px 12px',
            fontFamily: 'var(--font-body)',
          }}
        >
          Recommended
        </div>
      )}

      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '12px', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--color-accent-pop)', marginBottom: '4px',
      }}>
        {title}
      </div>

      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(40px, 6.5vw, 52px)', fontWeight: 800,
        color: 'var(--color-text)', letterSpacing: '-0.03em',
        lineHeight: 1.1, marginBottom: '24px',
      }}>
        ${price.toLocaleString()}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((f, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              padding: '7px 0',
              borderBottom: '1px solid color-mix(in srgb, var(--color-border) 25%, transparent)',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}
          >
            <span style={{ color: 'var(--color-accent-pop)', fontSize: '13px', flexShrink: 0 }}>&#10003;</span>
            {f}
          </li>
        ))}
      </ul>

      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '3px',
          background: 'var(--color-accent-pop)',
          transformOrigin: 'left',
        }}
        initial={false}
        animate={{ scaleX: selected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
