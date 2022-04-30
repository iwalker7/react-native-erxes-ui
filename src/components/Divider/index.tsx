import * as React from 'react';
import color from 'color';
import type { StyleProp } from 'react-native';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { withTheme } from '../../core/theming';
import { black, white } from '../../styles/colors';

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
  React.ComponentPropsWithoutRef<T>,
  'children'
>;

export type DividerProps = $RemoveChildren<typeof View> & {
  inset?: boolean;
  style?: StyleProp<ViewStyle>;
  theme: ReactNativeErxes.Theme;
};

const Divider: React.FC<DividerProps> = ({ inset, style, theme, ...rest }) => {
  const { dark: isDarkTheme } = theme;
  return (
    <View
      {...rest}
      style={[
        isDarkTheme ? styles.dark : styles.light,
        inset && styles.inset,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  light: {
    backgroundColor: color(black).alpha(0.12).rgb().string(),
    height: StyleSheet.hairlineWidth,
  },
  dark: {
    backgroundColor: color(white).alpha(0.12).rgb().string(),
    height: StyleSheet.hairlineWidth,
  },
  inset: {
    marginLeft: 72,
  },
});

export default withTheme(Divider);
