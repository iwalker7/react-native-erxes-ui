import React, { LegacyRef } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';

export type TouchableProps = TouchableOpacityProps & {
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => void;
  onLongPress?: () => void;
  touchRef?: LegacyRef<TouchableOpacity | any>;
};

const Touchable: React.ForwardRefRenderFunction<unknown, TouchableProps> = ({
  activeOpacity = 0.5,
  style,
  onPress,
  onLongPress,
  touchRef,
  ...rest
}) => {
  let isCalled: boolean = false,
    timer: any;

  const HandlerOnceTap = (e: GestureResponderEvent) => {
    if (!isCalled) {
      isCalled = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        isCalled = false;
      }, 1000);
      return onPress && onPress(e);
    }
  };

  return (
    <TouchableOpacity
      ref={touchRef}
      style={style}
      onLongPress={() => onLongPress && onLongPress()}
      onPress={HandlerOnceTap}
      activeOpacity={activeOpacity}
      {...rest}
    >
      {rest.children}
    </TouchableOpacity>
  );
};

export default Touchable;
