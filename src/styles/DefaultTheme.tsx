import color from 'color';
import { black, redA400 } from './colors';
import configureFonts from './fonts';
import type { Theme } from '../types';
import { rgba } from 'src/utils/colorUtils';

const DefaultTheme: Theme = {
  dark: false,
  roundness: 5,
  colors: {
    primary: '#5629B6',
    primaryDark: '#2F1F69',
    secondary: '#fda50f',

    surface: '#ffffff',
    surfaceHighlight: '#F0F0F0',
    surfaceLight: '#E5E8EC',

    textPrimary: '#252437',
    textSecondary: '#616E7C',

    onSurfaceHigh: rgba(black, 0.8),
    onSurfaceMedium: rgba(black, 0.5),
    onSurfaceLow: rgba(black, 0.3),
    onSurfaceLowest: rgba(black, 0.15),

    backdrop: color(black).alpha(0.45).rgb().string(),
    backdropHigh: color(black).alpha(0.7).rgb().string(),
    backdropLow: color(black).alpha(0.3).rgb().string(),

    error: '#EA475D',
    warn: '#FFC82C',
    success: '#13CE66',

    borderPrimary: rgba('#000000', 0.08),
    borderSecondary: rgba('#000', 0.16),

    coreGray: '#888',
    coreLightGray: '#AAAEB3',
    coreDarkGray: '#373737',
    coreYellow: '#FFCB00',
    coreBlue: '#3B85F4',
    coreGreen: '#3CCC38',
    coreRed: '#EA475D',
    coreTeal: '#63D2D6',

    link: '#1785FC',
    notification: redA400,
    disabled: color(black).alpha(0.26).rgb().string(),
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
