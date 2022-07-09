/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextView, Colors, Button, useTheme } from 'react-native-erxes-ui';
import styles from '../styles';

const ButtonScreen: React.FC<any> = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
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
              <TextView small>contained | outlined</TextView>
            </View>
          </View>

          <TextView>Without icon</TextView>
          <View style={{ flexDirection: 'row' }}>
            <Button
              type="contained"
              onPress={() => {}}
              onLongPress={() => {}}
              width={90}
              style={{ margin: 3 }}
            >
              Default
            </Button>
            <Button
              width={90}
              style={{ margin: 3 }}
              type="outlined"
              onPress={() => {}}
              onLongPress={() => {}}
            >
              Outlined
            </Button>
            <Button
              width={90}
              style={{ margin: 3 }}
              type="text"
              onPress={() => {}}
              onLongPress={() => {}}
            >
              Text
            </Button>
          </View>

          <TextView>With icon</TextView>
          <View style={{ flexDirection: 'row' }}>
            <Button
              leftIconName="cloud-check"
              leftIconSize={15}
              type="contained"
              onPress={() => {}}
              onLongPress={() => {}}
              width={90}
              style={{ margin: 3 }}
              containerStyle={{ marginRight: 20 }}
            >
              Default
            </Button>
            <Button
              width={90}
              type="text"
              rightIconName="cloud-check"
              rightIconColor={Colors.amber900}
              rightIconSize={15}
              onPress={() => {}}
              onLongPress={() => {}}
              style={{ margin: 3 }}
            >
              Outlined
            </Button>
            <Button
              width={90}
              type="text"
              rightIconName="cloud-check"
              rightIconColor={Colors.amber900}
              rightIconSize={15}
              onPress={() => {}}
              onLongPress={() => {}}
              style={{ margin: 3 }}
            >
              Text
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
                type="contained"
                mode="active"
                onPress={() => {}}
                onLongPress={() => {}}
                width={90}
                containerStyle={{ margin: 5 }}
              >
                Active
              </Button>
              <Button
                type="outlined"
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
                type="contained"
                mode="disabled"
                onPress={() => {}}
                onLongPress={() => {}}
                width={90}
                containerStyle={{ margin: 5 }}
              >
                Disabled
              </Button>
              <Button
                type="outlined"
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
                type="contained"
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
                type="outlined"
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
