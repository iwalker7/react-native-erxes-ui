import color from 'color';
import type { ColorValue } from 'react-native';

export function getContrastingColor(
  input: ColorValue,
  light: string,
  dark: string
): string {
  if (typeof input === 'string') {
    return color(input).isLight() ? dark : light;
  }

  return light;
}

export function rgba(hex: any, opacity: number) {
  return color(hex).alpha(opacity).toString();
}

// Sass's darken function
export function darken(hex: any, amount: number) {
  return color(hex)
    .darken(amount / 100)
    .toString();
}

// Sass's lighten function
export function lighten(hex: any, amount: number) {
  return color(hex)
    .lighten(amount / 100)
    .toString();
}
