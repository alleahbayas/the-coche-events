import { ChevronUp } from 'lucide-react'
import logo from '../assets/logo-brown.svg'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative">
      <div className="flex flex-col items-center justify-between gap-6 bg-[#E6E6E6] px-24 py-8 md:flex-row md:gap-10">
        <img src={logo} alt="The Coche Events" className="h-10 w-auto" />

        <div className="flex flex-col gap-1 font-body font-medium text-center text-xs text-[#676767] md:text-left">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <span>Cavite, Philippines</span>
            <span className="hidden sm:inline">|</span>
            <span>+63912345678 | +63912345678</span>
            <span className="hidden sm:inline">|</span>
            <span>thecocheevents@gmail.com</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
            <span>Privacy Policy</span>
            <span>|</span>
            <span>Terms and Condition</span>
            <span>|</span>
            <span>Payment Terms</span>
            <span>|</span>
            <span>Delivery Information</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-[#26221C] px-18 py-6">
        <div className="flex gap-3">
          <span className="h-3.5 w-3.5 rounded-full bg-white" />
          <span className="h-3.5 w-3.5 rounded-full bg-white" />
          <span className="h-3.5 w-3.5 rounded-full bg-white" />
        </div>

        <p className="font-body font-medium text-xs text-[#676767]">
          Copyright 2023 The Coche Events. All Rights Reserved.
        </p>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="absolute -top-6 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#734F23] text-white shadow-lg transition-colors hover:bg-[#26221C]"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  )
}