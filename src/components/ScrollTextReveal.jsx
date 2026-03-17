import { useTransform, motion } from 'framer-motion'

function Word({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  return (
    <motion.span style={{ opacity, display: 'inline' }}>
      {word}{' '}
    </motion.span>
  )
}

export default function ScrollTextReveal({ text, progress, range = [0, 1], style = {} }) {
  const words = text.split(/\s+/)
  const [rangeStart, rangeEnd] = range
  const span = rangeEnd - rangeStart

  return (
    <p style={style}>
      {words.map((word, i) => {
        const wordStart = rangeStart + (i / words.length) * span
        const wordEnd = rangeStart + ((i + 1) / words.length) * span
        return (
          <Word
            key={i}
            word={word}
            progress={progress}
            start={wordStart}
            end={wordEnd}
          />
        )
      })}
    </p>
  )
}
