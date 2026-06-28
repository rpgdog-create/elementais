/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SpecialItem from './components/SpecialItem';
import SpriteGrid from './components/SpriteGrid';
import SuperTab from './components/SuperTab';
import MissionsTab from './components/MissionsTab';
import StatsTab from './components/StatsTab';
import FloatingNav from './components/FloatingNav';
import { CollectionState } from './types';
import { Eye, EyeOff, CheckSquare, Layers, X, ShieldAlert, Check, Trophy, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SPRITE_GROUPS, SPECIAL_SPRITE } from './data';

type TabType = 'sprites' | 'super' | 'missões' | 'stats';
type FilterType = 'all' | 'uncollected' | 'collected';

// Persistent storage keys
const STORAGE_KEYS = {
  COLLECTION: 'rastreador_sprites_data_v2',
  PROFILE: 'rastreador_sprites_profile_v2'
};

// Default profile values
const DEFAULT_PROFILE = {
  nickname: 'Colecionador',
  favoriteSpriteId: 'amendoim-especial'
};

/**
 * Safe localStorage getter with fallback
 */
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Failed to parse ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safe localStorage setter with error handling
 */
const setToStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
    // Fallback: Try clearing old data and retry once
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      try {
        // Remove old version keys if they exist
        localStorage.removeItem('rastreador_sprites_data');
        localStorage.removeItem('rastreador_sprites_profile');
        localStorage.setItem(key, JSON.stringify(value));
        console.info('Recovered from storage quota by clearing old data');
      } catch (retryError) {
        console.error('Could not recover from storage quota error:', retryError);
      }
    }
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('sprites');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize collection state from localStorage with fallback
  const [collectionState, setCollectionState] = useState<CollectionState>(() => {
    return getFromStorage<CollectionState>(STORAGE_KEYS.COLLECTION, {});
  });

  // Initialize profile state from localStorage with fallback
  const [profile, setProfile] = useState(() => {
    return getFromStorage(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
  });

  // Modal display states
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Mark as initialized after hydration
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Persist collection state to localStorage
  useEffect(() => {
    if (isInitialized) {
      setToStorage(STORAGE_KEYS.COLLECTION, collectionState);
    }
  }, [collectionState, isInitialized]);

  // Persist profile to localStorage
  useEffect(() => {
    if (isInitialized) {
      setToStorage(STORAGE_KEYS.PROFILE, profile);
    }
  }, [profile, isInitialized]);

  // Toggle single item collected status
  const handleToggle = (id: string) => {
    setCollectionState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Reset entire collection with confirmation
  const handleReset = () => {
    setCollectionState({});
    setIsResetConfirmOpen(false);
    setIsProfileOpen(false);
  };

  // Calculate stats count based strictly on valid sprite database IDs
  const validSpriteIds = [
    SPECIAL_SPRITE.id,
    ...SPRITE_GROUPS.flatMap(group => group.variants.map(v => v.id))
  ];

  // Quick helper to auto-fill (for easy playground exploration)
  const handleUnlockRandom = () => {
    // Collect 8 random ones that are currently uncollected
    const nextState = { ...collectionState };
    let added = 0;
    // Shuffle and pick
    const shuffled = [...validSpriteIds].sort(() => 0.5 - Math.random());
    for (const id of shuffled) {
      if (!nextState[id] && added < 8) {
        nextState[id] = true;
        added++;
      }
    }
    setCollectionState(nextState);
  };

  const collectedCount = validSpriteIds.filter(id => !!collectionState[id]).length;
  const totalCount = validSpriteIds.length;

  const getFavoriteSpriteImage = () => {
    if (profile.favoriteSpriteId === 'amendoim-especial') {
      return SPECIAL_SPRITE.image;
    }
    for (const group of SPRITE_GROUPS) {
      const found = group.variants.find(v => v.id === profile.favoriteSpriteId);
      if (found) return found.image;
    }
    return undefined;
  };

  const getCollectorRank = () => {
    if (collectedCount === 0) return "Iniciante Curioso";
    if (collectedCount < 15) return "Explorador de Sprites";
    if (collectedCount < 30) return "Caçador de Elementais";
    if (collectedCount < 45) return "Mestre dos Elementos";
    if (collectedCount < 61) return "Guardião Cósmico";
    return "Divindade dos Sprites (Completo!)";
  };

  const allSpritesList = [
    { id: SPECIAL_SPRITE.id, name: SPECIAL_SPRITE.title },
    ...SPRITE_GROUPS.flatMap(group => 
      group.variants.map(v => ({
        id: v.id,
        name: `${group.title} (${v.name})`
      }))
    )
  ];

  // Don't render until hydrated to avoid hydration mismatch
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-[#060a0f] text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto" />
          </div>
          <p className="text-sm text-slate-400 font-mono">Carregando coleção...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060a0f] text-slate-100 flex flex-col font-sans pb-12">
      
      {/* Top sticky stats navigation header */}
      <Header 
        collectedCount={collectedCount} 
        totalCount={totalCount} 
        onResetClick={() => setIsResetConfirmOpen(true)} 
        onProfileClick={() => setIsProfileOpen(true)}
        nickname={profile.nickname}
        favoriteSpriteImage={getFavoriteSpriteImage()}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'sprites' && (
            <motion.div
              key="sprites-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Highlight special peanut item block at the top */}
              <SpecialItem 
                collected={!!collectionState['amendoim-especial']} 
                onToggle={() => handleToggle('amendoim-especial')} 
              />

              {/* Sub-toolbar for searching, filtering, and quick actions */}
              <div className="max-w-7xl mx-auto px-4 mt-8 md:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                
                {/* Filter buttons */}
                <div className="flex bg-[#0d1622]/90 p-1 rounded-xl border border-slate-800 w-fit">
                  
                  <button
                    onClick={() => setFilterType('all')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all cursor-pointer ${filterType === 'all' ? 'bg-[#182736] text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-300'}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>TODOS ({totalCount})</span>
                  </button>

                  <button
                    onClick={() => setFilterType('uncollected')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all cursor-pointer ${filterType === 'uncollected' ? 'bg-[#182736] text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-300'}`}
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>FALTANDO ({totalCount - collectedCount})</span>
                  </button>

                  <button
                    onClick={() => setFilterType('collected')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all cursor-pointer ${filterType === 'collected' ? 'bg-[#182736] text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-300'}`}
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>COLETADOS ({collectedCount})</span>
                  </button>

                </div>

                {/* Developer Playground tools */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUnlockRandom}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-950/40 to-blue-950/40 hover:from-cyan-900/60 hover:to-blue-900/60 border border-cyan-500/15 hover:border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span>⚡ Simular Descobertas</span>
                  </button>
                </div>
              </div>

              {/* Core responsive grid list of families */}
              <SpriteGrid 
                collectionState={collectionState} 
                onToggle={handleToggle} 
                filterType={filterType} 
              />
            </motion.div>
          )}

          {activeTab === 'super' && (
            <motion.div
              key="super-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <SuperTab collectionState={collectionState} />
            </motion.div>
          )}

          {activeTab === 'missões' && (
            <motion.div
              key="missions-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MissionsTab collectionState={collectionState} />
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <StatsTab collectionState={collectionState} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Centered Bottom Navigation Bar */}
      <FloatingNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="absolute inset-0 bg-[#020406]/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#0a1017] border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden z-10"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 40px rgba(6,182,212,0.05)'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 border-b border-slate-800/60 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <Trophy className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-100 uppercase tracking-wide">
                    Painel do Colecionador
                  </h3>
                </div>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="p-1.5 hover:bg-slate-800/80 rounded-lg text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-6">
                
                {/* Avatar & Rank */}
                <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50">
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center p-1 shadow-lg overflow-hidden">
                    {getFavoriteSpriteImage() ? (
                      <img 
                        src={getFavoriteSpriteImage()} 
                        className="w-full h-full object-cover rounded-full" 
                        alt="Sprite Favorito"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Sparkles className="w-8 h-8 text-cyan-400" />
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-[9px] font-bold text-slate-950 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      FAV
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 border border-cyan-500/20 rounded-md uppercase">
                      {getCollectorRank()}
                    </span>
                    <h4 className="text-base font-semibold text-slate-200 mt-1.5 leading-none">
                      {profile.nickname}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      Progresso: {collectedCount} / {totalCount} descobertos
                    </p>
                  </div>
                </div>

                {/* Nickname input */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Apelido do Colecionador
                  </label>
                  <input
                    type="text"
                    maxLength={20}
                    value={profile.nickname}
                    onChange={(e) => setProfile({ ...profile, nickname: e.target.value || 'Colecionador' })}
                    className="w-full bg-slate-950/80 border border-slate-800 hover:border-slate-700 focus:border-cyan-500/50 focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-slate-100 transition-all"
                    placeholder="Apelido..."
                  />
                </div>

                {/* Favorite sprite selector */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Escolher Sprite Favorito
                  </label>
                  <select
                    value={profile.favoriteSpriteId}
                    onChange={(e) => setProfile({ ...profile, favoriteSpriteId: e.target.value })}
                    className="w-full bg-[#0d1622] border border-slate-800 hover:border-slate-700 focus:border-cyan-500/50 focus:outline-none rounded-xl px-3 py-2.5 text-sm text-slate-100 transition-all"
                  >
                    {allSpritesList.map((sprite) => (
                      <option key={sprite.id} value={sprite.id} className="bg-[#0a1017] text-slate-200">
                        {sprite.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick actions separator */}
                <div className="border-t border-slate-800/80 pt-5 mt-2 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsResetConfirmOpen(true);
                    }}
                    className="w-full py-2.5 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 hover:border-red-500/30 rounded-xl text-xs font-mono tracking-wider text-red-400 uppercase font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Resetar Todo o Progresso
                  </button>

                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                  >
                    Salvar & Fechar
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {isResetConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResetConfirmOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-[#0c0d12] border border-red-900/40 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(239,68,68,0.15)] z-10"
            >
              <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
              
              <h3 className="text-lg font-display font-bold text-red-400 uppercase tracking-wide mb-2">
                Limpar Progresso?
              </h3>
              
              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-medium">
                Esta ação apagará permanentemente todo o progresso da sua coleção de sprites. Tem certeza de que deseja continuar?
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-xs font-bold text-white rounded-xl transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/30 uppercase tracking-wider cursor-pointer"
                >
                  Sim, Resetar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
