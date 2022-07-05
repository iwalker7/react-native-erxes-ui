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
import TextView from '../Typography';
import { withTheme } from '../../core/theming';
import type { IconSource } from '../Icon';
import { getFABGroupColors } from './utils';
import Touchable from '../Touchable';

type FABGroupProps = {
  /**
   * Action items to display in the form of a speed dial.
   * An action item should contain the following properties:
   * - `icon`: icon to display (required)
   * - `label`: optional label text
   * - `accessibilityLabel`: accessibility label for the action, uses label by default if specified
   * - `color`: custom icon color of the action item
   * - `labelTextColor`: custom label text color of the action item
   * - `style`: pass additional styles for the fab item, for example, `backgroundColor`
   * - `labelStyle`: pass additional styles for the fab item label, for example, `backgroundColor`
   * - `size`: size of action item. Defaults to `small`. @supported Available in v5.x
   * - `onPress`: callback that is called when `FAB` is pressed (required)
   */
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
  /**
   * Icon to display for the `FAB`.
   * You can toggle it based on whether the speed dial is open to display a different icon.
   */
  icon: IconSource;
  /**
   * Accessibility label for the FAB. This is read by the screen reader when the user taps the FAB.
   */
  accessibilityLabel?: string;
  /**
   * Custom color for the `FAB`.
   */
  color?: string;
  /**
   * Function to execute on pressing the `FAB`.
   */
  onPress?: () => void;
  /**
   * Whether the speed dial is open.
   */
  open: boolean;
  /**
   * Callback which is called on opening and closing the speed dial.
   * The open state needs to be updated when it's called, otherwise the change is dropped.
   */
  onStateChange: (state: { open: boolean }) => void;
  /**
   * Whether `FAB` is currently visible.
   */
  visible: boolean;
  /**
   * Style for the group. You can use it to pass additional styles if you need.
   * For example, you can set an additional padding if you have a tab bar at the bottom.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the FAB. It allows to pass the FAB button styles, such as backgroundColor.
   */
  fabStyle?: StyleProp<ViewStyle>;
  /**
   * @supported Available in v5.x with theme version 3
   *
   * Color mappings variant for combinations of container and icon colors.
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'surface';
  /**
   * @optional
   */
  theme: ReactNativeErxes.Theme;
  /**
   * Pass down testID from Group props to FAB.
   */
  testID?: string;
};

/**
 * A component to display a stack of FABs with related actions in a speed dial.
 * To render the group above other components, you'll need to wrap it with the [`Portal`](portal.html) component.
 *
 * <div class="screenshots">
 *   <img class="small" src="screenshots/fab-group.gif" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { FAB, Portal, Provider } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [state, setState] = React.useState({ open: false });
 *
 *   const onStateChange = ({ open }) => setState({ open });
 *
 *   const { open } = state;
 *
 *   return (
 *     <Provider>
 *       <Portal>
 *         <FAB.Group
 *           open={open}
 *           icon={open ? 'calendar-today' : 'plus'}
 *           actions={[
 *             { icon: 'plus', onPress: () => console.log('Pressed add') },
 *             {
 *               icon: 'star',
 *               label: 'Star',
 *               onPress: () => console.log('Pressed star'),
 *             },
 *             {
 *               icon: 'email',
 *               label: 'Email',
 *               onPress: () => console.log('Pressed email'),
 *             },
 *             {
 *               icon: 'bell',
 *               label: 'Remind',
 *               onPress: () => console.log('Pressed notifications'),
 *             },
 *           ]}
 *           onStateChange={onStateChange}
 *           onPress={() => {
 *             if (open) {
 *               // do something if the speed dial is open
 *             }
 *           }}
 *         />
 *       </Portal>
 *     </Provider>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
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
  testID,
  onStateChange,
  color: colorProp,
  variant = 'primary',
}: FABGroupProps) => {
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
          50 * scale,
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
                <Touchable
                  onPress={() => {
                    it.onPress();
                    close();
                  }}
                  accessibilityLabel={
                    it.accessibilityLabel !== 'undefined'
                      ? it.accessibilityLabel
                      : it.label
                  }
                  accessibilityRole="button"
                >
                  <View
                    style={
                      [
                        styles.label,
                        {
                          transform: [{ translateY: labelTranslations[i] }],
                          opacity: opacities[i],
                        },
                        it.labelStyle,
                      ] as StyleProp<ViewStyle>
                    }
                  >
                    <TextView
                      style={{ color: it.labelTextColor ?? labelColor }}
                    >
                      {it.label}
                    </TextView>
                  </View>
                </Touchable>
              )}
              <FAB
                size={typeof it.size !== 'undefined' ? it.size : 'small'}
                icon={it.icon}
                color={it.color}
                style={
                  [
                    {
                      transform: [{ scale: scales[i] }],
                      opacity: opacities[i],
                      backgroundColor: stackedFABBackgroundColor,
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
          testID={testID}
          variant={variant}
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
