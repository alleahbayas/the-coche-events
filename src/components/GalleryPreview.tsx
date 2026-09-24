import { useEffect, useState } from 'react'
import { galleryImages } from '../data/galleryImages'

const CARD = 35 // image width, as % of the screen
const GAP = 1 // space between images, %
const STEP = CARD + GAP // how far the row moves per slide
const OFFSET = (100 - CARD) / 2 // centers the active image

export default function GalleryPreview() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % galleryImages.length)
    }, 3000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div
      className="overflow-hidden py-10 mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-full items-center transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(${OFFSET - current * STEP}%)` }}
      >
        {galleryImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            onClick={() => setCurrent(i)}
            style={{ width: `${CARD}%`, marginRight: `${GAP}%` }}
            className={`aspect-video shrink-0 cursor-pointer object-cover transition-all duration-700 ${
              i === current ? 'scale-100' : 'scale-85 brightness-25'
            }`}
          />
        ))}
      </div>
    </div>
  )
}