import color from 'color';
import DefaultTheme from './DefaultTheme';
import { redA400, white } from './colors';
import type { Theme } from '../types';
import configureFonts from './fonts';
import { rgba } from '../../src/utils/colorUtils';

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

    textPrimary: '#ffffff',
    textSecondary: '#F0F0F0',

    onSurfaceHigh: rgba(white, 0.8),
    onSurfaceMedium: rgba(white, 0.5),
    onSurfaceLow: rgba(white, 0.3),
    onSurfaceLowest: rgba(white, 0.15),

    backdrop: color(white).alpha(0.3).rgb().string(),
    backdropHigh: color(white).alpha(0.6).rgb().string(),
    backdropLow: color(white).alpha(0.15).rgb().string(),

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
    elevation: {
      level0: 'transparent',
      // Note: Color values with transparency cause RN to transfer shadows to children nodes
      // instead of View component in Surface. Providing solid background fixes the issue.
      // Opaque color values generated with `palette.primary80` used as background
      level1: 'rgb(37, 35, 42)', // palette.primary80, alpha 0.05
      level2: 'rgb(44, 40, 49)', // palette.primary80, alpha 0.08
      level3: 'rgb(49, 44, 56)', // palette.primary80, alpha 0.11
      level4: 'rgb(51, 46, 58)', // palette.primary80, alpha 0.12
      level5: 'rgb(52, 49, 63)', // palette.primary80, alpha 0.14
    },
  },

  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DarkTheme;
