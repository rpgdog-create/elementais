/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Target, CheckCircle2, Award, Grid, Sparkles, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SPRITE_GROUPS, SPECIAL_SPRITE } from '../data';
import { CollectionState } from '../types';

interface MissionsTabProps {
  collectionState: CollectionState;
}

type MissionFilterType = 'all' | 'groups' | 'categories' | 'variants';

export default function MissionsTab({ collectionState }: MissionsTabProps) {
  const [activeFilter, setActiveFilter] = useState<MissionFilterType>('all');

  // --- STATS CALCULATIONS ---

  // Special Peanut collection check
  const peanutCollected = !!collectionState[SPECIAL_SPRITE.id];
  const peanutCollectedCount = peanutCollected ? 1 : 0;

  // Raros: água, terra, fogo, peixoto
  const raroGroupIds = ['agua', 'terra', 'fogo', 'peixoto'];
  const totalRaro = raroGroupIds.reduce((acc, gid) => acc + (SPRITE_GROUPS.find(g => g.id === gid)?.variants.length || 0), 0);
  const collectedRaro = raroGroupIds.reduce((acc, gid) => {
    const group = SPRITE_GROUPS.find(g => g.id === gid);
    return acc + (group ? group.variants.filter(v => !!collectionState[v.id]).length : 0);
  }, 0);
  const isRaroComplete = collectedRaro === totalRaro;

  // Épicos: Pato, fantasma, demônio, Rei, atacante, aura
  const epicoGroupIds = ['pato', 'fantasma', 'demonio', 'rei', 'atacante', 'aura'];
  const totalEpico = epicoGroupIds.reduce((acc, gid) => acc + (SPRITE_GROUPS.find(g => g.id === gid)?.variants.length || 0), 0);
  const collectedEpico = epicoGroupIds.reduce((acc, gid) => {
    const group = SPRITE_GROUPS.find(g => g.id === gid);
    return acc + (group ? group.variants.filter(v => !!collectionState[v.id]).length : 0);
  }, 0);
  const isEpicoComplete = collectedEpico === totalEpico;

  // Lendários: punk (caveira), sonho, chefe
  const lendarioGroupIds = ['caveira', 'sonho', 'chefe'];
  const totalLendario = lendarioGroupIds.reduce((acc, gid) => acc + (SPRITE_GROUPS.find(g => g.id === gid)?.variants.length || 0), 0);
  const collectedLendario = lendarioGroupIds.reduce((acc, gid) => {
    const group = SPRITE_GROUPS.find(g => g.id === gid);
    return acc + (group ? group.variants.filter(v => !!collectionState[v.id]).length : 0);
  }, 0);
  const isLendarioComplete = collectedLendario === totalLendario;

  // Míticos: Ponto Zero, ceifador, Amendoim
  const miticoGroupIds = ['ponto-zero', 'ceifador'];
  const totalMitico = miticoGroupIds.reduce((acc, gid) => acc + (SPRITE_GROUPS.find(g => g.id === gid)?.variants.length || 0), 0) + 1; // +1 Peanut
  const collectedMitico = miticoGroupIds.reduce((acc, gid) => {
    const group = SPRITE_GROUPS.find(g => g.id === gid);
    return acc + (group ? group.variants.filter(v => !!collectionState[v.id]).length : 0);
  }, 0) + peanutCollectedCount;
  const isMiticoComplete = collectedMitico === totalMitico;

  // Count variant collection
  const countVariantCollected = (variantType: string) => {
    let count = 0;
    SPRITE_GROUPS.forEach((g) => {
      const v = g.variants.find((v) => v.type === variantType);
      if (v && !!collectionState[v.id]) count++;
    });
    return count;
  };

  const collectedBase = countVariantCollected('base');
  const collectedDourado = countVariantCollected('dourado');
  const collectedGummy = countVariantCollected('gummy');
  const collectedGalaxy = countVariantCollected('galaxy');

  // --- DYNAMIC MISSIONS BUILD ---

  // 1. Group-based missions (15 families + Peanut = 16 missions)
  const groupMissions = SPRITE_GROUPS.map((group) => {
    const total = group.variants.length;
    const collected = group.variants.filter((v) => !!collectionState[v.id]).length;
    return {
      id: `mission-group-${group.id}`,
      title: `Família: ${group.title}`,
      subtitle: `Conjunto Elemental`,
      description: `Complete o conjunto de elementais da família de ${group.title} (todos os 4 exemplares).`,
      current: collected,
      target: total,
      completed: collected === total,
      type: 'group' as const,
      accentColor: 'from-cyan-500 to-blue-600',
    };
  });

  const peanutMission = {
    id: 'mission-group-amendoim',
    title: 'Família: Amendoim',
    subtitle: 'Mítico Solo',
    description: 'Encontre o Amendoim Especial (Peanut) único para sua coleção.',
    current: peanutCollectedCount,
    target: 1,
    completed: peanutCollected === true,
    type: 'group' as const,
    accentColor: 'from-amber-400 to-yellow-600',
  };

  const allGroupMissions = [...groupMissions, peanutMission];

  // 2. Category-based missions (4 missions)
  const categoryMissions = [
    {
      id: 'mission-cat-raro',
      title: 'Mestre da Liga Rara',
      subtitle: 'Classificação Raro',
      description: 'Colete todos os 16 elementais da categoria Raro (Água, Terra, Fogo, Peixoto).',
      current: collectedRaro,
      target: totalRaro,
      completed: isRaroComplete,
      type: 'category' as const,
      accentColor: 'from-emerald-400 to-teal-600',
    },
    {
      id: 'mission-cat-epico',
      title: 'Imperador da Guilda Épica',
      subtitle: 'Classificação Épico',
      description: 'Colete os 24 elementais da categoria Épico (Pato, Fantasma, Demônio, Rei, Atacante, Aura).',
      current: collectedEpico,
      target: totalEpico,
      completed: isEpicoComplete,
      type: 'category' as const,
      accentColor: 'from-violet-500 to-purple-700',
    },
    {
      id: 'mission-cat-lendario',
      title: 'Monarca dos Lendários',
      subtitle: 'Classificação Lendário',
      description: 'Colete os 12 elementais da categoria Lendário (Sonho, Punk, Chefe).',
      current: collectedLendario,
      target: totalLendario,
      completed: isLendarioComplete,
      type: 'category' as const,
      accentColor: 'from-amber-500 to-orange-600',
    },
    {
      id: 'mission-cat-mitico',
      title: 'Divindade Suprema Mítica',
      subtitle: 'Classificação Mítico',
      description: 'Colete todos os 9 elementais míticos da galáxia (Ponto Zero, Ceifador, Amendoim).',
      current: collectedMitico,
      target: totalMitico,
      completed: isMiticoComplete,
      type: 'category' as const,
      accentColor: 'from-pink-500 to-fuchsia-700',
    },
  ];

  // 3. Variant-based missions (4 missions)
  const variantMissions = [
    {
      id: 'mission-var-base',
      title: 'Fundação da Realidade',
      subtitle: 'Alquimia de Variantes',
      description: 'Garanta o elemental Base de todas as 15 famílias ativas.',
      current: collectedBase,
      target: 15,
      completed: collectedBase === 15,
      type: 'variant' as const,
      accentColor: 'from-slate-400 to-slate-600',
    },
    {
      id: 'mission-var-dourado',
      title: 'Iniciação Solar Cósmica',
      subtitle: 'Alquimia de Variantes',
      description: 'Garanta o elemental Dourado brilhante de todas as 15 famílias ativas.',
      current: collectedDourado,
      target: 15,
      completed: collectedDourado === 15,
      type: 'variant' as const,
      accentColor: 'from-amber-400 to-yellow-500',
    },
    {
      id: 'mission-var-gummy',
      title: 'Transmutação Doce',
      subtitle: 'Alquimia de Variantes',
      description: 'Garanta o elemental Gummy colorido de todas as 15 famílias ativas.',
      current: collectedGummy,
      target: 15,
      completed: collectedGummy === 15,
      type: 'variant' as const,
      accentColor: 'from-pink-400 to-emerald-400',
    },
    {
      id: 'mission-var-galaxy',
      title: 'Conquistador de Dimensões',
      subtitle: 'Alquimia de Variantes',
      description: 'Garanta o elemental Galaxy nebuloso de todas as 15 famílias ativas.',
      current: collectedGalaxy,
      target: 15,
      completed: collectedGalaxy === 15,
      type: 'variant' as const,
      accentColor: 'from-purple-500 to-indigo-600',
    },
  ];

  // Combina todas as missões
  const allMissions = [...allGroupMissions, ...categoryMissions, ...variantMissions];

  // Filtra as missões de acordo com o sub-tab ativo
  const filteredMissions = allMissions.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'groups') return m.type === 'group';
    if (activeFilter === 'categories') return m.type === 'category';
    if (activeFilter === 'variants') return m.type === 'variant';
    return true;
  });

  const totalCompletedCount = allMissions.filter((m) => m.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 md:px-8 pb-32">
      {/* Intro block */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#101924]/85 border border-[#182736] rounded-3xl p-6 md:p-8 shadow-2xl mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-yellow-600" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="p-2 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <Target className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-xs font-mono text-yellow-400 font-bold uppercase tracking-widest">
                Central de Contratos
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-100 mt-2">
              Quests & Desafios de Alquimia
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-lg">
              Cada conjunto descoberto, variante unificada ou categoria completada ativa uma recompensa de prestígio no seu Painel.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-yellow-400 uppercase bg-yellow-950/20 border border-yellow-500/25 py-2.5 px-5 rounded-2xl w-full md:w-fit shrink-0">
            <span>Quests Concluídas: {totalCompletedCount} / {allMissions.length}</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Sub-filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-[#090f16]/95 border border-slate-800 p-1 rounded-2xl w-fit mx-auto">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
            activeFilter === 'all'
              ? 'bg-[#182736] text-cyan-400 font-bold border border-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid className="w-4 h-4" />
          Todas ({allMissions.length})
        </button>
        <button
          onClick={() => setActiveFilter('groups')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
            activeFilter === 'groups'
              ? 'bg-[#182736] text-cyan-400 font-bold border border-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Conjuntos ({allGroupMissions.length})
        </button>
        <button
          onClick={() => setActiveFilter('categories')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
            activeFilter === 'categories'
              ? 'bg-[#182736] text-cyan-400 font-bold border border-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          Categorias ({categoryMissions.length})
        </button>
        <button
          onClick={() => setActiveFilter('variants')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
            activeFilter === 'variants'
              ? 'bg-[#182736] text-cyan-400 font-bold border border-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Variantes ({variantMissions.length})
        </button>
      </div>

      {/* Grid List of Missions */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredMissions.map((mission, index) => {
            const percent = Math.min(Math.round((mission.current / mission.target) * 100), 100);

            return (
              <motion.div
                layout
                key={mission.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.2) }}
                className={`
                  bg-[#0d1622]/90 border p-5 rounded-3xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden
                  ${
                    mission.completed
                      ? 'border-emerald-500/20 bg-emerald-950/5 shadow-[0_0_20px_rgba(16,185,129,0.03)]'
                      : 'border-[#142334] hover:border-slate-800'
                  }
                `}
              >
                {/* Visual badge top section */}
                <div className="flex items-start gap-4">
                  {/* Icon indicator */}
                  <div
                    className={`
                    p-2.5 rounded-2xl border flex items-center justify-center shrink-0
                    ${
                      mission.completed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-950 border-slate-900 text-slate-500'
                    }
                  `}
                  >
                    {mission.completed ? (
                      <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                    ) : (
                      <Target className="w-5 h-5 stroke-[2]" />
                    )}
                  </div>

                  {/* Title and descriptions */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold uppercase">
                      {mission.subtitle}
                    </span>
                    <h4
                      className={`text-sm font-bold truncate mt-0.5 ${
                        mission.completed ? 'text-emerald-300' : 'text-slate-200'
                      }`}
                    >
                      {mission.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                      {mission.description}
                    </p>
                  </div>
                </div>

                {/* Micro progress bar and label footer */}
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-slate-500">QUEST PROGRESSO</span>
                    <span
                      className={`font-bold ${
                        mission.completed ? 'text-emerald-400' : 'text-slate-300'
                      }`}
                    >
                      {mission.current} / {mission.target} ({percent}%)
                    </span>
                  </div>

                  {/* Slider Progress Bar */}
                  <div className="w-full bg-[#05080d] h-2 rounded-full overflow-hidden border border-slate-900/60 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        mission.completed
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty View */}
      {filteredMissions.length === 0 && (
        <div className="text-center py-12 text-slate-500 font-mono text-sm">
          Nenhuma quest ativa com este filtro.
        </div>
      )}
    </div>
  );
}
