import React from 'react';
import { View } from 'react-native';
import { TextView, Colors } from 'react-native-erxes-ui';
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
    </View>
  );
};

export default AlertScreen;
