/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SpriteVariantType = 'base' | 'dourado' | 'gummy' | 'galaxy';

export interface SpriteVariant {
  id: string;
  type: SpriteVariantType;
  name: string;
  image: string;
}

export type SpriteCategoryType = 'raro' | 'epico' | 'lendario' | 'mitico';

export interface SpriteGroup {
  id: string;
  title: string;
  category: SpriteCategoryType;
  code: string;
  color: string; // Tailwind class coloring or hex color
  glowColor: string; // Glow shadow color
  variants: SpriteVariant[];
}

export interface SpecialSprite {
  id: string;
  category: SpriteCategoryType;
  title: string;
  description: string;
  image: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  type: 'all_group' | 'type_count' | 'total' | 'special';
  groupTarget?: string; // If 'all_group', which group id
  variantTarget?: SpriteVariantType; // If 'type_count', which variant
}

export type CollectionState = Record<string, boolean>;
