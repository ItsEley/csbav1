import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Allow time for the fade-out animation to play
      setTimeout(onComplete, 800); 
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${isExiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="relative flex flex-col items-center">
        {/* Logo Animation Container */}
        <div className="relative mb-4 animate-pulse duration-[2000ms]">
          <img 
            src="https://csba.ph/cms/wp-content/uploads/2025/06/CSBA.png" 
            alt="CSBA Logo" 
            className="h-20 w-auto object-contain brightness-110"
          />
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full -z-10 scale-150"></div>
        </div>
        
        {/* Minimalist progress line */}
        <div className="w-32 h-[1px] bg-slate-100 overflow-hidden relative">
          <div className="absolute inset-0 bg-blue-600 origin-left animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: scaleX(0); left: 0; }
          50% { transform: scaleX(0.5); left: 25%; }
          100% { transform: scaleX(0); left: 100%; }
        }
      `}</style>
    </div>
  );
}