/* eslint-disable no-shadow */
import * as React from 'react';
import { Platform, StyleProp } from 'react-native';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../core/theming';
import { isAnimatedValue } from '../../styles/overlay';
import shadow from '../../styles/shadow';
import type { Elevations } from '../../types';

export type TSurface = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value;
  theme?: ReactNativeErxes.Theme;
};

const Surface = ({
  elevation = 0,
  children,
  theme: overridenTheme,
  style,
  ...props
}: TSurface) => {
  const theme = useTheme(overridenTheme);
  const { colors } = theme;

  const inputRange = [0, 1, 2, 3, 4, 5];
  const backgroundColor = (() => {
    if (isAnimatedValue(elevation)) {
      return elevation.interpolate({
        inputRange,
        outputRange: inputRange.map((elevation) => {
          return colors.elevation?.[`level${elevation as Elevations}`];
        }),
      });
    }

    return colors.surface;
  })();

  const sharedStyle = [{ backgroundColor }, style];
  if (Platform.OS === 'web') {
    return (
      <Animated.View
        {...props}
        style={[
          { backgroundColor },
          elevation ? shadow(elevation) : null,
          style,
        ]}
      >
        {children}
      </Animated.View>
    );
  }

  if (Platform.OS === 'android') {
    const elevationLevel = [0, 3, 6, 9, 12, 15];

    const getElevationAndroid = () => {
      if (isAnimatedValue(elevation)) {
        return elevation.interpolate({
          inputRange,
          outputRange: elevationLevel,
        });
      }

      return elevationLevel[elevation];
    };

    const { margin, padding, transform, borderRadius } = (StyleSheet.flatten(
      style
    ) || {}) as ViewStyle;

    const outerLayerStyles = { margin, padding, transform, borderRadius };

    return (
      <Animated.View
        style={[
          {
            backgroundColor,
            transform,
          },
          outerLayerStyles,
          sharedStyle,
          {
            elevation: getElevationAndroid(),
          },
        ]}
      >
        {children}
      </Animated.View>
    );
  }

  const iOSShadowOutputRanges = [
    {
      shadowOpacity: 0.15,
      height: [0, 1, 2, 4, 6, 8],
      shadowRadius: [0, 3, 6, 8, 10, 12],
    },
    {
      shadowOpacity: 0.3,
      height: [0, 1, 1, 1, 2, 4],
      shadowRadius: [0, 1, 2, 3, 3, 4],
    },
  ];

  const shadowColor = colors.backdrop;

  if (isAnimatedValue(elevation)) {
    const inputRange = [0, 1, 2, 3, 4, 5];

    const getStyleForAnimatedShadowLayer = (layer: 0 | 1) => {
      return {
        shadowColor,
        shadowOpacity: elevation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, iOSShadowOutputRanges[layer].shadowOpacity],
          extrapolate: 'clamp',
        }),
        shadowOffset: {
          width: 0,
          height: elevation.interpolate({
            inputRange,
            outputRange: iOSShadowOutputRanges[layer].height,
          }),
        },
        shadowRadius: elevation.interpolate({
          inputRange,
          outputRange: iOSShadowOutputRanges[layer].shadowRadius,
        }),
      };
    };

    return (
      <Animated.View style={getStyleForAnimatedShadowLayer(0)}>
        <Animated.View style={getStyleForAnimatedShadowLayer(1)}>
          <Animated.View {...props} style={sharedStyle}>
            {children}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }

  const getStyleForShadowLayer = (layer: 0 | 1) => {
    return {
      shadowColor,
      shadowOpacity: elevation ? iOSShadowOutputRanges[layer].shadowOpacity : 0,
      shadowOffset: {
        width: 0,
        height: iOSShadowOutputRanges[layer].height[elevation],
      },
      shadowRadius: iOSShadowOutputRanges[layer].shadowRadius[elevation],
    };
  };

  return (
    <Animated.View style={getStyleForShadowLayer(0)}>
      <Animated.View style={getStyleForShadowLayer(1)}>
        <Animated.View {...props} style={sharedStyle}>
          {children}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default Surface;
