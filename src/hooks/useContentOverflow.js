import { useRef, useState, useEffect } from 'react'

/**
 * Measures how much a content container overflows the viewport height.
 * Uses ResizeObserver to re-measure whenever content changes
 * (e.g., expandable cards opening/closing).
 */
export default function useContentOverflow() {
  const contentRef = useRef(null)
  const [overflow, setOverflow] = useState(0)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    function measure() {
      const contentH = el.scrollHeight
      const viewH = window.innerHeight
      setOverflow(Math.max(0, contentH - viewH))
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return { contentRef, overflow }
}
