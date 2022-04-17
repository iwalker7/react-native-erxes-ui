/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { TextView, Colors, Button } from 'react-native-erxes-ui';
import { ScrollView } from 'react-native-gesture-handler';
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
            <Button
              type="default"
              onPress={() => console.log('pressed')}
              onLongPress={() => console.log('pressed')}
              style={{ marginRight: 20 }}
            >
              Default
            </Button>
            <Button
              type="outline"
              onPress={() => console.log('pressed')}
              onLongPress={() => console.log('pressed')}
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
                onPress={() => console.log('pressed')}
                onLongPress={() => console.log('pressed')}
                style={{ marginBottom: 10 }}
              >
                Active
              </Button>
              <Button
                type="outline"
                mode="active"
                onPress={() => console.log('pressed')}
                onLongPress={() => console.log('pressed')}
              >
                Active
              </Button>
            </View>

            <View>
              <Button
                type="default"
                mode="disabled"
                onPress={() => console.log('pressed')}
                onLongPress={() => console.log('pressed')}
                style={{ marginBottom: 10 }}
              >
                Disabled
              </Button>
              <Button
                type="outline"
                mode="disabled"
                onPress={() => console.log('pressed')}
                onLongPress={() => console.log('pressed')}
              >
                Disabled
              </Button>
            </View>
            <View>
              <Button
                type="default"
                mode="verify"
                onPress={() => console.log('pressed')}
                onLongPress={() => console.log('pressed')}
                style={{ marginBottom: 10 }}
              >
                Verify
              </Button>
              <Button
                type="outline"
                mode="verify"
                onPress={() => console.log('pressed')}
                onLongPress={() => console.log('pressed')}
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
            hasIcon<TextView color={Colors.grey600}>: boolean</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Товч icon-той эсэх</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            iconName<TextView color={Colors.grey600}>: string</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>icon-ы нэр</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <View style={styles.props}>
            <TextView bold>
              iconSrc<TextView color={Colors.grey600}>: string</TextView>
            </TextView>
            <View
              style={{
                backgroundColor: Colors.grey200,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <TextView small>core | team</TextView>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Товчинд харагдах icon</TextView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ButtonScreen;
