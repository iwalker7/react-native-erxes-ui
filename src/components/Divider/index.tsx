import * as React from 'react';
import color from 'color';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
  React.ComponentPropsWithoutRef<T>,
  'children'
>;

export type DividerProps = $RemoveChildren<typeof View> & {
  /**
   *  Whether divider has a left inset.
   */
  inset?: boolean;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
};

const Divider: React.FC<DividerProps> = ({ inset, style, ...rest }) => {
  return (
    <View {...rest} style={[styles.light && inset && styles.inset, style]} />
  );
};

const styles = StyleSheet.create({
  light: {
    backgroundColor: color('#000').alpha(0.12).rgb().string(),
    height: StyleSheet.hairlineWidth,
  },
  dark: {
    backgroundColor: color('#fff').alpha(0.12).rgb().string(),
    height: StyleSheet.hairlineWidth,
  },
  inset: {
    marginLeft: 72,
  },
});

export default Divider;
