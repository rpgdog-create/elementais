/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { BarChart3, PieChartIcon, ShieldCheck, Sparkles, Star, Award, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SPRITE_GROUPS, SPECIAL_SPRITE } from '../data';
import { CollectionState } from '../types';

interface StatsTabProps {
  collectionState: CollectionState;
}

// ---------------------------------------------------------
// CUSTOM SVG BADGES FOR EACH OF THE 6 COLLECTOR CATEGORIES
// ---------------------------------------------------------
function RankInsigniaSVG({ id, size = 110 }: { id: string; size?: number }) {
  switch (id) {
    case 'iniciante':
      return (
        <svg id="svg-insignia-iniciante" width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <defs>
            <linearGradient id="grad-iniciante-shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="grad-iniciante-plant" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path d="M50 8L85 24V55C85 73.5 70 88 50 93C30 88 15 73.5 15 55V24L50 8Z" fill="#04070a" stroke="url(#grad-iniciante-shield)" strokeWidth="3" />
          <path d="M50 14L80 28V54C80 69.5 67.5 82 50 87C32.5 82 20 69.5 20 54V28L50 14Z" fill="#09111c" stroke="#112d3a" strokeWidth="1" />
          
          <circle cx="50" cy="46" r="16" stroke="#10b981" strokeWidth="2.5" fill="#061f18" />
          <line x1="61.5" y1="57.5" x2="75" y2="71" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="46" r="11" fill="url(#grad-iniciante-plant)" opacity="0.3" />
          
          <path d="M50 54V40C50 40 52 35 56 35" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          <path d="M50 45C50 45 46 41 42 42" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="38" r="1.5" fill="#6ee7b7" />
        </svg>
      );
    case 'explorador':
      return (
        <svg id="svg-insignia-explorador" width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">
          <defs>
            <linearGradient id="grad-exp-shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="grad-exp-needle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          <path d="M50 5 L88 20 V50 C88 72 72 89 50 95 C28 89 12 72 12 50 V20 L50 5 Z" fill="#03080d" stroke="url(#grad-exp-shield)" strokeWidth="3" />
          <path d="M50 11 L82 24 V49 C82 68 68 83 50 89 C32 83 18 68 18 49 V24 L50 11 Z" fill="#06121f" stroke="#0e2a3f" strokeWidth="1" />
          
          <circle cx="50" cy="50" r="22" stroke="#38bdf8" strokeWidth="2" fill="#030c14" />
          <circle cx="50" cy="50" r="25" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 3" />
          
          <circle cx="50" cy="33" r="1.5" fill="#38bdf8" />
          <circle cx="50" cy="67" r="1.5" fill="#38bdf8" />
          <circle cx="33" cy="50" r="1.5" fill="#38bdf8" />
          <circle cx="67" cy="50" r="1.5" fill="#38bdf8" />
          
          <g transform="rotate(35 50 50)">
            <polygon points="50,28 55,50 50,53" fill="url(#grad-exp-needle)" />
            <polygon points="50,72 55,50 50,47" fill="#e2e8f0" />
            <polygon points="50,28 45,50 50,53" fill="#ef4444" opacity="0.9" />
            <polygon points="50,72 45,50 50,47" fill="#94a3b8" />
            <circle cx="50" cy="50" r="2.5" fill="#fff" />
          </g>
        </svg>
      );
    case 'cacador':
      return (
        <svg id="svg-insignia-cacador" width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
          <defs>
            <linearGradient id="grad-hunt-shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="grad-hunt-fire" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <path d="M50 4 L90 22 V54 C90 73 73 88 50 96 C27 88 10 73 10 54 V22 L50 4 Z" fill="#040608" stroke="url(#grad-hunt-shield)" strokeWidth="3.5" />
          
          <circle cx="50" cy="50" r="24" stroke="#d97706" strokeWidth="1.5" strokeDasharray="5 3" />
          <circle cx="50" cy="50" r="18" stroke="#fb923c" strokeWidth="2.5" fill="#14110b" />
          
          <line x1="50" y1="20" x2="50" y2="30" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="70" x2="50" y2="80" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="50" x2="30" y2="50" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <line x1="70" y1="50" x2="80" y2="50" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          
          <path d="M50 36C50 36 57 41 57 48C57 53 53 59 50 59C47 59 43 54 43 49C43 43 47 39 50 36Z" fill="url(#grad-hunt-fire)" />
          <path d="M50 42C50 42 53 45 53 48C53 51 51 54 50 54C49 54 47 52 47 49C47 46 49 44 50 42Z" fill="#fef08a" opacity="0.9" />
          <circle cx="50" cy="50" r="1.5" fill="#fff" />
        </svg>
      );
    case 'mestre':
      return (
        <svg id="svg-insignia-mestre" width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_15px_rgba(139,92,246,0.45)]">
          <defs>
            <linearGradient id="grad-master-shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#5b21b6" />
            </linearGradient>
            <linearGradient id="grad-master-star" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ddd6fe" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path d="M50 3 L92 20 V50 C92 74 74 91 50 97 C26 91 8 74 8 50 V20 L50 3 Z" fill="#04030a" stroke="url(#grad-master-shield)" strokeWidth="3.5" />
          
          <polygon points="50,18 78,66 22,66" stroke="#a855f7" strokeWidth="1" opacity="0.3" />
          <polygon points="50,78 78,30 22,30" stroke="#a855f7" strokeWidth="1" opacity="0.3" />
          
          <circle cx="50" cy="48" r="21" stroke="#c084fc" strokeWidth="1.5" />
          
          <g transform="translate(32, 30)">
            <path d="M18 2L23 13L34 15L26 23L28 34L18 28L8 34L10 23L2 15L13 13Z" fill="url(#grad-master-star)" stroke="#e9d5ff" strokeWidth="1.5" />
            <circle cx="18" cy="18" r="4.5" fill="#fff" />
          </g>
          
          <circle cx="28" cy="28" r="1.5" fill="#fdf4ff" className="animate-pulse" />
          <circle cx="72" cy="28" r="1.5" fill="#fdf4ff" className="animate-pulse" />
          <circle cx="50" cy="12" r="2" fill="#fff" />
        </svg>
      );
    case 'guardiao':
      return (
        <svg id="svg-insignia-guardiao" width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
          <defs>
            <linearGradient id="grad-guard-shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>
            <linearGradient id="grad-nebula" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path d="M50 2 L94 18 V48 C94 74 75 92 50 98 C25 92 6 74 6 48 V18 L50 2 Z" fill="#040207" stroke="url(#grad-guard-shield)" strokeWidth="4" />
          
          <ellipse cx="50" cy="50" rx="30" ry="12" fill="none" stroke="url(#grad-nebula)" strokeWidth="3" transform="rotate(-25 50 50)" />
          
          <circle cx="50" cy="50" r="16" fill="#0c0414" stroke="#ec4899" strokeWidth="2" />
          <circle cx="50" cy="50" r="12" fill="url(#grad-nebula)" opacity="0.8" />
          
          <path d="M50 24L55 35H45L50 24Z" fill="#fbcfe8" />
          <path d="M50 76L55 65H45L50 76Z" fill="#fbcfe8" />
          <circle cx="50" cy="50" r="4.5" fill="#ffffff" />
          
          <circle cx="28" cy="40" r="2" fill="#fff" className="animate-ping" />
          <circle cx="72" cy="60" r="2" fill="#fff" className="animate-ping" />
        </svg>
      );
    case 'divindade':
      return (
        <svg id="svg-insignia-divindade" width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_25px_rgba(234,179,8,0.7)]">
          <defs>
            <linearGradient id="grad-divine-shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="grad-rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="25%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="75%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient id="grad-sun" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          <path d="M50 1 L96 17 V47 C96 75 76 94 50 99 C24 94 4 75 4 47 V17 L50 1 Z" fill="#030200" stroke="url(#grad-divine-shield)" strokeWidth="4.5" />
          <path d="M50 6 L90 20 V46 C90 71 72 88 50 93 C28 93 10 71 10 46 V20 L50 6 Z" fill="none" stroke="url(#grad-rainbow)" strokeWidth="1.5" opacity="0.6" />
          
          <path d="M30 35 L38 48 L50 38 L62 48 L70 35 L64 52 L36 52 Z" fill="url(#grad-divine-shield)" stroke="#fff" strokeWidth="1" />
          <circle cx="30" cy="33" r="2" fill="#fff" />
          <circle cx="50" cy="36" r="2.5" fill="#fff" />
          <circle cx="70" cy="33" r="2" fill="#fff" />
          
          <circle cx="50" cy="58" r="16" fill="url(#grad-sun)" />
          <circle cx="50" cy="58" r="20" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="4 2" />
          
          <line x1="50" y1="36" x2="50" y2="28" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="80" x2="50" y2="88" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="58" x2="20" y2="58" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="72" y1="58" x2="80" y2="58" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
          
          <line x1="34" y1="42" x2="26" y2="34" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          <line x1="66" y1="42" x2="74" y2="34" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          
          <circle cx="50" cy="58" r="5" fill="#ffffff" />
        </svg>
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------
// GET COLLECTOR RANK METADATA AND THRESHOLDS FOR DETAILED VIEW
// ---------------------------------------------------------
const getCollectorRankInfo = (collected: number) => {
  if (collected === 0) {
    return {
      id: 'iniciante',
      name: "Iniciante Curioso",
      nextName: "Explorador de Sprites",
      nextThreshold: 1,
      minThreshold: 0,
      description: "Seu primeiro contato com o reino dos Sprites e da Alquimia Cósmica. Comece a explorar e coletar sprites na aba principal!",
      accentColor: '#10b981', // emerald-500
      bgGradient: 'from-emerald-950/40 via-slate-900/95 to-slate-950/98',
      borderColor: 'border-emerald-500/30 shadow-[0_0_35px_rgba(16,185,129,0.15)]',
      colorText: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    };
  }
  if (collected < 15) {
    return {
      id: 'explorador',
      name: "Explorador de Sprites",
      nextName: "Caçador de Elementais",
      nextThreshold: 15,
      minThreshold: 1,
      description: "Você começou a catalogar as criaturas místicas e compreender as suas ricas variações elementais Básicas e Especiais.",
      accentColor: '#38bdf8', // sky-400
      bgGradient: 'from-sky-950/40 via-slate-900/95 to-slate-950/98',
      borderColor: 'border-sky-500/30 shadow-[0_0_35px_rgba(56,189,248,0.15)]',
      colorText: 'text-sky-400 bg-sky-500/10 border-sky-500/20'
    };
  }
  if (collected < 30) {
    return {
      id: 'cacador',
      name: "Caçador de Elementais",
      nextName: "Mestre dos Elementos",
      nextThreshold: 30,
      minThreshold: 15,
      description: "Suas habilidades de rastreamento de variantes cresceram muito. Os elementais agora ressonam fortemente com a sua presença.",
      accentColor: '#f59e0b', // amber-500
      bgGradient: 'from-amber-950/40 via-slate-900/95 to-slate-950/98',
      borderColor: 'border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.15)]',
      colorText: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    };
  }
  if (collected < 45) {
    return {
      id: 'mestre',
      name: "Mestre dos Elementos",
      nextName: "Guardião Cósmico",
      nextThreshold: 45,
      minThreshold: 30,
      description: "Você unificou dezenas de famílias e variantes raras. Os segredos mais profundos da transmutação estão sob o seu comando.",
      accentColor: '#8b5cf6', // violet-500
      bgGradient: 'from-violet-950/40 via-slate-900/95 to-slate-950/98',
      borderColor: 'border-violet-500/30 shadow-[0_0_35px_rgba(139,92,246,0.15)]',
      colorText: 'text-violet-400 bg-violet-500/10 border-violet-500/20'
    };
  }
  if (collected < 61) {
    return {
      id: 'guardiao',
      name: "Guardião Cósmico",
      nextName: "Divindade dos Sprites",
      nextThreshold: 61,
      minThreshold: 45,
      description: "Sua espetacular coleção abrange quase a totalidade de todas as variantes cósmicas e elementais conhecidas no universo.",
      accentColor: '#ec4899', // pink-500
      bgGradient: 'from-pink-950/40 via-slate-900/95 to-slate-950/98',
      borderColor: 'border-pink-500/30 shadow-[0_0_35px_rgba(236,72,153,0.15)]',
      colorText: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
    };
  }
  return {
    id: 'divindade',
    name: "Divindade dos Sprites",
    nextName: "",
    nextThreshold: 61,
    minThreshold: 61,
    description: "Nível Máximo Alcançado! Você alcançou o ápice absoluto da Alquimia Universal. Todos os 61 sprites pertencem ao seu domínio divino sagrado.",
    accentColor: '#fbbf24', // yellow-400
    bgGradient: 'from-yellow-950/40 via-slate-900/95 to-slate-950/98',
    borderColor: 'border-yellow-500/40 shadow-[0_0_40px_rgba(250,204,21,0.25)]',
    colorText: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
  };
};

export default function StatsTab({ collectionState }: StatsTabProps) {
  
  // Calculate stats count based strictly on valid sprite database IDs
  const validSpriteIds = [
    SPECIAL_SPRITE.id,
    ...SPRITE_GROUPS.flatMap(group => group.variants.map(v => v.id))
  ];

  // Calculate General KPIs
  const totalSprites = validSpriteIds.length;
  const collectedTotal = validSpriteIds.filter(id => !!collectionState[id]).length;
  
  // Elite families are families with all 4 variants collected
  const eliteFamiliesCount = SPRITE_GROUPS.filter(group => {
    return group.variants.every(v => collectionState[v.id]);
  }).length;

  const currentRankInfo = getCollectorRankInfo(collectedTotal);

  // Let's count totals per type (Base, Dourado, Gummy, Galaxy)
  const statsByType = {
    base: { count: 0, total: SPRITE_GROUPS.length, color: '#38bdf8' },      // sky-400
    dourado: { count: 0, total: SPRITE_GROUPS.length, color: '#fbbf24' },   // amber-400
    gummy: { count: 0, total: SPRITE_GROUPS.length, color: '#f472b6' },     // pink-400
    galaxy: { count: 0, total: SPRITE_GROUPS.length, color: '#818cf8' },    // indigo-400
    special: { count: 0, total: 1, color: '#2dd4bf' },                      // teal-400
  };

  SPRITE_GROUPS.forEach(g => {
    g.variants.forEach(v => {
      if (collectionState[v.id]) {
        statsByType[v.type].count++;
      }
    });
  });

  if (collectionState[SPECIAL_SPRITE.id]) {
    statsByType.special.count++;
  }

  // Formatting data for Type Donut Chart
  const typeChartData = [
    { name: 'Base', value: statsByType.base.count, color: statsByType.base.color },
    { name: 'Dourado', value: statsByType.dourado.count, color: statsByType.dourado.color },
    { name: 'Gummy', value: statsByType.gummy.count, color: statsByType.gummy.color },
    { name: 'Galaxy', value: statsByType.galaxy.count, color: statsByType.galaxy.color },
    { name: 'Especial (Peanut)', value: statsByType.special.count, color: statsByType.special.color },
  ].filter(d => d.value > 0);

  // Formatting data for Family/Element Horizontal Bar Chart
  const familyChartData = SPRITE_GROUPS.map(group => {
    const collected = group.variants.filter(v => collectionState[v.id]).length;
    
    // Apply neat text abbreviation so labels look stunning on all screens
    let displayName = group.title;
    if (group.title === 'Ponto Zero') displayName = 'P. Zero';
    if (group.title === 'Fantasma') displayName = 'Fantas.';
    if (group.title === 'Ceifador') displayName = 'Ceifad.';
    if (group.title === 'Atacante') displayName = 'Atac.';
    if (group.title === 'Demônio') displayName = 'Demôn.';

    return {
      name: displayName,
      fullName: group.title,
      'Coletados': collected,
      'Restantes': 4 - collected,
      hexColor: group.glowColor,
    };
  });

  // Calculate percentage inside the current rank for progress bar
  const rangeTotal = currentRankInfo.nextThreshold - currentRankInfo.minThreshold;
  const rangeCollected = collectedTotal - currentRankInfo.minThreshold;
  const rankPercent = currentRankInfo.id === 'divindade' 
    ? 100 
    : Math.min(100, Math.round((rangeCollected / rangeTotal) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 md:px-8 pb-32">
      
      {/* 
        1. FIRST PLACE: MASTER EMPHASIZED USER CATEGORY BOX
        Designed with huge visual prominence, unique SVGs, and fully displayed rank names.
      */}
      <motion.div
        id="div-user-rank-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-gradient-to-br ${currentRankInfo.bgGradient} border ${currentRankInfo.borderColor} rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden`}
      >
        {/* Dynamic Background Glow Effect */}
        <div 
          className="absolute -right-24 -top-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: currentRankInfo.accentColor }}
        />
        <div 
          className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: currentRankInfo.accentColor }}
        />

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
          
          {/* Rank SVG Container - Highly Emphasized */}
          <div id="div-rank-svg-badge" className="shrink-0 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 shadow-inner flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent rounded-2xl opacity-50" />
            
            {/* Spinning decorative orbit behind badge */}
            <div 
              className="absolute w-24 h-24 border border-dashed rounded-full opacity-10 animate-spin-slow pointer-events-none"
              style={{ borderColor: currentRankInfo.accentColor }}
            />
            
            <RankInsigniaSVG id={currentRankInfo.id} size={110} />
            
            {/* Active Level Badge Overlay */}
            <span 
              className="absolute -bottom-2.5 px-3 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider text-slate-950 uppercase"
              style={{ backgroundColor: currentRankInfo.accentColor }}
            >
              LIGA ATIVA
            </span>
          </div>

          {/* Rank Description and Progress - Fully displayed with zero text truncation */}
          <div className="flex-1 text-center md:text-left min-w-0 w-full">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300 bg-slate-950/85 border border-slate-800/60">
                <Award className="w-3.5 h-3.5" style={{ color: currentRankInfo.accentColor }} />
                PRESTÍGIO DO JOGADOR
              </span>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${currentRankInfo.colorText}`}>
                {collectedTotal} / {totalSprites} DESCOBERTAS
              </span>
            </div>

            {/* Title: Appearing fully inside the box */}
            <h2 
              id="heading-user-rank-name"
              className="text-2xl sm:text-3.5xl font-display font-extrabold tracking-tight text-white mt-3 block whitespace-normal"
              style={{ textShadow: `0 0 30px ${currentRankInfo.accentColor}25` }}
            >
              {currentRankInfo.name}
            </h2>

            <p className="text-slate-300 text-sm mt-2 leading-relaxed max-w-2xl whitespace-normal font-sans">
              {currentRankInfo.description}
            </p>

            {/* Progression Area */}
            <div className="mt-6 bg-slate-950/45 p-4 rounded-2xl border border-slate-900/80 max-w-xl">
              {currentRankInfo.id === 'divindade' ? (
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-yellow-400">
                  <span className="animate-pulse">★</span>
                  <span>PARABÉNS! VOCÊ ATINGIU O ÁPICE DA ALQUIMIA SUPREMA DOS SPRITES!</span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-slate-400 flex items-center gap-1">
                      PROGRESSO DA CATEGORIA
                    </span>
                    <span className="text-slate-200 font-bold">
                      {collectedTotal} / {currentRankInfo.nextThreshold} ({rankPercent}%)
                    </span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="w-full bg-[#05080d] h-2.5 rounded-full overflow-hidden border border-slate-800/60 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${rankPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: currentRankInfo.accentColor }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono mt-2.5 flex items-center gap-1 justify-center md:justify-start">
                    <span>Próxima Liga:</span>
                    <span className="text-slate-200 font-semibold">{currentRankInfo.nextName}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span>Faltam {currentRankInfo.nextThreshold - collectedTotal} sprites</span>
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </motion.div>

      {/* KPI Cards Row (Now 3 Columns representing other stats, giving maximum space & cleaner hierarchy) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        
        {/* KPI 1: Discoveries */}
        <div id="kpi-discoveries" className="bg-[#101924]/85 border border-[#182736] p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 rounded-xl">
            <Star className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Sprites Descobertos</div>
            <div className="text-xl font-display font-bold text-slate-100 mt-0.5">
              {collectedTotal} <span className="text-xs font-normal text-slate-400">/ {totalSprites} ({Math.round((collectedTotal / totalSprites) * 100)}%)</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Complete Sets */}
        <div id="kpi-complete-sets" className="bg-[#101924]/85 border border-[#182736] p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-fuchsia-950/40 border border-fuchsia-500/20 text-fuchsia-400 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Fases Completas</div>
            <div className="text-xl font-display font-bold text-slate-100 mt-0.5">
              {eliteFamiliesCount} <span className="text-xs font-normal text-slate-400">/ {SPRITE_GROUPS.length} Famílias</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Special Editions */}
        <div id="kpi-special-editions" className="bg-[#101924]/85 border border-[#182736] p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-yellow-950/40 border border-yellow-500/20 text-yellow-400 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Edições Especiais</div>
            <div className="text-xl font-display font-bold text-slate-100 mt-0.5">
              {statsByType.dourado.count + statsByType.gummy.count + statsByType.galaxy.count} <span className="text-xs font-normal text-slate-400">/ {SPRITE_GROUPS.length * 3}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Family Progress Chart (Left 3 columns) */}
        <div id="chart-family-progress" className="lg:col-span-3 bg-[#101924]/80 border border-[#182736] p-5 md:p-6 rounded-3xl shadow-lg flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-semibold text-slate-200">Progresso Detalhado por Elemento</h3>
          </div>
          
          <div className="flex-1 h-[420px] min-h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={familyChartData}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <XAxis type="number" stroke="#475569" fontSize={11} domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  width={75} 
                  interval={0} 
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#142334', opacity: 0.3 }}
                  contentStyle={{
                    backgroundColor: '#0c131d',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#f1f5f9',
                  }}
                  formatter={(value, name, props) => {
                    if (name === 'Coletados') {
                      return [`${value} / 4`, `Coletados (${props.payload.fullName})`];
                    }
                    return [value, name];
                  }}
                />
                <Bar dataKey="Coletados" stackId="element" fill="#06b6d4" radius={[0, 4, 4, 0]}>
                  {familyChartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.hexColor.replace('0.3', '0.7')} />
                  ))}
                </Bar>
                <Bar dataKey="Restantes" stackId="element" fill="#141c26" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Card: Sprite Variant Split (Right 2 columns) */}
        <div id="chart-sprite-variants" className="lg:col-span-2 bg-[#101924]/80 border border-[#182736] p-5 md:p-6 rounded-3xl shadow-lg flex flex-col items-center justify-between">
          <div className="flex items-center gap-2 w-full mb-3 self-start">
            <PieChartIcon className="w-5 h-5 text-pink-400" />
            <h3 className="font-display font-semibold text-slate-200">Sua Coleção por Variantes</h3>
          </div>
          
          {typeChartData.length > 0 ? (
            <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[280px]">
              <div className="w-full h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {typeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0c131d',
                        borderColor: '#1e293b',
                        borderRadius: '12px',
                        color: '#f1f5f9',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Total Counter Inside circle */}
                <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-slate-100 font-display">{collectedTotal}</span>
                  <span className="text-[10px] text-slate-400 font-mono">DESCOBERTO</span>
                </div>
              </div>

              {/* Legends list */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-2 mt-4 text-xs font-mono w-full">
                {typeChartData.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                    <span className="truncate">{t.name}: {t.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500 font-mono text-sm">
              Selecione sprites na aba principal para ver os gráficos de distribuição.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
