/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { LegacyRef } from 'react';
import { View } from 'react-native';
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
import Touchable from '../Touchable';
import {
  grey100,
  grey600,
  red100,
  red400,
  transparent,
  white,
} from '../../styles/colors';
import type { ViewStyle } from 'react-native';
import { withTheme } from '../../core/theming';
import { primaryDark3 } from '../../utils/colorUtils';

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
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  iconOnPress?: () => void;
  theme: ReactNativeErxes.Theme;
};
const TextInput: React.ForwardRefRenderFunction<unknown, TextInputProps> = ({
  style,
  value,
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
  icon,
  iconPosition = 'left',
  theme,
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
              paddingLeft: 5,
              paddingTop: 15,
              borderBottomColor: grey600,
              minHeight: 50,
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
        rest?.containerStyle,
      ]}
    >
      {label && (
        <View style={[styles.animatedStyle]}>
          <TextView
            small
            color={rest?.labelColor || primaryDark3(colors.primary)}
            style={rest?.labelStyle}
          >
            {label}
          </TextView>
        </View>
      )}

      {icon && (
        <Touchable
          onPress={() => rest?.iconOnPress}
          style={[
            {
              marginLeft: iconPosition === 'right' ? 5 : 0,
              marginRight: iconPosition === 'right' ? 0 : 9,
            },
          ]}
        >
          {icon}
        </Touchable>
      )}
      <RNTextInput
        style={style}
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
    minHeight: 50,
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
    top: 5,
    left: 5,
    position: 'absolute',
    zIndex: 10000,
  },
});
export default withTheme(TextInput);
