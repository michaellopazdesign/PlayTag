
import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Disc, Sparkles } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
  onDesignClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, onDesignClick }) => {
  const logoUrl = "https://github.com/michaellopazdesign/PlayTag/blob/main/Logo.png?raw=true";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-40 pb-20 z-0">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
        
        {/* Central Visual Stack */}
        <div className="relative w-full max-w-5xl aspect-square md:aspect-video flex items-center justify-center mb-8 md:mb-12">
          {/* The Vinyl Disc - Spinning behind the logo */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[85%] md:w-[55%] aspect-square rounded-full border-[1px] border-white/20 bg-[#111] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden z-0 opacity-80"
          >
             {/* Grooves */}
             <div className="absolute inset-4 rounded-full border border-white/5"></div>
             <div className="absolute inset-12 rounded-full border border-white/5"></div>
             <div className="absolute inset-24 rounded-full border border-white/5"></div>
             <div className="absolute inset-40 rounded-full border border-white/5"></div>
             <div className="absolute inset-60 rounded-full border border-white/5"></div>
             
             {/* Center Hub */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/10 bg-[#0A0A0A] flex items-center justify-center z-20">
                <div className="w-3 h-3 rounded-full bg-white/10"></div>
             </div>
          </motion.div>

          {/* Huge Logo - The Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 w-full flex justify-center"
          >
            <img 
              src={logoUrl} 
              alt="PLAYTag Logo" 
              className="w-full h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)]" 
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center z-20 max-w-2xl px-4"
        >
          <p className="text-lg md:text-2xl font-medium text-white/40 leading-relaxed mb-10 md:mb-12 uppercase tracking-tight">
            A physical bridge for your digital collection. <br className="hidden md:block"/>
            Hand-crafted musical artifacts that live on your keys.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center w-full max-w-xs mx-auto sm:max-w-none">
            <button 
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-shopBlack font-black uppercase tracking-widest text-sm md:text-lg rounded-xl hover:bg-shopPink hover:text-white transition-all flex items-center justify-center gap-4 group"
            >
              Browse Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={onDesignClick}
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm md:text-lg rounded-xl hover:bg-white hover:text-shopBlack transition-all flex items-center justify-center gap-4 group"
            >
              Design Your Own <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform text-shopPink" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
