import type { MutableRefObject } from 'react';
import type { ScenePalette } from '../../Hero/scene/palette';

/** Normalised pointer position over the card, -1 … 1 on both axes. */
export type PointerRef = MutableRefObject<{ x: number; y: number }>;

export interface PlateStackProps {
  palette: ScenePalette;
  animate: boolean;
  /** True while the card is on screen. Becoming true (re)starts the plate-loading animation. */
  active: boolean;
  /** 0 → 1, eased value that follows the card's hover state. */
  hover: MutableRefObject<number>;
  plates: number;
  halos: number;
}
