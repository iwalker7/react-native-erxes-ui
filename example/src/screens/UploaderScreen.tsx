/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextView, Colors } from 'react-native-erxes-ui';
import styles from '../styles';

const UplaoderScreen: React.FC<any> = () => {
  const [visible, onVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.segment}>{/* <Uploader> */}</View>

      <View style={styles.segment}>
        <View style={styles.props}>
          <TextView bold>
            type<TextView color={Colors.grey600}>: string</TextView>
          </TextView>

          <View
            style={{
              backgroundColor: Colors.grey200,
              padding: 5,
              borderRadius: 5,
            }}
          >
            <TextView small> info | success | warning | error </TextView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UplaoderScreen;
