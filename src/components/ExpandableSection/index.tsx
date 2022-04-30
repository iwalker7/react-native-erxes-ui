/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, LayoutAnimation } from 'react-native';

import type { SetStateAction } from 'react';
import type { TextStyle, ViewStyle, StyleProp, ViewProps } from 'react-native';

import Touchable from '../Touchable';
import TextView from '../Typography';
import { white, grey300 } from '../../styles/colors';

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
    backgroundColor: white,
  },
  border: {
    borderRadius: 10,
    borderColor: grey300,
    borderWidth: 1,
  },
  header: {
    padding: 10,
  },
});

export default ExpandableSection;
