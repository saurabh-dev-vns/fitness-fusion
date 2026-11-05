import type { MutableRefObject } from 'react';
import type { ScenePalette } from '../../Hero/scene/palette';

/** Props every 3D feature icon receives. */
export interface IconProps {
  palette: ScenePalette;
  animate: boolean;
  /** 0 → 1, eased value that follows the card's hover state. */
  hover: MutableRefObject<number>;
}
