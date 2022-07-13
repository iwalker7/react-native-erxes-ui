/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Animated, Image, ImageProps, StyleSheet, View } from 'react-native';
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
  style?: StyleProp<ViewStyle>;
  theme: ReactNativeErxes.Theme;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value | any;
  onPress?: () => void;
  onLongPress?: () => void;
  imgSrc?: ImageProps | Readonly<ImageProps> | any;
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
  style,
  mediaStyle,
  thumbnailStyle,
  theme,
  elevation = 3,
  onPress,
  onLongPress,
  imgSrc,
}) => {
  return (
    <Surface
      style={[
        type === 'elevated'
          ? [
              styles.elevated,
              {
                elevation,
                shadowColor: theme.colors.backdrop,
              },
            ]
          : [
              styles.outlined,
              {
                borderColor: theme.colors.borderPrimary,
              },
            ],
        {
          borderRadius: theme.roundness,
          backgroundColor: theme.colors.surface,
        },
        style,
      ]}
    >
      <Touchable
        disabled={!(onPress || onLongPress)}
        onLongPress={onLongPress}
        onPress={onPress}
      >
        {(title || secondaryText) && (
          <View style={styles.header}>
            {thumbnail && (
              <View style={[styles.thumbnail, thumbnailStyle]}>
                {thumbnail}
              </View>
            )}
            {overflowAction && (
              <View style={styles.overflow}>
                <Touchable onPress={overflowAction}>{overflowIcon}</Touchable>
              </View>
            )}

            <View style={[styles.column]}>
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
        )}
        {(media || imgSrc) && (
          <View
            style={[
              {
                margin: 0,
                maxHeight: 150,
                borderTopStartRadius:
                  !title || !supportingText ? theme.roundness : 0,
                borderTopEndRadius:
                  !title || !supportingText ? theme.roundness : 0,
              },
              mediaStyle,
            ]}
          >
            {media ? (
              media
            ) : imgSrc ? (
              <Image
                source={imgSrc}
                style={{ resizeMode: 'cover', height: 100, width: '100%' }}
              />
            ) : null}
          </View>
        )}
        {supportingText && (
          <TextView
            color={theme.colors.textSecondary}
            style={(styles.mb, styles.mt, styles.p)}
          >
            {supportingText}
          </TextView>
        )}
        {children}
        {actions}
      </Touchable>
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  outlined: {
    paddingBottom: 5,
    borderWidth: 1,
  },
  mb: { marginBottom: 1 },
  mt: { marginTop: 10 },
  p: {
    padding: 10,
  },
});

export default withTheme(Card);
