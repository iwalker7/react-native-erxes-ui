import color from 'color';
import {
  Animated,
  I18nManager,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import type { Theme } from '../../types';
import { white } from '../../styles/colors';
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

  if (disabled) {
    return theme.colors.disabled;
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
    return theme.colors.backdrop;
  }

  //@ts-ignore
  return theme.colors?.accent;
};

const getForegroundColor = ({
  theme,
  isVariant,
  disabled,
  backgroundColor,
  customColor,
}: BaseProps & { backgroundColor: string; customColor?: string }) => {
  if (typeof customColor !== 'undefined' && !disabled) {
    return customColor;
  }

  if (disabled) {
    return theme.colors.disabled;
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
    return theme.colors.surface;
  }

  if (backgroundColor) {
    return getContrastingColor(
      backgroundColor || white,
      white,
      'rgba(0, 0, 0, .54)'
    );
  }

  return getContrastingColor(white, white, 'rgba(0, 0, 0, .54)');
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
    backgroundColor,
    foregroundColor,
    rippleColor: color(foregroundColor).alpha(0.12).rgb().string(),
  };
};

const getLabelColor = ({ theme }: { theme: Theme }) => {
  if (theme.dark) {
    return theme.colors.textPrimary;
  }

  return color(theme.colors.textPrimary).fade(0.54).rgb().string();
};

const getBackdropColor = ({ theme }: { theme: Theme }) => {
  return theme.colors?.backdrop;
};

const getStackedFABBackgroundColor = ({ theme }: { theme: Theme }) => {
  return theme.colors.surface;
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
const smallSize = {
  height: 40,
  width: 40,
  borderRadius: 28,
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

  if (size === 'small') {
    return smallSize;
  }
  return standardSize;
};

const extended = {
  height: 48,
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
