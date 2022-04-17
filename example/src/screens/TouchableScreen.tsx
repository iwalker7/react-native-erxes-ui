import React from 'react';
import { View } from 'react-native';
import { TextView, Colors } from 'react-native-erxes-ui';
import styles from '../styles';

const TouchableScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <TextView bold color={Colors.primaryDark1}>
        Touchable screen
      </TextView>
    </View>
  );
};

export default TouchableScreen;
