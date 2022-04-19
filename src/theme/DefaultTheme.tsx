import color from 'color';
import configureFonts from './fonts';
import type { Theme } from './types';

const DefaultTheme: Theme = {
  dark: false,
  roundness: 5,
  colors: {
    primary: '#5629B6',
    accent: '#fda50f',
    background: '#f6f6f6',
    surface: '#ffff',
    error: '#FF4949',
    warn: '#FFC82C',
    success: '#13CE66',
    text: '#000000',
    onSurface: '#000000',
    disabled: color('#000000').alpha(0.26).rgb().string(),
    placeholder: color('#000000').alpha(0.54).rgb().string(),
    backdrop: color('#000000').alpha(0.5).rgb().string(),
    notification: '#f50057',
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
