import React from 'react';
import { View } from 'react-native';
import { TextView, Colors } from 'react-native-erxes-ui';
import styles from '../styles';

const ButtonScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <TextView bold color={Colors.primaryDark1}>
        Button screen
      </TextView>
      {/* <Button>hi</Button> */}
    </View>
  );
};

export default ButtonScreen;
