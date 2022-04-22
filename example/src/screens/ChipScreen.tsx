/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { TextView, Colors, Chip } from 'react-native-erxes-ui';
import styles from '../styles';

const ChipScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <Chip text="User" mode="outline" type="avatar" />
      <View style={styles.segment}>
        <TextView bold>
          onPress
          <TextView color={Colors.grey600}>{`:  () => void`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Дээр нь дарах үед дуудагдах функц</TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          onLongPress
          <TextView color={Colors.grey600}>{`:  () => void`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Дээр нь удаан дарах үед дуудагдах функц</TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          style
          <TextView color={Colors.grey600}>{`: StyleProp<ViewStyle>`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Агуулагчийн style</TextView>
        </View>
      </View>
    </View>
  );
};

export default ChipScreen;
