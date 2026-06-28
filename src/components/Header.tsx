/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutGrid, RefreshCw, Trophy, User } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  collectedCount: number;
  totalCount: number;
  onResetClick: () => void;
  onProfileClick: () => void;
  nickname: string;
  favoriteSpriteImage?: string;
}

export default function Header({ 
  collectedCount, 
  totalCount, 
  onResetClick, 
  onProfileClick, 
  nickname, 
  favoriteSpriteImage 
}: HeaderProps) {
  const percentage = Math.round((collectedCount / totalCount) * 100);

  return (
    <header className="sticky top-0 z-40 bg-[#060a0f]/90 backdrop-blur-md border-b border-[#142334] px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-xl border border-cyan-500/30">
            <LayoutGrid className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Rastreador de Sprites
            </h1>
            <p className="text-xs text-slate-400 font-mono">VERSÃO BETA 1.4.0</p>
          </div>
        </div>

        {/* Collection Progress */}
        <div className="flex-1 max-w-md bg-slate-900/60 p-3 rounded-2xl border border-[#142334] flex flex-col gap-1.5 md:mx-6">
          <div className="flex justify-between items-center text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              Progresso da Coleção
            </span>
            <span className="font-mono text-cyan-300">
              {collectedCount} / {totalCount} ({percentage}%)
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-[#0d1622] h-2.5 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Action Controls & User Identity */}
        <div className="flex items-center justify-end gap-3">
          {/* Reset button */}
          <button
            onClick={onResetClick}
            title="Limpar Progresso"
            className="p-2.5 bg-slate-950/80 hover:bg-red-950/30 border border-slate-800 hover:border-red-900/50 rounded-xl text-slate-400 hover:text-red-400 transition-all cursor-pointer flex items-center justify-center active:scale-95"
            id="reset-progress-button"
          >
            <RefreshCw className="w-4.5 h-4.5" />
          </button>

          {/* User profile capsule */}
          <button
            onClick={onProfileClick}
            title="Ver Perfil de Colecionador"
            className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-950/80 hover:bg-[#0d1622] border border-slate-800 hover:border-cyan-500/30 rounded-xl transition-all cursor-pointer text-left active:scale-95"
            id="user-profile-button"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-0.5 shadow-lg overflow-hidden">
              {favoriteSpriteImage ? (
                <img 
                  src={favoriteSpriteImage} 
                  className="w-full h-full object-cover rounded-full" 
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-3.5 h-3.5 text-white" />
              )}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[10px] text-slate-400 font-mono">COLECIONADOR</div>
              <div className="text-xs font-semibold text-slate-200 truncate max-w-[120px]">{nickname}</div>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
}
