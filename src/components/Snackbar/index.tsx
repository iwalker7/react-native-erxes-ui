/* eslint-disable react-native/no-inline-styles */
import color from 'color';
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import type { StyleProp } from 'react-native';
import type { TextProps } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Animated, SafeAreaView, StyleSheet, View } from 'react-native';
import Button from '../Button';
import Surface from '../Surface';
import TextView from '../Typography';
import Touchable from '../Touchable';

export enum DURATION {
  DURATION_SHORT = 1500,
  DURATION_MEDIUM = 2500,
  DURATION_LONG = 5000,
  DURATION_INFINITY = Number.NEGATIVE_INFINITY,
}

export type SnackbarProps = {
  visible: boolean;
  action?: Omit<React.ComponentProps<typeof Button>, 'children'> & {
    label: string;
  };
  placement?: 'top' | 'bottom';
  message: string;
  type?: 'success' | 'warning' | 'info' | 'error' | string;
  duration?: number;
  onDismiss: () => void;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  closeIcon?: JSX.Element;
  textStyle?: StyleProp<TextProps>;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<View>;
  theme?: ReactNativeErxes.Theme;
};

const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  action,
  message,
  placement = 'top',
  duration = DURATION.DURATION_MEDIUM,
  onDismiss,
  icon,
  iconPosition = 'left',
  type = 'info',
  closeIcon,
  ...rest
}) => {
  const { current: opacity } = useRef(new Animated.Value(0.0));
  const [hidden, setHidden] = useState<boolean>(!visible);
  const hideTimeout = useRef<NodeJS.Timeout>();
  const mainColor =
    type === 'error'
      ? '#FF4949'
      : type === 'success'
      ? '#17CE65'
      : type === 'warning'
      ? '#FFC82C'
      : '#42a5f5';

  useEffect(() => {
    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (visible) {
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

  if (hidden) {
    return null;
  }

  return (
    <SafeAreaView
      pointerEvents="box-none"
      style={[
        {
          position: 'absolute',
          top: placement === 'top' ? 0 : undefined,
          bottom: placement === 'bottom' ? 10 : undefined,
          width: '100%',
          zIndex: 5000,
        },
      ]}
    >
      <Surface
        pointerEvents="box-none"
        accessibilityLiveRegion="polite"
        style={[
          styles.container,
          { backgroundColor: mainColor },
          {
            opacity: opacity,
            transform: [
              {
                scale: visible
                  ? opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    })
                  : 1,
              },
            ],
          },
          rest?.wrapperStyle,
        ]}
      >
        <View
          style={{
            width: action ? '72%' : '100%',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          {closeIcon && (
            <View style={styles.overflow}>
              <Touchable onPress={() => setHidden(true)}>{closeIcon}</Touchable>
            </View>
          )}
          {icon && (
            <View
              style={[
                {
                  marginLeft: iconPosition === 'right' ? 5 : 0,
                  marginRight: iconPosition === 'right' ? 0 : 5,
                },
              ]}
            >
              {icon}
            </View>
          )}
          <TextView
            bold
            style={[
              styles.content,
              { marginRight: action ? 0 : 16, color: '#fff' },
              rest?.textStyle,
            ]}
          >
            {message}
          </TextView>
        </View>
        {action && (
          <View style={{ justifyContent: 'flex-end' }}>
            <Button
              onPress={() => {
                action.onPress && action.onPress();
                onDismiss();
              }}
              color={'rgba(255, 255, 255, 0.6)'}
              textColor={color(mainColor).darken(0.6).rgb().string()}
              style={{
                borderRadius: 8,
              }}
            >
              {action.label}
            </Button>
          </View>
        )}
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 8,
    borderRadius: 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    // borderWidth: 2,
    // borderColor: '#fff',
  },
  content: {
    marginLeft: 10,
    marginVertical: 10,
    flexWrap: 'wrap',
    flex: 1,
  },

  overflow: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
export default Snackbar;
