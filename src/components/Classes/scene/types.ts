import type { MutableRefObject } from 'react';
import type { ScenePalette } from '../../Hero/scene/palette';

export type ClassKind = 'hiit' | 'yoga' | 'strength';

/** Normalised pointer position over the card, -1 … 1 on both axes. */
export type PointerRef = MutableRefObject<{ x: number; y: number }>;

/** Props every 3D class model receives. */
export interface ModelProps {
  palette: ScenePalette;
  animate: boolean;
  /** 0 → 1, eased value that follows the card's hover state. */
  hover: MutableRefObject<number>;
}
