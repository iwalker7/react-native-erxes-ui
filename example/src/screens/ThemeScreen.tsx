/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextView, Colors } from 'react-native-erxes-ui';
import ScreenWrapper from '../ScreenWrapper';

const ThemeScreen: React.FC<any> = () => {
  return <View style={styles.content}></View>;
};

const styles = StyleSheet.create({
  content: {
    padding: 24,
    alignItems: 'center',
  },
  surface: {
    margin: 24,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThemeScreen;
