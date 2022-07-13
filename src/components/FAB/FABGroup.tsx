/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Animated,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import FAB from './FAB';
import Card from '../Card/index';
import { withTheme } from '../../core/theming';
import type { IconSource } from '../Icon';
import { getFABGroupColors } from './utils';
import TextView from '../Typography/index';
import { rgba } from '../../utils/colorUtils';

type Props = {
  actions: Array<{
    icon: IconSource;
    label?: string;
    color?: string;
    labelTextColor?: string;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<ViewStyle>;
    onPress: () => void;
    size?: 'small' | 'medium';
    testID?: string;
  }>;

  icon: IconSource;

  accessibilityLabel?: string;

  color?: string;

  onPress?: () => void;

  open: boolean;

  onStateChange: (state: { open: boolean }) => void;

  visible: boolean;

  style?: StyleProp<ViewStyle>;

  fabStyle?: StyleProp<ViewStyle>;

  theme: ReactNativeErxes.Theme;
};

const FABGroup = ({
  actions,
  icon,
  open,
  onPress,
  accessibilityLabel,
  theme,
  style,
  fabStyle,
  visible,
  onStateChange,
  color: colorProp,
}: Props) => {
  const { current: backdrop } = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );
  const animations = React.useRef<Animated.Value[]>(
    actions.map(() => new Animated.Value(open ? 1 : 0))
  );

  const [prevActions, setPrevActions] = React.useState<
    | {
        icon: IconSource;
        label?: string;
        color?: string;
        accessibilityLabel?: string;
        style?: StyleProp<ViewStyle>;
        onPress: () => void;
        testID?: string;
      }[]
    | null
  >(null);

  const { scale } = theme.animation;

  React.useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 1,
          duration: 250 * scale,
          useNativeDriver: true,
        }),
        Animated.stagger(
          15 * scale,
          animations.current
            .map((animation) =>
              Animated.timing(animation, {
                toValue: 1,
                duration: 150 * scale,
                useNativeDriver: true,
              })
            )
            .reverse()
        ),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 0,
          duration: 200 * scale,
          useNativeDriver: true,
        }),
        ...animations.current.map((animation) =>
          Animated.timing(animation, {
            toValue: 0,
            duration: 150 * scale,
            useNativeDriver: true,
          })
        ),
      ]).start();
    }
  }, [open, actions, backdrop, scale]);

  const close = () => onStateChange({ open: false });

  const toggle = () => onStateChange({ open: !open });

  const { labelColor, backdropColor, stackedFABBackgroundColor } =
    getFABGroupColors({ theme });

  const backdropOpacity = open
    ? backdrop.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 1],
      })
    : backdrop;

  const opacities = animations.current;
  const scales = opacities.map((opacity) =>
    open
      ? opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        })
      : 1
  );

  const translations = opacities.map((opacity) =>
    open
      ? opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [24, -8],
        })
      : -8
  );
  const labelTranslations = opacities.map((opacity) =>
    open
      ? opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [8, -8],
        })
      : -8
  );

  if (actions.length !== prevActions?.length) {
    animations.current = actions.map(
      (_, i) => animations.current[i] || new Animated.Value(open ? 1 : 0)
    );
    setPrevActions(actions);
  }

  return (
    <View pointerEvents="box-none" style={[styles.container, style]}>
      <TouchableWithoutFeedback onPress={close}>
        <Animated.View
          pointerEvents={open ? 'auto' : 'none'}
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
              backgroundColor: backdropColor,
            },
          ]}
        />
      </TouchableWithoutFeedback>
      <SafeAreaView pointerEvents="box-none" style={styles.safeArea}>
        <View pointerEvents={open ? 'box-none' : 'none'}>
          {actions.map((it, i) => (
            <View
              key={i} // eslint-disable-line react/no-array-index-key
              style={[
                styles.item,
                {
                  marginHorizontal:
                    typeof it.size === 'undefined' || it.size === 'small'
                      ? 24
                      : 16,
                },
              ]}
              pointerEvents={open ? 'box-none' : 'none'}
            >
              {it.label && (
                <View>
                  <Card
                    style={
                      [
                        styles.label,
                        {
                          transform: [{ translateY: labelTranslations[i] }],
                          opacity: opacities[i],
                        },
                        styles.v3LabelStyle,
                        it.labelStyle,
                      ] as StyleProp<ViewStyle>
                    }
                    onPress={() => {
                      it.onPress();
                      close();
                    }}
                  >
                    <TextView
                      style={{ color: it.labelTextColor ?? labelColor }}
                    >
                      {it.label}
                    </TextView>
                  </Card>
                </View>
              )}
              <FAB
                size={typeof it.size !== 'undefined' ? it.size : 'small'}
                icon={it.icon}
                color={it.color || rgba(theme.colors.primary, 0.7)}
                style={
                  [
                    {
                      transform: [{ scale: scales[i] }],
                      opacity: opacities[i],
                      backgroundColor: stackedFABBackgroundColor,
                      elevation: 2,
                    },
                    { transform: [{ translateY: translations[i] }] },
                    it.style,
                  ] as StyleProp<ViewStyle>
                }
                onPress={() => {
                  it.onPress();
                  close();
                }}
                accessibilityLabel={
                  typeof it.accessibilityLabel !== 'undefined'
                    ? it.accessibilityLabel
                    : it.label
                }
                accessibilityRole="button"
                testID={it.testID}
                visible={open}
              />
            </View>
          ))}
        </View>
        <FAB
          onPress={() => {
            onPress?.();
            toggle();
          }}
          icon={icon}
          color={colorProp}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="button"
          accessibilityState={{ expanded: open }}
          style={[styles.fab, fabStyle]}
          visible={visible}
        />
      </SafeAreaView>
    </View>
  );
};

FABGroup.displayName = 'FAB.Group';

export default withTheme(FABGroup);

// @component-docs ignore-next-line
const FABGroupWithTheme = withTheme(FABGroup);
// @component-docs ignore-next-line
export { FABGroupWithTheme as FABGroup };

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'flex-end',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  fab: {
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 0,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  label: {
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  item: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  v3LabelStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
});
