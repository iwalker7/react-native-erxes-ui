import color from 'color';
import DefaultTheme from './DefaultTheme';
import { Colors } from '../style/colors';
import type { Theme } from './types';

const DarkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive',
  colors: {
    ...DefaultTheme.colors,
    primary: '#5629B6',
    accent: '#fda50f',
    background: '#121212',
    surface: '#121212',
    error: '#CF6679',
    warn: '#FFC82C',
    success: '#13CE66',
    onSurface: '#FFFFFF',
    text: Colors.white,
    disabled: color('#ffff').alpha(0.38).rgb().string(),
    placeholder: color('#FFFFFF').alpha(0.54).rgb().string(),
    backdrop: color('#000').alpha(0.5).rgb().string(),
    notification: '#ff80ab',
  },
};

export default DarkTheme;
