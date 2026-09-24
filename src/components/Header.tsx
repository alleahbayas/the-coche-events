import { useEffect, useState } from 'react'
import { Car, User } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Header() {
    const [solid, setSolid] = useState(false)

    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > window.innerHeight - 80)
        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    
    return (
        <header className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
           solid ? 'bg-[#231f1a]' : 'bg-transparent'}`}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
                <img src={logo} alt="The Coche Events" className="h-4 w-auto"/>

                <ul className="flex gap-20 text-sm font-body text-[400]">
                    <li>Home</li>
                    <li>Services</li>
                    <li>Gallery</li>
                </ul>

                <div className="flex items-center gap-12">
                    <button className="bg-white text-[#734F23] px-10 py-2 text-sm font-body font-semibold transition-colors hover:bg-[#343434] hover:text-white">
                        Reach Us
                    </button>
                    <Car size={24} />
                    <User size={24} />
                </div>
            </nav>
        </header>
    )
}