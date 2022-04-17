/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  View,
  StyleProp,
  ViewProps,
} from 'react-native';

export type LoaderProps = ViewProps & {
  backgroundColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const Loader: React.FC<LoaderProps> = ({ backgroundColor, style, color }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor || 'rgba(255, 255, 255, 0.4)',
          },
          style,
        ]}
      >
        <ActivityIndicator size="small" color={color || '#5629B6'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
});

export default Loader;
