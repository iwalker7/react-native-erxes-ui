/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { LegacyRef } from 'react';
import { ActivityIndicator, ColorValue, View } from 'react-native';
import { Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNProps,
  TextInputSubmitEditingEventData,
  TextStyle,
} from 'react-native';
import TextView from '../Typography';
import Icon from '../Icon';
import {
  grey100,
  grey600,
  red400,
  transparent,
  white,
  green100,
} from '../../styles/colors';
import type { ViewStyle } from 'react-native';
import { withTheme } from '../../core/theming';
import { primaryDark3 } from '../../utils/colorUtils';
import Touchable from '../Touchable';

export type TextInputProps = RNProps & {
  type?: 'default' | 'outline' | 'filled' | 'text';
  placeholder?: string;
  floating?: boolean;
  required?: boolean;
  password?: boolean;
  disabled?: boolean;
  value?: string;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (
    value: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  inputRef?: LegacyRef<RNTextInput>;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: string;
  label?: string | React.ReactElement;
  labelColor?: string;
  maxLength?: number;
  onFocus?: (args: any) => void;
  rightIcon?: JSX.Element;
  rightIconContainer?: StyleProp<ViewStyle>;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColor?: ColorValue | string | undefined;
  rightIconOnPress?: () => void;
  leftIcon?: JSX.Element;
  leftIconContainer?: StyleProp<ViewStyle>;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: ColorValue | string | undefined;
  leftIconOnPress?: () => void;
  isLoading?: boolean;
  loaderPosition?: 'left' | 'right';
  theme: ReactNativeErxes.Theme;
};
const TextInput: React.ForwardRefRenderFunction<unknown, TextInputProps> = ({
  style,
  value,
  containerStyle,
  type = 'default',
  onChangeText,
  onSubmitEditing,
  placeholder,
  placeholderTextColor,
  inputRef,
  required = false,
  password = false,
  label,
  disabled = false,
  maxLength = 30,
  rightIcon,
  rightIconName,
  rightIconSize = 16,
  rightIconColor,
  leftIcon,
  leftIconName,
  leftIconSize = 16,
  leftIconColor,
  isLoading = false,
  loaderPosition,
  labelColor,
  labelStyle,
  theme,
  rightIconOnPress,
  leftIconOnPress,
  ...rest
}) => {
  const { colors } = theme;

  const p = password ? '*****' : placeholder ? placeholder : '';
  //   const [ph, setPh] = React.useState(p);
  const [mainColor, setMainColor] = React.useState(colors.primary);
  const [focused, setFocused] = React.useState<boolean>(false);
  const { current: labeled } = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );

  const handleFocus = (args: any) => {
    if (disabled) {
      return;
    }
    setFocused(true);
    rest.onFocus?.(args);
  };

  //   React.useEffect(() => {
  //     if (focused || value !== '') {
  //       //   if (floating) {
  //       //     setPh(placeholder);
  //       //   }
  //       Animated.timing(labeled, {
  //         toValue: 1,
  //         duration: 200,
  //         useNativeDriver: true,
  //       }).start();
  //     } else {
  //       Animated.timing(labeled, {
  //         toValue: 0,
  //         duration: 200,
  //         useNativeDriver: true,
  //       }).start();
  //     }
  //   }, [labeled, focused, value]);

  const handleChangeText = (v: string) => {
    if (disabled) {
      return;
    }
    onChangeText && onChangeText(v);
  };

  const animStyle = {
    transform: [
      {
        translateY: labeled.interpolate({
          inputRange: [0, 1],
          outputRange: [1, -12],
        }),
      },
      {
        translateX: labeled.interpolate({
          inputRange: [0, 1],
          outputRange: [1, -8],
        }),
      },
      {
        scale: labeled.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.6],
        }),
      },
    ],
  };

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    if (required && (value === '' || !value)) {
      setMainColor('red');
    } else {
      onSubmitEditing && onSubmitEditing(e);
    }
  };
  return (
    <View
      style={[
        type === 'text'
          ? {
              borderWidth: 1,
              borderColor: 'transparent',
              paddingLeft: 15,
              paddingTop: 15,
              paddingBottom: 0,
              backgroundColor: green100,
              borderBottomColor: grey600,
              minHeight: 52,
              paddingEnd: 15,
            }
          : styles.container,
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor:
            type === 'filled'
              ? 'rgba(79, 51, 175, 0.12)'
              : type === 'outline'
              ? white
              : grey100,
          borderColor:
            type === 'filled'
              ? mainColor
              : type === 'outline'
              ? mainColor
              : required
              ? red400
              : transparent,
          borderWidth: 1,
        },
        containerStyle,
      ]}
    >
      {label && (
        <View style={[styles.animatedStyle]}>
          <TextView
            small
            color={labelColor || primaryDark3(colors.primary)}
            style={labelStyle}
          >
            {label}
          </TextView>
        </View>
      )}

      {leftIcon ? (
        <Touchable onPress={leftIconOnPress && leftIconOnPress}>
          <View style={[{ marginEnd: 15, marginStart: 5 }]}>{leftIcon}</View>
        </Touchable>
      ) : leftIconName ? (
        <Touchable onPress={leftIconOnPress && leftIconOnPress}>
          <View style={{ marginEnd: 5 }}>
            <Icon
              source={leftIconName}
              color={leftIconColor}
              size={leftIconSize}
            />
          </View>
        </Touchable>
      ) : null}

      <View
        style={{
          flex: 1,
          flexDirection: loaderPosition === 'left' ? 'row' : 'row-reverse',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{
              marginHorizontal: 10,
            }}
          />
        ) : null}
        <RNTextInput
          style={[{ flex: 1 }, style]}
          ref={inputRef}
          selectionColor={mainColor}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={password ? true : false}
          placeholder={p}
          placeholderTextColor={placeholderTextColor}
          maxFontSizeMultiplier={1}
          maxLength={maxLength}
          onFocus={handleFocus}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmit}
          value={value && value}
          underlineColorAndroid={transparent}
          {...rest}
        />
      </View>
      {rightIcon ? (
        <Touchable onPress={rightIconOnPress && rightIconOnPress}>
          <View style={[{ marginEnd: 15, marginStart: 5 }]}>{leftIcon}</View>
        </Touchable>
      ) : rightIconName ? (
        <Touchable onPress={rightIconOnPress && rightIconOnPress}>
          <View style={{ marginStart: 5 }}>
            <Icon
              source={rightIconName}
              color={rightIconColor}
              size={rightIconSize}
            />
          </View>
        </Touchable>
      ) : null}
      {required && (
        <TextView
          style={{ position: 'absolute', right: 10, top: 10 }}
          required
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
    backgroundColor: grey100,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  input: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 15,
  },
  animatedStyle: {
    top: 3,
    left: 15,
    position: 'absolute',
    zIndex: 1000,
  },
});
export default withTheme(TextInput);
