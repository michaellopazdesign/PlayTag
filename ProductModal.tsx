
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Send, Disc, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (startX: number, startY: number) => void;
  onQuickOrder: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, onQuickOrder }) => {
  const discRef = useRef<HTMLDivElement>(null);
  const logoUrl = "https://github.com/michaellopazdesign/PlayTag/blob/main/Logo.png?raw=true";

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      // Restore body scroll
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleAddToCart = () => {
    if (discRef.current) {
      const rect = discRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      onAddToCart(centerX, centerY);
    } else {
      onAddToCart(window.innerWidth / 2, window.innerHeight / 2);
    }
    setTimeout(onClose, 200);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl"
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-6xl bg-[#0A0A0A] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:grid md:grid-cols-2 h-auto my-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 md:p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white hover:text-shopBlack transition-all group"
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Visual Side (Spinning Disc) */}
        <div className="relative bg-[#111] flex flex-col items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden shrink-0 min-h-[280px] md:min-h-[500px]">
           <div className="absolute inset-0 grid-pattern opacity-5"></div>
           
           {/* Ambient Glow */}
           <div className="absolute inset-0 bg-shopPink/5 blur-[80px] md:blur-[120px] rounded-full"></div>

           {/* The Spinning Disc */}
           <motion.div
             ref={discRef}
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="relative z-10 w-full aspect-square max-w-[200px] md:max-w-[400px] rounded-full border border-white/10 bg-[#0A0A0A] cd-mask shadow-2xl flex items-center justify-center"
           >
             <img 
               src={product.discUrl || product.imageUrl} 
               alt={product.name}
               className="w-full h-full object-cover opacity-80"
             />
             
             {/* Centered Brand Hub */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-24 md:h-24 bg-[#0A0A0A] rounded-full border border-white/10 flex items-center justify-center z-20">
                <img src={logoUrl} className="w-6 h-6 md:w-12 md:h-12 object-contain opacity-50" alt="brand" />
             </div>
           </motion.div>

           <div className="mt-6 md:mt-12 flex items-center gap-4 z-10">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                 <Disc className="w-4 h-4 md:w-5 md:h-5 text-white/40 animate-spin-slow" />
              </div>
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Physical Hardware Link</p>
           </div>
        </div>

        {/* Content Side (Details & Product Photo) */}
        <div className="p-8 md:p-16 flex flex-col justify-start bg-[#0A0A0A]">
          <div className="mb-8 md:mb-12">
            <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-4 uppercase text-white leading-none">
              {product.name}
            </h2>
            <p className="text-sm md:text-lg text-white/40 font-black uppercase tracking-[0.2em]">{product.artist}</p>
          </div>

          {/* Physical Product Photo Section */}
          {product.hoverImageUrl && (
            <div className="mb-12 md:mb-16">
              <div className="relative group w-full">
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl transition-all duration-700">
                  <img 
                    src={product.hoverImageUrl} 
                    alt="Physical Product" 
                    className="w-full h-auto max-h-[300px] md:max-h-[450px] object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-auto pt-8 md:pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[10px] text-white/20 font-black uppercase tracking-[0.3em] mb-1 md:mb-2">Price</span>
                <span className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-shopGreen/10 border border-shopGreen/20 rounded-full">
                 <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-shopGreen animate-pulse"></div>
                 <span className="text-[8px] md:text-[10px] font-black text-shopGreen uppercase tracking-widest">In Stock</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-grow py-4 md:py-6 bg-white text-shopBlack font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-shopPink hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Collection
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
