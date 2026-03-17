import { useEffect, useRef } from 'react'

export default function CursorSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Disable on touch devices
    if ('ontouchstart' in window) { el.style.display = 'none'; return }

    let x = 0, y = 0, tx = 0, ty = 0
    const lerp = 0.12
    let raf

    const onMove = (e) => { tx = e.clientX; ty = e.clientY }

    const loop = () => {
      x += (tx - x) * lerp
      y += (ty - y) * lerp
      el.style.background = `radial-gradient(350px circle at ${x}px ${y}px, rgba(201,169,110,0.035), transparent 70%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[9997]"
      aria-hidden="true"
    />
  )
}
