/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import * as React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';
import { RadioButtonContext, RadioButtonContextType } from './RadioButtonGroup';
import { handlePress } from './utils';
import RadioButton from './RadioButton';
import Touchable from '../Touchable';

export type Props = {
  /**
   * Value of the radio button.
   */
  value: string;
  /**
   * Label to be displayed on the item.
   */
  label: string;
  /**
   * Whether radio is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Accessibility label for the touchable. This is read by the screen reader when the user taps the touchable.
   */
  accessibilityLabel?: string;
  /**
   * Custom color for unchecked radio.
   */
  uncheckedColor?: string;
  /**
   * Custom color for radio.
   */
  color?: string;
  /**
   * Status of radio button.
   */
  status?: 'checked' | 'unchecked';
  /**
   * Additional styles for container View.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style that is passed to Label element.
   */
  labelStyle?: StyleProp<TextStyle>;

  testID?: string;
  /**
   * Whether `<RadioButton.Android />` or `<RadioButton.IOS />` should be used.
   * Left undefined `<RadioButton />` will be used.
   */
  mode?: 'android' | 'ios';
  /**
   * Radio button control position.
   */
  position?: 'leading' | 'trailing';
};

const RadioButtonItem = ({
  value,
  label,
  style,
  labelStyle,
  onPress,
  disabled,
  color,
  uncheckedColor,
  status,
  accessibilityLabel,
  testID,
  position = 'leading',
}: Props) => {
  const radioButtonProps = { value, disabled, status, color, uncheckedColor };
  const isLeading = position === 'leading';
  let radioButton = <RadioButton {...radioButtonProps} />;

  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        return (
          <Touchable
            onPress={
              disabled
                ? undefined
                : () =>
                    handlePress({
                      onPress: onPress,
                      onValueChange: context?.onValueChange,
                      value,
                    })
            }
            accessibilityLabel={accessibilityLabel}
            testID={testID}
          >
            <View style={[styles.container, style]} pointerEvents="none">
              {isLeading && radioButton}
              <Text
                style={[
                  styles.label,
                  {
                    color: '#000',
                    textAlign: 'left',
                  },
                  labelStyle,
                ]}
              >
                {label}
              </Text>

              {!isLeading && radioButton}
            </View>
          </Touchable>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

RadioButtonItem.displayName = 'RadioButton.Item';

export default RadioButtonItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    flexShrink: 1,
    flexGrow: 1,
  },
});
