/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextView, Colors, useTheme, Avatar } from 'react-native-erxes-ui';
import images from '../../assets/images';
import styles from '../styles';

const AvatarScreen: React.FC<any> = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: 10,
          borderColor: 'transparent',
          borderBottomColor: theme.themeColors.primary,
          borderWidth: 1,
          justifyContent: 'space-around',
        }}
      >
        <View style={{ paddingBottom: 10 }}>
          <TextView>Default</TextView>
          <Avatar source={images.avatar} size={50} />
        </View>
        <View>
          <TextView>Active status</TextView>
          <Avatar active source={images.avatar} size={50} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
        <View style={styles.segment}>
          <TextView bold>
            active
            <TextView color={Colors.grey600}>{` : boolean`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Active үед badge харуулна</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            size
            <TextView
              color={Colors.grey600}
            >{` : number (default:40)`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Avatar-ын хэмжээ</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            source
            <TextView color={Colors.grey600}>{` : string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Зурагны source</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            containerStyle
            <TextView
              color={Colors.grey600}
            >{`: StyleProp<ViewStyle>`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Агуулагчийн style</TextView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AvatarScreen;
