/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SPECIAL_SPRITE } from '../data';

interface SpecialItemProps {
  collected: boolean;
  onToggle: () => void;
}

export default function SpecialItem({ collected, onToggle }: SpecialItemProps) {
  const { id, category, title, description, image } = SPECIAL_SPRITE;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 mt-6 md:px-8"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0d1622] via-[#101924] to-[#0a111a] rounded-3xl border border-teal-500/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        
        {/* Glow ambient background effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-teal-500/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Text descriptions */}
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950/40 border border-teal-500/25 rounded-full text-teal-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            {category}
          </div>
          <h2 className="text-2xl md:text-3.5xl font-display font-bold text-slate-100 tracking-tight leading-none mb-3">
            {title}
          </h2>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Glowing image and toggle box */}
        <div className="flex flex-col items-center gap-4 z-10 w-full md:w-auto">
          {/* Card Frame of Special Sprite */}
          <div 
            onClick={onToggle}
            className={`
              relative w-44 h-44 rounded-2xl cursor-pointer p-0.5 overflow-hidden transition-all duration-500 group
              ${collected 
                ? 'bg-gradient-to-tr from-teal-500 via-cyan-400 to-emerald-400 shadow-[0_0_25px_rgba(20,184,166,0.35)] scale-102' 
                : 'bg-slate-800/80 hover:bg-slate-700/50 hover:border-slate-600 border border-slate-700 shadow-inner'
              }
            `}
          >
            {/* Dark background inside card item */}
            <div className="w-full h-full rounded-[14px] bg-[#0b121a] overflow-hidden flex items-center justify-center relative">
              <img
                src={image}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none transition-all duration-500"
                style={{
                  filter: collected 
                    ? 'brightness(1.06) saturate(1.15) contrast(1.05)' 
                    : 'brightness(0.18) grayscale(0.85) contrast(0.8) saturate(0.25) blur(0.3px)'
                }}
              />

              {/* Status Glow Overlay */}
              <div 
                className={`
                  absolute inset-0 bg-gradient-to-t from-[#060a10]/50 to-transparent pointer-events-none transition-opacity duration-500
                  ${collected ? 'opacity-100' : 'opacity-0'}
                `} 
              />
            </div>
          </div>

          {/* CHECKBOX AND STATUS */}
          <button
            onClick={onToggle}
            id="special-item-collect-toggle"
            className={`
              flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-mono tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer
              ${collected 
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-[0_0_10px_rgba(20,184,166,0.2)]' 
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }
            `}
          >
            <div className={`
              w-4.5 h-4.5 rounded flex items-center justify-center border transition-all duration-300
              ${collected 
                ? 'bg-teal-500 border-teal-400 text-slate-950' 
                : 'bg-slate-950/80 border-slate-700'
              }
            `}>
              {collected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <span>{collected ? 'COLETADO' : 'NÃO COLETADO'}</span>
          </button>
        </div>

      </div>
    </motion.section>
  );
}
