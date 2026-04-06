import React, { memo } from "react"
import { motion } from "framer-motion"

// --- DATA ---
const parentCompany = {
  name: "OmniCorp Global Holdings",
  description: "Backed by one of the world's leading enterprise financial networks."
}

// Duplicated the list intentionally in the component below to create the infinite seamless loop
const sisterCompanies = [
  "Nexus Capital",
  "Aegis Risk Partners",
  "Meridian BPO",
  "Vanguard Alliances",
  "Apex Receivables",
  "Horizon Credit Corp"
]

// --- MEMOIZED LOGOTYPE COMPONENT ---
// Creates a clean, typography-based logo placeholder
const Logotype = memo(({ name }: { name: string }) => (
  <div className="flex items-center justify-center whitespace-nowrap px-8 sm:px-12">
    <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-slate-300 uppercase select-none hover:text-slate-900 transition-colors duration-500 cursor-default">
      {name}
    </span>
  </div>
))
Logotype.displayName = "Logotype"

export function Affiliations() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        
        {/* --- SECTION HEADER & PARENT COMPANY --- */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <h2 className="uppercase tracking-[0.25em] text-slate-400 text-xs sm:text-sm font-semibold mb-6">
            Our Global Network
          </h2>
          
          <div className="max-w-3xl flex flex-col items-center">
            <p className="text-sm md:text-base text-slate-500 font-light mb-4">
              {parentCompany.description}
            </p>
            {/* Parent Company Logotype Spotlight */}
            <div className="inline-block px-8 py-4 border border-slate-200 rounded-2xl bg-slate-50 shadow-sm">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
                {parentCompany.name}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* --- SISTER COMPANIES INFINITE MARQUEE --- */}
      <div className="relative flex flex-col items-center w-full">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-10 text-center">
          Sister Companies & Strategic Affiliates
        </p>

        {/* Gradient Masks for the fading edges 
          This is a classic premium SaaS design trick
        */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <div className="flex overflow-hidden w-full group">
          <motion.div
            className="flex items-center min-w-full"
            // Moves the entire div to the left by 50% of its width, then resets
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40, // Increase this number to slow down the scroll
            }}
          >
            {/* We render the list twice to ensure there is never a blank gap when it loops */}
            <div className="flex items-center justify-around w-full shrink-0">
              {sisterCompanies.map((name, index) => (
                <Logotype key={`first-${index}`} name={name} />
              ))}
            </div>
            <div className="flex items-center justify-around w-full shrink-0">
              {sisterCompanies.map((name, index) => (
                <Logotype key={`second-${index}`} name={name} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
  )
}