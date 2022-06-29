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
import type { ViewStyle } from 'react-native';
import { withTheme } from '../../core/theming';
import { primaryDark3 } from '../../utils/colorUtils';
import Touchable from '../Touchable';
import { red400 } from 'src/styles/colors';

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
  labelContainerStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: string;
  label?: string | React.ReactElement;
  labelColor?: string;
  labelIcon?: JSX.Element;
  labelIconName?: string;
  labelIconSize?: number;
  labelIconColor?: ColorValue | string | undefined;
  maxLength?: number;
  onFocus?: (args: any) => void;
  rightIcon?: JSX.Element;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColor?: ColorValue | string | undefined;
  rightIconOnPress?: () => void;
  leftIcon?: JSX.Element;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: ColorValue | string | undefined;
  leftIconOnPress?: () => void;
  isLoading?: boolean;
  loaderPosition?: 'left' | 'right';
  theme: ReactNativeErxes.Theme;
  height?: number;
  backgroundColor?: string;
};
const TextInput: React.ForwardRefRenderFunction<unknown, TextInputProps> = ({
  style,
  value,
  theme,
  containerStyle,
  type = 'default',
  onChangeText,
  onSubmitEditing,
  placeholder,
  placeholderTextColor = theme.colors.textSecondary,
  inputRef,
  required = false,
  password = false,
  disabled = false,
  maxLength = 30,
  label,
  labelColor = theme.colors.textPrimary,
  labelIcon,
  labelIconName,
  labelIconColor = theme.colors.textSecondary,
  labelIconSize = 10,
  labelContainerStyle,
  rightIcon,
  rightIconName,
  rightIconSize = 16,
  rightIconColor = theme.colors.textPrimary,
  leftIcon,
  leftIconName,
  leftIconSize = 16,
  leftIconColor = theme.colors.textPrimary,
  isLoading = false,
  loaderPosition,
  labelStyle,
  rightIconOnPress,
  leftIconOnPress,
  height = 52,
  backgroundColor = theme.colors.surfaceHighlight,
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
        { height: height },
        type === 'text'
          ? {
              borderWidth: 1,
              borderColor: 'transparent',
              borderBottomColor: theme.colors.borderPrimary,
              paddingHorizontal: 15,
            }
          : styles.container,
        {
          flexDirection: 'row',
          alignItems: label ? 'flex-end' : 'center',
          paddingBottom: label ? 5 : 0,
          backgroundColor: backgroundColor
            ? backgroundColor
            : type === 'filled'
            ? 'rgba(79, 51, 175, 0.12)'
            : type === 'outline'
            ? theme.colors.surface
            : type === 'text'
            ? 'transparent'
            : backgroundColor,
          borderColor:
            type === 'filled'
              ? mainColor
              : type === 'outline'
              ? mainColor
              : required
              ? red400
              : 'transparent',
          borderWidth: 1,
        },
        containerStyle,
      ]}
    >
      {label ? (
        <View style={[styles.animatedStyle, labelContainerStyle]}>
          {labelIcon ? (
            labelIcon
          ) : labelIconName ? (
            <View style={{ marginHorizontal: 5 }}>
              <Icon
                source={labelIconName}
                color={labelColor}
                size={labelIconSize}
              />
            </View>
          ) : null}
          <TextView small color={labelColor} style={labelStyle}>
            {label}
          </TextView>
        </View>
      ) : null}

      <View
        style={{
          flex: 1,
          flexDirection: loaderPosition === 'left' ? 'row' : 'row-reverse',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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
          underlineColorAndroid={'transparent'}
          {...rest}
        />
      </View>

      {rightIcon ? (
        <Touchable onPress={rightIconOnPress && rightIconOnPress}>
          <View style={[{ marginEnd: 15, marginStart: 5 }]}>{rightIcon}</View>
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
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default withTheme(TextInput);
