/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextView, Colors, Button } from 'react-native-erxes-ui';
import styles from '../styles';

const ButtonScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
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
              <TextView small>default | outline</TextView>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextView style={{ marginRight: 42 }}>Without icon</TextView>
            <Button
              type="default"
              onPress={() => {}}
              onLongPress={() => {}}
              width={90}
              containerStyle={{ marginRight: 20 }}
            >
              Default
            </Button>
            <Button
              width={90}
              containerStyle={{ marginRight: 20 }}
              type="outline"
              onPress={() => {}}
              onLongPress={() => {}}
            >
              Outlined
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}
          >
            <TextView style={{ marginRight: 61 }}>With icon</TextView>
            <Button
              leftIconName="cloud-check"
              leftIconSize={15}
              type="default"
              onPress={() => {}}
              onLongPress={() => {}}
              width={90}
              containerStyle={{ marginRight: 20 }}
            >
              Default
            </Button>
            <Button
              width={90}
              type="outline"
              rightIconName="cloud-check"
              rightIconColor={Colors.amber900}
              rightIconSize={15}
              onPress={() => {}}
              onLongPress={() => {}}
            >
              Outlined
            </Button>
          </View>
        </View>

        <View style={styles.segment}>
          <View style={styles.props}>
            <TextView bold>
              mode<TextView color={Colors.grey600}>: string</TextView>
            </TextView>

            <View
              style={{
                backgroundColor: Colors.grey200,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <TextView small>active | disabled | verify</TextView>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}
          >
            <View>
              <Button
                type="default"
                mode="active"
                onPress={() => {}}
                onLongPress={() => {}}
                width={90}
                containerStyle={{ margin: 5 }}
              >
                Active
              </Button>
              <Button
                type="outline"
                mode="active"
                onPress={() => {}}
                onLongPress={() => {}}
                width={90}
                containerStyle={{ margin: 5 }}
              >
                Active
              </Button>
            </View>

            <View>
              <Button
                type="default"
                mode="disabled"
                onPress={() => {}}
                onLongPress={() => {}}
                width={90}
                containerStyle={{ margin: 5 }}
              >
                Disabled
              </Button>
              <Button
                type="outline"
                mode="disabled"
                onPress={() => {}}
                onLongPress={() => {}}
                width={90}
                containerStyle={{ margin: 5 }}
              >
                Disabled
              </Button>
            </View>
            <View>
              <Button
                type="default"
                mode="verify"
                onPress={() => {}}
                onLongPress={() => {}}
                style={{ marginBottom: 10 }}
                width={90}
                containerStyle={{ margin: 5 }}
              >
                Verify
              </Button>
              <Button
                type="outline"
                mode="verify"
                onPress={() => {}}
                onLongPress={() => {}}
                width={90}
                containerStyle={{ margin: 5 }}
              >
                Verify
              </Button>
            </View>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            block<TextView color={Colors.grey600}>: boolean</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Өргөнийг 100% байхаар тооцож харуулна</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            leftIconName
            <TextView color={Colors.grey600}>: string</TextView>
          </TextView>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            leftIconColor
            <TextView color={Colors.grey600}>: string</TextView>
          </TextView>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            leftIconSize
            <TextView color={Colors.grey600}>: number</TextView>
          </TextView>
        </View>
      </ScrollView>
    </View>
  );
};

export default ButtonScreen;
