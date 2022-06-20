import color from 'color';
import { black, white, redA400 } from './colors';
import configureFonts from './fonts';
import type { Theme } from '../types';

const DefaultTheme: Theme = {
  dark: false,
  roundness: 5,
  colors: {
    background: '#fff',
    text: 'rgba(0, 0, 0, 0.8)',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    onSurface: '#000000',
    surface: white,
    primary: '#5629B6',
    primaryDark: '#2F1F69',
    accent: '#fda50f',
    error: '#EA475D',
    warn: '#FFC82C',
    success: '#13CE66',
    disabled: color(black).alpha(0.26).rgb().string(),
    placeholder: color(black).alpha(0.54).rgb().string(),
    backdrop: color(black).alpha(0.5).rgb().string(),
    notification: redA400,
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
