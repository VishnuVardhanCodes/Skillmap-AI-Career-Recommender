import React from 'react';
import { motion } from 'framer-motion';
import { getTechIcon } from '../lib/techIcons';

const ProgressBar = ({ label, value, color = "bg-indigo-500" }) => {
  const icon = getTechIcon(label);

  return (
    <div className="mb-6 group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 p-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-indigo-500/30 transition-colors">
              <img src={icon} alt={label} className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
            </div>
          )}
          <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors tracking-tight">{label}</span>
        </div>
        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{value}% Proficiency</span>
      </div>
      <div className="w-full bg-white/[0.03] rounded-full h-1.5 overflow-hidden border border-white/5">
        <motion.div
           initial={{ width: 0 }}
           animate={{ width: `${value}%` }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className={`h-full rounded-full ${color} relative`}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
          <div className="absolute inset-0 shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
