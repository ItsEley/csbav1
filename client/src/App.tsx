import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Layout } from "@/components/Layout"
import { Hero } from "@/components/LandingHero"
import { Services } from "@/components/Features"
import { Affiliations } from "@/components/Affiliations" // Injecting our new network section
import { Contact } from "@/components/Contact"
import { Preloader } from "@/components/Preloader"

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  // UX Fix: Prevent scrolling while the preloader is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    
    // Cleanup in case the component unmounts
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isLoading])

  return (
    <>
      {/* 1. Orchestrate the Preloader Exit */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      {/* 2. Orchestrate the Main App Entrance */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="main-app"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for a premium "slow ease" 
              delay: 0.1 // Slight delay to ensure preloader is fully gone
            }}
            className="flex flex-col min-h-screen bg-slate-950" // Ensures dark theme foundation
          >
            <Layout>
              <main className="flex-grow">
                <Hero />
                <Services />
                <Affiliations />
                <Contact />
              </main>
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}