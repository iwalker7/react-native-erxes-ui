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
import { black } from '../../styles/colors';

export type RBItemProps = {
  value: string;
  label: string;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  uncheckedColor?: string;
  color?: string;
  status?: 'checked' | 'unchecked';
  style?: StyleProp<ViewStyle>;
  labelColor?: string;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
  position?: 'leading' | 'trailing';
};

const RadioButtonItem: React.FC<RBItemProps> = ({
  value,
  label,
  style,
  labelColor = black,
  labelStyle,
  onPress,
  disabled,
  color,
  uncheckedColor,
  status,
  accessibilityLabel,
  testID,
  position = 'leading',
}) => {
  const radioButtonProps = { value, disabled, status, color, uncheckedColor };
  const isTrealing = position === 'trailing';
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
              {!isTrealing && radioButton}
              <Text
                style={[
                  styles.label,
                  {
                    color: labelColor,
                    textAlign: 'left',
                  },
                  labelStyle,
                ]}
              >
                {label}
              </Text>

              {isTrealing && radioButton}
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
  },
  label: {
    fontSize: 14,
    flexShrink: 1,
    flexGrow: 1,
  },
});
