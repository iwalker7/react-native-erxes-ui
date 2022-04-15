import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export type CardProp = {
  containerStyle?: StyleProp<ViewStyle>;
  activeOpacity?: number | undefined;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  shadow?: boolean;
};

const Card: React.FC<CardProp> = ({
  containerStyle,
  activeOpacity,
  onPress,
  style,
  children,
  shadow = true,
}) => {
  return (
    <TouchableOpacity
      style={containerStyle}
      activeOpacity={activeOpacity || 1}
      onPress={() => onPress && onPress()}
    >
      <View style={[shadow ? styles.shadow : styles.noShadow, style]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noShadow: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default Card;
