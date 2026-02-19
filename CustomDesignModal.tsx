
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Upload, Palette, Music } from 'lucide-react';

interface CustomDesignModalProps {
  onClose: () => void;
}

const CustomDesignModal: React.FC<CustomDesignModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    albumName: '',
    artistName: '',
    color: 'pink',
    image: null as File | null,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Design submitted! We will contact you soon with a preview.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-2"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white hover:text-shopBlack transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Preview Side */}
        <div className="bg-[#111] p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 relative">
          <div className="absolute inset-0 grid-pattern opacity-5"></div>
          
          <div className="relative z-10 w-full aspect-square max-w-[300px] flex flex-col items-center justify-center">
            <div className={`w-full h-full rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center bg-black/40 overflow-hidden relative`}>
              {formData.image ? (
                <img 
                  src={URL.createObjectURL(formData.image)} 
                  className="w-full h-full object-cover opacity-60" 
                  alt="Preview"
                />
              ) : (
                <div className="flex flex-col items-center text-white/20">
                   <Upload className="w-12 h-12 mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-widest">Upload Artwork</p>
                </div>
              )}
              
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-display font-black tracking-tighter uppercase text-white truncate">
                  {formData.albumName || 'Album Title'}
                </h3>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1 truncate">
                  {formData.artistName || 'Artist Name'}
                </p>
              </div>
            </div>
            
            {/* The "Disc" visual hint */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border border-white/10 bg-[#0A0A0A] cd-mask opacity-40 -z-10"></div>
          </div>
          
          <div className="mt-12 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-shopPink mb-2 block">Custom Artifact</span>
            <p className="text-white/40 text-xs uppercase tracking-widest">Hand-crafted to your vision</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-12 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-shopPink" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-shopPink">Design Studio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-white leading-none">
              Create Your <br/><span className="text-white/20">Own Tag</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Album / Project Name</label>
                <input 
                  type="text"
                  required
                  value={formData.albumName}
                  onChange={(e) => setFormData({...formData, albumName: e.target.value})}
                  placeholder="e.g. BLONDE"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/10 focus:border-shopPink transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Artist Name</label>
                <input 
                  type="text"
                  required
                  value={formData.artistName}
                  onChange={(e) => setFormData({...formData, artistName: e.target.value})}
                  placeholder="e.g. FRANK OCEAN"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/10 focus:border-shopPink transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Upload Cover Art</label>
                <label className="flex items-center justify-center w-full bg-white/5 border border-white/10 border-dashed rounded-xl px-6 py-8 cursor-pointer hover:bg-white/10 transition-all group">
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/60">
                      {formData.image ? formData.image.name : 'Select JPG or PNG'}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-white text-shopBlack font-black uppercase tracking-widest text-xs rounded-xl hover:bg-shopPink hover:text-white transition-all flex items-center justify-center gap-3"
            >
              Submit Design Request
            </button>
          </form>
          
          <p className="mt-8 text-[9px] text-white/20 uppercase tracking-[0.2em] leading-relaxed text-center">
            Custom designs take 7-10 business days to craft. <br/>
            Price starts at $45.00 per artifact.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomDesignModal;
