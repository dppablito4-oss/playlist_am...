import React from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, Sparkles } from 'lucide-react';

const menuItems = [
  { key: 'canciones', icon: <Music className="w-4 h-4" />, label: 'Canciones', color: 'text-rosegold-mid' },
  { key: 'dedicatoria', icon: <Heart className="w-4 h-4" />, label: 'Dedicatoria', color: 'text-rosegold' },
  { key: 'pregunta', icon: <Sparkles className="w-4 h-4" />, label: 'Una puerta', color: 'text-rosegold-deep' },
];

export default function NavigationMenu({ onSelect }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative z-20 w-full max-w-md mx-auto px-6 mb-10"
    >
      <div className="rounded-2xl bg-obsidian-card/60 border border-rosegold-deep/15 backdrop-blur-md overflow-hidden">
        {menuItems.map((item, index) => (
          <div key={item.key}>
            <button
              onClick={() => onSelect(item.key)}
              className="w-full flex items-center justify-between px-6 py-4 text-left group transition-all duration-300 hover:bg-rosegold-dark/10"
            >
              <div className="flex items-center space-x-4">
                <span className={`${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium text-rosegold-light/90 tracking-wide group-hover:text-rosegold-light transition-colors">
                  {item.label}
                </span>
              </div>
              <span className="text-xs text-rosegold-deep opacity-60 group-hover:opacity-100 transition-opacity">
                ↓
              </span>
            </button>

            {/* Separator line except after last item */}
            {index < menuItems.length - 1 && (
              <div className="mx-6 h-[1px] bg-gradient-to-r from-transparent via-rosegold-deep/20 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </motion.nav>
  );
}
