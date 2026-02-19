
import React from 'react';
import { Twitter, Instagram, Github, Disc } from 'lucide-react';
// Added motion import from framer-motion to resolve the 'Cannot find name motion' error
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const logoUrl = "https://github.com/michaellopazdesign/PlayTag/blob/main/Logo.png?raw=true";

  return (
    <footer className="bg-[#0A0A0A] pt-32 pb-16 border-t border-white/10 relative overflow-hidden z-0">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-shopPink/5 rounded-full blur-[120px] -z-0"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 md:col-span-2">
            <div className="relative mb-12">
              <img src={logoUrl} alt="PLAYTag Logo" className="w-32 h-32 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
            </div>
            <p className="text-white/60 text-xl max-w-sm mb-12 leading-tight font-medium uppercase tracking-tight">
              A physical bridge for your digital music collection. Hand-crafted, artist-approved, and built to last.
            </p>
            <div className="flex gap-6">
              {[Twitter, Instagram, Github].map((Icon, idx) => (
                <a key={idx} href="#" className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-shopBlack transition-all rounded-xl group">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10">Shop Floors</h4>
            <ul className="space-y-6 text-white/60 font-black uppercase tracking-[0.2em] text-[10px]">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Disc className="w-4 h-4" /> Core Series</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Artist Exclusives</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Printing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bulk Hardware</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10">Back Office</h4>
            <ul className="space-y-6 text-white/60 font-black uppercase tracking-[0.2em] text-[10px]">
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">App Manual</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hardware FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Line</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 gap-8">
          <p className="text-white/20 text-[10px] font-black tracking-[0.4em] uppercase">
            © 2024 PLAYTAG INDUSTRIES. ALL TRACKS RESERVED.
          </p>
          <div className="flex gap-12 text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
