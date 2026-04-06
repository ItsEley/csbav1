import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      
      {/* Background Image & Premium Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Corporate Headquarters" 
          className="w-full h-full object-cover object-center grayscale-[10%]"
          fetchPriority="high"
        />
        {/* Deep gradient overlay for text readability and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-transparent"></div>
        {/* A subtle vignette for the entire section */}
        <div className="absolute inset-0 bg-slate-950/20"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Text Content */}
        <div className="max-w-2xl w-full">
       
          {/* Scaled down heading for a more elegant, less crowded look */}
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-semibold tracking-tight text-white mb-6 leading-[1.15]">
            Strategic Credit & <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
              Business Solutions.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 mb-10 leading-relaxed font-light max-w-xl">
            Empowering the Philippine economy through comprehensive receivables management, strategic enterprise alliances, and robust BPO services. We secure your assets so you can focus on growth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto min-h-[52px] px-8 text-base bg-white hover:bg-slate-100 text-slate-900 rounded-md transition-transform active:scale-[0.98]">
              Explore Our Services
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[52px] px-8 text-base text-white border-white/20 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-md rounded-md group transition-all">
              Consult an Expert <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

        
        </div>

      

      </div>
    </section>
  )
}