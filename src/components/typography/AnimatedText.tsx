/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { Animated, TextStyle, I18nManager, StyleProp } from 'react-native';
import { withTheme } from '../../core/theming';

type Props = React.ComponentPropsWithRef<typeof Animated.Text> & {
  style?: StyleProp<TextStyle>;
  theme: ReactNativeErxes.Theme;
};

function AnimatedText({ style, theme, ...rest }: Props) {
  const writingDirection = I18nManager.isRTL ? 'rtl' : 'ltr';

  return (
    <Animated.Text
      {...rest}
      style={[
        {
          textAlign: 'left',
          color: theme.colors.textPrimary,
          writingDirection,
          fontSize: 14,
        },
        style,
      ]}
    />
  );
}

export default withTheme(AnimatedText);
