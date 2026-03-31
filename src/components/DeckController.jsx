import { useMemo, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'

import Hero from '../sections/Hero.jsx'
import Opportunity from '../sections/Opportunity.jsx'
import Scope from '../sections/Scope.jsx'
import WebsiteUpgrade from '../sections/WebsiteUpgrade.jsx'
import IPadDeckSection from '../sections/iPadDeckSection.jsx'
import Timeline from '../sections/Timeline.jsx'
import Investment from '../sections/Investment.jsx'
import MarketContext from '../sections/MarketContext.jsx'
import PrintEstimate from '../sections/PrintEstimate.jsx'
import NextSteps from '../sections/NextSteps.jsx'
import ImageDivider from '../sections/ImageDivider.jsx'

const Divider1 = (props) => <ImageDivider {...props} imageKey="divider1" />
const Divider2 = (props) => <ImageDivider {...props} imageKey="divider2" />

const SCENES = [
  { id: 'hero', weight: 1.5, component: Hero },
  { id: 'opportunity', weight: 1.5, component: Opportunity },
  { id: 'scope', weight: 4.5, component: Scope },
  { id: 'divider1', weight: 0.8, component: Divider1 },
  { id: 'websiteUpgrade', weight: 4.0, component: WebsiteUpgrade },
  { id: 'ipadDeck', weight: 7.0, component: IPadDeckSection },
  { id: 'timeline', weight: 4.0, component: Timeline },
  { id: 'divider2', weight: 0.8, component: Divider2 },
  { id: 'context', weight: 2.0, component: MarketContext },
  { id: 'investment', weight: 6.5, component: Investment },
  { id: 'printEstimate', weight: 4.5, component: PrintEstimate },
  { id: 'nextSteps', weight: 2.5, component: NextSteps },
]

const TOTAL_WEIGHT = SCENES.reduce((sum, s) => sum + s.weight, 0)

const SCENE_RANGES = (() => {
  let cursor = 0
  return SCENES.map((scene) => {
    const start = cursor / TOTAL_WEIGHT
    cursor += scene.weight
    const end = cursor / TOTAL_WEIGHT
    return { ...scene, start, end }
  })
})()

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const VISIBILITY_PAD = 0.02

const FIRST_SCENE_ID = SCENE_RANGES[0].id
const LAST_SCENE_ID = SCENE_RANGES[SCENE_RANGES.length - 1].id

function SceneWrapper({ scene, globalProgress }) {
  const { start, end, component: Component, id } = scene

  const isFirst = id === FIRST_SCENE_ID
  const isLast = id === LAST_SCENE_ID

  const localProgress = useTransform(globalProgress, (g) => {
    const span = end - start
    if (span === 0) return 0
    return Math.max(0, Math.min(1, (g - start) / span))
  })

  const entranceOpacity = useTransform(
    localProgress,
    [0, 0.05],
    [isFirst ? 1 : 0, 1],
  )
  const exitOpacity = useTransform(
    localProgress,
    [0.95, 1],
    [1, isLast ? 1 : 0],
  )

  const combinedOpacity = useTransform(
    () => Math.min(entranceOpacity.get(), exitOpacity.get()),
  )
  const opacity = REDUCED_MOTION ? 1 : combinedOpacity

  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, opacity }}
      data-scene={id}
    >
      <Component progress={localProgress} />
    </motion.div>
  )
}

export default function DeckController() {
  const { scrollYProgress } = useScroll()
  const [visibleIds, setVisibleIds] = useState(() => new Set([SCENES[0].id]))

  useEffect(() => {
    window.__deckScrollTo = (sceneId) => {
      const scene = SCENE_RANGES.find((s) => s.id === sceneId)
      if (!scene) return
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const targetScroll = scene.start * docHeight
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }

    return () => {
      delete window.__deckScrollTo
      delete window.__deckActiveScene
    }
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (g) => {
    let active = SCENE_RANGES[0].id
    for (const scene of SCENE_RANGES) {
      if (g >= scene.start && g < scene.end) {
        active = scene.id
        break
      }
      if (scene === SCENE_RANGES[SCENE_RANGES.length - 1] && g >= scene.start) {
        active = scene.id
      }
    }
    window.__deckActiveScene = active

    const nextVisible = new Set()
    for (const scene of SCENE_RANGES) {
      if (g >= scene.start - VISIBILITY_PAD && g <= scene.end + VISIBILITY_PAD) {
        nextVisible.add(scene.id)
      }
    }
    if (nextVisible.size === 0) nextVisible.add(active)

    setVisibleIds((prev) => {
      if (prev.size !== nextVisible.size) return nextVisible
      for (const id of nextVisible) {
        if (!prev.has(id)) return nextVisible
      }
      return prev
    })
  })

  const visibleScenes = useMemo(
    () => SCENE_RANGES.filter((s) => visibleIds.has(s.id)),
    [visibleIds],
  )

  return (
    <>
      <div style={{ height: `${TOTAL_WEIGHT * 100}vh`, position: 'relative', zIndex: 0 }} />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--color-bg)',
          }}
        />

        {visibleScenes.map((scene) => (
          <SceneWrapper
            key={scene.id}
            scene={scene}
            globalProgress={scrollYProgress}
          />
        ))}

        <div className="grain-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }} />
      </div>
    </>
  )
}

export { SCENE_RANGES, TOTAL_WEIGHT }