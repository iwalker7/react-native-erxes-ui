import * as React from 'react';
import ErxesIcon, { IconProps } from '../components/MaterialCommunityIcons';

export type Settings = {
  icon: ({ name, color, size, direction }: IconProps) => React.ReactNode;
};

export const { Provider, Consumer } = React.createContext<Settings>({
  icon: ErxesIcon,
});
