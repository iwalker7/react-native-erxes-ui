/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, View, StyleProp, ImageProps } from 'react-native';
import images from '../../assets/images';

export type AvatarProps = ImageProps & {
  size?: number;
  active?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  uri: string;
};

const Avatar: React.FC<AvatarProps> = ({
  size,
  active,
  containerStyle,
  uri,
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
      <Image
        source={typeof uri !== 'string' ? images.avatar : { uri: source }}
        resizeMode={'cover'}
        style={[styles.image, { borderRadius: size ? size : 40 }]}
      />
      {active && (
        <View
          style={{
            width: size ? size / 6 : 8,
            height: size ? size / 6 : 8,
            borderRadius: size ? size / 6 : 8,
            backgroundColor: '#17CE65',
            position: 'absolute',
            bottom: size ? size / 80 : 0,
            right: size ? size / 80 : 0,
          }}
        />
      )}
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
    borderColor: '#F1EFF9',
    borderWidth: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});

export default Avatar;
