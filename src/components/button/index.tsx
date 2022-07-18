/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import type {
  ColorValue,
  TextStyle,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import TextView from '../Typography';
import Icon from '../Icon';
import { withTheme } from '../../core/theming';
import { transparent, white } from '../../styles/colors';
import TouchableRipple from './TouchableRipple';
import { rgba } from '../../utils/colorUtils';

const defaultsize = 16;

export type ButtonProps = ViewProps & {
  type?: 'contained' | 'outlined' | 'text';
  mode?: 'active' | 'disabled';
  block?: boolean;
  children?: string;
  color?: string;
  uppercase?: boolean;
  textColor?: string;
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
  rippleColor?: 'string';
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
  uppercase = false,
  textColor,
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
  rippleColor,
}) => {
  const { colors, roundness } = theme;

  const mainColor = color
    ? color
    : mode === 'active'
    ? colors.primary
    : transparent;

  const defaultStyle = {
    minHeight: 20,
    minWidth: 50,
    width: width ? width : block ? '100%' : undefined,
    height: height,
    borderWidth: 1,
    borderColor: type === 'text' ? transparent : mainColor,
    borderRadius: roundness,
    backgroundColor: color
      ? color
      : mode === 'disabled'
      ? colors.disabled
      : type === 'outlined' || type === 'text'
      ? transparent
      : mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  };

  const tStyle = {
    color: textColor
      ? textColor
      : (type === 'outlined' || type === 'text') && mode === 'active'
      ? colors.primary
      : mode === 'disabled'
      ? '#f0f0f0'
      : white,
    fontSize: leftIcon || rightIcon ? 12 : 13,
  };

  return (
    <TouchableRipple
      disabled={mode === 'disabled'}
      rippleColor={rippleColor ? rippleColor : rgba(mainColor, 0.4)}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[defaultStyle as ViewStyle, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                color ? color : type === 'contained' ? white : colors.primary
              }
              style={{
                marginHorizontal: 10,
              }}
            />
          ) : null}
          <TextView
            bold
            small
            style={[tStyle, textStyle]}
            uppercase={uppercase}
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

export default withTheme(Button);
