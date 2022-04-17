/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { TextView, Colors } from 'react-native-erxes-ui';
import styles from '../styles';

const CardScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.segment}>
        <TextView bold>
          containerStyle
          <TextView color={Colors.grey600}>{`: StyleProp<ViewStyle>`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Агуулагчийн style</TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          onPress
          <TextView color={Colors.grey600}>{`:  () => void`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Card дээр дарах үед дуудагдах функц</TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          children
          <TextView color={Colors.grey600}>{`: React.ReactNode`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Card дотор харуулах контент</TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          shadow
          <TextView color={Colors.grey600}>{`: boolean`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Card-ыг сүүдэрлэлттэй харуулах эсэх</TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          activeOpacity
          <TextView color={Colors.grey600}>{`: number`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Card-ын active opacity</TextView>
        </View>
      </View>
    </View>
  );
};

export default CardScreen;
