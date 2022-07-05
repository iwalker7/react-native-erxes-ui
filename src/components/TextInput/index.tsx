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
import Touchable from '../Touchable';
import { red400 } from '../../styles/colors';

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
  rightIconStyle?: StyleProp<ViewStyle>;
  leftIcon?: JSX.Element;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: ColorValue | string | undefined;
  leftIconOnPress?: () => void;
  leftIconStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  loaderPosition?: 'left' | 'right';
  theme: ReactNativeErxes.Theme;
  height?: number;
  backgroundColor?: string;
  helperText?: string;
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
  rightIconStyle,
  leftIcon,
  leftIconName,
  leftIconSize = 16,
  leftIconColor = theme.colors.textPrimary,
  leftIconStyle,
  isLoading = false,
  loaderPosition,
  labelStyle,
  rightIconOnPress,
  leftIconOnPress,
  height = 52,
  backgroundColor = 'transparent',
  helperText,
  ...rest
}) => {
  const { colors } = theme;

  const p = password ? '*****' : placeholder ? placeholder : '';
  //   const [ph, setPh] = React.useState(p);
  const [mainColor, setMainColor] = React.useState(colors.primary);
  const [focused, setFocused] = React.useState<boolean>(false);

  const handleFocus = (args: any) => {
    if (disabled) {
      return;
    }
    setFocused(true);
    rest.onFocus?.(args);
  };

  const handleChangeText = (v: string) => {
    if (disabled) {
      return;
    }
    onChangeText && onChangeText(v);
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
    <>
      <View
        style={[
          { height, backgroundColor },
          type === 'text'
            ? {
                borderWidth: 1,
                borderColor: 'transparent',
                borderBottomColor: theme.colors.surfaceLight,
                paddingHorizontal: 15,
                backgroundColor: 'transparent',
              }
            : styles.container,
          {
            flexDirection: 'row',
            alignItems: label ? 'flex-end' : 'center',
            paddingBottom: label ? 5 : 0,
            borderColor:
              type === 'filled' || type === 'outline'
                ? theme.colors.surfaceHighlight
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
            <View style={[{ marginHorizontal: 5 }, leftIconStyle]}>
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
          rightIcon
        ) : rightIconName ? (
          <Touchable onPress={rightIconOnPress && rightIconOnPress}>
            <View style={[{ marginStart: 5 }, rightIconStyle]}>
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
      <TextView
        small
        style={{
          position: 'relative',
          top: 10,
          color: theme.colors.textSecondary,
        }}
      >
        {helperText}
      </TextView>
    </>
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
