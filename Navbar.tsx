
import React, { useState } from 'react';
import { ShoppingCart, Disc, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoUrl = "https://github.com/michaellopazdesign/PlayTag/blob/main/Logo.png?raw=true";

  const navLinks = [
    { name: 'Shop Floor', icon: <Disc className="w-4 h-4" />, href: '#shop' },
    { name: 'Our Story', href: '#' },
    { name: 'Artist Portal', href: '#' },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 z-50">
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl px-4 md:px-8 py-3 md:py-3 rounded-2xl md:rounded-3xl flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-12">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/40 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="flex items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src={logoUrl} alt="PLAYTag Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          </motion.div>
          
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                {link.icon} {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onCartClick}
            className="relative p-3 md:p-4 bg-white text-shopBlack rounded-xl md:rounded-2xl hover:bg-shopPink hover:text-white transition-all group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-shopPink text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-shopBlack shadow-xl"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:hidden shadow-2xl z-40"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/40 hover:text-white text-xs font-black uppercase tracking-[0.3em] transition-colors flex items-center gap-3 py-2"
                >
                  {link.icon} {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
