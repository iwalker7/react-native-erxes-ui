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
