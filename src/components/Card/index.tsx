/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import TextView from '../Typography';
import Touchable from '../Touchable';
import { withTheme } from '../../core/theming';
import Surface from '../Surface';

export type CardProps = {
  title?: string;
  secondaryText?: string;
  supportingText?: string;
  type?: 'elevated' | 'outline';
  thumbnail?: React.ReactNode;
  media?: JSX.Element;
  actions?: React.ReactNode;
  overflowIcon?: JSX.Element;
  overflowAction?: () => void;
  mediaStyle?: StyleProp<ViewStyle>;
  thumbnailStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  theme: ReactNativeErxes.Theme;
};

const Card: React.FC<CardProps> = ({
  type = 'elevated',
  title = '',
  secondaryText,
  supportingText,
  thumbnail,
  media,
  actions,
  overflowIcon,
  overflowAction,
  children,
  containerStyle,
  mediaStyle,
  thumbnailStyle,
  theme,
}) => {
  return (
    <Surface
      style={[
        type === 'elevated'
          ? [
              styles.elevated,
              {
                shadowColor: theme.colors.backdrop,
                borderRadius: theme.roundness,
              },
            ]
          : [
              styles.outlined,
              {
                borderColor: theme.colors.borderPrimary,
                borderRadius: theme.roundness,
              },
            ],
        {
          backgroundColor: theme.colors.surface,
        },
        containerStyle,
      ]}
    >
      <View style={styles.header}>
        {thumbnail && (
          <View style={[styles.thumbnail, thumbnailStyle]}>{thumbnail}</View>
        )}
        {overflowAction && (
          <View style={styles.overflow}>
            <Touchable onPress={overflowAction}>{overflowIcon}</Touchable>
          </View>
        )}
        <View style={[styles.column, { width: thumbnail ? '80%' : '100%' }]}>
          <TextView
            large
            bold
            color={theme.colors.textPrimary}
            style={styles.mb}
          >
            {title}
          </TextView>
          <TextView
            style={{ flexWrap: 'wrap' }}
            color={theme.colors.textSecondary}
          >
            {secondaryText}
          </TextView>
        </View>
      </View>
      {media && <View style={[styles.med, mediaStyle]}>{media}</View>}
      {supportingText && (
        <TextView
          color={theme.colors.textPrimary}
          style={(styles.mb, styles.mt, styles.p)}
        >
          {supportingText}
        </TextView>
      )}
      {children}
      {actions}
    </Surface>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  column: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  thumbnail: {
    width: '15%',
  },
  overflow: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  elevated: {
    paddingBottom: 5,
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  outlined: {
    width: '100%',
    paddingBottom: 5,
    borderWidth: 1,
  },
  mb: { marginBottom: 1 },
  mt: { marginTop: 10 },
  med: { margin: 0, maxHeight: 150 },
  p: {
    padding: 10,
  },
});

export default withTheme(Card);
