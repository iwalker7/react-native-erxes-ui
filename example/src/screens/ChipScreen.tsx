/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextView, Colors, Chip } from 'react-native-erxes-ui';
import styles from '../styles';

const ChipScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      {/* <Chip text="User" mode="outline" index={0} /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
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
              <TextView small> flat | outline </TextView>
            </View>
          </View>
        </View>
        <View style={styles.segment}>
          <View style={styles.props}>
            <TextView bold>
              index<TextView color={Colors.grey600}>: number</TextView>
            </TextView>
          </View>
        </View>
        <View style={styles.segment}>
          <View style={styles.props}>
            <TextView bold>
              text<TextView color={Colors.grey600}>: string</TextView>
            </TextView>
          </View>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            icon<TextView color={Colors.grey600}>: JSX.Element</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small color={Colors.grey600} style={{ marginBottom: 5 }}>
              {`Icon эсвэл зураг`}
            </TextView>
            <TextView small color={Colors.grey600}>
              {`<Chip icon={<Icon name="cloud-check" size={15} />}`}
            </TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            removeIcon<TextView color={Colors.grey600}>: JSX.Element</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small color={Colors.grey600} style={{ marginBottom: 5 }}>
              {`Icon эсвэл зураг`}
            </TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            removable<TextView color={Colors.grey600}>: boolean</TextView>
          </TextView>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            disabled<TextView color={Colors.grey600}>: boolean</TextView>
          </TextView>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            selectedColor<TextView color={Colors.grey600}>: string</TextView>
          </TextView>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            onRemove
            <TextView color={Colors.grey600}>{`:  () => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Remove хийгдэх үед дуудагдах функц</TextView>
          </View>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            onPress
            <TextView color={Colors.grey600}>{`:  () => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Дээр нь дарах үед дуудагдах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onLongPress
            <TextView color={Colors.grey600}>{`:  () => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Дээр нь удаан дарах үед дуудагдах функц</TextView>
          </View>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            textStyle
            <TextView
              color={Colors.grey600}
            >{`: StyleProp<TextStyle>`}</TextView>
          </TextView>
        </View>
        <View style={styles.segment}>
          <TextView bold>
            containerStyle
            <TextView
              color={Colors.grey600}
            >{`: StyleProp<ViewStyle>`}</TextView>
          </TextView>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChipScreen;
