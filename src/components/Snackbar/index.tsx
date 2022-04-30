/* eslint-disable react-native/no-inline-styles */
import color from 'color';
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import type { ColorValue, ViewStyle, TextProps, StyleProp } from 'react-native';
import Button from '../Button';
import Surface from '../Surface';
import TextView from '../Typography';
import Touchable from '../Touchable';
// import Icon from '../Icon';
import { white, black } from '../../styles/colors';
import { withTheme } from '../../core/theming';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
  type?: 'success' | 'warning' | 'info' | 'error' | string;
  duration?: number | DURATION;
  message?: string;
  onDismiss: () => void;
  leftIcon?: JSX.Element;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: ColorValue | string | undefined;
  closeIcon?: JSX.Element;
  closeIconName?: string;
  closeIconSize?: number;
  closeIconColor?: ColorValue | string | undefined;
  textStyle?: StyleProp<TextProps>;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<View>;
  theme: ReactNativeErxes.Theme;
};

const defaultsize = 20;

const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  action,
  message,
  placement = 'top',
  duration = DURATION.DURATION_MEDIUM,
  onDismiss,
  type = 'info',
  leftIconName,
  leftIconColor = white,
  leftIconSize = defaultsize,
  leftIcon,
  closeIcon,
  theme,
  ...rest
}) => {
  const { colors } = theme;

  const { current: opacity } = useRef(new Animated.Value(0.0));
  const [hidden, setHidden] = useState<boolean>(!visible);
  const hideTimeout = useRef<NodeJS.Timeout>();
  const mainColor =
    type === 'error'
      ? colors.error
      : type === 'success'
      ? colors.success
      : type === 'warning'
      ? colors.warn
      : colors.accent;

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
    // <Touchable
    //   onPress={() => {
    //     if (!action) {
    //       setHidden(true);
    //     }
    //   }}
    // >
    <SafeAreaView
      style={[
        {
          position: 'absolute',
          top: placement === 'top' ? 0 : undefined,
          bottom: placement === 'bottom' ? 10 : undefined,
          left: 3,
          width: '100%',
          zIndex: 5000,
        },
      ]}
    >
      <Surface
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
          {leftIconName || leftIcon ? (
            <View style={{ marginHorizontal: 5 }}>
              {leftIcon ? (
                leftIcon
              ) : (
                <FontAwesome
                  name={leftIconName || ''}
                  color={leftIconColor || white}
                  size={leftIconSize || defaultsize}
                />
              )}
            </View>
          ) : null}

          <TextView
            bold
            style={[
              styles.content,
              { marginRight: action ? 0 : 16, color: white },
              rest?.textStyle,
            ]}
          >
            {message}
          </TextView>
          {closeIcon ||
            (closeIcon && (
              <View style={styles.overflow}>
                <Touchable onPress={() => setHidden(true)}>
                  {closeIcon}
                </Touchable>
              </View>
            ))}
        </View>
        {action ? (
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
        ) : null}
      </Surface>
    </SafeAreaView>
    // </Touchable>
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
    width: Dimensions.get('screen').width - 15,
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
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
export default withTheme(Snackbar);
