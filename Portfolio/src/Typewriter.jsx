import { useEffect, useState } from 'react'

export default function Typewriter({ words = [], loop = true, typingSpeed = 80, deleteSpeed = 40, pause = 1500 }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const handle = setInterval(() => setBlink(b => !b), 500)
    return () => clearInterval(handle)
  }, [])

  useEffect(() => {
    if (!loop && index >= words.length) return

    const current = words[index % words.length]

    if (isDeleting) {
      if (subIndex === 0) {
        setIsDeleting(false)
        setIndex(i => i + 1)
      } else {
        const timeout = setTimeout(() => setSubIndex(s => s - 1), deleteSpeed)
        return () => clearTimeout(timeout)
      }
    } else {
      if (subIndex === current.length) {
        const timeout = setTimeout(() => setIsDeleting(true), pause)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setSubIndex(s => s + 1), typingSpeed)
        return () => clearTimeout(timeout)
      }
    }
  }, [subIndex, index, isDeleting, words, loop, typingSpeed, deleteSpeed, pause])

  return (
    <span>
      {words[index % words.length].slice(0, subIndex)}
      <span style={{ opacity: blink ? 1 : 0 }}>|</span>
    </span>
  )
}
