import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import images from '../../assets/images';

export type EmptyProps = {
  iconColor?: string;
  iconName?: string;
  iconStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const Empty: React.FC<EmptyProps> = ({ textStyle, text, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={images.no_stage}
        resizeMode="contain"
        style={styles.image}
      />
      <Text maxFontSizeMultiplier={1} style={[styles.text, textStyle]}>
        {text ? text : 'There is no data'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  image: {
    height: 100,
    borderRadius: 20,
  },
  defaultIcon: {
    marginVertical: 10,
  },
  text: {
    color: '#000',
    marginTop: 10,
  },
});

export default Empty;
