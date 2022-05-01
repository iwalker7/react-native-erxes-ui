/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import type {
  ColorValue,
  TextStyle,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Touchable from '../Touchable';
import TextView from '../Typography';
import Icon from '../Icon';
import { withTheme } from '../../core/theming';
import { transparent, white } from '../../styles/colors';

const defaultsize = 20;

export type ButtonProps = ViewProps & {
  type?: 'default' | 'outline';
  mode?: 'active' | 'disabled' | 'verify';
  block?: boolean;
  children?: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  onLongPress?: () => void;
  rightIcon?: JSX.Element;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColor?: ColorValue | string | undefined;
  leftIcon?: JSX.Element;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: ColorValue | string | undefined;
  isLoading?: boolean;
  loaderPosition?: 'left' | 'right';
  width?: number;
  theme: ReactNativeErxes.Theme;
};

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  mode = 'active',
  block = false,
  onPress,
  onLongPress,
  containerStyle,
  textStyle,
  color,
  textColor,
  borderColor,
  children,
  width,
  rightIcon,
  rightIconName,
  rightIconSize = defaultsize,
  rightIconColor = white,
  leftIcon,
  leftIconName,
  leftIconSize = defaultsize,
  leftIconColor = white,
  isLoading,
  loaderPosition,
  theme,
}) => {
  const { colors } = theme;

  const defaultStyle = {
    minHeight: 36,
    minWidth: 90,
    width: width ? width : block ? '100%' : undefined,
    borderWidth: 1,
    borderColor: borderColor
      ? borderColor
      : type === 'outline'
      ? mode === 'active'
        ? colors.primary
        : mode === 'disabled'
        ? colors.disabled
        : mode === 'verify'
        ? colors.success
        : transparent
      : transparent,

    borderRadius: 10,
    backgroundColor: color
      ? color
      : type === 'outline'
      ? white
      : type === 'default'
      ? mode === 'disabled'
        ? colors.disabled
        : mode === 'verify'
        ? colors.success
        : colors.primary
      : colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 10,
  };

  return (
    <Touchable
      activeOpacity={0.5}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[defaultStyle as ViewStyle, containerStyle]}
    >
      <View style={[styles.inView]}>
        {leftIcon ? (
          leftIcon
        ) : leftIconName ? (
          <View style={{ marginHorizontal: 5 }}>
            <Icon
              source={leftIconName}
              color={leftIconColor}
              size={leftIconSize}
            />
          </View>
        ) : null}

        <View
          style={{
            flexDirection: loaderPosition === 'left' ? 'row' : 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={
                type === 'default'
                  ? white
                  : mode === 'verify'
                  ? colors.success
                  : color
                  ? color
                  : colors.primary
              }
              style={{
                marginHorizontal: 10,
              }}
            />
          ) : null}
          <TextView
            bold
            small
            style={[{ fontSize: leftIcon || rightIcon ? 12 : 13 }, textStyle]}
            color={
              textColor
                ? textColor
                : type === 'outline'
                ? mode === 'active'
                  ? colors.primary
                  : mode === 'verify'
                  ? colors.success
                  : mode === 'disabled'
                  ? colors.disabled
                  : white
                : white
            }
          >
            {children}
          </TextView>
        </View>
        {rightIcon ? (
          rightIcon
        ) : rightIconName ? (
          <View style={{ marginHorizontal: 5 }}>
            <Icon
              source={rightIconName}
              color={rightIconColor}
              size={rightIconSize}
            />
          </View>
        ) : null}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  inView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 22,
  },
});

export default withTheme(Button);
