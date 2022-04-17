import React from 'react';
import { View } from 'react-native';
import { TextView, Colors, Empty } from 'react-native-erxes-ui';
import styles from '../styles';

const EmptyScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <TextView bold color={Colors.primaryDark1}>
        Empty screen
      </TextView>
      <Empty />
    </View>
  );
};

export default EmptyScreen;
