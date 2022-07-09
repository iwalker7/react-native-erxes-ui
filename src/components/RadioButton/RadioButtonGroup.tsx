import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export type RadioButtonGroupProps = {
  onValueChange: (value: string) => void;
  value: any;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type RadioButtonContextType = {
  value: any;
  onValueChange: (item: string) => void;
};

export const RadioButtonContext = React.createContext<RadioButtonContextType>(
  null as any
);

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  value,
  onValueChange,
  children,
  style,
}) => (
  <RadioButtonContext.Provider value={{ value, onValueChange }}>
    <View accessibilityRole="radiogroup" style={style}>
      {children}
    </View>
  </RadioButtonContext.Provider>
);

export default RadioButtonGroup;

export { RadioButtonGroup };
