import valentine from '../assets/valentine.jpg'
import custom from '../assets/custom.png'
import birthday from '../assets/birthday.jpeg'
import anniversary from '../assets/anniversary.jpg'

const cards = [
  { src: birthday, rotate: -24, x: -210, scale: 0.6 },
  { src: anniversary, rotate: -16, x: -130, scale: 0.75 },
  { src: custom, rotate: -8, x: -50, scale: 0.85 },
  { src: valentine, rotate: 0, x: 50, scale: 1 },
]

export default function PackagePreview() {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F5] py-24 items-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#FFE4C3] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#FFE4C3] blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-24 px-50 md:flex-row">
        <div className="relative h-[480px] w-[380px] shrink-0">
            {cards.map((card, i) => (
                <div
                key={i}
                style={{
                    transform: `translateX(${card.x}px) rotate(${card.rotate}deg) scale(${card.scale})`,
                    zIndex: i,
                }}
                className="absolute inset-0"
                >
                <img
                    src={card.src}
                    alt=""
                    className="h-full w-full rounded-xl object-cover shadow-xl"
                />

                {i !== cards.length - 1 && (
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/50" />
                )}
                </div>
            ))}
        </div>

        <div className="relative z-10 min-w-[420px] max-w-xl flex-1 px-10 text-center md:text-left">
          <h2 className="font-archivo text-4xl font-bold leading-tight text-[#26221C] md:text-5xl">
            Start with a vibe,{' '}
            <span className="font-accent italic text-[#B32A4D]">
              we'll build the moment
            </span>
          </h2>

          <button className="mt-8 rounded-md bg-[#26221C] px-12 py-3 text-sm font-medium font-body text-rose-200 transition-colors duration-300 hover:bg-[#9F8365] hover:text-white">
            See Packages
          </button>
        </div>
      </div>
    </section>
  )
}