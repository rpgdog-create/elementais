/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { SPRITE_GROUPS, getSpriteStyleFilter } from '../data';
import { CollectionState, SpriteGroup, SpriteVariant } from '../types';

interface SpriteGridProps {
  collectionState: CollectionState;
  onToggle: (variantId: string) => void;
  filterType: 'all' | 'uncollected' | 'collected';
}

export default function SpriteGrid({ collectionState, onToggle, filterType }: SpriteGridProps) {
  
  // Apply visual progress filter states
  const filteredGroups = SPRITE_GROUPS.map(group => {
    const matchingVariants = group.variants.filter((variant) => {
      const isCollected = !!collectionState[variant.id];
      if (filterType === 'collected') return isCollected;
      if (filterType === 'uncollected') return !isCollected;
      return true; // 'all'
    });
    return { ...group, variants: matchingVariants };
  }).filter(group => group.variants.length > 0);

  if (filteredGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-500 font-mono">
        <p className="text-sm">Nenhum sprite corresponde ao filtro atual.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 md:px-8 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGroups.map((group) => {
          // Calculate individual group completion count
          const groupTotal = group.variants.length;
          const groupCollected = group.variants.filter(v => collectionState[v.id]).length;
          const isGroupCompleted = groupTotal > 0 && groupCollected === groupTotal;

          return (
            <motion.div
              key={group.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`
                bg-[#101924]/85 border rounded-3xl p-5 md:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.3)] transition-all duration-500 relative overflow-hidden group
                ${isGroupCompleted 
                  ? 'border-transparent shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-1 ring-cyan-500/20' 
                  : 'border-[#182736]'
                }
              `}
              style={{
                background: 'linear-gradient(135deg, #101924 0%, #0d151e 100%)'
              }}
            >
              {/* Subtle background glow when active/completed */}
              {isGroupCompleted && (
                <div 
                  className="absolute inset-0 pointer-events-none transition-all opacity-20 group-hover:opacity-30 duration-700" 
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${group.glowColor} 0%, transparent 70%)`
                  }}
                />
              )}

              {/* Group Title and Code Header */}
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-[#142334]/70">
                <div className="flex items-center gap-2.5">
                  <h3 className={`text-lg md:text-xl font-display font-bold tracking-tight ${group.color.split(' ')[0]}`}>
                    {group.title}
                  </h3>
                  {isGroupCompleted && (
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 font-semibold font-mono border border-cyan-500/30 rounded px-1.5 py-0.5 tracking-wider animate-bounce">
                      COMPLETO
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] sm:text-xs font-mono text-slate-500 tracking-wider">
                    {group.code}
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900/55 px-2 py-0.5 rounded-md border border-slate-800">
                    {groupCollected}/{groupTotal}
                  </span>
                </div>
              </div>

              {/* 4 Variants Grid Row */}
              <div className="grid grid-cols-4 gap-3 md:gap-4">
                {group.variants.map((variant) => {
                  const isCollected = !!collectionState[variant.id];

                  return (
                    <div
                      key={variant.id}
                      onClick={() => onToggle(variant.id)}
                      className="flex flex-col items-center gap-2 group/cell cursor-pointer"
                    >
                      {/* Image Thumbnail Frame */}
                      <div
                        className={`
                          relative aspect-square w-full rounded-2xl p-[1px] overflow-hidden transition-all duration-300
                          ${isCollected
                            ? 'shadow-[0_0_12px_rgba(20,184,166,0.15)] scale-102 ring-1 ring-cyan-500/30'
                            : 'hover:scale-[1.01] border border-[#1c2c3e] hover:border-slate-700 bg-slate-950/40 shadow-inner'
                          }
                        `}
                        style={{
                          background: isCollected 
                            ? `linear-gradient(135deg, ${group.glowColor.replace('0.3', '0.8')}, transparent)` 
                            : 'transparent'
                        }}
                      >
                        {/* Underlay container */}
                        <div className="w-full h-full rounded-[15px] bg-[#090f15] overflow-hidden flex items-center justify-center relative">
                          <img
                            src={variant.image}
                            alt={`${group.title} - ${variant.name}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover select-none transition-all duration-500"
                            style={{
                              filter: getSpriteStyleFilter(variant.type, isCollected),
                            }}
                          />

                          {/* Beautiful Interactive Overlays for special Gummy & Galaxy Collected Variants */}
                          {isCollected && variant.type === 'gummy' && (
                            <>
                              {/* Pink-to-Green gradient color blend overlay */}
                              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-pink-500 via-pink-400/80 to-emerald-500 mix-blend-color z-10 opacity-90" />
                              {/* Premium physical glossy gel sheen layer */}
                              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/15 via-transparent to-white/50 mix-blend-overlay z-20" />
                            </>
                          )}

                          {isCollected && variant.type === 'galaxy' && (
                            <>
                              {/* Purple-and-Pink mixed cosmic blend overlay - Dominantly purple with pink nuances */}
                              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#2e1065] via-[#7c3aed] to-[#db2777] mix-blend-color z-10" />
                              {/* Interactive inner shadow vignette for depth */}
                              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-purple-950/40 mix-blend-multiply z-20" />
                              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#3b82f6]/20 via-transparent to-white/20 mix-blend-overlay z-30" />
                            </>
                          )}

                          {/* Checked border layer */}
                          {isCollected && (
                            <div className="absolute inset-0 border border-cyan-400/30 rounded-[15px] pointer-events-none z-40" />
                          )}
                        </div>
                      </div>

                      {/* Checkbox state and label */}
                      <div className="flex flex-col items-center gap-1 mt-1">
                        {/* Custom Checkbox */}
                        <div
                          className={`
                            w-4.5 h-4.5 rounded flex items-center justify-center border transition-all duration-300
                            ${isCollected
                              ? 'bg-gradient-to-br from-cyan-500 to-sky-600 border-cyan-400 text-slate-950 scale-110 shadow-[0_0_8px_rgba(34,211,238,0.4)]'
                              : 'bg-slate-950 border-slate-800 group-hover/cell:border-slate-700'
                            }
                          `}
                        >
                          {isCollected ? (
                            <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                          ) : null}
                        </div>

                        {/* Label name */}
                        <span
                          className={`
                            text-[10px] sm:text-xs font-mono font-medium tracking-wide transition-colors duration-200
                            ${isCollected 
                              ? 'text-cyan-300 font-semibold' 
                              : 'text-slate-500 group-hover/cell:text-slate-400'
                            }
                          `}
                        >
                          {variant.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
