/* eslint-disable react-native/no-inline-styles */
import type { SetStateAction } from 'react';
import React from 'react';
import { useState } from 'react';
import type { TextStyle, ViewStyle, StyleProp, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { LayoutAnimation } from 'react-native';
import { View } from 'react-native';
import Touchable from '../Touchable';
import TextView from '../Typography';

export type ExpandableSectionType = ViewProps & {
  expanded?: boolean;
  setExpanded?: SetStateAction<any>;
  sectionHeader?: React.ReactNode;
  headerText?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  headerStyle?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
};

const ExpandableSection: React.FC<ExpandableSectionType> = ({
  expanded = false,
  setExpanded,
  sectionHeader,
  headerText,
  children,
  onPress,
  headerStyle,
  headerTextStyle,
}) => {
  const [expand, setExpand] = useState(expanded);
  return (
    <View style={styles.container}>
      <Touchable
        style={styles.header || headerStyle}
        onPress={() => {
          setExpand(!expand);
          LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.easeInEaseOut,
            duration: 400,
          });
          onPress && onPress;
          setExpanded(!expand);
        }}
      >
        {headerText && (
          <TextView style={headerTextStyle}>{headerText}</TextView>
        )}
        {sectionHeader}
      </Touchable>
      {expand && children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    width: '100%',
  },
  header: {
    padding: 10,
  },
});

export default ExpandableSection;
