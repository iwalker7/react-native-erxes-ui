import color from 'color';
import DefaultTheme from './DefaultTheme';
import { black, white, grey50 } from './colors';
import type { Theme } from '../types';
import configureFonts from './fonts';

const DarkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive',

  themeColors: {
    ...DefaultTheme.themeColors,
    background: '#252437',
    onSurface: '#FFFFFF',
    text: white,
    textSecondary: grey50,
    surface: white,
    primary: '#5629B6',
    primaryDark: '#2F1F69',
    accent: '#fda50f',
    error: '#EA475D',
    warn: '#FFC82C',
    success: '#13CE66',
    disabled: color(white).alpha(0.38).rgb().string(),
    placeholder: color(white).alpha(0.54).rgb().string(),
    backdrop: color(black).alpha(0.5).rgb().string(),
  },

  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DarkTheme;
