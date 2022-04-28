/* eslint-disable react-native/no-inline-styles */
import type { View } from 'react-native';
import type { StyleProp } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { RefObject } from 'react';
import type { SetStateAction } from 'react';
import type { Rect } from 'react-native-popover-view';
import Popover from 'react-native-popover-view/dist/Popover';
import React from 'react';
import { StyleSheet, Easing } from 'react-native';
import { PopoverPlacement } from 'react-native-popover-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bgDialog } from 'src/styles/colors';

export type PopoverProps = {
  isVisible: boolean;
  onVisible: SetStateAction<any>;
  from?:
    | Rect
    | RefObject<View>
    | ((sourceRef: RefObject<View>, openPopover: () => void) => React.ReactNode)
    | React.ReactNode;
  popStyle?: StyleProp<ViewStyle>;
  popBackgroundColor?: string;
  hasArrow?: boolean;
  isFixed70?: boolean;
  isFixed50?: boolean;
  onRequestClose?: () => void;
};
const XPopover: React.FC<PopoverProps> = ({
  isVisible,
  onVisible,
  from,
  popStyle,
  popBackgroundColor,
  hasArrow = true,
  children,
  isFixed70 = false,
  isFixed50 = false,
  onRequestClose,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Popover
      displayAreaInsets={insets}
      placement={PopoverPlacement.BOTTOM}
      from={from}
      isVisible={isVisible && isVisible}
      //verticalOffset={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
      popoverStyle={[
        styles.popoverShadow,
        {
          width: '70%',
          borderRadius: 10,
        },
        popStyle,
        {
          overflow: hasArrow ? 'hidden' : 'visible',
          width: isFixed70 ? '70%' : isFixed50 ? '50%' : undefined,
        },
      ]}
      animationConfig={{
        duration: 300,
        easing: Easing.inOut(Easing.quad),
      }}
      backgroundStyle={{
        backgroundColor: popBackgroundColor ? popBackgroundColor : bgDialog,
      }}
      onRequestClose={() => {
        onRequestClose && onRequestClose();
        onVisible && onVisible(false);
      }}
    >
      {children}
    </Popover>
  );
};

const styles = StyleSheet.create({
  popoverShadow: {
    overflow: 'visible',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default XPopover;
