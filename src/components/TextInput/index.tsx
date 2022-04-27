/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { Brand } from '../../styles/colors';

export type TextInputProps = RNProps & {
  type?: 'default' | 'outline' | 'filled' | 'floating';
  placeholder?: string;
  required?: boolean;
  password?: boolean;
  disabled?: boolean;
  value?: string;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (
    value: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  inputRef?: LegacyRef<RNTextInput>;
  containerStyle?: StyleProp<TextStyle> | undefined;
  placeholderTextColor?: string;
  label?: string | React.ReactElement;
  labelColor?: string;
  count?: boolean;
  maxLength?: number;
  onFocus?: (args: any) => void;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  iconOnPress?: () => void;
};
const TextInput: React.ForwardRefRenderFunction<unknown, TextInputProps> = ({
  containerStyle,
  value,
  type = 'default',
  //   floating = false,
  onChangeText,
  onSubmitEditing,
  placeholder,
  placeholderTextColor,
  inputRef,
  required = false,
  password = false,
  label,
  disabled = false,
  count = false,
  maxLength = 30,
  icon,
  iconPosition = 'left',
  ...rest
}) => {
  const p = password ? '*****' : placeholder ? placeholder : '';
  const [mainColor, setMainColor] = React.useState('#5629B6');
  const [charCount, setCharCount] = React.useState(0);

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

  React.useEffect(() => {
    if (focused || value !== '') {
      Animated.timing(labeled, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(labeled, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [labeled, focused, value]);

  const handleChangeText = (v: string) => {
    if (disabled) {
      return;
    }
    onChangeText && onChangeText(v);

    //zasah shaardlagatai
    // setCharCount(value.length);
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
        styles.container,
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor:
            type === 'filled'
              ? 'rgba(79, 51, 175, 0.12)'
              : type === 'outline'
              ? '#fff'
              : '#F5F5F5',
          borderColor:
            type === 'filled'
              ? mainColor
              : type === 'outline'
              ? mainColor
              : 'transparent',
          borderWidth: 1,
        },
        containerStyle,
      ]}
    >
      {/* {label && (
        <Animated.View style={[styles.animatedStyle, animStyle]}>
          <TextView boldless color={rest?.labelColor || Brand.primaryDark3}>
            {label}
          </TextView>
        </Animated.View>
      )} */}

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
        // style={styles.input}
        ref={inputRef}
        selectionColor={mainColor}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={false}
        placeholder={p}
        placeholderTextColor={placeholderTextColor}
        maxFontSizeMultiplier={1}
        maxLength={maxLength}
        onFocus={handleFocus}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
        value={value && value}
        {...rest}
      />
      {required && (
        <TextView
          style={{ position: 'absolute', right: 10, top: 10 }}
          required
        />
      )}
      {count && (
        <TextView
          xxsmall
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            color: Brand.medium,
          }}
        >
          {charCount} / {maxLength}
        </TextView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  input: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 15,
  },
  animatedStyle: {
    top: 15,
    left: 15,
    position: 'absolute',
    zIndex: 10000,
  },
});
export default TextInput;
