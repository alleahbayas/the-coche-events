import logoDark from '../assets/logo-dark.svg'
import watermark from '../assets/watermark.svg'
import GalleryPreview from './GalleryPreview'

const watermarks = [
  { left: '-15%', top: '3vw' },
  { left: '25%', top: '3vw' },
  { left: '65%', top: '3vw' },
  { left: '4%', top: '15vw' },
  { left: '44%', top: '15vw' },
  { left: '84%', top: '15vw' },
  { left: '-10%', top: '27vw' },
  { left: '30%', top: '27vw' },
  { left: '70%', top: '27vw' },
  { left: '6%', top: '39vw' },
  { left: '46%', top: '39vw' },
  { left: '86%', top: '39vw' },
]

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F5] pt-25 text-[#26221C]">
      {/* Repeated COCHE watermarks */}
      {watermarks.map((w, i) => (
        <img
          key={i}
          src={watermark}
          alt=""
          aria-hidden="true"
          style={{ left: w.left, top: w.top }}
          className="pointer-events-none absolute w-[25%] select-none opacity-70"
        />
      ))}

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <img src={logoDark} alt="The Coche Events" className="mt-10 h-10 w-auto" />

        <h2 className="mt-4 font-archivo text-4xl leading-tight text-[#26221C] md:text-5xl">
          where surprises unfold <br />
          within the{' '}
          <em className="font-accent font-bold italic tracking-tight">confines</em> of a car
        </h2>

        <button className="mt-8 rounded-md border-2 border-[#26221C] px-8 py-2 font-body text-sm font-semibold transition-colors duration-300 hover:bg-[#26221C] hover:text-white">
          View Gallery
        </button>
      </div>

      <div className="relative z-10 -mt-10">
        <GalleryPreview />
      </div>
    </section>
  )
}