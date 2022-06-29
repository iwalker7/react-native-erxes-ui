import color from 'color';
import DefaultTheme from './DefaultTheme';
import { redA400, white } from './colors';
import type { Theme } from '../types';
import configureFonts from './fonts';
import { rgba } from 'src/utils/colorUtils';

const DarkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive',

  colors: {
    ...DefaultTheme.colors,
    primary: '#c7a4ff',
    primaryDark: '#65499c',
    secondary: '#fda50f',

    surface: '#1C2833',
    surfaceHighlight: '#566573',
    surfaceLight: '#566573',

    textPrimary: '#fff',
    textSecondary: '#F0F0F0',

    onSurfaceHigh: rgba(white, 0.8),
    onSurfaceMedium: rgba(white, 0.5),
    onSurfaceLow: rgba(white, 0.3),
    onSurfaceLowest: rgba(white, 0.15),

    backdrop: color(white).alpha(0.45).rgb().string(),
    backdropHigh: color(white).alpha(0.7).rgb().string(),
    backdropLow: color(white).alpha(0.3).rgb().string(),

    error: '#EA475D',
    warn: '#FFC82C',
    success: '#13CE66',

    borderSecondary: rgba('#fff', 0.16),
    borderPrimary: rgba('#fff', 0.08),

    coreGray: '#8E8E93',
    coreLightGray: '#AAAEB3',
    coreYellow: '#FFCB00',
    coreDarkGray: '#373737',
    coreBlue: '#3B85F4',
    coreGreen: '#3CCC38',
    coreRed: '#EA475D',
    coreTeal: '#63D2D6',

    link: '#42a5f5',
    notification: redA400,
    disabled: color(white).alpha(0.38).rgb().string(),
  },

  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DarkTheme;
