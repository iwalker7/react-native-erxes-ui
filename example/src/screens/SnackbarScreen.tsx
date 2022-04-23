import React from 'react';
import { View } from 'react-native';
import { TextView, Colors, Snackbar, Button } from 'react-native-erxes-ui';
import styles from '../styles';

const SnackbarScreen: React.FC<any> = () => {
  const [visible, onVisible] = React.useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Snackbar
        text="this is"
        visible={visible}
        backgroundColor={Colors.Brand.success}
        onDismiss={() => {}}
      >
        {'sss'}
      </Snackbar>
      <View style={styles.segment}>
        <Button onPress={() => onVisible(!visible)}>Click me</Button>
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

export default SnackbarScreen;
