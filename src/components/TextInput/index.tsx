/* eslint-disable react-native/no-inline-styles */
import React, { LegacyRef } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNProps,
  TextInputSubmitEditingEventData,
  TextStyle,
} from 'react-native';

export type TextInputProps = RNProps & {
  style?: StyleProp<TextStyle> | undefined;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (
    value: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  placeholder?: string;
  default?: boolean;
  floating?: boolean;
  filled?: boolean;
  error?: string;
  inputRef?: LegacyRef<RNTextInput>;
};
const TextInput: React.ForwardRefRenderFunction<unknown, TextInputProps> = ({
  style,
  value,
  filled = false,
  floating = false,
  onChangeText,
  onSubmitEditing,
  placeholder,
  placeholderTextColor,
  inputRef,

  ...rest
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          justifyContent: 'center',
          backgroundColor: filled ? 'rgba(79, 51, 175, 0.12)' : '#F5F5F5',
          borderColor: filled ? 'rgba(241, 167, 62, 0.5)' : 'transparent',
          borderWidth: 1,
        },
      ]}
    >
      <RNTextInput
        style={floating && styles.input}
        ref={inputRef}
        selectionColor={'#5629B6'}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={false}
        placeholder={placeholder ? placeholder : 'rgba(0, 0, 0, 0.62)'}
        placeholderTextColor={placeholderTextColor}
        maxFontSizeMultiplier={1}
        onChangeText={(text) => onChangeText && onChangeText(text)}
        onSubmitEditing={(
          e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
        ) => onSubmitEditing && onSubmitEditing(e)}
        value={value && value}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  input: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20,
  },
});
export default TextInput;
