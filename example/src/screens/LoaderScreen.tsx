/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { TextView, Colors, Loader, useTheme } from 'react-native-erxes-ui';
import styles from '../styles';

const LoaderScreen: React.FC<any> = () => {
  const theme = useTheme();

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
          <Loader color={theme.themeColors.accent} />
          <Loader color={Colors.grey600} />
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          color
          <TextView color={Colors.grey600}>{`: string`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small> default loader-ын өнгө</TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          backgroundColor
          <TextView color={Colors.grey600}>{`: string`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small> full loader-ын арын өнгө</TextView>
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
    </View>
  );
};

export default LoaderScreen;
