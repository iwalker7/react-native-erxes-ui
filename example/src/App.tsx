import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { TextView } from 'rn-erxes-ui';

export default function App() {
  return (
    <View style={styles.container}>
      <TextView>Result: 400</TextView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
