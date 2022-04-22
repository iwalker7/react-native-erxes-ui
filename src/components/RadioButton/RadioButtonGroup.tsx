import * as React from 'react';
import { View } from 'react-native';

export type RadioButtonGroupProps = {
  onValueChange: (value: string) => void;
  value: string;
  children: React.ReactNode;
};

export type RadioButtonContextType = {
  value: string;
  onValueChange: (item: string) => void;
};

export const RadioButtonContext = React.createContext<RadioButtonContextType>(
  null as any
);

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  value,
  onValueChange,
  children,
}) => (
  <RadioButtonContext.Provider value={{ value, onValueChange }}>
    <View accessibilityRole="radiogroup">{children}</View>
  </RadioButtonContext.Provider>
);

export default RadioButtonGroup;

export { RadioButtonGroup };
