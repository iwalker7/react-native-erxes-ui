/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image } from 'react-native';
import { TextView, Colors } from 'react-native-erxes-ui';
import images from '../../assets/images';
import styles from '../styles';

const AlertScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.segment}>
        <TextView bold>{'useAlert()'}</TextView>
      </View>

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

      <View style={[styles.segment, { height: 60 }]}>
        <View style={{ height: 20, marginBottom: 20 }}>
          <Image
            source={images.alertSuccess}
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 5,
            }}
          />
        </View>
        <View style={{ height: 33 }}>
          <Image
            source={images.alertError}
            style={{ width: '100%', height: undefined, aspectRatio: 10 }}
          />
        </View>
        {/* <View style={{ height: 30, marginVertical: 5 }}>
          <Image
            source={images.alertInfo}
            style={{ width: '100%', height: undefined, aspectRatio: 12 }}
          />
        </View> */}
      </View>
    </View>
  );
};

export default AlertScreen;
