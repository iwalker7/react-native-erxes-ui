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
import TouchableRipple from './TouchableRipple';

const defaultsize = 16;

export type ButtonProps = ViewProps & {
  type?: 'contained' | 'outlined' | 'text';
  mode?: 'active' | 'disabled' | 'verify';
  block?: boolean;
  children?: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
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
  width?: any;
  height?: number;
  theme: ReactNativeErxes.Theme;
};

const Button: React.FC<ButtonProps> = ({
  type = 'contained',
  mode = 'active',
  block = false,
  onPress,
  onLongPress,
  style,
  textStyle,
  color,
  textColor,
  borderColor,
  children,
  width,
  height = 33,
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
  const { colors, roundness } = theme;

  const defaultStyle = {
    minHeight: 20,
    minWidth: 50,
    width: width ? width : block ? '100%' : undefined,
    height: height,
    borderWidth: 1,
    borderColor: borderColor
      ? borderColor
      : type === 'outlined' && mode === 'active'
      ? colors.primary
      : mode === 'disabled'
      ? colors.disabled
      : mode === 'verify'
      ? colors.success
      : transparent,
    borderRadius: roundness,
    backgroundColor: color
      ? color
      : type === 'contained' && mode === 'active'
      ? colors.primary
      : mode === 'disabled'
      ? colors.disabled
      : mode === 'verify'
      ? colors.success
      : transparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  };

  const tcolor = textColor
    ? textColor
    : (type === 'outlined' || type === 'text') && mode === 'active'
    ? colors.primary
    : mode === 'verify' && type === 'text'
    ? colors.success
    : type === 'contained' && mode === 'active'
    ? white
    : mode === 'disabled'
    ? colors.coreGray
    : colors.textSecondary;

  const rippleColor = mode === 'verify' ? colors.success : colors.primary;

  return (
    <TouchableRipple
      disabled={mode === 'disabled'}
      borderless={type === 'outlined'}
      rippleColor={rippleColor}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[defaultStyle as ViewStyle, style]}
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
                type === 'contained'
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
            color={tcolor}
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
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  inView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(Button);
