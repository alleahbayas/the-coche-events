import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import slide1 from '../assets/slide1.png'
import slide2 from '../assets/slide2.png'
import slide3 from '../assets/slide3.png'

const slides = [
  {
    image: slide1,
    title: 'Welcome',
    subtitle: 'Where surprises unfold within the confines of a car',
    button: 'Shop Now',
  },
  {
    image: slide2,
    title: 'Upcoming',
    subtitle: 'Stay tuned for our exciting promos and events.',
    button: null,
  },
  {
    image: slide3,
    title: 'Cesta',
    subtitle: 'Forever in bloom',
    button: 'Go to website',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((current - 1 + slides.length) % slides.length)
  const next = () => setCurrent((current + 1) % slides.length)

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* The moving row of slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== current}
            className="relative h-full w-full shrink-0"
          >
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
              <h2 className="font-tenor text-[90px] uppercase tracking-wide">
                {slide.title}
              </h2>
              <p className="font-poppins font-[200] text-[16px] max-w-sm text-sm uppercase tracking-widest">
                {slide.subtitle}
              </p>
              {slide.button && (
                <button className="mt-6 rounded-full font-poppins text-[14px] border border-white border-2 px-10 py-3 text-xs uppercase tracking-[3px] hover:bg-white hover:text-[#343434] hover:text-[500] transition-colors">
                  {slide.button}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-18 top-1/2 z-10 -translate-y-1/2"
      >
        <ChevronLeft size={40} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-18 top-1/2 z-10 -translate-y-1/2"
      >
        <ChevronRight size={40} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-3 w-3 rounded-full border border-white transition-colors duration-500 ${
              i === current ? 'bg-white' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </section>
  )
}