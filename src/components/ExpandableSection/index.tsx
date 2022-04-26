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
  bordered?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  headerStyle?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
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
  containerStyle,
  bordered = false,
}) => {
  const [expand, setExpand] = useState(expanded);
  return (
    <View style={[styles.container, bordered && styles.border, containerStyle]}>
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
    width: '100%',
    backgroundColor: '#fff',
  },
  border: {
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
  },
  header: {
    padding: 10,
  },
});

export default ExpandableSection;
