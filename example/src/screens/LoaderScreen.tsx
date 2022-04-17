/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { TextView, Colors, Loader } from 'react-native-erxes-ui';
import styles from '../styles';

const LoaderScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
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
            <TextView small> default | full </TextView>
          </View>
        </View>

        <View style={{ height: 50, flexDirection: 'row' }}>
          <Loader />
          <Loader color="red" />
          <Loader />
        </View>
      </View>
    </View>
  );
};

export default LoaderScreen;
