import React from 'react';

export type RadioGroupContextProps = {
  value?: string | number | boolean;
  onValueChange?: (value: string | number | boolean) => void;
};

export type RadioGroupContextPropTypes = RadioGroupContextProps;

type PropTypes = RadioGroupContextProps;

export default React.createContext<PropTypes>({
  value: undefined,
  onValueChange: undefined,
});
