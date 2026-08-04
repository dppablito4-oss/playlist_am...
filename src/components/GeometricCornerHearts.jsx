import React from 'react';
import { motion } from 'framer-motion';

export default function GeometricCornerHearts() {
  const heartMeshPath = "M 20 35 C 20 20, 5 15, 5 30 C 5 45, 20 58, 20 60 C 20 58, 35 45, 35 30 C 35 15, 20 20, 20 35 Z";
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Top Left */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-3 left-3 sm:top-6 sm:left-6 w-24 h-24 sm:w-32 sm:h-32 text-rosegold-light opacity-60"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(242,203,190,0.5)]">
          {/* External wireframe lines */}
          <path d="M 0 0 L 40 0 L 20 35 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6"/>
          <path d="M 40 0 L 100 0 L 60 40 L 20 35 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
          {/* Wireframe Mesh Heart */}
          <g transform="translate(10, 10) scale(1.1)">
            <path d={heartMeshPath} fill="none" stroke="url(#roseGoldGrad)" strokeWidth="1.2" />
            <path d="M 20 20 L 20 60 M 5 30 L 35 30 M 10 40 L 30 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <circle cx="20" cy="20" r="1.5" fill="#f7d6c8" className="animate-pulse" />
            <circle cx="20" cy="60" r="1.5" fill="#f7d6c8" className="animate-pulse" />
            <circle cx="5" cy="30" r="1.5" fill="#f7d6c8" />
            <circle cx="35" cy="30" r="1.5" fill="#f7d6c8" />
          </g>
          <defs>
            <linearGradient id="roseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7d6c8" />
              <stop offset="50%" stopColor="#e5a3b2" />
              <stop offset="100%" stopColor="#c87588" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Top Right */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 w-24 h-24 sm:w-32 sm:h-32 text-rosegold-light opacity-60 transform scale-x-[-1]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(242,203,190,0.5)]">
          <g transform="translate(10, 10) scale(1.1)">
            <path d={heartMeshPath} fill="none" stroke="url(#roseGoldGrad)" strokeWidth="1.2" />
            <path d="M 20 20 L 20 60 M 5 30 L 35 30 M 10 40 L 30 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <circle cx="20" cy="20" r="1.5" fill="#f7d6c8" />
            <circle cx="20" cy="60" r="1.5" fill="#f7d6c8" />
          </g>
        </svg>
      </motion.div>

      {/* Bottom Left */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="absolute bottom-20 left-3 sm:bottom-24 sm:left-6 w-20 h-20 sm:w-28 sm:h-28 text-rosegold-light opacity-50 transform scale-y-[-1]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(242,203,190,0.4)]">
          <g transform="translate(10, 10) scale(1.1)">
            <path d={heartMeshPath} fill="none" stroke="url(#roseGoldGrad)" strokeWidth="1" />
          </g>
        </svg>
      </motion.div>

      {/* Bottom Right */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute bottom-20 right-3 sm:bottom-24 sm:right-6 w-20 h-20 sm:w-28 sm:h-28 text-rosegold-light opacity-50 transform scale-x-[-1] scale-y-[-1]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(242,203,190,0.4)]">
          <g transform="translate(10, 10) scale(1.1)">
            <path d={heartMeshPath} fill="none" stroke="url(#roseGoldGrad)" strokeWidth="1" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
