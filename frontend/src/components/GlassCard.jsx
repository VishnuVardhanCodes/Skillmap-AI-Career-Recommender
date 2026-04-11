import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
