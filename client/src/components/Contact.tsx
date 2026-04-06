import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react"

export function Contact() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // FRONTEND ONLY: Simulating a 1.5 second network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Set the success state so you can see the UI feedback
    setStatus("success")
    setMessage("Inquiry received. A representative will contact you shortly.")
    setEmail("")
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Corporate Imagery */}
        <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" 
            alt="Corporate Business Handshake" 
            className="w-full h-[400px] lg:h-[600px] object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
        
        {/* Right Side: Form UI */}
        <div className="max-w-xl order-1 lg:order-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Ready to secure your business future?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8 lg:mb-10 font-light leading-relaxed">
            Leave your contact information below. Our senior consultants will reach out to discuss tailored strategies for your enterprise.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center gap-3">
              <label htmlFor="corporate-email" className="sr-only">Corporate Email Address</label>
              <Input 
                id="corporate-email"
                type="email" 
                placeholder="Enter your corporate email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading" || status === "success"}
                className="h-14 text-base rounded-md border-slate-300 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent bg-slate-50 transition-all flex-1"
              />
              <Button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className="h-14 px-8 w-full sm:w-auto rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                {status === "loading" ? "Submitting..." : "Request Callback"}
              </Button>
            </div>
            
            {/* Status Messages UI */}
            {message && (
              <div 
                className={`flex items-center gap-2 p-4 rounded-md text-sm font-medium animate-in fade-in slide-in-from-bottom-2 ${
                  status === "error" ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
                role="alert"
              >
                {status === "error" ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                {message}
              </div>
            )}
            
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% secure. We respect your corporate privacy.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}