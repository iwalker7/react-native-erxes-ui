/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { TextView, useTheme, RadioButton } from 'react-native-erxes-ui';
import styles from '../styles';

const RadioButtonScreen: React.FC<any> = () => {
  // const theme = useTheme();
  const [value, setValue] = React.useState('first');

  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <TextView>
          Сонгосон: <TextView bold>{value}</TextView>
        </TextView>
      </View>

      <RadioButton.Group
        onValueChange={(val: any) => setValue(val)}
        value={value}
      >
        <RadioButton.Item label="First item" value="first" />
        <RadioButton.Item label="Second item" value="second" />
      </RadioButton.Group>
    </View>
  );
};

export default RadioButtonScreen;
