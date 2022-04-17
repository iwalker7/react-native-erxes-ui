/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, View, StyleProp, ImageProps } from 'react-native';
import Colors from 'src/style/colors';
import images from 'example/assets/images';

export type AvatarProps = ImageProps & {
  size?: number;
  isActive?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  source: string;
};

const Avatar: React.FC<AvatarProps> = ({
  size,
  isActive,
  containerStyle,
  source,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: size ? size : 40,
          height: size ? size : 40,
        },
        containerStyle,
      ]}
    >
      <Image source={source || images.avatar} style={styles.image} />
      {isActive && <View style={styles.active}></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  image: {
    borderRadius: 20,
  },
  active: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: Colors.success,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default Avatar;
