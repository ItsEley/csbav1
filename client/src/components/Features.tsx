import React, { useState, useEffect, useCallback, useRef, memo, Component, type ErrorInfo, type ReactNode } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

// --- TYPES & DATA ---
interface Service {
  id: string
  title: string
  description: string
  image: string
}

const services: Service[] = [
  {
    id: "credit",
    title: "Credit & Receivables",
    description: "Professional and ethical collection services designed to maximize recovery while protecting your brand's reputation and ensuring compliance.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop", 
  },
  {
    id: "alliances",
    title: "Strategic Alliances",
    description: "Connecting businesses through powerful network synergies. We broker high-value partnerships that drive mutual enterprise growth.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop", 
  },
  {
    id: "bpo",
    title: "Enterprise BPO",
    description: "Scalable business process outsourcing tailored for financial, administrative, and complex backend corporate operations.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop", 
  },
  {
    id: "risk",
    title: "Risk Assessment",
    description: "Data-driven financial risk analysis and strategic consulting to secure your investments and fortify business expansions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", 
  },
]

const AUTOPLAY_INTERVAL = 7000 // Slowed down slightly for a more relaxed, premium feel

// --- ERROR BOUNDARY ---
interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ServiceErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Services Component Error:", error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="py-20 flex justify-center items-center bg-black min-h-[400px]">
          <div className="text-white/70 p-8 text-center max-w-lg">
            <h3 className="text-xl font-light mb-2">Service Portfolio Unavailable</h3>
            <p className="text-sm opacity-60">Please refresh the page to try again.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// --- ELEGANT TAB COMPONENT ---
const ServiceTab = memo(({ 
  service, isActive, onClick, index 
}: { 
  service: Service, isActive: boolean, onClick: (index: number) => void, index: number
}) => {
  if (!service) return null

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${service.id}`}
      id={`tab-${service.id}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => onClick(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick(index)
        }
      }}
      className="w-full text-left py-6 pl-8 lg:pl-12 relative group focus:outline-none"
    >
      {/* Magic Sliding Indicator */}
      {isActive && (
        <motion.div 
          layoutId="active-tab-indicator"
          className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-white z-10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      
      <span className={`block text-lg md:text-xl transition-all duration-500 ease-out ${
        isActive 
          ? "text-white font-medium translate-x-2" 
          : "text-white/40 font-light group-hover:text-white/70 group-hover:translate-x-1"
      }`}>
        {service.title}
      </span>
    </button>
  )
})
ServiceTab.displayName = "ServiceTab"

// --- MAIN COMPONENT ---
function ServicesContent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isAutoPlaying = true 

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    services.forEach((service) => {
      const img = new Image()
      img.src = service.image
    })
  }, [])

  const handleSelect = useCallback((index: number) => {
    if (index >= 0 && index < services.length) setActiveIndex(index)
  }, [])

  useEffect(() => {
    if (isAutoPlaying && services.length > 1) {
      timerRef.current = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % services.length)
      }, AUTOPLAY_INTERVAL)
    }
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current)
    }
  }, [isAutoPlaying, activeIndex])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!services.length) return
    let newIndex = activeIndex
    if (e.key === "ArrowDown") {
      e.preventDefault()
      newIndex = (activeIndex + 1) % services.length
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      newIndex = (activeIndex - 1 + services.length) % services.length
    }
    if (newIndex !== activeIndex) {
      handleSelect(newIndex)
      document.getElementById(`tab-${services[newIndex].id}`)?.focus()
    }
  }, [activeIndex, handleSelect])

  if (!services || services.length === 0) throw new Error("Services array is empty")

  const activeService = services[activeIndex] || services[0]

  return (
    <section 
      id="services" 
      className="py-24 lg:py-32 relative bg-black overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* --- FULL WIDTH DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          {services.map((service, index) => (
            activeIndex === index && (
              <motion.div
                key={`bg-${service.id}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${service.image}')` }}
              />
            )
          ))}
        </AnimatePresence>

        {/* Universal Dark Gradient Overlay for optimal text contrast */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20 max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="mb-20 lg:mb-32">
          <motion.h2 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.25em] text-white/50 text-xs sm:text-sm font-semibold mb-6"
          >
            Enterprise Solutions
          </motion.h2>
          <motion.h3 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1] max-w-4xl"
          >
            Capabilities designed to scale your operations.
          </motion.h3>
        </div>

        {/* --- ALIGNED GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-0 items-center">
          
          {/* LEFT PANE - Content */}
          <div className="md:col-span-7 lg:col-span-6 order-2 md:order-1 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                role="tabpanel"
                id={`panel-${activeService.id}`}
                aria-labelledby={`tab-${activeService.id}`}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }} 
                className="flex flex-col"
              >
                <h4 className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-6 tracking-tight text-white leading-tight">
                  {activeService.title}
                </h4>
                
                <p className="text-lg lg:text-xl text-white/60 leading-relaxed font-light mb-12 max-w-lg">
                  {activeService.description}
                </p>
                
                <div>
                  <button className="text-white text-sm uppercase tracking-[0.2em] font-semibold pb-2 border-b border-white/30 hover:border-white transition-colors duration-300 focus:outline-none">
                    Explore Capability
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT PANE - Tabs (Offset to col-9 to create premium empty space) */}
          <div className="md:col-span-5 lg:col-span-4 lg:col-start-9 order-1 md:order-2">
            <div 
              role="tablist" 
              aria-label="Service capabilities"
              onKeyDown={handleKeyDown}
              className="flex flex-col relative border-l border-white/10"
            >
              {services.map((service, index) => (
                <ServiceTab
                  key={service.id || index}
                  index={index}
                  service={service}
                  isActive={activeIndex === index}
                  onClick={handleSelect}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export function Services() {
  return (
    <ServiceErrorBoundary>
      <ServicesContent />
    </ServiceErrorBoundary>
  )
}