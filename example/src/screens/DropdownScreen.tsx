/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextView, Colors, Dropdown } from 'react-native-erxes-ui';
import styles from '../styles';

const DropdownScreen: React.FC<any> = () => {
  const data = ['EXM', 'ERXES'];
  const [indexBoard, setIndexBoard] = useState<number>(-1);
  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Dropdown
          selectedIndex={indexBoard}
          data={data}
          onSelect={(i: any) => setIndexBoard(i)}
        />
      </View>

      <View style={styles.segment}>
        <TextView bold>
          selectedIndex
          <TextView color={Colors.grey600}>{`: number`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Сонгодсон элементийн индекс</TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          data
          <TextView color={Colors.grey600}>{`: any[ ]`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Сонгож болох өгөгдөлүүд</TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          onSelect
          <TextView color={Colors.grey600}>{`: (i: number) => void`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>
            Аль нэг өгөгдөл сонгодсоны дараа дуудагдах функц
          </TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          containerStyle
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

export default DropdownScreen;
