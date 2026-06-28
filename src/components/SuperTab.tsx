/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Lock, Sparkles, Trophy, Grid, Layers, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SPECIAL_SPRITE, SPRITE_GROUPS } from '../data';
import { CollectionState, SpriteCategoryType, SpriteVariantType } from '../types';

interface SuperTabProps {
  collectionState: CollectionState;
}

type BadgeTabType = 'all' | 'groups' | 'categories' | 'variants';

// Helper component to render gorgeous themed vector SVGs for each insignia
function InsigniaSVG({ id, active, color }: { id: string; active: boolean; color: string }) {
  const activeColor = color || '#06b6d4';
  const inactiveColor = '#1e293b';

  // Return specific paths and symbols depending on badge theme
  const renderSymbol = () => {
    switch (id) {
      // Elemental Groups
      case 'agua':
        return (
          <path
            d="M20 28C20 32.4183 23.5817 36 28 36C32.4183 36 36 32.4183 36 28C36 22 28 14 28 14C28 14 20 22 20 28Z"
            fill={active ? 'url(#grad-agua)' : inactiveColor}
            stroke={active ? '#60a5fa' : '#334155'}
            strokeWidth="1.5"
          />
        );
      case 'terra':
        return (
          <g>
            <path
              d="M28 14L18 24H38L28 14Z"
              fill={active ? 'url(#grad-terra)' : inactiveColor}
              stroke={active ? '#34d399' : '#334155'}
              strokeWidth="1.5"
            />
            <path
              d="M28 20L21 28H35L28 20Z"
              fill={active ? '#059669' : inactiveColor}
              opacity="0.8"
            />
          </g>
        );
      case 'fogo':
        return (
          <path
            d="M28 13C28 13 34 18 34 24C34 29 30 36 28 36C26 36 20 31 20 25C20 19 25.5 16.5 28 13Z"
            fill={active ? 'url(#grad-fogo)' : inactiveColor}
            stroke={active ? '#fb923c' : '#334155'}
            strokeWidth="1.5"
          />
        );
      case 'pato':
        return (
          <g>
            <circle cx="28" cy="22" r="6" fill={active ? '#facc15' : inactiveColor} />
            <path
              d="M22 24C22 28.4183 25.5817 31 30 31C34.4183 31 35 27 35 24H22Z"
              fill={active ? '#eab308' : inactiveColor}
            />
            <path d="M34 20L38 21L36 23L34 20Z" fill={active ? '#f97316' : '#475569'} />
          </g>
        );
      case 'fantasma':
        return (
          <path
            d="M20 32C20 23.5 23.5 20 28 20C32.5 20 36 23.5 36 32C36 34 34.5 34 33 32C31.5 30 30.5 31 29.5 33C28.5 35 27.5 35 26.5 33C25.5 31 24.5 30 23 32C21.5 34 20 34 20 32Z"
            fill={active ? 'url(#grad-fantasma)' : inactiveColor}
            stroke={active ? '#c084fc' : '#334155'}
            strokeWidth="1.5"
          />
        );
      case 'sonho':
        return (
          <g>
            <path
              d="M23 18C23 24.6274 28.3726 30 35 30C36.4 30 37.7 29.75 38.9 29.3C36.7 32.7 32.9 35 28.5 35C21.6 35 16 29.4 16 22.5C16 17.5 18.9 13.2 23.1 11.2C23 11.8 23 12.4 23 13C23 14.8 23 16.3 23 18Z"
              fill={active ? 'url(#grad-sonho)' : inactiveColor}
              stroke={active ? '#94a3b8' : '#334155'}
              strokeWidth="1.5"
            />
            <circle cx="34" cy="15" r="1.5" fill={active ? '#fef08a' : 'none'} className="animate-pulse" />
          </g>
        );
      case 'demonio':
        return (
          <g>
            <path
              d="M19 16C21 21 21 27 28 27C35 27 35 21 37 16C36 20 33 24 28 24C23 24 20 20 19 16Z"
              fill={active ? '#ef4444' : inactiveColor}
              stroke={active ? '#b91c1c' : '#334155'}
              strokeWidth="1.5"
            />
            <path d="M22 28L28 36L34 28H22Z" fill={active ? '#991b1b' : inactiveColor} />
          </g>
        );
      case 'caveira': // Punk
        return (
          <g>
            <circle cx="28" cy="23" r="7" fill={active ? '#f472b6' : inactiveColor} />
            <rect x="25" y="27" width="6" height="6" rx="1" fill={active ? '#db2777' : inactiveColor} />
            <circle cx="26" cy="22" r="1.5" fill={active ? '#000' : '#475569'} />
            <circle cx="30" cy="22" r="1.5" fill={active ? '#000' : '#475569'} />
            <path d="M24 13L28 18L32 13" stroke={active ? '#f472b6' : '#475569'} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'rei':
        return (
          <path
            d="M17 33L20 19L28 25L36 19L39 33H17Z"
            fill={active ? 'url(#grad-rei)' : inactiveColor}
            stroke={active ? '#ddd6fe' : '#334155'}
            strokeWidth="1.5"
          />
        );
      case 'ponto-zero':
        return (
          <g>
            <circle cx="28" cy="25" r="4" fill={active ? '#f43f5e' : inactiveColor} />
            <circle
              cx="28"
              cy="25"
              r="9"
              fill="none"
              stroke={active ? '#d946ef' : '#334155'}
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <circle
              cx="28"
              cy="25"
              r="13"
              fill="none"
              stroke={active ? '#818cf8' : '#1e293b'}
              strokeWidth="1"
            />
          </g>
        );
      case 'peixoto':
        return (
          <g>
            <path
              d="M18 25C18 19 23 18 28 18C33 18 38 19 38 25C38 31 33 32 28 32C23 32 18 31 18 25Z"
              fill={active ? 'url(#grad-peixoto)' : inactiveColor}
              stroke={active ? '#fb923c' : '#334155'}
              strokeWidth="1.5"
            />
            <path d="M18 25L13 22V28L18 25Z" fill={active ? '#f97316' : inactiveColor} />
          </g>
        );
      case 'atacante':
        return (
          <g>
            <path d="M19 19L37 31" stroke={active ? '#60a5fa' : '#334155'} strokeWidth="3" strokeLinecap="round" />
            <path d="M37 19L19 31" stroke={active ? '#60a5fa' : '#334155'} strokeWidth="3" strokeLinecap="round" />
            <circle cx="28" cy="25" r="4" fill={active ? '#1d4ed8' : inactiveColor} />
          </g>
        );
      case 'aura':
        return (
          <g>
            <circle
              cx="28"
              cy="25"
              r="11"
              fill="none"
              stroke={active ? '#67e8f9' : '#334155'}
              strokeWidth="2"
              className="animate-pulse"
            />
            <path
              d="M28 16L30 22L36 24L30 26L28 32L26 26L20 24L26 22Z"
              fill={active ? '#22d3ee' : inactiveColor}
            />
          </g>
        );
      case 'chefe':
        return (
          <path
            d="M28 13L31.5 20.5L39 21.5L33.5 26.5L35 34L28 30L21 34L22.5 26.5L17 21.5L24.5 20.5Z"
            fill={active ? 'url(#grad-chefe)' : inactiveColor}
            stroke={active ? '#ef4444' : '#334155'}
            strokeWidth="1.5"
          />
        );
      case 'ceifador':
        return (
          <g>
            <path
              d="M20 18C20 18 24 14 34 16C34 16 26 20 24 28"
              stroke={active ? '#a1a1aa' : '#334155'}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M21 34L25 15" stroke={active ? '#71717a' : '#334155'} strokeWidth="1.5" />
          </g>
        );
      case 'amendoim':
        return (
          <g>
            <path
              d="M24 20C24 17 26 15 28 15C30 15 32 17 32 20C32 23 30 24 30 26C30 28 32 29 32 32C32 35 30 37 28 37C26 37 24 35 24 32C24 29 26 28 26 26C26 24 24 23 24 20Z"
              fill={active ? 'url(#grad-peanut)' : inactiveColor}
              stroke={active ? '#fbbf24' : '#334155'}
              strokeWidth="1.5"
            />
            {/* Cute Cap */}
            <path d="M25 17C26 14 30 14 31 17H25Z" fill={active ? '#22c55e' : '#475569'} />
            <circle cx="28" cy="14.5" r="1.5" fill={active ? '#eab308' : '#64748b'} />
          </g>
        );

      // Categories
      case 'cat-raro':
        return (
          <g>
            <polygon points="28,14 31,22 39,22 32,27 35,35 28,30 21,35 24,27 17,22 25,22" fill={active ? 'url(#grad-cat-raro)' : inactiveColor} stroke={active ? '#10b981' : '#334155'} strokeWidth="1.5" />
            <text x="28" y="27" fontSize="8" fontWeight="bold" textAnchor="middle" fill={active ? '#064e3b' : '#64748b'}>R</text>
          </g>
        );
      case 'cat-epico':
        return (
          <g>
            <polygon points="28,12 37,18 34,29 28,36 22,29 19,18" fill={active ? 'url(#grad-cat-epico)' : inactiveColor} stroke={active ? '#8b5cf6' : '#334155'} strokeWidth="1.5" />
            <text x="28" y="27" fontSize="10" fontWeight="bold" textAnchor="middle" fill={active ? '#ffffff' : '#64748b'}>E</text>
          </g>
        );
      case 'cat-lendario':
        return (
          <g>
            <polygon points="28,12 38,20 34,32 22,32 18,20" fill={active ? 'url(#grad-cat-lendario)' : inactiveColor} stroke={active ? '#f59e0b' : '#334155'} strokeWidth="1.5" />
            <text x="28" y="26" fontSize="10" fontWeight="bold" textAnchor="middle" fill={active ? '#78350f' : '#64748b'}>L</text>
          </g>
        );
      case 'cat-mitico':
        return (
          <g>
            <polygon points="28,11 39,18 35,32 28,37 21,32 17,18" fill={active ? 'url(#grad-cat-mitico)' : inactiveColor} stroke={active ? '#ec4899' : '#334155'} strokeWidth="1.5" />
            <text x="28" y="27" fontSize="10" fontWeight="bold" textAnchor="middle" fill={active ? '#ffffff' : '#64748b'}>M</text>
          </g>
        );

      // Variants
      case 'var-base':
        return (
          <g>
            <rect x="18" y="15" width="20" height="20" rx="3" fill={active ? 'url(#grad-var-base)' : inactiveColor} stroke={active ? '#64748b' : '#334155'} strokeWidth="2" />
            <circle cx="28" cy="25" r="4" fill={active ? '#334155' : '#475569'} />
          </g>
        );
      case 'var-dourado':
        return (
          <g>
            <polygon points="28,13 37,21 34,33 22,33 19,21" fill={active ? 'url(#grad-var-dourado)' : inactiveColor} stroke={active ? '#fbbf24' : '#334155'} strokeWidth="1.5" />
            <polygon points="28,17 33,22 31,29 25,29 23,22" fill={active ? '#fffbeb' : 'none'} opacity="0.6" />
          </g>
        );
      case 'var-gummy':
        return (
          <g>
            <path d="M22 17C22 17 28 14 28 20C28 26 34 23 34 29C34 33 29 36 25 34C21 32 20 28 22 25" fill={active ? 'url(#grad-var-gummy)' : inactiveColor} stroke={active ? '#ec4899' : '#334155'} strokeWidth="1.5" />
            <circle cx="28" cy="27" r="2.5" fill={active ? '#fff' : 'none'} opacity="0.4" />
          </g>
        );
      case 'var-galaxy':
        return (
          <g>
            <path d="M28 13C20 13 16 19 16 25C16 31 20 37 28 37C36 37 40 31 40 25C40 19 36 13 28 13Z" fill={active ? 'url(#grad-var-galaxy)' : inactiveColor} stroke={active ? '#a855f7' : '#334155'} strokeWidth="1.5" />
            <circle cx="25" cy="21" r="1" fill="#fff" />
            <circle cx="31" cy="29" r="1.5" fill="#fff" className="animate-ping" />
            <circle cx="33" cy="20" r="0.7" fill="#fff" />
          </g>
        );

      default:
        return <circle cx="28" cy="25" r="10" fill={active ? activeColor : inactiveColor} />;
    }
  };

  return (
    <svg viewBox="0 0 56 50" width="100%" height="100%" className="transition-all duration-300">
      <defs>
        {/* Gradients */}
        <linearGradient id="grad-agua" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="grad-terra" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <linearGradient id="grad-fogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="grad-fantasma" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#581c87" />
        </linearGradient>
        <linearGradient id="grad-sonho" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="grad-rei" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="grad-peixoto" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="grad-chefe" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="grad-peanut" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        <linearGradient id="grad-cat-raro" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="grad-cat-epico" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="grad-cat-lendario" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="grad-cat-mitico" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>

        <linearGradient id="grad-var-base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="grad-var-dourado" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
        <linearGradient id="grad-var-gummy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="grad-var-galaxy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>

      {/* Insignia Base Frame */}
      <path
        d="M28 2L48 12V34L28 48L8 34V12L28 2Z"
        fill={active ? '#090f16' : '#04070a'}
        stroke={active ? activeColor : '#1e293b'}
        strokeWidth={active ? '2.5' : '1.5'}
        className="transition-colors duration-300"
      />

      {/* Secondary Inner Frame */}
      <path
        d="M28 5L45 14V32L28 44L11 32V14L28 5Z"
        fill="none"
        stroke={active ? activeColor : '#0f172a'}
        strokeWidth="1"
        opacity={active ? '0.5' : '0.2'}
      />

      {/* Center symbol */}
      {renderSymbol()}
    </svg>
  );
}

export default function SuperTab({ collectionState }: SuperTabProps) {
  const [activeTab, setActiveTab] = useState<BadgeTabType>('all');

  // --- CALCULATE PROGRESS STATS ---

  // 1. Group/Elemental Set Badges Status (16 Badges)
  const groupBadgesStatus = SPRITE_GROUPS.map((group) => {
    const totalGroupSprites = group.variants.length; // usually 4
    const collectedGroupSprites = group.variants.filter((v) => !!collectionState[v.id]).length;
    const completed = collectedGroupSprites === totalGroupSprites;

    return {
      id: group.id,
      title: `Lorde de ${group.title}`,
      subtitle: `Conjunto ${group.title}`,
      description: `Complete as 4 variantes (${group.title} Base, Dourado, Gummy e Galaxy).`,
      condition: `Família ${group.title} (4/4)`,
      unlocked: completed,
      progressText: `${collectedGroupSprites}/${totalGroupSprites}`,
      accentColor: group.glowColor.includes('cyan')
        ? '#06b6d4'
        : group.glowColor.includes('emerald')
        ? '#10b981'
        : group.glowColor.includes('amber')
        ? '#f59e0b'
        : group.glowColor.includes('yellow')
        ? '#eab308'
        : group.glowColor.includes('purple')
        ? '#a855f7'
        : group.glowColor.includes('pink')
        ? '#ec4899'
        : group.glowColor.includes('red')
        ? '#ef4444'
        : group.glowColor.includes('violet')
        ? '#8b5cf6'
        : group.glowColor.includes('orange')
        ? '#f97316'
        : group.glowColor.includes('fuchsia')
        ? '#d946ef'
        : '#94a3b8',
      type: 'group' as const,
    };
  });

  // Special peanut badge
  const peanutCollected = !!collectionState[SPECIAL_SPRITE.id];
  const peanutBadge = {
    id: 'amendoim',
    title: 'Guardião de Amendoim',
    subtitle: 'Mítico Solo',
    description: 'Encontre o Amendoim Especial (Peanut) com o seu clássico boné.',
    condition: 'Coletar Amendoim',
    unlocked: peanutCollected,
    progressText: peanutCollected ? '1/1' : '0/1',
    accentColor: '#f59e0b',
    type: 'group' as const,
  };

  const allGroupBadges = [...groupBadgesStatus, peanutBadge];

  // 2. Category Badges Status (4 Badges)
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
  }, 0) + (peanutCollected ? 1 : 0);
  const isMiticoComplete = collectedMitico === totalMitico;

  const categoryBadges = [
    {
      id: 'cat-raro',
      title: 'Grão-Mestre Raro',
      subtitle: 'Categoria Raro',
      description: 'Colete todos os 16 sprites da categoria Raro (Água, Terra, Fogo, Peixoto).',
      condition: 'Completar Raros',
      unlocked: isRaroComplete,
      progressText: `${collectedRaro}/${totalRaro}`,
      accentColor: '#10b981',
      type: 'category' as const,
    },
    {
      id: 'cat-epico',
      title: 'Imperador Épico',
      subtitle: 'Categoria Épico',
      description: 'Colete os 24 sprites da categoria Épico (Pato, Fantasma, Demônio, Rei, Atacante, Aura).',
      condition: 'Completar Épicos',
      unlocked: isEpicoComplete,
      progressText: `${collectedEpico}/${totalEpico}`,
      accentColor: '#8b5cf6',
      type: 'category' as const,
    },
    {
      id: 'cat-lendario',
      title: 'Santuário Lendário',
      subtitle: 'Categoria Lendário',
      description: 'Colete os 12 sprites da categoria Lendário (Sonho, Punk, Chefe).',
      condition: 'Completar Lendários',
      unlocked: isLendarioComplete,
      progressText: `${collectedLendario}/${totalLendario}`,
      accentColor: '#f59e0b',
      type: 'category' as const,
    },
    {
      id: 'cat-mitico',
      title: 'Soberano Mítico',
      subtitle: 'Categoria Mítico',
      description: 'Colete todos os 9 sprites da categoria Mítico (Ponto Zero, Ceifador, Amendoim).',
      condition: 'Completar Míticos',
      unlocked: isMiticoComplete,
      progressText: `${collectedMitico}/${totalMitico}`,
      accentColor: '#ec4899',
      type: 'category' as const,
    },
  ];

  // 3. Variant Badges Status (4 Badges)
  // Base variants of all 15 groups
  const countVariantCollected = (variantType: SpriteVariantType) => {
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

  const variantBadges = [
    {
      id: 'var-base',
      title: 'Mapeador da Realidade',
      subtitle: 'Restauração de Variantes',
      description: 'Colete a variante Base de todas as 15 famílias elementais.',
      condition: 'Todos os 15 Bases',
      unlocked: collectedBase === 15,
      progressText: `${collectedBase}/15`,
      accentColor: '#64748b',
      type: 'variant' as const,
    },
    {
      id: 'var-dourado',
      title: 'Toque de Alquimista',
      subtitle: 'Restauração de Variantes',
      description: 'Colete a variante Dourada cintilante de todas as 15 famílias elementais.',
      condition: 'Todos os 15 Dourados',
      unlocked: collectedDourado === 15,
      progressText: `${collectedDourado}/15`,
      accentColor: '#fbbf24',
      type: 'variant' as const,
    },
    {
      id: 'var-gummy',
      title: 'Mestre do Açúcar',
      subtitle: 'Restauração de Variantes',
      description: 'Colete a variante Gummy translúcida de todas as 15 famílias elementais.',
      condition: 'Todos os 15 Gummys',
      unlocked: collectedGummy === 15,
      progressText: `${collectedGummy}/15`,
      accentColor: '#ec4899',
      type: 'variant' as const,
    },
    {
      id: 'var-galaxy',
      title: 'Viajante do Infinito',
      subtitle: 'Restauração de Variantes',
      description: 'Colete a variante Galaxy cósmica de todas as 15 famílias elementais.',
      condition: 'Todos os 15 Galaxy',
      unlocked: collectedGalaxy === 15,
      progressText: `${collectedGalaxy}/15`,
      accentColor: '#a855f7',
      type: 'variant' as const,
    },
  ];

  // Combined badges list
  const allBadges = [...allGroupBadges, ...categoryBadges, ...variantBadges];

  // Filter list based on selected sub-tab
  const filteredBadges = allBadges.filter((badge) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'groups') return badge.type === 'group';
    if (activeTab === 'categories') return badge.type === 'category';
    if (activeTab === 'variants') return badge.type === 'variant';
    return true;
  });

  const totalUnlockedCount = allBadges.filter((b) => b.unlocked).length;
  const progressPercentage = Math.round((totalUnlockedCount / allBadges.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 md:px-8 pb-32">
      {/* Dynamic progression header box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#101924]/85 border border-[#182736] rounded-3xl p-6 md:p-8 shadow-2xl mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-fuchsia-500" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                Templo das Insígnias
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-100 mt-2">
              Progresso do Prestígio Supremo
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-lg">
              Conquiste conjuntos de elementais, domine categorias inteiras ou complete todas as
              variantes para liberar os egrégios Estandartes de Alquimia.
            </p>
          </div>

          <div className="w-full md:w-64 bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl shrink-0 text-center">
            <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
              <span className="text-slate-400 uppercase">Insígnias</span>
              <span className="text-emerald-400 font-bold">
                {totalUnlockedCount} / {allBadges.length}
              </span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-2 block">
              {progressPercentage}% Completado
            </span>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs Tool belt */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-[#090f16]/95 border border-slate-800 p-1 rounded-2xl w-fit mx-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'all'
              ? 'bg-[#182736] text-cyan-400 font-bold border border-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid className="w-4 h-4" />
          Todas ({allBadges.length})
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'groups'
              ? 'bg-[#182736] text-cyan-400 font-bold border border-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Conjuntos ({allGroupBadges.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'categories'
              ? 'bg-[#182736] text-cyan-400 font-bold border border-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          Categorias ({categoryBadges.length})
        </button>
        <button
          onClick={() => setActiveTab('variants')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'variants'
              ? 'bg-[#182736] text-cyan-400 font-bold border border-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Variantes ({variantBadges.length})
        </button>
      </div>

      {/* Grid of Badges */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredBadges.map((badge, idx) => {
            return (
              <motion.div
                layout
                key={badge.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
                className={`
                  bg-[#0d1622]/90 border rounded-3xl p-5 flex flex-col justify-between transition-all duration-500 relative overflow-hidden
                  ${
                    badge.unlocked
                      ? 'border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                      : 'border-[#142334] opacity-50'
                  }
                `}
                style={{
                  boxShadow: badge.unlocked
                    ? `0 10px 30px rgba(0,0,0,0.5), 0 0 25px ${badge.accentColor}15`
                    : 'none',
                }}
              >
                {/* Background active glow */}
                {badge.unlocked && (
                  <div
                    className="absolute -right-12 -top-12 w-28 h-28 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: badge.accentColor }}
                  />
                )}

                <div>
                  <div className="flex gap-4 items-start">
                    {/* Visual Vector Badge Image container */}
                    <div className="w-16 h-16 shrink-0 relative flex items-center justify-center">
                      <InsigniaSVG id={badge.id} active={badge.unlocked} color={badge.accentColor} />

                      {/* Locked icon overlays */}
                      {!badge.unlocked && (
                        <div className="absolute inset-0 bg-slate-950/25 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-slate-600" />
                        </div>
                      )}
                    </div>

                    {/* Texts */}
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                        {badge.subtitle}
                      </span>
                      <h3
                        className={`text-sm font-bold truncate mt-0.5 ${
                          badge.unlocked ? 'text-slate-100 font-display' : 'text-slate-400'
                        }`}
                      >
                        {badge.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer condition details */}
                <div className="mt-5 pt-3.5 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500 uppercase tracking-wider">Progresso</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-md text-[10px] ${
                        badge.unlocked
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-950 text-amber-500/80 border border-slate-900'
                      }`}
                    >
                      {badge.unlocked ? 'DESBLOQUEADO' : badge.condition}
                    </span>
                    <span className="text-slate-400 font-bold">{badge.progressText}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty view check */}
      {filteredBadges.length === 0 && (
        <div className="text-center py-12 text-slate-500 font-mono text-sm">
          Nenhuma insígnia encontrada nesta aba.
        </div>
      )}
    </div>
  );
}
