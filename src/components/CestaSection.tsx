import CestaLogo from '../assets/cesta-logo.png'
import flower1 from '../assets/flowers/b1.png'
import flower2 from '../assets/flowers/b2.png'
import flower3 from '../assets/flowers/b3.png'

const flowers = [
  { src: flower1, bottom: '-10%', left: '50%', width: '35%', rotate: -6 },
  { src: flower2, bottom: '-20%', left: '62%', width: '42%', rotate: 3 },
  { src: flower3, bottom: '-18%', left: '30%', width: '45%', rotate: 8 },
]

export default function Cesta() {
  return (
    <section className="px-6 py-28 bg-[#F5F5F5]">
      <div className="relative mx-auto flex h-[430px] max-w-7xl items-center">
        <div
          className="animate-gradient absolute inset-0 overflow-hidden rounded-xl"
          style={{
            backgroundImage:
              'linear-gradient(120deg, #CD909F, #FBE1E8, #FFEAD1)',
          }}
        />

        <div className="relative z-10 flex flex-col gap-4 pl-24 items-center">
          <img src={CestaLogo} alt="Cesta — Satin Petals" className="w-64" />
          <button className="mt-4 w-fit rounded-md bg-white px-12 py-3 text-sm font-semibold font-body text-[#B32A4D] shadow-md transition-colors duration-300 hover:bg-[#B32A4D] hover:text-white">
            View Shop
          </button>
        </div>

        {flowers.map((f, i) => (
          <img
            key={i}
            src={f.src}
            alt=""
            style={{
              bottom: f.bottom,
              left: f.left,
              width: f.width,
              transform: `rotate(${f.rotate}deg)`,
            }}
            className="absolute z-10 drop-shadow-xl"
          />
        ))}
      </div>
    </section>
  )
}