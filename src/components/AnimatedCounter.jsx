import { useRef, useEffect, useState } from 'react'

export default function AnimatedCounter({ value, suffix = '', duration = 1500 }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  // In a scene-based fixed-position layout, IntersectionObserver does not work
  // reliably. Trigger the animation on mount instead.
  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const start = performance.now()
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // Bounce easing
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}
