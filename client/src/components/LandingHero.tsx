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
          <Badge 
            variant="outline" 
            className="mb-8 px-4 py-1.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-slate-200 bg-white/5 border-white/20 backdrop-blur-md rounded-full inline-flex"
          >
            Trusted Corporate Partner
          </Badge>
          
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

          {/* Trust Indicators */}
          <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row sm:items-center gap-5 text-sm font-medium text-slate-300 border-t border-white/10 pt-8 max-w-lg">
            <div className="flex -space-x-3">
              {[
                "1573496359142-b8d87734a5a2", 
                "1560250097001-be0f54cb0ebc", 
                "1573497019940-1c28c88b4f3e"
              ].map((id, i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                  <img 
                    src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=100&h=100&crop=faces&sat=-100`} 
                    alt={`Corporate Professional ${i + 1}`} 
                    className="h-full w-full object-cover" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2 text-white mb-0.5">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                <span className="font-semibold tracking-wide">Fully Compliant</span>
              </div>
              <span className="font-light text-xs sm:text-sm text-slate-400">With Philippine Financial Regulations</span>
            </div>
          </div>
        </div>

        {/* Floating Data Card - Positioned nicely on desktop, flows naturally on mobile */}
        <div className="w-full sm:max-w-xs mt-8 lg:mt-0 lg:ml-auto lg:translate-y-12">
          <div className="bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8 border border-white/10 rounded-2xl shadow-2xl hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] sm:text-xs font-bold text-blue-300 uppercase tracking-widest">Asset Recovery</p>
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>
            <p className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">98.4%</p>
            <p className="text-sm font-medium text-emerald-300 flex items-center mt-2 bg-emerald-400/10 px-2.5 py-1 rounded-md w-fit border border-emerald-400/20">
              +12% YoY Growth
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}