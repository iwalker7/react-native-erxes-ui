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
              height={20}
              type="default"
              onPress={() => {}}
              onLongPress={() => {}}
              style={{ marginRight: 20 }}
            >
              Default
            </Button>
            <Button type="outline" onPress={() => {}} onLongPress={() => {}}>
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
              leftIconSize={20}
              type="default"
              onPress={() => {}}
              onLongPress={() => {}}
              style={{ marginRight: 20 }}
              width={200}
            >
              Default
            </Button>
            <Button
              type="outline"
              //   rightIconName="cloud-check"
              //   rightIconColor="#472D9A"
              //   rightIconSize={15}
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
                style={{ marginBottom: 10 }}
              >
                Active
              </Button>
              <Button
                type="outline"
                mode="active"
                onPress={() => {}}
                onLongPress={() => {}}
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
                style={{ marginBottom: 10 }}
              >
                Disabled
              </Button>
              <Button
                type="outline"
                mode="disabled"
                onPress={() => {}}
                onLongPress={() => {}}
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
              >
                Verify
              </Button>
              <Button
                type="outline"
                mode="verify"
                onPress={() => {}}
                onLongPress={() => {}}
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
            onPress<TextView color={Colors.grey600}>{`:  () => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Товчин дээр дарах үед дуудагдах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onLongPress
            <TextView color={Colors.grey600}>{`:  () => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>
              Товчин дээр удаан дарах үед дуудагдах функц
            </TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            icon<TextView color={Colors.grey600}>: JSX.Element</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small color={Colors.grey600}>
              {`Example: <Button icon={<Icon name="cloud-check" size={15} />}`}
            </TextView>
          </View>
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
      </ScrollView>
    </View>
  );
};

export default ButtonScreen;
