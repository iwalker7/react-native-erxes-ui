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

export const primaryDark1 = (primaryColor: string) => darken(primaryColor, 12);
export const primaryDark2 = (primaryColor: string) => darken(primaryColor, 28);
export const primaryDark3 = (primaryColor: string) => darken(primaryColor, 40);

export const primaryLight1 = (primaryColor: string) => rgba(primaryColor, 0.12);
export const primaryLight2 = (primaryColor: string) => rgba(primaryColor, 0.28);
export const primaryLight3 = (primaryColor: string) => rgba(primaryColor, 0.4);

export const secondaryDark1 = (secondaryColor: string) =>
  darken(secondaryColor, 12);
export const secondaryDark2 = (secondaryColor: string) =>
  darken(secondaryColor, 28);
export const secondaryDark3 = (secondaryColor: string) =>
  darken(secondaryColor, 40);

export const secondaryLight1 = (secondaryColor: string) =>
  lighten(secondaryColor, 12);
export const secondaryLight2 = (secondaryColor: string) =>
  lighten(secondaryColor, 28);
export const secondaryLight3 = (secondaryColor: string) =>
  lighten(secondaryColor, 40);
