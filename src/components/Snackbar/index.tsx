/* eslint-disable react-native/no-inline-styles */

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  PixelRatio,
} from 'react-native';
import type { ColorValue, ViewStyle, TextProps, StyleProp } from 'react-native';
import Button from '../Button';
import Surface from '../Surface';
import TextView from '../Typography';
import Touchable from '../Touchable';
import { darken } from '../../utils/colorUtils';
import { withTheme } from '../../core/theming';

export enum DURATION {
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
  visible: boolean;
  action?: TAction;
  placement?: 'top' | 'bottom';
  type?: 'success' | 'warning' | 'info' | 'error' | string;
  duration?: number | DURATION;
  message?: string;
  onDismiss: () => void;
  leftIcon?: JSX.Element;
  closeIcon?: JSX.Element;
  backgroungColor?: ColorValue | string | undefined;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextProps>;
  buttonStyle?: StyleProp<TextProps>;
  theme: ReactNativeErxes.Theme;
};

const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  action,
  message,
  duration = DURATION.DURATION_MEDIUM,
  onDismiss,
  type = 'info',
  leftIcon,
  theme,
  backgroungColor,

  ...rest
}) => {
  const { colors } = theme;

  const { current: opacity } = React.useRef<Animated.Value>(
    new Animated.Value(0.0)
  );
  const [hidden, setHidden] = useState<boolean>(!visible);
  const hideTimeout = useRef<NodeJS.Timeout>();
  const mainColor = backgroungColor
    ? backgroungColor
    : type === 'error'
    ? colors.error
    : type === 'success'
    ? colors.success
    : type === 'warning'
    ? colors.warn
    : colors.secondary;

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
          top: 30,
          zIndex: 5000,
          marginHorizontal: 20,
        },
        rest?.wrapperStyle,
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
          rest?.style,
        ]}
      >
        <Touchable
          onPress={() => onDismiss()}
          style={{
            width: action ? '72%' : '100%',
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 16 / PixelRatio.get(),
          }}
        >
          {leftIcon && <View style={{ marginHorizontal: 5 }}>{leftIcon}</View>}

          <TextView
            boldless
            style={[
              styles.content,
              { marginRight: action ? 0 : 16, color: '#fff' },
              rest?.textStyle,
            ]}
          >
            {message}
          </TextView>
        </Touchable>
        {action && (
          <View style={{ justifyContent: 'flex-end' }}>
            <Button
              onPress={() => {
                action.onPress && action.onPress();
                onDismiss();
              }}
              color={'rgba(255, 255, 255, 0.6)'}
              textColor={darken(mainColor, 0.6)}
              style={[
                {
                  borderRadius: theme.roundness,
                },
                rest?.buttonStyle,
              ]}
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
  wrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  container: {
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
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
  },
});
export default withTheme(Snackbar);
