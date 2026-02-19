
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Disc } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const getAccentColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-shopBlue';
      case 'pink': return 'bg-shopPink';
      case 'orange': return 'bg-orange-500'; 
      case 'purple': return 'bg-purple-600'; 
      default: return 'bg-shopYellow';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col"
    >
      {/* Sleeve Container */}
      <div className="relative aspect-square mb-6 p-1">
        {/* The "Disc" that pops out */}
        <motion.div 
          initial={{ y: -20 }}
          whileHover={{ y: -60 }}
          className="absolute inset-x-10 top-0 aspect-square rounded-full border border-white/10 z-0 overflow-hidden cd-mask shadow-2xl bg-[#111]"
        >
           <img src={product.discUrl || product.imageUrl} className="w-full h-full object-cover opacity-80" />
           <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-[#0A0A0A] z-20"></div>
        </motion.div>

        {/* The Sleeve */}
        <div className="relative z-10 w-full h-full bg-[#111] border border-white/10 overflow-hidden rounded-2xl transition-all duration-500 group-hover:border-white/30">
          
          {/* Base Image (Album Cover) */}
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-100 group-hover:brightness-[0.2] transition-all duration-700"
          />

          {/* Hover Image (Product Photo / Keychain) */}
          {product.hoverImageUrl && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <img 
                src={product.hoverImageUrl} 
                alt={`${product.name} product`}
                className="w-full h-full object-contain scale-110 group-hover:scale-100 transition-transform duration-700 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              />
            </div>
          )}
          
          {/* Bottom Info Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end z-20 transition-transform duration-500">
             <div className="flex-grow min-w-0 pr-4">
               <h3 className="text-xl font-display font-black tracking-tighter uppercase leading-none truncate text-white">{product.name}</h3>
               <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-2 truncate">{product.artist}</p>
             </div>
             <div className="text-right">
                <p className="text-2xl font-display font-black text-white">${product.price.toFixed(0)}</p>
             </div>
          </div>
        </div>
      </div>

      <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-shopBlack hover:border-white transition-all flex items-center justify-center gap-3">
        <Plus className="w-3 h-3" /> Add to Collection
      </button>
    </motion.div>
  );
};

export default ProductCard;
