import { type ReactNode, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Building2, Menu, X } from "lucide-react"

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-blue-600 selection:text-white">
      {/* Floating Nav Pill */}
      <header className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-in-out w-full px-4 sm:px-8 ${
        isScrolled ? "top-4 max-w-4xl" : "top-8 max-w-6xl"
      }`}>
        <div className={`flex items-center justify-between px-6 py-3 rounded-full border border-white/10 shadow-2xl transition-all duration-500 ${
          isScrolled ? "bg-white/80 backdrop-blur-xl" : "bg-white/10 backdrop-blur-md"
        }`}>
          {/* Logo in Pill */}
          <div className="flex items-center gap-2">
            <img 
              src="https://csba.ph/cms/wp-content/uploads/2025/06/CSBA.png" 
              alt="Logo" 
              className={`h-6 w-auto transition-all duration-500 ${isScrolled ? "brightness-100" : "brightness-0 invert"}`}
            />
          </div>

          {/* Nav Links */}
          <nav className={`hidden md:flex items-center gap-8 text-sm font-semibold transition-colors duration-500 ${
            isScrolled ? "text-slate-600" : "text-white/80"
          }`}>
            <a href="#services" className="hover:text-blue-500">Services</a>
            <a href="#about" className="hover:text-blue-500">Identity</a>
            <a href="#contact" className="hover:text-blue-500">Contact</a>
          </nav>

          {/* CTA */}
          <Button className="rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-transform hover:scale-105 active:scale-95">
            Partner With Us
          </Button>
          
          <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main className="relative">{children}</main>
    </div>
  )
}