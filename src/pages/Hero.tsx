import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import slide1 from '../assets/slide1.png'
import slide2 from '../assets/slide2.png'
import slide3 from '../assets/slide3.png'

const realSlides = [
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

// Add a clone of the last slide at the start, and a clone of the first slide at the end
const slides = [realSlides[realSlides.length - 1], ...realSlides, realSlides[0]]

export default function Hero() {
  const [current, setCurrent] = useState(1) 
  const [paused, setPaused] = useState(false)
  const [smooth, setSmooth] = useState(true)
  const isJumping = useRef(false)

  const next = () => {
    if (isJumping.current) return
    setSmooth(true)
    setCurrent((c) => c + 1)
  }

  const prev = () => {
    if (isJumping.current) return
    setSmooth(true)
    setCurrent((c) => c - 1)
  }

  const goTo = (realIndex: number) => {
    if (isJumping.current) return
    setSmooth(true)
    setCurrent(realIndex + 1) // +1 because of the clone at the start
  }

  // After the slide animation finishes, silently snap from a clone to the real slide
  const handleTransitionEnd = () => {
    if (current === slides.length - 1) {
      // landed on the cloned first slide -> jump to the real first slide
      isJumping.current = true
      setSmooth(false)
      setCurrent(1)
    } else if (current === 0) {
      // landed on the cloned last slide -> jump to the real last slide
      isJumping.current = true
      setSmooth(false)
      setCurrent(realSlides.length)
    }
  }

  // Clear the jump lock shortly after the instant snap happens
  useEffect(() => {
    if (!smooth) {
      const id = setTimeout(() => {
        isJumping.current = false
      }, 50)
      return () => clearTimeout(id)
    }
  }, [smooth])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 3000)
    return () => clearInterval(id)
  }, [paused, current])

  const realIndex = (current - 1 + realSlides.length) % realSlides.length

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* The moving row of slides */}
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex h-full ${smooth ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-full w-full shrink-0">
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
              <p className="max-w-sm font-poppins text-[16px] font-[200] text-sm uppercase tracking-widest">
                {slide.subtitle}
              </p>
              {slide.button && (
                <button className="mt-6 rounded-full border-2 border-white px-10 py-3 font-poppins text-[14px] text-xs uppercase tracking-[3px] transition-colors hover:bg-white hover:text-[#343434] hover:text-[500]">
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
        {realSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-3 w-3 rounded-full border border-white transition-colors duration-500 ${
              i === realIndex ? 'bg-white' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </section>
  )
}