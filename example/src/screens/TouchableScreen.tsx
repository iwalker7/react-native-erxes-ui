import React from 'react';
import { View } from 'react-native';
import { TextView, Colors } from 'react-native-erxes-ui';
import styles from '../styles';

const TouchableScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.segment}>
        <TextView
          bold
          color={Colors.grey600}
        >{`Props + React native-ын TouchableOpacityProps`}</TextView>
      </View>

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

      <View style={styles.segment}>
        <TextView bold>
          ref
          <TextView
            color={Colors.grey600}
          >{`: LegacyRef<TouchableOpacity | any>`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Reference</TextView>
        </View>
      </View>
    </View>
  );
};

export default TouchableScreen;
