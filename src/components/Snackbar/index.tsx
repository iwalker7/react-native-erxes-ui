/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Text, Animated, SafeAreaView, StyleSheet } from 'react-native';
import Button from '../Button';
import Surface from '../Surface';
import Touchable from '../Touchable';

enum DURATION {
  DURATION_SHORT = 1500,
  DURATION_MEDIUM = 2500,
  DURATION_LONG = 5000,
  DURATION_INFINITY = Number.NEGATIVE_INFINITY,
}

export type TAction = {
  onPress: () => void;
  label: string;
};

export type SnackbarProps = {
  type?: string;
  text: string;
  placement?: 'top' | 'bottom';
  visible: boolean;
  action?: TAction;
  duration?: number | DURATION;
  onDismiss: () => void;
  children?: React.ReactNode;
  backgroundColor?: string;
};

const Snackbar: React.FC<SnackbarProps> = ({
  type,
  text,
  placement = 'top',
  visible,
  action,
  duration = DURATION.DURATION_MEDIUM,
  onDismiss,
  children,
  backgroundColor,
}) => {
  const { current: opacity } = useRef(new Animated.Value(0.0));
  const [hidden, setHidden] = useState<boolean>(!visible);
  const hideTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (visible) {
      // show
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      setHidden(false);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const isInfinity =
            duration === Number.POSITIVE_INFINITY ||
            duration === Number.NEGATIVE_INFINITY;

          if (finished && !isInfinity) {
            hideTimeout.current = setTimeout(onDismiss, duration);
          }
        }
      });
    } else {
      // hide
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setHidden(true);
        }
      });
    }
  }, [visible, duration, opacity, onDismiss]);

  if (hidden || !type) {
    return null;
  }

  return (
    <Touchable
      activeOpacity={1}
      style={[
        {
          position: 'absolute',
          top: placement === 'top' ? 0 : undefined,
          bottom: placement === 'bottom' ? 10 : undefined,
          width: '100%',
        },
        { backgroundColor: backgroundColor },
      ]}
      onPress={() => onDismiss()}
    >
      <SafeAreaView>
        <Surface
          pointerEvents="box-none"
          accessibilityLiveRegion="polite"
          style={[
            styles.container,
            {
              opacity: opacity,
              transform: [
                {
                  scale: visible
                    ? opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      })
                    : 1,
                },
              ],
            },
            { backgroundColor: 'transparent' },
          ]}
        >
          {/* <IconErxes
            name={
              type === 'error'
                ? 'times-circle'
                : type === 'success'
                ? 'check-circle'
                : 'info-circle'
            }
            style={{ marginStart: 10, color: colors.colorWhite }}
            size={18}
          /> */}
          <Text
            maxFontSizeMultiplier={1}
            ellipsizeMode="tail"
            numberOfLines={3}
            style={[
              styles.content,
              { marginRight: action ? 0 : 16, color: '#fff' },
            ]}
          >
            {text}
          </Text>
          {children}
          {action && (
            <Button
              onPress={() => {
                action.onPress && action.onPress();
                onDismiss();
              }}
              style={styles.button}
              color={'#fff'}
              textStyle={{
                fontSize: 14,
                textTransform: 'capitalize',
                color: '#fff',
              }}
            >
              {action.label}
            </Button>
          )}
        </Surface>
      </SafeAreaView>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    marginLeft: 10,
    marginVertical: 10,
    flexWrap: 'wrap',
    flex: 1,
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FAFAFA',
  },
});
export default Snackbar;
