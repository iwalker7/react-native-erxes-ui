/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { TextView, Colors } from 'react-native-erxes-ui';
import styles from '../styles';

// const renderItem = (prop: any) => {
//   return (
//     <View style={styles.item}>
//       <TextView color={Colors.primaryDark1}>{prop.toLowerCase()}</TextView>
//       <TextView>Sample text</TextView>
//     </View>
//   );
// };

const TextScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: 10,
          justifyContent: 'space-between',
          borderColor: 'transparent',
          borderBottomColor: Colors.surface,
          borderWidth: 1,
        }}
      >
        <View>
          <TextView bold large color={Colors.primaryDark1}>
            Size
          </TextView>
        </View>
        <View>
          <TextView xxsmall>xxsmall</TextView>
          <TextView xsmall>xsmall</TextView>
          <TextView small>small</TextView>
          <TextView large>large</TextView>
          <TextView xlarge>xlarge</TextView>
          <TextView xxlarge>xxlarge</TextView>
          <TextView xxxlarge>xxxlarge</TextView>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: 10,
          justifyContent: 'space-between',
          borderColor: 'transparent',
          borderBottomColor: Colors.surface,
          borderWidth: 1,
        }}
      >
        <View>
          <TextView bold large color={Colors.primaryDark1}>
            Style
          </TextView>
        </View>
        <View>
          <TextView bold>bold</TextView>
          <TextView boldless>boldless</TextView>
          <TextView italic>italic</TextView>
          <TextView uppercase>uppercase</TextView>
        </View>
      </View>
    </View>
  );
};

export default TextScreen;
