
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, Sparkles, ShieldCheck, AlertCircle, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface OrderFormModalProps {
  products: Product[];
  onClose: () => void;
  total: number;
}

const OrderFormModal: React.FC<OrderFormModalProps> = ({ products, onClose, total }) => {
  const [step, setStep] = useState<'form' | 'submitting' | 'success' | 'error'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    note: ''
  });
  const [resCode] = useState(() => `PT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
  const logoUrl = "https://github.com/michaellopazdesign/PlayTag/blob/main/Logo.png?raw=true";

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');

    const submissionData = {
      name: formData.name,
      email: formData.email,
      message: formData.note,
      reservationCode: resCode,
      totalAmount: `$${total.toFixed(2)}`,
      orderedItems: products.map(p => `${p.name} (${p.id})`).join(', '),
      _subject: `New PLAYTag Reservation [${resCode}]`,
    };

    try {
      const response = await fetch('https://formspree.io/f/mjgeovzn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setStep('success');
      } else {
        setStep('error');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setStep('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={step !== 'submitting' ? onClose : undefined}
        className="absolute inset-0 bg-shopBlack/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] my-auto"
      >
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 md:p-12"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-display font-black tracking-tighter uppercase text-white leading-none mb-2">
                    RESERVE <span className="text-white/20">TRACKS</span>
                  </h2>
                  <p className="text-white/20 text-[10px] font-black tracking-[0.3em] uppercase">Inventory Control Form</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                   <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white/40" />
                </div>
              </div>

              <div className="mb-8 p-5 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="flex -space-x-4">
                  {products.slice(0, 3).map((p, i) => (
                    <img key={p.id} src={p.imageUrl} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 object-cover shadow-lg" />
                  ))}
                  {products.length > 3 && (
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/40">
                      +{products.length - 3}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-1">Total Value</p>
                  <p className="text-3xl font-display font-black text-white tracking-tighter">${total.toFixed(2)}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/20 px-1">Customer Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white transition-all placeholder:text-white/10 font-bold"
                    placeholder="Full Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/20 px-1">Email Address</label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white transition-all placeholder:text-white/10 font-bold"
                    placeholder="Email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/20 px-1">Order Notes</label>
                  <textarea
                    name="message"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white transition-all placeholder:text-white/10 min-h-[100px] resize-none font-bold"
                    placeholder="Anything else we should know?"
                  />
                </div>

                <div className="flex items-center gap-2 text-[9px] text-white/20 font-black uppercase tracking-widest mb-2">
                  <ShieldCheck className="w-3 h-3 text-shopGreen" /> Secure Connection Verified
                </div>

                <button
                  type="submit"
                  className="w-full py-5 md:py-6 bg-white text-shopBlack font-black uppercase tracking-widest text-sm md:text-lg rounded-xl hover:bg-shopPink hover:text-white transition-all flex items-center justify-center gap-4 mt-4"
                >
                  <Send className="w-5 h-5 md:w-6 md:h-6" /> 
                  Place Reservation
                </button>
              </form>
            </motion.div>
          )}

          {step === 'submitting' && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="p-12 md:p-20 text-center flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]"
            >
              <div className="relative mb-10">
                <Loader2 className="w-16 h-16 md:w-20 md:h-20 text-white/20 animate-spin" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-black tracking-tighter uppercase mb-4 text-white">
                UPLOADING <span className="text-white/20">DATA</span>...
              </h3>
              <p className="text-white/20 font-black uppercase tracking-widest text-[10px]">Syncing with global ledger</p>
            </motion.div>
          )}

          {step === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]"
            >
              <AlertCircle className="w-16 h-16 md:w-20 md:h-20 text-red-500 mb-8" />
              <h3 className="text-2xl md:text-3xl font-display font-black tracking-tighter uppercase mb-4 text-white">
                CONNECTION <span className="text-red-500">FAILED</span>
              </h3>
              <p className="text-white/40 mb-8 font-bold text-sm">Unable to sync order. Please try again.</p>
              <button
                onClick={() => setStep('form')}
                className="px-8 py-4 bg-white text-shopBlack font-black uppercase tracking-widest text-[10px] rounded-xl"
              >
                Retry
              </button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-12 text-center flex flex-col items-center"
            >
              <div className="relative mb-10">
                <CheckCircle className="w-20 h-20 md:w-28 md:h-28 text-shopGreen relative z-10" />
                <div className="absolute inset-0 bg-shopGreen/20 blur-3xl rounded-full animate-pulse"></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase mb-4 leading-none text-white">
                RESERVED <span className="text-shopGreen">OK</span>
              </h2>
              <p className="text-white/40 mb-10 max-w-sm mx-auto font-bold text-sm">
                Transmission complete. An artist at <span className="text-shopPink">MichaelLopazDesign@gmail.com</span> has been notified.
              </p>

              <div className="w-full bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 p-6 md:p-8 mb-12 relative overflow-hidden">
                <p className="text-[8px] md:text-[10px] text-white/20 font-black uppercase tracking-[0.3em] mb-4">Master ID</p>
                <p className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white select-all">
                  {resCode}
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-white/20 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" /> Hardware Verified
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-5 md:py-6 bg-white text-shopBlack font-black uppercase tracking-widest text-sm md:text-lg rounded-xl"
              >
                Return to Shop
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OrderFormModal;
