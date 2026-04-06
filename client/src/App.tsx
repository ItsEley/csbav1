import { useState } from "react"
import { Layout } from "@/components/Layout"
import { Hero } from "@/components/LandingHero"
import { Services } from "@/components/Features"
import { Contact } from "@/components/Contact"
import { Preloader } from "@/components/Preloader"

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* Content only animates in once loading is finished */}
      <div className={`transition-all duration-1000 ${loading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
        <Layout>
          <Hero />
          <Services />
          <Contact />
        </Layout>
      </div>
    </>
  )
}