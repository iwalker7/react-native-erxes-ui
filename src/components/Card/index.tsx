/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from '../Typography';
import Touchable from '../Touchable';

export type CardProps = {
  title: string;
  secondaryText?: string;
  supportingText?: string;
  type?: 'elevated' | 'outline' | string;
  thumbnail?: JSX.Element;
  media?: JSX.Element;
  actions?: JSX.Element;
  //   overflowMenu?: JSX.Element;
  overflowIcon?: JSX.Element;
  overflowAction?: () => void;
};

const Card: React.FC<CardProps> = ({
  type = 'elevated',
  title,
  secondaryText,
  supportingText,
  thumbnail,
  media,
  actions,
  overflowIcon,
  overflowAction,
}) => {
  return (
    <View style={type === 'elevated' ? styles.elevated : styles.outlined}>
      <View style={styles.header}>
        {thumbnail && <View style={styles.thumbnail}>{thumbnail}</View>}
        {overflowAction && (
          <View style={styles.overflow}>
            <Touchable onPress={overflowAction}>{overflowIcon}</Touchable>
          </View>
        )}
        <View style={[styles.column, { width: thumbnail ? '80%' : '100%' }]}>
          <TextView large bold style={styles.mb}>
            {title}
          </TextView>
          <TextView style={{ flexWrap: 'wrap' }} color="#757575">
            {secondaryText}
          </TextView>
        </View>
      </View>
      <View style={styles.med}>{media}</View>

      {supportingText && (
        <TextView color="#757575" style={(styles.mb, styles.mt, styles.p)}>
          {supportingText}
        </TextView>
      )}
      {actions}
    </View>
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
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
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
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: 'rgba(0, 0, 0, 0.34)',
    borderWidth: 1,
  },
  mb: { marginBottom: 1 },
  mt: { marginTop: 10 },
  med: { margin: 0, maxHeight: 150 },
  p: {
    padding: 10,
  },
});

export default Card;
