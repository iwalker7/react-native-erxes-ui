import React from 'react';
import { View } from 'react-native';
import { TextView, Colors, Empty } from 'react-native-erxes-ui';
import images from '../../assets/images';
import styles from '../styles';

const EmptyScreen: React.FC<any> = () => {
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
            <TextView small> default | task </TextView>
          </View>
        </View>

        <View style={{ height: 200 }}>
          <Empty imageSource={images.noStage} />
        </View>
      </View>
    </View>
  );
};

export default EmptyScreen;
