/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import type { TextStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { ColorValue } from 'react-native';
import Icon from '../Icon';
import TextView from '../Typography';
import Touchable from '../Touchable';
import { useTheme } from '../../core/theming';

export type GradientButtonProps = {
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
  textStyle?: StyleProp<TextStyle>;
  buttonColorArray?: string[];
  uppercase?: string;
  linearGradientStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  block?: boolean | false;
  gradientStart?: { x: number; y: number } | undefined;
  gradientEnd?: { x: number; y: number } | undefined;
  touchStyle?: object;
  rightIcon?: JSX.Element;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColor?: ColorValue | string | undefined;
  leftIcon?: JSX.Element;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: ColorValue | string | undefined;
  children?: string;
  textColor?: string;
};
const GradientBtn: React.FC<GradientButtonProps> = ({
  onPress,
  textStyle,
  buttonColorArray,
  uppercase,
  linearGradientStyle,
  isLoading,
  containerStyle,
  block = false,
  gradientStart,
  gradientEnd,
  touchStyle,
  rightIcon,
  leftIcon,
  leftIconName,
  rightIconName,
  children,
  ...rest
}) => {
  const { colors } = useTheme();

  const defaultsize = 20;
  const defaultGradient = [colors.primary, colors.accent];
  return (
    <View
      pointerEvents="box-none"
      style={[
        containerStyle,
        {
          width: block ? '100%' : 'auto',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.14,
          shadowRadius: 1.84,
          elevation: 2,
        },
      ]}
    >
      <Touchable
        activeOpacity={0.5}
        onPress={onPress}
        style={touchStyle}
        disabled={isLoading ? !isLoading : false}
      >
        <LinearGradient
          start={gradientStart || { x: 0, y: 0 }}
          end={gradientEnd || { x: 1, y: 0 }}
          colors={buttonColorArray || defaultGradient}
          style={[styles.linearGradient, linearGradientStyle]}
        >
          <View style={[styles.inView]}>
            {isLoading && (
              <ActivityIndicator
                size="small"
                color={'white'}
                style={{ marginEnd: 7, height: 16 }}
              />
            )}
            {leftIconName ||
              (leftIcon && (
                <View style={{ marginHorizontal: 5 }}>
                  {leftIcon ? (
                    leftIcon
                  ) : (
                    <Icon
                      color={rest?.leftIconColor || '#fff'}
                      size={rest?.leftIconSize || defaultsize}
                      source={leftIconName || ''}
                    />
                  )}
                </View>
              ))}

            <TextView
              bold
              small
              style={textStyle}
              color={(rest?.textColor && rest?.textColor) || '#fff'}
            >
              {uppercase ? children?.toUpperCase() : children}
            </TextView>

            {rightIconName ||
              (rightIcon && (
                <View style={{ marginHorizontal: 5 }}>
                  {rightIcon ? (
                    rightIcon
                  ) : (
                    <Icon
                      color={rest?.leftIconColor || '#fff'}
                      size={rest?.leftIconSize || defaultsize}
                      source={leftIconName || ''}
                    />
                  )}
                </View>
              ))}
          </View>
        </LinearGradient>
      </Touchable>
    </View>
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

export default GradientBtn;
