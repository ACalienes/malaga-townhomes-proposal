import { useState, useEffect, useRef } from 'react'

const FLIP_START = 400

function FlipChar({ target, delay, active }) {
  const isDigit = /[0-9]/.test(target)
  const [display, setDisplay] = useState(isDigit ? ' ' : target)
  const [landed, setLanded] = useState(!isDigit)

  useEffect(() => {
    if (!active || !isDigit) return
    let iters = 0
    const total = 10 + Math.floor(Math.random() * 10)
    let currentId

    function step() {
      iters++
      if (iters >= total) {
        setDisplay(target)
        setLanded(true)
      } else {
        setDisplay(String(Math.floor(Math.random() * 10)))
        currentId = setTimeout(step, 30 + iters * 5)
      }
    }

    const timerId = setTimeout(step, delay)
    return () => { clearTimeout(timerId); clearTimeout(currentId) }
  }, [active, target, delay, isDigit])

  // When value changes but animation is already active, update immediately
  useEffect(() => {
    if (active && landed && isDigit) {
      setDisplay(target)
    }
  }, [target, active, landed, isDigit])

  return (
    <span
      style={{
        display: 'inline-block',
        minWidth: target === '.' ? '0.2em' : target === '$' ? '0.55em' : target === ',' ? '0.25em' : '0.48em',
        textAlign: 'center',
        transform: landed ? 'rotateX(0deg)' : 'rotateX(12deg)',
        transition: 'transform 0.06s ease',
        opacity: landed || !isDigit ? 1 : 0.7,
      }}
    >
      {display}
    </span>
  )
}

export default function FlipDisplay({ value, className = '', style = {} }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  // In a scene-based fixed-position layout, IntersectionObserver does not work
  // reliably. Instead, trigger the animation on mount after a short delay.
  useEffect(() => {
    const t = setTimeout(() => setActive(true), FLIP_START)
    return () => clearTimeout(t)
  }, [])

  const formatted = typeof value === 'number'
    ? `$${value.toLocaleString()}`
    : value

  const chars = formatted.split('')

  return (
    <span ref={ref} className={className} style={{ perspective: '600px', fontFamily: 'var(--font-mono)', color: 'var(--color-text)', ...style }}>
      {chars.map((c, i) => (
        <FlipChar key={`${formatted}-${i}`} target={c} delay={FLIP_START + i * 50} active={active} />
      ))}
    </span>
  )
}
