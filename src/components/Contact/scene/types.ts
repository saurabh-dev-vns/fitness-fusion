import type { MutableRefObject } from 'react';

/** Normalised pointer position over the stage, -1 … 1 on both axes. */
export type PointerRef = MutableRefObject<{ x: number; y: number }>;

export interface GeoPoint {
  lat: number;
  lon: number;
}
