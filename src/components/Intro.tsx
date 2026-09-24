import logoDark from '../assets/logo-dark.svg'
import GalleryPreview from './GalleryPreview'

const watermarkPositions = [
  'top-24 -left-16',
  'top-24 left-[28%]',
  'top-24 -right-10',
  'top-[22rem] left-[2%]',
  'top-[22rem] left-[45%]',
  'top-[22rem] -right-24',
]

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-[#f4f4f4] pb-5 pt-28 text-[#231f1a]">
      {/* Faint outlined COCHE text in the background */}
      {watermarkPositions.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute select-none font-serif text-9xl leading-none tracking-wider text-transparent [-webkit-text-stroke:1px_#e2e2e2] ${pos}`}
        >
          COCHE
        </span>
      ))}

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <img src={logoDark} alt="The Coche Events" className="h-10 w-auto mt-10" />

        <h2 className="mt-4 text-[#26221C] font-archivo text-4xl leading-tighter md:text-5xl">
          where surprises unfold <br />
          within the{' '}
          <em className="font-accent font-bold italic tracking-tight">confines</em> of a car
        </h2>

        <button className="mt-8 rounded-md border-2 border-[#26221C] px-8 py-2 text-sm font-body font-semibold transition-colors duration-300 hover:bg-[#26221C] hover:text-white">
          View Gallery
        </button>
      </div>

      <div className="relative z-10 -mt-10">
        <GalleryPreview />
      </div>
    </section>
  )
}