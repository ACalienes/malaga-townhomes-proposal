import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import theme from '../theme.js'

const ease = theme.easing

export default function ExpandableCard({ children, expandedContent, index = 0, className = '' }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const active = expanded || hovered

  return (
    <motion.div
      className={`cursor-pointer overflow-hidden ${className}`}
      style={{
        background: active ? 'rgba(10,10,10,0.75)' : 'rgba(20,20,20,0.5)',
        backdropFilter: 'blur(16px)',
        borderLeft: expanded ? '2px solid var(--color-accent-pop)' : '2px solid transparent',
        borderTop: `1px solid ${active ? 'color-mix(in srgb, var(--color-accent-pop) 20%, transparent)' : 'var(--color-border)'}`,
        borderRight: `1px solid ${active ? 'color-mix(in srgb, var(--color-accent-pop) 20%, transparent)' : 'var(--color-border)'}`,
        borderBottom: `1px solid ${active ? 'color-mix(in srgb, var(--color-accent-pop) 20%, transparent)' : 'var(--color-border)'}`,
        boxShadow: active
          ? '0 4px 30px color-mix(in srgb, var(--color-accent-pop) 8%, transparent)'
          : 'none',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.06, duration: 0.5, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6">
        {typeof children === 'function' ? children({ expanded, hovered, active }) : children}
      </div>

      <AnimatePresence>
        {expanded && expandedContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5">
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  background: 'var(--color-accent-pop)',
                  opacity: 0.3,
                  marginBottom: '12px',
                }}
              />
              {typeof expandedContent === 'string' ? (
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                }}>
                  {expandedContent}
                </p>
              ) : expandedContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
