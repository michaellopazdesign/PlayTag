
import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, X, Play, Zap, ArrowRight, Trash2, Music, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from './types';

// Components
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import OrderFormModal from './components/OrderFormModal';
import CustomDesignModal from './components/CustomDesignModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

interface FlyingItem {
  id: number;
  imageUrl: string;
  startX: number;
  startY: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [orderProducts, setOrderProducts] = useState<Product[]>([]);
  const [isHoveringProduct, setIsHoveringProduct] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('./products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product, startX: number, startY: number) => {
    const id = Date.now();
    setFlyingItems(prev => [...prev, { id, imageUrl: product.imageUrl, startX, startY }]);
    
    setTimeout(() => {
      setCartItems(prev => [...prev, product]);
      setFlyingItems(prev => prev.filter(item => item.id !== id));
    }, 800);
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setOrderProducts(cartItems);
    setIsCartOpen(false);
    setIsOrderFormOpen(true);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const orderTotal = orderProducts.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen font-sans selection:bg-shopYellow selection:text-shopBlack">
      {/* Fun Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-[#0A0A0A]"></div>
        <div className="absolute inset-0 grid-pattern"></div>
        {/* Subtle Ambient Glow */}
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-40 right-20 w-64 h-64 bg-shopPink/5 blur-3xl rounded-full" 
        />
      </div>

      <Navbar cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />

      {/* Global Dimming Overlay */}
      <div className={`fixed inset-0 bg-black transition-opacity duration-500 pointer-events-none z-[5] ${isHoveringProduct ? 'opacity-70' : 'opacity-0'}`}></div>

      <main>
        <Hero 
          onCtaClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} 
          onDesignClick={() => setIsDesignModalOpen(true)}
        />

        {/* The Shop Floor */}
        <section 
          id="shop" 
          className="py-20 md:py-32 px-6 max-w-7xl mx-auto relative z-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-shopPink mb-4 block">Current Release</span>
              <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter leading-none text-white">
                THE <br/><span className="text-white/20">COLLECTION</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 group/products">
            <AnimatePresence mode="popLayout">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  onMouseEnter={() => setIsHoveringProduct(true)}
                  onMouseLeave={() => setIsHoveringProduct(false)}
                  className="transition-all duration-500 group-hover/products:opacity-30 hover:!opacity-100 group-hover/products:scale-[0.98] hover:!scale-105"
                >
                  <ProductCard 
                    product={product} 
                    onClick={() => setSelectedProduct(product)} 
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Professional Banner */}
        <section className="py-24 md:py-40 bg-[#0A0A0A] text-white overflow-hidden relative border-t border-white/5 z-0">
          <div className="absolute inset-0 opacity-5 flex items-center justify-center">
            <Disc className="w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] animate-spin-slow text-white" />
          </div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-8xl font-display font-black tracking-tighter mb-6 md:mb-10 uppercase italic">
              WEAR THE <span className="text-shopPink">SOUND</span>
            </h2>
            <p className="text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed text-white/40 uppercase tracking-tight">
              Each PLAYTag is an interactive musical artifact. A physical bridge for your digital collection, hand-crafted for the modern listener.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-end p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-shopBlack/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-[#0A0A0A] border-l border-white/10 p-6 md:p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white/40" />
                   </div>
                   <h2 className="text-xl md:text-2xl font-display font-black uppercase text-white tracking-tighter">YOUR BAG</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white hover:text-shopBlack rounded-full transition-colors border border-white/10 text-white/40"><X className="w-5 h-5 md:w-6 md:h-6" /></button>
              </div>

              <div className="flex-grow overflow-y-auto space-y-4 md:space-y-6 pr-2 scrollbar-hide">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20 flex flex-col items-center">
                    <Music className="w-12 h-12 md:w-16 md:h-16 text-white/5 mb-4" />
                    <p className="text-white/20 font-black uppercase tracking-[0.3em] text-[10px]">No tracks selected</p>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <motion.div 
                      key={`${item.id}-${idx}`} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 relative group"
                    >
                      <img src={item.imageUrl} className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                      <div className="flex-grow">
                        <h4 className="text-sm font-black uppercase tracking-tight text-white">{item.name}</h4>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">{item.artist}</p>
                        <p className="text-white font-black mt-1 text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="self-center p-2 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-white/10 text-white/20"><Trash2 className="w-4 h-4" /></button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="pt-8 border-t border-white/10 mt-6">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Total</span>
                  <span className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                  className="w-full py-5 md:py-6 bg-white text-shopBlack font-black uppercase tracking-widest text-xs md:text-sm rounded-xl hover:bg-shopPink hover:text-white transition-all disabled:opacity-30"
                >
                  Checkout Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOrderFormOpen && (
          <OrderFormModal products={orderProducts} total={orderTotal} onClose={() => setIsOrderFormOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDesignModalOpen && (
          <CustomDesignModal onClose={() => setIsDesignModalOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(startX, startY) => addToCart(selectedProduct, startX, startY)}
            onQuickOrder={() => {}}
          />
        )}
      </AnimatePresence>

      {/* Flying Items Animation */}
      <AnimatePresence>
        {flyingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ 
              x: item.startX - 40, 
              y: item.startY - 40, 
              scale: 1, 
              opacity: 1,
              rotate: 0 
            }}
            animate={{ 
              x: window.innerWidth - 100, 
              y: 50, 
              scale: 0.2, 
              opacity: 0,
              rotate: 360 
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed w-20 h-20 rounded-full border-2 border-white/20 bg-[#111] z-[300] overflow-hidden pointer-events-none"
          >
            <img src={item.imageUrl} className="w-full h-full object-cover opacity-80" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default App;
