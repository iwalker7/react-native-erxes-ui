import color from 'color';
import {
  Animated,
  I18nManager,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import type { Theme } from '../../types';
import { white, black } from '../../styles/colors';
import { getContrastingColor } from '../../utils/colorUtils';

type GetCombinedStylesProps = {
  isAnimatedFromRight: boolean;
  isIconStatic: boolean;
  distance: number;
  animFAB: Animated.Value;
};

type CombinedStyles = {
  innerWrapper: Animated.WithAnimatedValue<ViewStyle>;
  iconWrapper: Animated.WithAnimatedValue<ViewStyle>;
  absoluteFill: Animated.WithAnimatedValue<ViewStyle>;
};

type Variant = 'primary' | 'secondary' | 'tertiary' | 'surface';

type BaseProps = {
  isVariant: (variant: Variant) => boolean;
  theme: Theme;
  disabled?: boolean;
};

export const getCombinedStyles = ({
  isAnimatedFromRight,
  isIconStatic,
  distance,
  animFAB,
}: GetCombinedStylesProps): CombinedStyles => {
  const { isRTL } = I18nManager;

  const defaultPositionStyles = { left: -distance, right: undefined };

  const combinedStyles: CombinedStyles = {
    innerWrapper: {
      ...defaultPositionStyles,
    },
    iconWrapper: {
      ...defaultPositionStyles,
    },
    absoluteFill: {},
  };

  const animatedFromRight = isAnimatedFromRight && !isRTL;
  const animatedFromRightRTL = isAnimatedFromRight && isRTL;
  const animatedFromLeft = !isAnimatedFromRight && !isRTL;
  const animatedFromLeftRTL = !isAnimatedFromRight && isRTL;

  if (animatedFromRight) {
    combinedStyles.innerWrapper.transform = [
      {
        translateX: animFAB.interpolate({
          inputRange: [distance, 0],
          outputRange: [distance, 0],
        }),
      },
    ];
    combinedStyles.iconWrapper.transform = [
      {
        translateX: isIconStatic ? 0 : animFAB,
      },
    ];
    combinedStyles.absoluteFill.transform = [
      {
        translateX: animFAB.interpolate({
          inputRange: [distance, 0],
          outputRange: [Math.abs(distance) / 2, Math.abs(distance)],
        }),
      },
    ];
  } else if (animatedFromRightRTL) {
    combinedStyles.iconWrapper.transform = [
      {
        translateX: isIconStatic
          ? 0
          : animFAB.interpolate({
              inputRange: [distance, 0],
              outputRange: [-distance, 0],
            }),
      },
    ];
    combinedStyles.innerWrapper.transform = [
      {
        translateX: animFAB.interpolate({
          inputRange: [distance, 0],
          outputRange: [-distance, 0],
        }),
      },
    ];
    combinedStyles.absoluteFill.transform = [
      {
        translateX: animFAB.interpolate({
          inputRange: [distance, 0],
          outputRange: [0, distance],
        }),
      },
    ];
  } else if (animatedFromLeft) {
    combinedStyles.iconWrapper.transform = [
      {
        translateX: isIconStatic
          ? distance
          : animFAB.interpolate({
              inputRange: [0, distance],
              outputRange: [distance, distance * 2],
            }),
      },
    ];
    combinedStyles.innerWrapper.transform = [
      {
        translateX: animFAB,
      },
    ];
    combinedStyles.absoluteFill.transform = [
      {
        translateX: animFAB.interpolate({
          inputRange: [0, distance],
          outputRange: [0, Math.abs(distance) / 2],
        }),
      },
    ];
  } else if (animatedFromLeftRTL) {
    combinedStyles.iconWrapper.transform = [
      {
        translateX: isIconStatic
          ? animFAB.interpolate({
              inputRange: [0, distance],
              outputRange: [-distance, -distance * 2],
            })
          : -distance,
      },
    ];
    combinedStyles.innerWrapper.transform = [
      {
        translateX: animFAB.interpolate({
          inputRange: [0, distance],
          outputRange: [0, -distance],
        }),
      },
    ];
    combinedStyles.absoluteFill.transform = [
      {
        translateX: animFAB.interpolate({
          inputRange: [0, distance],
          outputRange: [0, -distance],
        }),
      },
    ];
  }

  return combinedStyles;
};

const getBackgroundColor = ({
  theme,
  isVariant,
  disabled,
  style,
}: BaseProps & { style?: StyleProp<ViewStyle> }) => {
  const { backgroundColor } = StyleSheet.flatten(style) || {};
  if (backgroundColor && !disabled) {
    return backgroundColor;
  }

  if (isVariant('primary')) {
    return theme.colors.primary;
  }

  if (isVariant('secondary')) {
    return theme.colors.secondary;
  }

  if (isVariant('tertiary')) {
    return theme.colors.coreTeal;
  }

  if (isVariant('surface')) {
    return theme.colors.elevation.level3;
  }

  if (disabled) {
    if (theme.dark) {
      return color(white).alpha(0.12).rgb().string();
    }
    return color(black).alpha(0.12).rgb().string();
  }

  //@ts-ignore
  return theme.colors.accent;
};

const getForegroundColor = ({
  theme,
  disabled,
  customColor,
}: BaseProps & { backgroundColor: string; customColor?: string }) => {
  if (typeof customColor !== 'undefined' && !disabled) {
    return customColor;
  }

  if (disabled) {
    return theme.colors.disabled;
  }

  if (disabled) {
    if (theme.dark) {
      return color(white).alpha(0.32).rgb().string();
    }
    return color(black).alpha(0.32).rgb().string();
  }

  return customColor ? customColor : color(white).alpha(0.9).rgb().string();
};

export const getFABColors = ({
  theme,
  variant,
  disabled,
  customColor,
  style,
}: {
  theme: Theme;
  variant: string;
  disabled?: boolean;
  customColor?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const isVariant = (variantToCompare: Variant) => {
    return variant === variantToCompare;
  };

  const baseFABColorProps = { theme, isVariant, disabled };

  const backgroundColor = getBackgroundColor({
    ...baseFABColorProps,
    style,
  });

  const foregroundColor = getForegroundColor({
    ...baseFABColorProps,
    customColor,
    backgroundColor,
  });

  return {
    backgroundColor: backgroundColor,
    foregroundColor,
    rippleColor: color(backgroundColor).alpha(0.5).rgb().string(),
  };
};

const getLabelColor = ({ theme }: { theme: Theme }) => {
  return theme.colors.textPrimary;
};

const getBackdropColor = ({ theme }: { theme: Theme }) => {
  return theme.colors?.backdrop;
};

const getStackedFABBackgroundColor = ({ theme }: { theme: Theme }) => {
  return theme.colors.surfaceHighlight;
};

export const getFABGroupColors = ({ theme }: { theme: Theme }) => {
  return {
    labelColor: getLabelColor({ theme }),
    backdropColor: getBackdropColor({ theme }),
    stackedFABBackgroundColor: getStackedFABBackgroundColor({ theme }),
  };
};

const standardSize = {
  height: 56,
  width: 56,
  borderRadius: 28,
};
const v3SmallSize = {
  height: 40,
  width: 40,
};
const v3MediumSize = {
  height: 56,
  width: 56,
};
const v3LargeSize = {
  height: 96,
  width: 96,
};

const getCustomFabSize = (customSize: number, roundness: number) => ({
  height: customSize,
  width: customSize,
  borderRadius: customSize / roundness,
});

export const getFabStyle = ({
  size,
  theme,
  customSize,
}: {
  customSize?: number;
  size: 'small' | 'medium' | 'large';
  theme: Theme;
}) => {
  const { roundness } = theme;

  if (customSize) return getCustomFabSize(customSize, roundness);

  switch (size) {
    case 'small':
      return { ...v3SmallSize, borderRadius: 3 * roundness };
    case 'medium':
      return { ...v3MediumSize, borderRadius: 4 * roundness };
    case 'large':
      return { ...v3LargeSize, borderRadius: 7 * roundness };
    default:
      standardSize;
  }
  return standardSize;
};

const extended = {
  height: 56,
  borderRadius: 16,
  paddingHorizontal: 16,
};

const getExtendedFabDimensions = (customSize: number) => ({
  height: customSize,
  paddingHorizontal: 16,
});

export const getExtendedFabStyle = ({
  customSize,
}: {
  customSize?: number;
  theme: Theme;
}) => {
  if (customSize) return getExtendedFabDimensions(customSize);

  return extended;
};
