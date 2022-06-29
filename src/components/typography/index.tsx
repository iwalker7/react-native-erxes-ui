/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import { withTheme } from '../../core/theming';
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
  primary?: boolean;
  secondary?: boolean;
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
  theme: ReactNativeErxes.Theme;
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
  primary = true,
  secondary = false,
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
  theme,
  ...rest
}) => {
  return (
    <Text
      style={[
        { fontSize: 14, color: theme.colors.textPrimary },
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
        primary && { color: theme.colors.textPrimary },
        secondary && { color: theme.colors.textSecondary },
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

export default withTheme(TextView);
