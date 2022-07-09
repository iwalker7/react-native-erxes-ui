/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextView, RadioButton, Colors } from 'react-native-erxes-ui';
import styles from '../styles';

const RadioButtonScreen: React.FC<any> = () => {
  const [value, setValue] = React.useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
        <TextView large bold style={{ marginTop: 20 }}>
          RadioButton.Group
          <TextView>{value}</TextView>
        </TextView>

        <View style={styles.segment}>
          <TextView bold>
            value
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Сонгогдсон утга</TextView>
          </View>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            onValueChange
            <TextView
              color={Colors.grey600}
            >{`: (value: string) => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>
              RadioButton.Item -аас утга сонгогдоход дуудагдах функц
            </TextView>
          </View>
        </View>

        <TextView large bold style={{ marginTop: 20 }}>
          RadioButton.Item
        </TextView>

        <View style={styles.segment}>
          <View style={styles.props}>
            <TextView bold>
              position<TextView color={Colors.grey600}>: string </TextView>
            </TextView>

            <View
              style={{
                backgroundColor: Colors.grey200,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <TextView small>leading | trailing </TextView>
            </View>
          </View>
          <RadioButton.Group
            onValueChange={(val: any) => setValue(val)}
            value={value}
          >
            <RadioButton.Item label="Leading position" value={false} />
            <RadioButton.Item
              position="trailing"
              label="Trailing position"
              value={true}
              style={{ width: 150 }}
            />
          </RadioButton.Group>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            color
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>RadioButton-ы өнгө</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            labelColor
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Label өнгө</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            uncheckedColor
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Сонгогдоогүй RadioButton-ы өнгө</TextView>
          </View>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            style
            <TextView
              color={Colors.grey600}
            >{`: StyleProp<ViewStyle>`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Агуулагчийн style</TextView>
          </View>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            labelStyle
            <TextView
              color={Colors.grey600}
            >{`: StyleProp<TextStyle>`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Label style</TextView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RadioButtonScreen;
