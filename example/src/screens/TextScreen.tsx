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
          alignContent: 'center',
          borderColor: 'transparent',
          borderBottomColor: Colors.surface,
          borderWidth: 1,
        }}
      >
        <View style={{ width: '25%', alignContent: 'flex-start' }}>
          <TextView bold large>
            Size
          </TextView>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}
          >
            <TextView xxsmall>xxsmall</TextView>
            <TextView xsmall>xsmall</TextView>
            <TextView small>small</TextView>
            <TextView large>large</TextView>
          </View>
          <View
            style={{
              width: '75%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <TextView xlarge>xlarge</TextView>
            <TextView xxlarge>xxlarge</TextView>
            <TextView xxxlarge>xxxlarge</TextView>
          </View>
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
          <TextView bold large>
            Style
          </TextView>
        </View>
        <View
          style={{
            width: '75%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
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
