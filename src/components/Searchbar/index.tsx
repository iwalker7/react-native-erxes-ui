/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import color from 'color';
import * as React from 'react';
import {
  Platform,
  StyleSheet,
  StyleProp,
  TextInput,
  I18nManager,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { withTheme } from '../../core/theming';
import IconButton from '../Button/IconButton';
import type { IconSource } from '../Icon';
import Icon from '../Icon';
import Surface from '../Surface';

export type SearchbarProps = React.ComponentPropsWithRef<typeof TextInput> & {
  clearAccessibilityLabel?: string;
  searchAccessibilityLabel?: string;
  placeholder?: string;
  value: string;
  onChangeText?: (query: string) => void;
  closeIcon?: boolean;
  leftIconName?: IconSource;
  leftIconColor?: string;
  leftIconSize?: number;
  leftIconOnPress?: () => void;
  rightIconName?: IconSource;
  rightIconColor?: string;
  rightIconSize?: number;
  inputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  theme: ReactNativeErxes.Theme;
  clearIcon?: IconSource;
};

type TextInputHandles = Pick<
  TextInput,
  'setNativeProps' | 'isFocused' | 'clear' | 'blur' | 'focus'
>;

const Searchbar = React.forwardRef<TextInputHandles, SearchbarProps>(
  (
    {
      clearAccessibilityLabel = 'clear',
      leftIconName = 'magnify',
      leftIconColor = '#757575',
      leftIconSize = 20,
      leftIconOnPress,
      rightIconName = 'close',
      rightIconColor = '#757575',
      rightIconSize = 16,
      clearIcon = true,
      inputStyle,
      placeholder,
      searchAccessibilityLabel = 'search',
      style,
      theme,
      value,
      ...rest
    },
    ref
  ) => {
    const root = React.useRef<TextInput>(null);

    React.useImperativeHandle(ref, () => {
      const input = root.current;

      if (input) {
        return {
          focus: () => input.focus(),
          clear: () => input.clear(),
          setNativeProps: (args: TextInputProps) => input.setNativeProps(args),
          isFocused: () => input.isFocused(),
          blur: () => input.blur(),
        };
      }

      const noop = () => {
        throw new Error('TextInput is not available');
      };

      return {
        focus: noop,
        clear: noop,
        setNativeProps: noop,
        isFocused: noop,
        blur: noop,
      };
    });

    const handleClearPress = () => {
      root.current?.clear();
      rest.onChangeText?.('');
    };

    const { colors, roundness, dark, fonts } = theme;
    const textColor = colors.text;
    const font = fonts.regular;
    const iconColor = dark
      ? textColor
      : color(textColor).alpha(0.54).rgb().string();
    const rippleColor = color(textColor).alpha(0.32).rgb().string();

    return (
      <Surface
        style={[
          { borderRadius: roundness, elevation: 2 },
          styles.container,
          style,
        ]}
      >
        <IconButton
          // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
          accessibilityTraits="button"
          accessibilityComponentType="button"
          accessibilityRole="button"
          borderless
          rippleColor={rippleColor}
          onPress={leftIconOnPress}
          color={iconColor}
          icon={
            leftIconName &&
            (() => (
              <Icon
                source={leftIconName}
                color={leftIconColor}
                size={leftIconSize}
              />
            ))
          }
          accessibilityLabel={searchAccessibilityLabel}
        />
        <TextInput
          style={[
            styles.input,
            {
              color: textColor,
              ...font,
              ...Platform.select({ web: { outline: 'none' } }),
            },
            inputStyle,
          ]}
          placeholder={placeholder || ''}
          placeholderTextColor={colors.placeholder}
          selectionColor={colors.primary}
          underlineColorAndroid="transparent"
          returnKeyType="search"
          keyboardAppearance={dark ? 'dark' : 'light'}
          // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
          accessibilityTraits="search"
          accessibilityRole="search"
          ref={root}
          value={value}
          {...rest}
        />
        <IconButton
          borderless
          disabled={!value}
          accessibilityLabel={clearAccessibilityLabel}
          color={value ? iconColor : 'rgba(255, 255, 255, 0)'}
          rippleColor={rippleColor}
          onPress={handleClearPress}
          icon={
            clearIcon &&
            (() => (
              <Icon
                source={rightIconName}
                color={rightIconColor}
                size={rightIconSize}
              />
            ))
          }
          // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
          accessibilityTraits="button"
          accessibilityComponentType="button"
          accessibilityRole="button"
        />
      </Surface>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 8,
    alignSelf: 'stretch',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    minWidth: 0,
  },
});

export default withTheme(Searchbar);
