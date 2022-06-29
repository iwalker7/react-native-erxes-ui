/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, LayoutAnimation } from 'react-native';
import type { SetStateAction } from 'react';
import type { TextStyle, ViewStyle, StyleProp, ViewProps } from 'react-native';
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
  theme: ReactNativeErxes.Theme;
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
  theme,
}) => {
  const [expand, setExpand] = useState(expanded);
  return (
    <View
      style={[
        { width: '100%' },
        bordered && [
          styles.border,
          { borderColor: theme.colors.borderPrimary },
        ],
        {
          backgroundColor: theme.colors.surface,
        },
        containerStyle,
      ]}
    >
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
          <TextView style={headerTextStyle} color={theme.colors.textPrimary}>
            {headerText}
          </TextView>
        )}
        {sectionHeader}
      </Touchable>
      {expand && children}
    </View>
  );
};
const styles = StyleSheet.create({
  border: {
    borderRadius: 10,
    borderWidth: 1,
  },
  header: {
    padding: 10,
  },
});

export default ExpandableSection;
