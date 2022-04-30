/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import { red400 } from '../../styles/colors';

export type TextViewProps = TextProps & {
  xxsmall?: boolean;
  xsmall?: boolean;
  small?: boolean;
  large?: boolean;
  xlarge?: boolean;
  xxlarge?: boolean;
  xxxlarge?: boolean;
  xxxxlarge?: boolean;
  bold?: boolean;
  boldless?: boolean;
  italic?: boolean;
  style?: StyleProp<TextStyle>;
  capitalize?: boolean;
  uppercase?: boolean;
  required?: boolean;
  flex?: boolean;
  lineHeight?: number;
  center?: boolean;
  color?: string;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
};

const TextView: React.FC<TextViewProps> = ({
  xxsmall,
  xsmall,
  small,
  large,
  xlarge,
  xxlarge,
  xxxlarge,
  xxxxlarge,
  bold,
  boldless,
  italic,
  style,
  capitalize,
  uppercase,
  flex,
  lineHeight,
  center,
  color,
  required,
  onPress,
  onLongPress,
  ...rest
}) => {
  return (
    <Text
      style={[
        flex && { flex: 1 },
        xxsmall && { fontSize: 8 },
        xsmall && { fontSize: 10 },
        small && { fontSize: 12 },
        large && { fontSize: 16 },
        xlarge && { fontSize: 18 },
        xxlarge && { fontSize: 20 },
        xxxlarge && { fontSize: 25 },
        xxxxlarge && { fontSize: 30 },
        bold && { fontWeight: 'bold' },
        boldless && { fontWeight: '600' },
        italic && { fontStyle: 'italic' },
        capitalize && { textTransform: 'capitalize' },
        uppercase && { textTransform: 'uppercase' },
        center && { textAlign: 'center' },
        { color },
        { lineHeight },
        style,
      ]}
      maxFontSizeMultiplier={1}
      ellipsizeMode="tail"
      onPress={onPress}
      onLongPress={onLongPress}
      {...rest}
    >
      {rest.children}
      {required && (
        <Text style={{ color: red400, fontWeight: 'bold' }}> *</Text>
      )}
    </Text>
  );
};

export default TextView;
