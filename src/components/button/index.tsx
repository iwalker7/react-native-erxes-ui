/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import Touchable from '../touchable';
import TextView from '../typography';

export type ButtonProps = ViewProps & {
  type?: 'default' | 'outline';
  mode?: 'active' | 'disabled' | 'verify';
  block?: boolean;
  children?: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  onLongPress: () => void;
  hasIcon?: boolean;
  iconSrc?: string;
  iconName?: string;
};

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  mode = 'active',
  block = false,
  onPress,
  onLongPress,
  style,
  color,
  textColor,
  borderColor,
  children,
}) => {
  const defaultStyle = {
    minHeight: 40,
    width: block ? '100%' : 100,
    borderWidth: 1,
    borderColor:
      borderColor || (type === 'outline' && mode === 'active')
        ? '#4F33AF'
        : type === 'outline' && mode === 'disabled'
        ? '#E0E0E0'
        : type === 'outline' && mode === 'verify'
        ? '#17CE65'
        : 'rgba(255, 255, 255, 0)',
    borderRadius: 8,
    backgroundColor:
      color || type === 'outline'
        ? '#fff'
        : type === 'default' && mode === 'disabled'
        ? '#E0E0E0'
        : type === 'default' && mode === 'verify'
        ? '#17CE65'
        : '#4F33AF',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 10,
  };
  return (
    <Touchable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[defaultStyle as ViewStyle, style]}
    >
      <TextView
        bold
        color={
          textColor || (type === 'outline' && mode === 'active')
            ? '#472D9A'
            : type === 'outline' && mode === 'verify'
            ? '#17CE65'
            : mode === 'disabled'
            ? '#9e9e9e'
            : '#fff'
        }
      >
        {children}
      </TextView>
    </Touchable>
  );
};

export default Button;
