import * as React from 'react';
import type { StyleProp } from 'react-native';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { overlay, shadow, withTheme } from '../../theme';

export type TSurface = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  theme: ReactNativeErxes.Theme;
};

const Surface = ({ style, theme, ...rest }: TSurface) => {
  const { elevation = 4 } = (StyleSheet.flatten(style) || {}) as ViewStyle;
  const { dark: isDarkTheme, mode, colors } = theme;
  return (
    <Animated.View
      {...rest}
      style={[
        {
          backgroundColor:
            isDarkTheme && mode === 'adaptive'
              ? overlay(elevation, colors.surface)
              : colors.surface,
        },
        elevation ? shadow(elevation) : null,
        style,
      ]}
    />
  );
};

export default withTheme(Surface);
