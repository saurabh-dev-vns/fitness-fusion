import { useTheme } from '../../../theme/ThemeProvider';

/** Greyscale colours + light levels for the 3D scene, per theme. */
export interface ScenePalette {
  plate: string; // weight plates, dumbbell heads, kettlebell
  rim: string; // thin highlight rings on the plates
  steel: string; // bars, sleeves, handles
  dust: string; // chalk particles
  orbit: string; // decorative ring
  keyLight: number;
  fillLight: number;
  ambient: number;
}

const LIGHT: ScenePalette = {
  plate: '#161616',
  rim: '#8c8c8c',
  steel: '#7a7a7a',
  dust: '#000000',
  orbit: '#000000',
  keyLight: 2.4,
  fillLight: 14,
  ambient: 0.7,
};

const DARK: ScenePalette = {
  plate: '#e8e8e8',
  rim: '#555555',
  steel: '#a8a8a8',
  dust: '#ffffff',
  orbit: '#ffffff',
  keyLight: 2.6,
  fillLight: 18,
  ambient: 0.55,
};

/**
 * The R3F <Canvas> is a separate React root, so React context (our theme)
 * doesn't cross into it. Read the theme out here and pass the palette in as props.
 */
export function useScenePalette(): ScenePalette {
  const { theme } = useTheme();
  return theme === 'dark' ? DARK : LIGHT;
}
