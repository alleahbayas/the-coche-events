import { useState } from 'react'
import { Heart, Share2, X, Download } from 'lucide-react'
import { galleryImages } from '../data/galleryImages'

const COLUMN_COUNT = 4

function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const shuffledImages = shuffle(galleryImages)
const columns: typeof galleryImages[] = Array.from({ length: COLUMN_COUNT }, () => [])
shuffledImages.forEach((img, i) => {
  columns[i % COLUMN_COUNT].push(img)
})

type GalleryImage = (typeof galleryImages)[number]

function GalleryColumn({
  images,
  direction,
  speed,
  saved,
  toggleSave,
  onImageClick,
}: {
  images: GalleryImage[]
  direction: 'up' | 'down'
  speed: number
  saved: Set<string>
  toggleSave: (src: string) => void
  onImageClick: (img: GalleryImage) => void
}) {
  const REPEAT = 4
  const filled = Array.from({ length: REPEAT }, () => images).flat()
  const looped = [...filled, ...filled]

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#f4f4f4] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#f4f4f4] to-transparent" />

      <div
        className={`flex flex-col gap-4 ${
          direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {looped.map((img, i) => (
          <div
            key={i}
            onClick={() => onImageClick(img)}
            className="group relative cursor-pointer overflow-hidden rounded-lg"
          >
            <img src={img.src} alt={img.alt} className="w-full object-cover" />

            <div className="absolute inset-0 flex items-start justify-between p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleSave(img.src)
                }}
                aria-label="Save"
                className="rounded-full bg-white/90 p-1.5 shadow"
              >
                <Heart
                  size={16}
                  className={saved.has(img.src) ? 'fill-rose-600 text-rose-600' : 'text-[#26221C]'}
                />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                aria-label="Share"
                className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-[#26221C] shadow"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Gallery() {
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null)

  const toggleSave = (src: string) => {
    setSaved((prev) => {
      const next = new Set(prev)
      next.has(src) ? next.delete(src) : next.add(src)
      return next
    })
  }

  return (
    <section className="relative px-6 pb-24 pt-32">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
        {columns.map((colImages, i) => (
          <GalleryColumn
            key={i}
            images={colImages}
            direction={i % 2 === 0 ? 'up' : 'down'}
            speed={25 + i * 4}
            saved={saved}
            toggleSave={toggleSave}
            onImageClick={setActiveImage}
          />
        ))}
      </div>

      {/* Lightbox */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred backdrop over the still-scrolling gallery */}
          <div
            onClick={() => setActiveImage(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-lg"
          />

          {/* Close button */}
          <button
            onClick={() => setActiveImage(null)}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 rounded-full bg-white/90 p-2 shadow"
          >
            <X size={22} className="text-[#26221C]" />
          </button>

          {/* Enlarged image + actions */}
          <div className="relative z-10 flex max-h-[85vh] max-w-3xl flex-col items-center gap-4 px-4">
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[70vh] w-auto rounded-lg object-contain shadow-2xl"
            />

            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleSave(activeImage.src)}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-[#26221C] shadow transition-colors hover:bg-[#f4f4f4]"
              >
                <Heart
                  size={18}
                  className={saved.has(activeImage.src) ? 'fill-rose-600 text-rose-600' : ''}
                />
                {saved.has(activeImage.src) ? 'Saved' : 'Save'}
              </button>

              <a
                href={activeImage.src}
                download
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-[#26221C] shadow transition-colors hover:bg-[#f4f4f4]"
              >
                <Download size={18} />
                Download
              </a>

              <button
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-[#26221C] shadow transition-colors hover:bg-[#f4f4f4]"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}