/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { TextView, Colors, SwipeableList } from 'react-native-erxes-ui';
import styles from '../styles';

const SwipeableListScreen: React.FC<any> = () => {
  const data = [
    { id: '1', text: 'Item1' },
    { id: '2', text: 'item2' },
    { id: '3', text: 'item3' },
  ];
  return (
    <View style={styles.container}>
      <SwipeableList data={data} />
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
            <TextView small> default | task </TextView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SwipeableListScreen;
