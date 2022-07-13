import * as React from 'react';
import {
  Animated,
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  AccessibilityState,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import Surface from '../Surface';
import Icon, { IconSource } from '../Icon';
import TouchableRipple from '../Button/TouchableRipple';
import { withTheme } from '../../core/theming';
import { getExtendedFabStyle, getFABColors, getFabStyle } from './utils';
import type { $RemoveChildren, Theme } from '../../types';
import TextView from '../Typography';

type FABSize = 'small' | 'medium' | 'large';

type FABMode = 'flat' | 'elevated';

type Props = $RemoveChildren<typeof Surface> & {
  icon: IconSource;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  uppercase?: boolean;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
  small?: boolean;
  color?: string;
  disabled?: boolean;
  visible?: boolean;
  loading?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  size?: FABSize;
  customSize?: number;
  mode?: FABMode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'surface';
  style?: StyleProp<ViewStyle>;
  theme: ReactNativeErxes.Theme;
  testID?: string;
};

const FAB = ({
  icon,
  label,
  accessibilityLabel = label,
  accessibilityState,
  color: customColor,
  disabled,
  onPress,
  onLongPress,
  theme,
  style,
  labelStyle,
  visible = true,
  uppercase = false,
  loading,
  testID,
  size = 'medium',
  customSize,
  mode = 'elevated',
  variant = 'primary',
  ...rest
}: Props) => {
  const { current: visibility } = React.useRef<Animated.Value>(
    new Animated.Value(visible ? 1 : 0)
  );
  const { animation } = theme;
  const { scale } = animation;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(visibility, {
        toValue: 1,
        duration: 200 * scale,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(visibility, {
        toValue: 0,
        duration: 150 * scale,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, scale, visibility]);

  const IconComponent = Icon;

  const { backgroundColor, foregroundColor, rippleColor } = getFABColors({
    theme,
    variant,
    disabled,
    customColor,
    style,
  });

  const isLargeSize = size === 'large';
  const isFlatMode = mode === 'flat';
  const iconSize = isLargeSize ? 36 : 24;
  const loadingIndicatorSize = isLargeSize ? 24 : 18;

  const fabStyle = getFabStyle({ customSize, size, theme });
  const extendedStyle = getExtendedFabStyle({ customSize, theme });
  const textStyle = {
    color: foregroundColor,
    ...theme.fonts.medium,
  };
  const shapeStyle = { borderRadius: fabStyle.borderRadius };

  const containerStyles = [
    styles.elevated,
    disabled && styles.disabled,
    shapeStyle,
  ];
  const md3Elevation = isFlatMode || disabled ? 0 : 3;

  return (
    <Surface
      {...rest}
      style={
        [
          {
            backgroundColor,
            opacity: visibility,
            transform: [
              {
                scale: visibility,
              },
            ],
          },
          containerStyles,
          style,
        ] as StyleProp<ViewStyle>
      }
      pointerEvents={visible ? 'auto' : 'none'}
      {...{ elevation: md3Elevation }}
    >
      <TouchableRipple
        borderless
        onPress={onPress}
        onLongPress={onLongPress}
        rippleColor={rippleColor}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ ...accessibilityState, disabled }}
        style={shapeStyle}
        testID={testID}
      >
        <View
          style={[styles.content, label ? extendedStyle : fabStyle]}
          pointerEvents="none"
        >
          <IconComponent
            source={icon}
            size={customSize ? customSize / 2 : iconSize}
            color={foregroundColor}
          />
          {loading ? (
            <ActivityIndicator
              size={customSize ? customSize / 2 : loadingIndicatorSize}
              color={foregroundColor}
            />
          ) : null}
          {label ? (
            <TextView
              large
              selectable={false}
              style={[
                styles.label,
                uppercase && styles.uppercaseLabel,
                textStyle,
                labelStyle,
              ]}
            >
              {label}
            </TextView>
          ) : null}
        </View>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  elevated: {
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginHorizontal: 8,
  },
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
  disabled: {
    elevation: 0,
  },
});

export default withTheme(FAB);

// @component-docs ignore-next-line
const FABWithTheme = withTheme(FAB);
// @component-docs ignore-next-line
export { FABWithTheme as FAB };
