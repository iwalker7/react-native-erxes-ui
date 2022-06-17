import type * as React from 'react';

export type Font = {
  fontFamily: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};

export type Fonts = {
  regular: Font;
  medium: Font;
  light: Font;
  thin: Font;
};

type Mode = 'adaptive' | 'exact';

export type Theme = {
  dark: boolean;
  mode?: Mode;
  roundness: number;
  themeColors: {
    primary: string;
    primaryDark: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    warn: string;
    success: string;
    text: string;
    textSecondary: string;
    onSurface: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    notification: string;
  };
  fonts: Fonts;
  animation: {
    scale: number;
  };
};

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
  React.ComponentPropsWithoutRef<T>,
  'children'
>;

export type EllipsizeProp = 'head' | 'middle' | 'tail' | 'clip';

declare global {
  namespace ReactNativeErxes {
    interface ThemeFont {
      fontFamily: string;
      fontWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
    }
    interface ThemeFonts {
      regular: ThemeFont;
      medium: ThemeFont;
      light: ThemeFont;
      thin: ThemeFont;
    }
    interface ThemeColors {
      primary: string;
      primaryDark: string;
      background: string;
      surface: string;
      accent: string;
      error: string;
      warn: string;
      success: string;
      text: string;
      textSecondary: string;
      onSurface: string;
      disabled: string;
      placeholder: string;
      backdrop: string;
      notification: string;
    }

    interface ThemeAnimation {
      scale: number;
    }

    interface Theme {
      dark: boolean;
      mode?: Mode;
      roundness: number;
      themeColors: ThemeColors;
      fonts: ThemeFonts;
      animation: ThemeAnimation;
    }
  }
}

export type IconProps = {
  name: string;
  color: string;
  size: number;
  direction: 'rtl' | 'ltr';
  allowFontScaling?: boolean;
};
