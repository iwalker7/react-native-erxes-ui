/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Checkbox, useTheme } from 'react-native-erxes-ui';
import styles from '../styles';

const CheckboxScreen: React.FC<any> = () => {
  const theme = useTheme();
  const [checkedDefault, setCheckedDefault] = React.useState<boolean>(true);
  return (
    <View style={styles.container}>
      <Checkbox.Item
        theme={theme}
        label="Default (will look like whatever system this is running on)"
        status={checkedDefault ? 'checked' : 'unchecked'}
        onPress={() => setCheckedDefault(!checkedDefault)}
      />
    </View>
  );
};

export default CheckboxScreen;
