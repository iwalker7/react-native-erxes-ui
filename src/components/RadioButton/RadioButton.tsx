/* eslint-disable no-undef */
import * as React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import color from 'color';
import { RadioButtonContext, RadioButtonContextType } from './RadioButtonGroup';
import { handlePress, isChecked } from './utils';
import Touchable from '../Touchable';

export type RadioButtonProps = {
  value: string;
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  onPress?: (param?: any) => void;
  uncheckedColor?: string;
  color?: string;
  testID?: string;
};

const BORDER_WIDTH = 2;

const RadioButton: React.FC<RadioButtonProps> = ({
  disabled,
  onPress,
  value,
  status,
  testID,
  ...rest
}) => {
  const { current: borderAnim } = React.useRef<Animated.Value>(
    new Animated.Value(BORDER_WIDTH)
  );

  const { current: radioAnim } = React.useRef<Animated.Value>(
    new Animated.Value(1)
  );

  const isFirstRendering = React.useRef<boolean>(true);

  const scale = 0.1;

  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }

    if (status === 'checked') {
      radioAnim.setValue(1.2);

      Animated.timing(radioAnim, {
        toValue: 1,
        duration: 150 * scale,
        useNativeDriver: true,
      }).start();
    } else {
      borderAnim.setValue(10);

      Animated.timing(borderAnim, {
        toValue: BORDER_WIDTH,
        duration: 150 * scale,
        useNativeDriver: false,
      }).start();
    }
  }, [status, borderAnim, radioAnim, scale]);

  const checkedColor = rest.color || '#644BB9';
  const uncheckedColor =
    rest.uncheckedColor || color('#000').alpha(0.7).rgb().string();

  let radioColor: string;

  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        const checked =
          isChecked({
            contextValue: context?.value,
            status,
            value,
          }) === 'checked';

        if (disabled) {
          radioColor = color('#000').alpha(0.16).rgb().string();
        } else {
          radioColor = checked ? checkedColor : uncheckedColor;
        }

        return (
          <Touchable
            {...rest}
            onPress={
              disabled
                ? undefined
                : () => {
                    handlePress({
                      onPress,
                      onValueChange: context?.onValueChange,
                      value,
                    });
                  }
            }
            // accessibilityComponentType={
            //   checked ? 'radiobutton_checked' : 'radiobutton_unchecked'
            // }
            accessibilityRole="radio"
            accessibilityState={{ disabled, checked }}
            accessibilityLiveRegion="polite"
            style={styles.container}
            testID={testID}
          >
            <Animated.View
              style={[
                styles.radio,
                {
                  borderColor: radioColor,
                  borderWidth: borderAnim,
                },
              ]}
            >
              {checked ? (
                <View style={[StyleSheet.absoluteFill, styles.radioContainer]}>
                  <Animated.View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: radioColor,
                        transform: [{ scale: radioAnim }],
                      },
                    ]}
                  />
                </View>
              ) : null}
            </Animated.View>
          </Touchable>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
  },
  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 8,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

export default RadioButton;

const RadioButtonWithTheme = RadioButton;
export { RadioButtonWithTheme as RadioButton };
