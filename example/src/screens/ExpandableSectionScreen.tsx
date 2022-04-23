/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  TextView,
  ExpandableSection,
  Avatar,
  Colors,
} from 'react-native-erxes-ui';
import styles from '../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ExpandableSectionScreen: React.FC<any> = () => {
  const [visible, onVisible] = useState(false);
  const header = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextView bold>Expand me</TextView>
        <MaterialCommunityIcons
          name={visible ? 'chevron-up' : 'chevron-down'}
          color="#757575"
          size={15}
        />
      </View>
    );
  };
  return (
    <View style={[styles.container, { paddingTop: 5 }]}>
      <ExpandableSection
        expanded={visible}
        setExpanded={onVisible}
        sectionHeader={header()}
      >
        <View
          style={{
            padding: 10,
          }}
        >
          <Avatar />
          <TextView center style={{ marginTop: 10 }}>
            Lorem ipsum dolor sit amet, elit. laoreet risus, ats finibus turpis.
            Mauris ornare accumsan sempesdr. Morbi quis leo dolor. Nulla
            venenatis nulla quis nisi laoreet, vitae feugiat lectus ornare. Nunc
            iaculis, mi eget fringilla venenatis, orci libero posuere magna, et
          </TextView>
        </View>
      </ExpandableSection>

      <View style={styles.segment}>
        <TextView bold>
          sectionHeader
          <TextView color={Colors.grey600}>{`: JSX.Element`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Дээр нь удаан дарах үед дуудагдах функц</TextView>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          headerText
          <TextView color={Colors.grey600}>{`:  string`}</TextView>
        </TextView>
        <View style={{ marginVertical: 10 }}>
          <TextView small>Header component-гүй үед харуулах текст</TextView>
        </View>
      </View>
      <View style={styles.segment}>
        <TextView bold>
          expanded
          <TextView color={Colors.grey600}>{`:  () => boolean`}</TextView>
        </TextView>
      </View>
      <View style={styles.segment}>
        <TextView bold>
          setExpanded
          <TextView color={Colors.grey600}>{`:  SetStateAction<any>`}</TextView>
        </TextView>
      </View>
      <View style={styles.segment}>
        <TextView bold>
          onPress
          <TextView color={Colors.grey600}>{`:  () => void`}</TextView>
        </TextView>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          headerStyle
          <TextView color={Colors.grey600}>{`: StyleProp<ViewStyle>`}</TextView>
        </TextView>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          headerTextStyle
          <TextView
            color={Colors.grey600}
          >{`:  StyleProp<TextStyle>`}</TextView>
        </TextView>
      </View>
    </View>
  );
};

export default ExpandableSectionScreen;
