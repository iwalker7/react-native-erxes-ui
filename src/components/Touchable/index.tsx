import React, { LegacyRef, forwardRef } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from 'react-native';

export type TouchableProps = RNTouchableOpacityProps & {
  style?: StyleProp<ViewStyle>;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => void;
  onLongPress?: () => void;
  ref?: LegacyRef<TouchableOpacity | any>;
};

const Touchable: React.ForwardRefRenderFunction<unknown, TouchableProps> = (
  { activeOpacity = 0.5, style, onPress, onLongPress, ...rest },
  ref
) => {
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
      ref={ref}
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

export default forwardRef(Touchable);
