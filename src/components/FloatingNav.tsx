/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Trophy, ListTodo, BarChart3, Star } from 'lucide-react';
import { motion } from 'motion/react';

type TabType = 'sprites' | 'super' | 'missões' | 'stats';

interface FloatingNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function FloatingNav({ activeTab, setActiveTab }: FloatingNavProps) {
  
  const tabs = [
    { id: 'sprites' as TabType, label: 'Sprites', icon: Sparkles, color: 'text-cyan-400' },
    { id: 'super' as TabType, label: 'Super', icon: Star, color: 'text-amber-400' },
    { id: 'missões' as TabType, label: 'Missões', icon: ListTodo, color: 'text-emerald-400' },
    { id: 'stats' as TabType, label: 'Stats', icon: BarChart3, color: 'text-fuchsia-400' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4">
      <div 
        className="flex items-center gap-1 sm:gap-2 bg-[#0d1622]/90 backdrop-blur-xl px-2 sm:px-4 py-2 rounded-full border border-cyan-500/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
        style={{
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none
                ${isActive 
                  ? 'text-[#f8fafc]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }
              `}
              id={`floating-nav-${tab.id}`}
            >
              {/* Highlight background element */}
              {isActive && (
                <motion.div
                  layoutId="activeFloatingTab"
                  className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-slate-700/60 rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  style={{ zIndex: 0 }}
                />
              )}

              {/* Icon and dynamic responsive label */}
              {/* On mobile: Flex col with caption below icon, small font. On desktop: Flex row */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-0.5 sm:flex-row sm:gap-2">
                <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors duration-300 ${isActive ? tab.color : 'text-slate-400'}`} />
                <span className="text-[9px] sm:text-xs font-display font-semibold uppercase tracking-wider leading-none">
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
