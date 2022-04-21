import * as React from 'react';
import { View } from 'react-native';

export type RBGroupProps = {
  /**
   * Function to execute on selection change.
   */
  onValueChange: (value: string) => void;
  /**
   * Value of the currently selected radio button.
   */
  value: string;
  /**
   * React elements containing radio buttons.
   */
  children: React.ReactNode;
};

export type RadioButtonContextType = {
  value: string;
  onValueChange: (item: string) => void;
};

export const RadioButtonContext = React.createContext<RadioButtonContextType>(
  null as any
);

const RadioButtonGroup: React.FC<RBGroupProps> = ({
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
