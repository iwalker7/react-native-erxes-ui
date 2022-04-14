import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { TextView } from 'react-native-erxes-ui';

export default function App() {
  return (
    <View style={styles.container}>
      <TextView color="#673FBD">
        erxes Inc ui lib by{' '}
        <TextView bold large color="mediumvioletred">
          Itgel.G
        </TextView>
      </TextView>
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
