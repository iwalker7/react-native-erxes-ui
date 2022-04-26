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

export type EmptyProps = {
  text?: string;
  imageSource?: any;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const Empty: React.FC<EmptyProps> = ({
  text,
  imageSource,
  containerStyle,
  textStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={imageSource} resizeMode="contain" style={styles.image} />
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
