import * as React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import color from 'color';
import Touchable from '../Touchable';
import { withTheme } from '../../core/theming';

export type CheckBoxProps = {
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  onPress?: () => void;
  uncheckedColor?: string;
  color?: string;
  theme: ReactNativeErxes.Theme;
  testID?: string;
};

const ANIMATION_DURATION = 100;

const Checkbox: React.FC<CheckBoxProps> = ({
  status,
  theme,
  disabled,
  onPress,
  testID,
  ...rest
}) => {
  const { current: scaleAnim } = React.useRef<Animated.Value>(
    new Animated.Value(1)
  );
  const isFirstRendering = React.useRef<boolean>(true);

  //   const scale = 0.1;
  const {
    animation: { scale },
  } = theme;

  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }

    const checked = status === 'checked';

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: checked ? ANIMATION_DURATION * scale : 0,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: checked
          ? ANIMATION_DURATION * scale
          : ANIMATION_DURATION * scale * 1.75,
        useNativeDriver: false,
      }),
    ]).start();
  }, [status, scaleAnim, scale]);

  const checked = status === 'checked';
  const checkedColor = rest.color || '#5629B6';
  const uncheckedColor =
    rest.uncheckedColor || color('#000').alpha(0.54).rgb().string();

  let checkboxColor;

  if (disabled) {
    checkboxColor = color('#fff').alpha(0.38).rgb().string();
  } else {
    checkboxColor = checked ? checkedColor : uncheckedColor;
  }

  const borderWidth = scaleAnim.interpolate({
    inputRange: [0.8, 1],
    outputRange: [7, 0],
  });

  return (
    <Touchable
      {...rest}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ disabled, checked }}
      accessibilityLiveRegion="polite"
      style={styles.container}
      testID={testID}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {/* <MaterialCommunityIcons
          allowFontScaling={false}
          name={icon}
          size={24}
          color={checkboxColor}
          direction="ltr"
        /> */}
        <View style={[StyleSheet.absoluteFill, styles.fillContainer]}>
          <Animated.View
            style={[
              styles.fill,
              { borderColor: checkboxColor },
              { borderWidth },
            ]}
          />
        </View>
      </Animated.View>
    </Touchable>
  );
};

Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    width: 36,
    height: 36,
    padding: 6,
  },
  fillContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    height: 14,
    width: 14,
  },
});

export default withTheme(Checkbox);
