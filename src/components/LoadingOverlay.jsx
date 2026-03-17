import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'var(--color-bg)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src="/images/kameha-logo-white.png"
            alt="Kameha Media"
            style={{ height: '24px', width: 'auto' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 0.9, 0.9, 0], y: [8, 0, 0, -4] }}
            transition={{ duration: 1.4, times: [0, 0.3, 0.7, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
