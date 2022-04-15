import React, { LegacyRef } from 'react';
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
  error?: string;
  inputRef?: LegacyRef<RNTextInput>;
};
const TextInput: React.ForwardRefRenderFunction<unknown, TextInputProps> = ({
  style,
  value,
  onChangeText,
  onSubmitEditing,
  placeholder,
  placeholderTextColor,
  inputRef,
  ...rest
}) => {
  return (
    <RNTextInput
      ref={inputRef}
      style={style}
      selectionColor={'#5629B6'}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={false}
      placeholder={placeholder && placeholder}
      placeholderTextColor={placeholderTextColor}
      maxFontSizeMultiplier={1}
      onChangeText={(text) => onChangeText && onChangeText(text)}
      onSubmitEditing={(
        e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
      ) => onSubmitEditing && onSubmitEditing(e)}
      value={value && value}
      {...rest}
    />
  );
};
export default TextInput;
