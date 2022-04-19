import { createTheming } from '@callstack/react-theme-provider';
import DefaultTheme from '../DefaultTheme';

export const { ThemeProvider, withTheme, useTheme } =
  createTheming<ReactNativeErxes.Theme>(DefaultTheme as ReactNativeErxes.Theme);
