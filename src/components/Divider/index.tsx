// import * as React from 'react';
// import color from 'color';
// import type { StyleProp } from 'react-native';
// import type { ViewStyle } from 'react-native';
// import { StyleSheet, View } from 'react-native';
// import { withTheme } from 'src/core/theming';

// export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
// export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
//   React.ComponentPropsWithoutRef<T>,
//   'children'
// >;

// export type DividerProps = $RemoveChildren<typeof View> & {
//   inset?: boolean;
//   style?: StyleProp<ViewStyle>;
//   theme: ReactNativeErxes.Theme;
// };

// const Divider: React.FC<DividerProps> = ({ inset, style, theme, ...rest }) => {
//   const { dark: isDarkTheme } = theme;
//   return (
//     <View
//       {...rest}
//       style={[
//         isDarkTheme ? styles.dark : styles.light,
//         inset && styles.inset,
//         style,
//       ]}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   light: {
//     backgroundColor: color('#000').alpha(0.12).rgb().string(),
//     height: StyleSheet.hairlineWidth,
//   },
//   dark: {
//     backgroundColor: color('#fff').alpha(0.12).rgb().string(),
//     height: StyleSheet.hairlineWidth,
//   },
//   inset: {
//     marginLeft: 72,
//   },
// });

// export default withTheme(Divider);

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export type DividerProps = {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const Divider: React.FC<DividerProps> = ({ style, color, size }) => {
  return (
    <View
      style={[
        {
          backgroundColor: color ? color : '#bdbdbd',
          height: size ? size : StyleSheet.hairlineWidth,
          width: '100%',
        },
        style,
      ]}
    />
  );
};

export default Divider;
