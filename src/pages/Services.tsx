import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import valentine from '../assets/valentine.jpg'
import custom from '../assets/custom.png'
import birthday from '../assets/birthday.jpeg'
import anniversary from '../assets/anniversary.jpg'

const categories = [
  { label: 'Birthday', image: birthday, path: '/packages/birthday' },
  { label: 'Romantic Setups', image: valentine, path: '/packages/romantic' },
  { label: 'Anniversary', image: anniversary, path: '/packages/anniversary' },
  { label: 'Custom', image: custom, path: '/packages/custom' },
]

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="px-6 pb-24 pt-32 text-center">
      {/* Heading */}
      <h1 className="mx-auto max-w-4xl font-archivo text-4xl font-regular leading-tight text-[#26221C] md:text-5xl">
        Every celebration deserves a{' '}
        <em className="font-accent font-bold italic">twist</em> — and we deliver it
        straight from a car trunk.
      </h1>
      <p className="font-body font-medium mx-auto mt-4 max-w-2xl text-sm text-[#414141]">
        Explore our curated surprises crafted to create joy, connection, and
        unforgettable memories.
      </p>

      {/* Styles + cards */}
      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-start">
        <div className="shrink-0 text-left md:w-40">
          <h2 className="font-accent font-bold text-[40px] italic text-[#26221C]">Styles</h2>
          <p className="mt-2 font-body font-medium italic text-xs text-[#414141]">
            Select the kind of surprise you'd love us to set up
          </p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-10 md:grid-cols-4">
          {categories.map((cat, i) => {
            const isHovered = hovered === i
            return (
              <button
                key={cat.label}
                onClick={() => {
                    // navigate to cat.path once routing is set up
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative h-65 w-55 overflow-hidden rounded-xl text-left"
                >
                <img
                    src={cat.image}
                    alt={cat.label}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Default label, bottom-left */}
                <span
                    className={`absolute bottom-0 left-0 h-16 w-full rounded-tr-full bg-white/50 backdrop-blur-md transition-opacity duration-300 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                    }`}
                />
                
                <span
                    className={`absolute bottom-4 left-4 font-body font-bold text-[20px] text-[#5F2332] transition-opacity duration-300 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    {cat.label}
                </span>

                {/* Hover overlay: dark tint + "View [label] Packages" */}
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/60 px-4 text-center transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    >
                    <span className="flex flex-col items-center text-center font-body text-[16px] font-medium text-white">
                        <span>View</span>
                        <em className="font-accent font-medium italic text-[#FFE4C3]">
                        {cat.label}
                        </em>
                        <span>Packages</span>
                    </span>

                    <ChevronRight
                        size={18}
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-white"
                    />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <button className="mt-14 rounded-md bg-[#26221C] px-14 py-3 text-sm font-body font-medium text-white transition-colors duration-300 hover:bg-[#734F23]">
        Book Now
      </button>
    </section>
  )
}