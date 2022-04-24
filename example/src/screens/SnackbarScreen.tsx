/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextView, Colors, Snackbar, Picker } from 'react-native-erxes-ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';

const SnackbarScreen: React.FC<any> = () => {
  const alerts = [
    { type: 'success', color: '#17CE65', icon: 'checkbox-marked-circle' },
    { type: 'warning', color: '#FFC82C', icon: 'alert-circle-outline' },
    { type: 'error', color: '#FF4949', icon: 'alert-circle' },
    { type: 'info', color: '#42a5f5', icon: 'information' },
  ];

  const [visible, setVisible] = React.useState<boolean>(false);
  const data = ['success', 'warning', 'error', 'info'];
  const [indexBoard, setIndexBoard] = React.useState<number>(-1);
  const [alert, setA] = useState(alerts[1]);

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Picker
          selectedIndex={indexBoard}
          data={data}
          placeholderText="Choose alert type"
          onSelect={(i: any) => {
            setIndexBoard(i);
            setA(alerts[i]);
            setVisible(true);
          }}
          icon={
            <MaterialCommunityIcons
              name={'chevron-down'}
              color="#757575"
              size={20}
            />
          }
        />
      </View>

      <Snackbar
        message="You receive an alert"
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}
        placement="top"
        type={alert.type}
        iconPosition="left"
        icon={
          <MaterialCommunityIcons
            name={alert.icon}
            color={alert.color}
            size={20}
          />
        }
      />

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
