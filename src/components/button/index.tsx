/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Touchable from '../Touchable';
import TextView from '../Typography';
//import MaterialCommunityIcons from '../MaterialCommunityIcons';
import type { TextStyle } from 'react-native';

export type ButtonProps = ViewProps & {
  type?: 'default' | 'outline';
  mode?: 'active' | 'disabled' | 'verify';
  block?: boolean;
  children?: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
  textstyle?: StyleProp<TextStyle>;
  onPress: () => void;
  onLongPress?: () => void;
  hasIcon?: boolean;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  iconPosition?: string;
  width?: number;
};

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  mode = 'active',
  block = false,
  onPress,
  onLongPress,
  style,
  textstyle,
  color,
  textColor,
  borderColor,
  children,
  width,
  iconName,
  iconPosition = 'left',
}) => {
  const defaultStyle = {
    minHeight: 40,
    minWidth: 100,
    width: width ? width : block ? '100%' : undefined,
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
    backgroundColor: color
      ? color
      : type === 'outline'
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
      activeOpacity={0.5}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[defaultStyle as ViewStyle, style]}
    >
      <View
        style={[
          styles.inView,
          {
            flexDirection: iconPosition === 'right' ? 'row-reverse' : 'row',
          },
        ]}
      >
        {iconName && (
          <View
            style={[
              {
                marginEnd: iconPosition === 'right' ? 0 : 5,
                marginStart: iconPosition === 'left' ? 0 : 5,
              },
            ]}
          >
            {/* <MaterialCommunityIcons
              name={iconName}
              size={iconSize ? iconSize : 16}
              color={iconColor ? iconColor : '#fff'}
              direction={'ltr'}
            /> */}
          </View>
        )}
        <TextView
          bold
          style={textstyle}
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
  defaultText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
  },
  linearGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 22,
  },
});

export default Button;
