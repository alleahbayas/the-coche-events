import { useEffect, useRef, useState } from 'react'
import { galleryImages } from '../data/galleryImages'

const CARD = 35
const GAP = 1
const STEP = CARD + GAP
const OFFSET = (100 - CARD) / 2

const images = [
  galleryImages[galleryImages.length - 1],
  ...galleryImages,
  galleryImages[0],
]

export default function GalleryPreview() {
  const [current, setCurrent] = useState(1)
  const [paused, setPaused] = useState(false)
  const [smooth, setSmooth] = useState(true)
  const isJumping = useRef(false)

  const next = () => {
    if (isJumping.current) return
    setSmooth(true)
    setCurrent((c) => c + 1)
  }

  const goTo = (realIndex: number) => {
    if (isJumping.current) return
    setSmooth(true)
    setCurrent(realIndex + 1)
  }

  const snapTo = (index: number) => {
    isJumping.current = true
    setSmooth(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCurrent(index)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            isJumping.current = false
          })
        })
      })
    })
  }

  const handleTransitionEnd = () => {
    if (current === images.length - 1) {
      snapTo(1)
    } else if (current === 0) {
      snapTo(galleryImages.length)
    }
  }

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 3000)
    return () => clearInterval(id)
  }, [paused, current])

  const realIndex = (current - 1 + galleryImages.length) % galleryImages.length

  return (
    <div
      className="mt-10 overflow-hidden py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        className="flex w-full items-center"
        style={{
          transform: `translateX(${OFFSET - current * STEP}%)`,
          transition: smooth ? 'transform 700ms ease-in-out' : 'none',
        }}
      >
        {images.map((img, i) => {
          const thisRealIndex = ((i - 1) + galleryImages.length) % galleryImages.length
          return (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              onClick={() => goTo(thisRealIndex)}
              style={{ width: `${CARD}%`, marginRight: `${GAP}%` }}
              className={`aspect-video shrink-0 cursor-pointer object-cover transition-all duration-700 ${
                i === current ? 'scale-100' : 'scale-85 brightness-25'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}