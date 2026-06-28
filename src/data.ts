/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Import the beautifully styled custom 3D element bases
import spriteAgua from './assets/images/sprite_agua_v2_1782594002600.jpg';
import spritePeanut from './assets/images/sprite_peanut_revised_1781908016453.jpg';
import spriteTerra from './assets/images/sprite_terra_v2_1782594013268.jpg';
import spriteFogo from './assets/images/sprite_fogo_v2_1782594023085.jpg';
import spritePato from './assets/images/sprite_pato_v2_1782594034425.jpg';
import spriteFantasma from './assets/images/sprite_fantasma_v2_1782594044577.jpg';
import spriteSonho from './assets/images/sprite_sonho_v2_1782594057761.jpg';
import spriteDemonio from './assets/images/sprite_demonio_v2_1782594067950.jpg';
import spriteRei from './assets/images/sprite_rei_v2_1782594074349.jpg';
import spritePunk from './assets/images/sprite_punk_v2_1782594083314.jpg';
import spriteZero from './assets/images/sprite_pontozero_v2_1782594091577.jpg';
import spriteAura from './assets/images/sprite_aura_new_1782592937128.jpg';
import spriteChefe from './assets/images/sprite_chefe_new_1782592960550.jpg';
import spritePeixoto from './assets/images/sprite_peixoto_new_1782592982475.jpg';
import spriteAtacante from './assets/images/sprite_atacante_new_1782592948183.jpg';
import spriteCeifador from './assets/images/sprite_ceifador_new_1782592970923.jpg';

import { SpriteGroup, SpecialSprite, Mission, SpriteVariantType } from './types';

export const SPECIAL_SPRITE: SpecialSprite = {
  id: 'amendoim-especial',
  category: 'mitico',
  title: 'Amendoim (Peanut)',
  description: 'O Amendoim é uma variante única com seu pequeno boné amarelo e verde. Complete sua coleção garantindo este sprite raro.',
  image: spritePeanut,
};

export const SPRITE_GROUPS: SpriteGroup[] = [
  {
    id: 'agua',
    title: 'Água',
    category: 'raro',
    code: '#6143',
    color: 'text-cyan-400 border-cyan-500/20 bg-cyan-950/10',
    glowColor: 'rgba(34, 211, 238, 0.3)', // cyan-400
    variants: [
      { id: 'agua-base', type: 'base', name: 'Base', image: spriteAgua },
      { id: 'agua-dourado', type: 'dourado', name: 'Dourado', image: spriteAgua },
      { id: 'agua-gummy', type: 'gummy', name: 'Gummy', image: spriteAgua },
      { id: 'agua-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteAgua },
    ],
  },
  {
    id: 'terra',
    title: 'Terra',
    category: 'raro',
    code: '#3660',
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/10',
    glowColor: 'rgba(52, 211, 153, 0.3)', // emerald-400
    variants: [
      { id: 'terra-base', type: 'base', name: 'Base', image: spriteTerra },
      { id: 'terra-dourado', type: 'dourado', name: 'Dourado', image: spriteTerra },
      { id: 'terra-gummy', type: 'gummy', name: 'Gummy', image: spriteTerra },
      { id: 'terra-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteTerra },
    ],
  },
  {
    id: 'fogo',
    title: 'Fogo',
    category: 'raro',
    code: '#3637',
    color: 'text-amber-500 border-amber-500/20 bg-amber-950/10',
    glowColor: 'rgba(245, 158, 11, 0.3)', // amber-500
    variants: [
      { id: 'fogo-base', type: 'base', name: 'Base', image: spriteFogo },
      { id: 'fogo-dourado', type: 'dourado', name: 'Dourado', image: spriteFogo },
      { id: 'fogo-gummy', type: 'gummy', name: 'Gummy', image: spriteFogo },
      { id: 'fogo-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteFogo },
    ],
  },
  {
    id: 'pato',
    title: 'Pato',
    category: 'epico',
    code: '#1967',
    color: 'text-yellow-400 border-yellow-500/20 bg-yellow-950/10',
    glowColor: 'rgba(250, 204, 21, 0.3)', // yellow-400
    variants: [
      { id: 'pato-base', type: 'base', name: 'Base', image: spritePato },
      { id: 'pato-dourado', type: 'dourado', name: 'Dourado', image: spritePato },
      { id: 'pato-gummy', type: 'gummy', name: 'Gummy', image: spritePato },
      { id: 'pato-galaxy', type: 'galaxy', name: 'Galaxy', image: spritePato },
    ],
  },
  {
    id: 'fantasma',
    title: 'Fantasma',
    category: 'epico',
    code: '#7686',
    color: 'text-purple-400 border-purple-500/20 bg-purple-950/10',
    glowColor: 'rgba(192, 132, 252, 0.3)', // purple-400
    variants: [
      { id: 'fantasma-base', type: 'base', name: 'Base', image: spriteFantasma },
      { id: 'fantasma-dourado', type: 'dourado', name: 'Dourado', image: spriteFantasma },
      { id: 'fantasma-gummy', type: 'gummy', name: 'Gummy', image: spriteFantasma },
      { id: 'fantasma-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteFantasma },
    ],
  },
  {
    id: 'sonho',
    title: 'Sonho',
    category: 'lendario',
    code: '#3571',
    color: 'text-slate-300 border-slate-500/20 bg-slate-950/10',
    glowColor: 'rgba(203, 213, 225, 0.3)', // slate-300
    variants: [
      { id: 'sonho-base', type: 'base', name: 'Base', image: spriteSonho },
      { id: 'sonho-dourado', type: 'dourado', name: 'Dourado', image: spriteSonho },
      { id: 'sonho-gummy', type: 'gummy', name: 'Gummy', image: spriteSonho },
      { id: 'sonho-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteSonho },
    ],
  },
  {
    id: 'demonio',
    title: 'Demônio',
    category: 'epico',
    code: '#6284',
    color: 'text-red-500 border-red-500/20 bg-red-950/10',
    glowColor: 'rgba(239, 68, 68, 0.3)', // red-500
    variants: [
      { id: 'demonio-base', type: 'base', name: 'Base', image: spriteDemonio },
      { id: 'demonio-dourado', type: 'dourado', name: 'Dourado', image: spriteDemonio },
      { id: 'demonio-gummy', type: 'gummy', name: 'Gummy', image: spriteDemonio },
      { id: 'demonio-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteDemonio },
    ],
  },
  {
    id: 'caveira',
    title: 'Punk',
    category: 'lendario',
    code: '#3820',
    color: 'text-pink-400 border-pink-500/20 bg-pink-950/10',
    glowColor: 'rgba(244, 114, 182, 0.3)', // pink-400
    variants: [
      { id: 'caveira-base', type: 'base', name: 'Base', image: spritePunk },
      { id: 'caveira-dourado', type: 'dourado', name: 'Dourado', image: spritePunk },
      { id: 'caveira-gummy', type: 'gummy', name: 'Gummy', image: spritePunk },
      { id: 'caveira-galaxy', type: 'galaxy', name: 'Galaxy', image: spritePunk },
    ],
  },
  {
    id: 'rei',
    title: 'Rei',
    category: 'epico',
    code: '#6289',
    color: 'text-violet-400 border-violet-500/20 bg-violet-950/10',
    glowColor: 'rgba(167, 139, 250, 0.3)', // violet-400
    variants: [
      { id: 'rei-base', type: 'base', name: 'Base', image: spriteRei },
      { id: 'rei-dourado', type: 'dourado', name: 'Dourado', image: spriteRei },
      { id: 'rei-gummy', type: 'gummy', name: 'Gummy', image: spriteRei },
      { id: 'rei-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteRei },
    ],
  },
  {
    id: 'ponto-zero',
    title: 'Ponto Zero',
    category: 'mitico',
    code: '#5719',
    color: 'text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-950/10',
    glowColor: 'rgba(217, 70, 239, 0.3)', // fuchsia-400
    variants: [
      { id: 'ponto-zero-base', type: 'base', name: 'Base', image: spriteZero },
      { id: 'ponto-zero-dourado', type: 'dourado', name: 'Dourado', image: spriteZero },
      { id: 'ponto-zero-gummy', type: 'gummy', name: 'Gummy', image: spriteZero },
      { id: 'ponto-zero-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteZero },
    ],
  },
  {
    id: 'peixoto',
    title: 'Peixoto',
    category: 'raro',
    code: '#3477',
    color: 'text-orange-400 border-orange-500/20 bg-orange-950/10',
    glowColor: 'rgba(251, 146, 60, 0.3)', // orange-400
    variants: [
      { id: 'peixoto-base', type: 'base', name: 'Base', image: spritePeixoto },
      { id: 'peixoto-dourado', type: 'dourado', name: 'Dourado', image: spritePeixoto },
      { id: 'peixoto-gummy', type: 'gummy', name: 'Gummy', image: spritePeixoto },
      { id: 'peixoto-galaxy', type: 'galaxy', name: 'Galaxy', image: spritePeixoto },
    ],
  },
  {
    id: 'atacante',
    title: 'Atacante',
    category: 'epico',
    code: '#7712',
    color: 'text-blue-400 border-blue-500/20 bg-blue-950/10',
    glowColor: 'rgba(96, 165, 250, 0.3)', // blue-400
    variants: [
      { id: 'atacante-base', type: 'base', name: 'Base', image: spriteAtacante },
      { id: 'atacante-dourado', type: 'dourado', name: 'Dourado', image: spriteAtacante },
      { id: 'atacante-gummy', type: 'gummy', name: 'Gummy', image: spriteAtacante },
      { id: 'atacante-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteAtacante },
    ],
  },
  {
    id: 'aura',
    title: 'Aura',
    category: 'epico',
    code: '#4499',
    color: 'text-cyan-300 border-cyan-400/20 bg-cyan-950/10',
    glowColor: 'rgba(103, 232, 249, 0.3)', // cyan-300
    variants: [
      { id: 'aura-base', type: 'base', name: 'Base', image: spriteAura },
      { id: 'aura-dourado', type: 'dourado', name: 'Dourado', image: spriteAura },
      { id: 'aura-gummy', type: 'gummy', name: 'Gummy', image: spriteAura },
      { id: 'aura-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteAura },
    ],
  },
  {
    id: 'chefe',
    title: 'Chefe',
    category: 'lendario',
    code: '#9001',
    color: 'text-red-400 border-red-500/20 bg-red-950/10',
    glowColor: 'rgba(248, 113, 113, 0.3)', // red-400
    variants: [
      { id: 'chefe-base', type: 'base', name: 'Base', image: spriteChefe },
      { id: 'chefe-dourado', type: 'dourado', name: 'Dourado', image: spriteChefe },
      { id: 'chefe-gummy', type: 'gummy', name: 'Gummy', image: spriteChefe },
      { id: 'chefe-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteChefe },
    ],
  },
  {
    id: 'ceifador',
    title: 'Ceifador',
    category: 'mitico',
    code: '#2285',
    color: 'text-zinc-400 border-zinc-500/20 bg-zinc-950/10',
    glowColor: 'rgba(161, 161, 170, 0.3)', // zinc-400
    variants: [
      { id: 'ceifador-base', type: 'base', name: 'Base', image: spriteCeifador },
      { id: 'ceifador-dourado', type: 'dourado', name: 'Dourado', image: spriteCeifador },
      { id: 'ceifador-gummy', type: 'gummy', name: 'Gummy', image: spriteCeifador },
      { id: 'ceifador-galaxy', type: 'galaxy', name: 'Galaxy', image: spriteCeifador },
    ],
  },
];

export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Elemento da Natureza',
    description: 'Colete todas as 4 variantes de Água ou Terra.',
    targetCount: 4,
    type: 'all_group',
    groupTarget: 'agua',
  },
  {
    id: 'm2',
    title: 'Esquadrão Dourado',
    description: 'Descubra 5 variantes Dourado do seu inventário.',
    targetCount: 5,
    type: 'type_count',
    variantTarget: 'dourado',
  },
  {
    id: 'm3',
    title: 'Mestre da Galáxia',
    description: 'Encontre 5 variantes celestiais Galaxy das fendas temporais.',
    targetCount: 5,
    type: 'type_count',
    variantTarget: 'galaxy',
  },
  {
    id: 'm4',
    title: 'Invasão Infernal',
    description: 'Complete as 4 variantes de Demônio e Fogo.',
    targetCount: 8,
    type: 'total', // Custom handling for demônio + fogo
  },
  {
    id: 'm5',
    title: 'Coroação Real',
    description: 'Colete o Rei Dourado e o rústico Amendoim Especial.',
    targetCount: 2,
    type: 'special',
  },
  {
    id: 'm6',
    title: 'Coleção Completa',
    description: 'Adquira todos os 61 exemplares do Rastreador de Sprites!',
    targetCount: 61,
    type: 'total',
  },
];

/**
 * Returns a perfectly valid, standard CSS filter string based on variant type and collection status.
 * Ensures that initially ALL uncollected elementals are uniformly heavily dimmed (apagados)
 * with a dark grayscale/contrast-lowering style, and they beautifully "light up" (acendem)
 * on collection into their vibrant element colors and variant styles.
 */
export function getSpriteStyleFilter(variantType: SpriteVariantType, isCollected: boolean): string {
  if (!isCollected) {
    // Heavily dimmed (apagado/silenciado/cinza) uncollected look. This affects 100% of spirits.
    return 'brightness(0.18) grayscale(0.85) contrast(0.8) saturate(0.25) blur(0.3px)';
  }

  // Active (collected) states:
  switch (variantType) {
    case 'dourado':
      // Vibrant gold metal
      return 'brightness(1.1) sepia(0.8) saturate(4) hue-rotate(5deg) contrast(1.15)';
    case 'gummy':
      // Prepare image base for the gorgeous pink-green gradient blend overlay
      return 'grayscale(1) brightness(1.25) contrast(1.25)';
    case 'galaxy':
      // Prepare image base for the mixed purple-pink cosmic overlay
      return 'grayscale(1) brightness(1.15) contrast(1.3)';
    case 'base':
    default:
      // Perfectly natural colors
      return 'brightness(1) saturate(1) contrast(1)';
  }
}
