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
import Icon from '../Icon';

export type EmptyProps = {
  text?: string;
  imageSource?: any;
  iconColor?: string;
  iconName?: string;
  iconSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const Empty: React.FC<EmptyProps> = ({
  text,
  imageSource,
  containerStyle,
  textStyle,

  iconColor,
  iconName,
  iconSize = 16,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {iconName ? (
        <Icon
          name={iconName || 'box'}
          size={iconSize || 20}
          color={iconColor || '#000'}
          source={undefined}
        />
      ) : (
        <Image
          source={imageSource || require('../../assets/images/box.png')}
          resizeMode="contain"
          style={[styles.image, imageSource === undefined && { opacity: 0.3 }]}
        />
      )}
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
