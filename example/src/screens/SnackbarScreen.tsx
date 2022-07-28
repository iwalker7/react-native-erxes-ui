/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextView, Colors, Button } from 'react-native-erxes-ui';
import styles from '../styles';
import { useAlert } from '../App';
const SnackbarScreen: React.FC<any> = () => {
  const alert = useAlert();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
        <View style={styles.segment}>
          <View style={styles.props}>
            <TextView bold>
              placement<TextView color={Colors.grey600}>: string</TextView>
            </TextView>

            <View
              style={{
                backgroundColor: Colors.grey200,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <TextView small> top | bottom </TextView>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Button
              onPress={() => {
                alert.warn('alert');
                console.log('...');
              }}
            >
              Click me
            </Button>
          </View>
        </View>

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
              <TextView small> success | warning | info | error </TextView>
            </View>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            duration
            <TextView color={Colors.grey600}>{`: number`}</TextView>
          </TextView>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            message
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onDismiss
            <TextView color={Colors.grey600}>{`: () => void`}</TextView>
          </TextView>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            action
            <TextView
              color={Colors.grey600}
            >{`: { label: string; onPress: ()=> void (ButtonProps)`}</TextView>
          </TextView>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            icon
            <TextView color={Colors.grey600}>{`: JSX.Element`}</TextView>
          </TextView>
        </View>

        <View style={styles.segment}>
          <View style={styles.props}>
            <TextView bold>
              iconPosition<TextView color={Colors.grey600}>: string</TextView>
            </TextView>

            <View
              style={{
                backgroundColor: Colors.grey200,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <TextView small> left | right </TextView>
            </View>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            wrapperStyle
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
            textStyle
            <TextView
              color={Colors.grey600}
            >{`: StyleProp<TextStyle>`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Message style</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            ref
            <TextView
              color={Colors.grey600}
            >{`: LegacyRef<TouchableOpacity | any>`}</TextView>
          </TextView>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            theme
            <TextView
              color={Colors.grey600}
            >{`: ReactNativeErxes.Theme`}</TextView>
          </TextView>
        </View>
      </ScrollView>
    </View>
  );
};

export default SnackbarScreen;
