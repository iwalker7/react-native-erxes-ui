/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { Text } from 'react-native';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Touchable from '../Touchable';
import Checkbox from './Checkbox';

export type CheckBoxItemProps = {
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  uncheckedColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  theme: ReactNativeErxes.Theme;
  testID?: string;
  position?: 'leading' | 'trailing';
};

const CheckboxItem: React.FC<CheckBoxItemProps> = ({
  style,
  status,
  label,
  onPress,
  labelStyle,
  theme,
  testID,
  position = 'leading',
  disabled,
  ...props
}) => {
  const checkboxProps = { ...props, status, theme, disabled };
  const isTrealing = position === 'trailing';
  let checkbox = <Checkbox {...checkboxProps} />;

  return (
    <Touchable
      accessibilityLabel={label}
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: status === 'checked',
        disabled,
      }}
      onPress={onPress}
      testID={testID}
      disabled={disabled}
    >
      <View
        style={[styles.container, style]}
        pointerEvents="none"
        importantForAccessibility="no-hide-descendants"
      >
        {!isTrealing && checkbox}
        <Text
          style={[
            styles.label,
            {
              color: disabled ? theme.colors.disabled : theme.colors.text,
              textAlign: isTrealing ? 'right' : 'left',
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
        {isTrealing && checkbox}
      </View>
    </Touchable>
  );
};

CheckboxItem.displayName = 'Checkbox.Item';
export default CheckboxItem;

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
