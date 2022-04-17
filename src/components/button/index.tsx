/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import Colors from 'src/style/colors';
import Touchable from '../touchable';
import TextView from '../typography';

export type ButtonProps = ViewProps & {
  type?: 'default' | 'outline';
  mode?: 'active' | 'disabled';
  block?: boolean;
  children?: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  onLongPress: () => void;
  hasIcon?: string;
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
    height: 40,
    width: block ? '100%' : undefined,
    borderWidth: 1,
    borderColor:
      borderColor || (type === 'outline' && mode === 'active')
        ? Colors.primary
        : type === 'outline' && mode === 'disabled'
        ? '#E0E0E0'
        : Colors.transparent,
    borderRadius: 8,
    backgroundColor:
      color || (type === 'outline' && mode === 'active')
        ? Colors.white
        : type === 'default' && mode === 'disabled'
        ? '#E0E0E0'
        : Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  };
  return (
    <Touchable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[defaultStyle as ViewStyle, style]}
    >
      <TextView
        color={
          textColor || type === 'outline' ? Colors.primaryDark1 : Colors.white
        }
      >
        {children}
      </TextView>
    </Touchable>
  );
};

export default Button;
