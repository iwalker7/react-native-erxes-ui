import * as React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  GestureResponderEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import color from 'color';
import CrossFadeIcon from './CrossFadedIcon';
import { withTheme } from '../../core/theming';
import TouchableRipple from './TouchableRipple';
import type { IconSource } from '../Icon';
import Icon from '../Icon';

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
  React.ComponentPropsWithoutRef<T>,
  'children'
>;

type Props = $RemoveChildren<typeof TouchableRipple> & {
  icon: IconSource;
  color?: string;
  size?: number;
  disabled?: boolean;
  animated?: boolean;
  mode?: 'FILL' | 'TRANSPARENT';
  accessibilityLabel?: string;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<TouchableWithoutFeedback>;
  theme: ReactNativeErxes.Theme;
  depth?: number;
  backgroundColor?: string;
};

const IconButton = ({
  color: customColor,
  size = 24,
  accessibilityLabel,
  disabled,
  onPress,
  animated = false,
  theme,
  style,
  icon,
  depth = 1.5,
  mode = 'TRANSPARENT',
  backgroundColor,
  ...rest
}: Props) => {
  const iconColor =
    typeof customColor !== 'undefined' ? customColor : theme.colors.textPrimary;
  const rippleColor = color(iconColor).alpha(0.2).rgb().string();
  const IconComponent = animated ? CrossFadeIcon : Icon;
  const buttonSize = size * depth;
  return (
    <TouchableRipple
      borderless
      onPress={onPress}
      rippleColor={rippleColor}
      style={[
        styles.container,
        { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 },
        disabled && styles.disabled,
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
      // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
      accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
      accessibilityComponentType="button"
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={
        TouchableRipple.supported
          ? { top: 10, left: 10, bottom: 10, right: 10 }
          : { top: 6, left: 6, bottom: 6, right: 6 }
      }
      {...rest}
    >
      <View style={mode === 'FILL' && { flex: 1, backgroundColor }}>
        <IconComponent color={iconColor} source={icon || ''} size={size} />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 6,
  },
  disabled: {
    opacity: 0.32,
  },
});

export default withTheme(IconButton);
