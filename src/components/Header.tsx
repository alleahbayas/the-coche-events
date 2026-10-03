import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Car, User } from 'lucide-react'
import logo from '../assets/logo.png'

const navItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Services', to: '/services', end: false },
  { label: 'Gallery', to: '/gallery', end: false },
]

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [solid, setSolid] = useState(!isHome)

  const navRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<(HTMLLIElement | null)[]>([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    if (!isHome) {
      setSolid(true)
      return
    }
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 80)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) =>
      item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
    )
    const activeEl = linkRefs.current[activeIndex]
    const navEl = navRef.current

    if (activeEl && navEl) {
      const navRect = navEl.getBoundingClientRect()
      const linkRect = activeEl.getBoundingClientRect()
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      })
    }
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
        solid ? 'bg-[#26221C]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-3 items-center px-8 py-4">
        <img src={logo} alt="The Coche Events" className="h-4 w-auto" />

        <ul ref={navRef} className="relative flex justify-center gap-20 text-sm font-body text-[400]">
          {navItems.map((item, i) => (
            <li key={item.to} ref={(el) => { linkRefs.current[i] = el }} className="pb-2">
              <NavLink to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            </li>
          ))}

          <span
            className="absolute bottom-0 h-0.5 bg-white transition-all duration-600 ease-in-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </ul>

        <div className="flex items-center justify-end gap-12">
          <button className="px-10 py-2 text-sm font-body font-semibold text-white transition-colors hover:bg-white hover:text-[#734F23]">
            Reach Us
          </button>
          <Car size={24} />
          <User size={24} />
        </div>
      </nav>
    </header>
  )
}