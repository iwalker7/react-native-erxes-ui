import color from 'color';
import { black, white, pinkA400 } from './colors';
import configureFonts from './fonts';
import type { Theme } from '../types';

const DefaultTheme: Theme = {
  dark: false,
  roundness: 5,

  colors: {
    primary: '#141B4D',
    accent: '#7A252A',
    background: '#f6f6f6',
    surface: white,
    error: '#FF4949',
    warn: '#FFC82C',
    success: '#13CE66',
    text: black,
    onSurface: '#000000',
    disabled: color(black).alpha(0.26).rgb().string(),
    placeholder: color(black).alpha(0.54).rgb().string(),
    backdrop: color(black).alpha(0.5).rgb().string(),
    notification: pinkA400,
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
