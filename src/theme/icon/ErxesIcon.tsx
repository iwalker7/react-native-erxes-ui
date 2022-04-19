/* eslint-disable quotes */
import * as React from 'react';
import { StyleSheet, Text, Platform, TextProps, ViewProps } from 'react-native';

export type IconProps = {
  name: string;
  color: string;
  size: number;
  direction: 'rtl' | 'ltr';
  allowFontScaling?: boolean;
};

let ErxesIcons: React.ComponentType<
  TextProps & {
    name: string;
    color: string;
    size: number;
    pointerEvents?: ViewProps['pointerEvents'];
  }
>;

try {
  // Optionally require vector-icons
  ErxesIcons = require('./IconCore').default;
} catch (e) {
  let isErrorLogged = false;

  // Fallback component for icons
  ErxesIcons = ({ name, color, size, ...rest }) => {
    if (!isErrorLogged) {
      if (
        !/(Cannot find module|Module not found|Cannot resolve module)/.test(
          (e as any).message
        )
      ) {
        console.error(e);
      }

      console.warn(
        `Tried to use the icon '${name}' in a component from 'erxes', but 'IconCore' could not be loaded.`,
        `To remove this warning, try installing 'react-native-vector-icons' and create custom icon with erxes-icon`
      );

      isErrorLogged = true;
    }

    return (
      <Text
        {...rest}
        style={[styles.icon, { color, fontSize: size }]}
        // @ts-expect-error: Text doesn't support this, but it seems to affect TouchableNativeFeedback
        pointerEvents="none"
        selectable={false}
      >
        □
      </Text>
    );
  };
}

export const accessibilityProps =
  Platform.OS === 'web'
    ? {
        role: 'img',
        focusable: false,
      }
    : {
        accessibilityElementsHidden: true,
        importantForAccessibility:
          'no-hide-descendants' as 'no-hide-descendants',
      };

const defaultIcon = ({
  name,
  color,
  size,
  direction,
  allowFontScaling,
}: IconProps) => (
  <ErxesIcons
    allowFontScaling={allowFontScaling}
    name={name}
    color={color}
    size={size}
    style={[
      {
        transform: [{ scaleX: direction === 'rtl' ? -1 : 1 }],
        lineHeight: size,
      },
      styles.icon,
    ]}
    pointerEvents="none"
    selectable={false}
    {...accessibilityProps}
  />
);

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent',
  },
});

export default defaultIcon;
