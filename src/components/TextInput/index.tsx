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
import { Brand } from '../../styles/colors';

export type TextInputProps = RNProps & {
  type?: 'default' | 'outline' | 'filled';
  placeholder?: string;
  floating?: boolean;
  required?: boolean;
  password?: boolean;
  disabled?: boolean;
  value: string;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (
    value: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  inputRef?: LegacyRef<RNTextInput>;
  style?: StyleProp<TextStyle> | undefined;
  placeholderTextColor?: string;
  label?: string | React.ReactElement;
  affix?: boolean;
  maxLength?: number;
  onFocus?: (args: any) => void;
};
const TextInput: React.ForwardRefRenderFunction<unknown, TextInputProps> = ({
  style,
  value,
  type = 'default',
  floating = false,
  onChangeText,
  onSubmitEditing,
  placeholder,
  placeholderTextColor,
  inputRef,
  required = false,
  password = false,
  label,
  disabled = false,
  affix = true,
  maxLength = 30,
  ...rest
}) => {
  //   const validInputValue =
  //     value !== undefined || (required && value !== '') ? value : '';
  const ph = password ? '*****' : placeholder ? placeholder : '';

  const [mainColor, setMainColor] = React.useState('#5629B6');
  const [charCount, setCharCount] = React.useState(0);

  const [focused, setFocused] = React.useState<boolean>(false);
  const { current: labeled } = React.useRef<Animated.Value>(
    new Animated.Value(value ? 0 : 1)
  );

  const handleFocus = (args: any) => {
    if (disabled) {
      return;
    }
    setFocused(true);
    rest.onFocus?.(args);
  };

  React.useEffect(() => {
    if (value || focused) {
      Animated.timing(labeled, {
        toValue: 0,
        duration: 180 * 0.1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(labeled, {
        toValue: 1,
        duration: 150 * 0.1,
        useNativeDriver: true,
      }).start();
    }
  }, [focused, value, labeled]);

  const handleChangeText = (v: string) => {
    if (disabled) {
      return;
    }

    setCharCount(value.length);
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
    <View
      style={[
        styles.container,
        style,
        {
          justifyContent: 'center',
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
      ]}
    >
      {label && focused && (
        <View
          style={{
            position: 'absolute',
            top: 3,
            left: 5,
            paddingHorizontal: 10,
          }}
        >
          <TextView xsmall color={Brand.primaryDark1}>
            {label}
          </TextView>
        </View>
      )}
      <RNTextInput
        style={floating && styles.input}
        ref={inputRef}
        selectionColor={mainColor}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={false}
        placeholder={ph}
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
      {affix && (
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
    margin: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  input: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 15,
  },
});
export default TextInput;
