// /* eslint-disable react-native/no-inline-styles */
// import React, { RefObject, SetStateAction } from 'react';
// import { StyleSheet, Easing, StyleProp, View, ViewStyle } from 'react-native';
// import Popover from 'react-native-popover-view/dist/Popover';
// import { PopoverPlacement } from 'react-native-popover-view';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// export type PopoverProp = {
//   isVisible: boolean;
//   onVisible: SetStateAction<any>;
//   from?:
//     | RefObject<View>
//     | ((sourceRef: RefObject<View>, openPopover: () => void) => React.ReactNode)
//     | React.ReactNode;
//   popStyle?: StyleProp<ViewStyle>;
//   popBackgroundColor?: string;
//   hasArrow?: boolean;
//   isFixed70?: boolean;
//   isFixed50?: boolean;
//   verticalOffset?: number;
//   popoverStyle?: StyleProp<ViewStyle>;
//   arrowStyle?: StyleProp<ViewStyle>;
//   backgroundStyle?: StyleProp<ViewStyle>;
//   arrowShift?: number;
//   onOpenStart?: () => void;
//   onOpenComplete?: () => void;
//   onRequestClose?: () => void;
//   onCloseStart?: () => void;
//   onCloseComplete?: () => void;
//   onPositionChange?: () => void;
//   debug?: boolean;
//   children?: any;
// };

// const XPopover: React.FC<PopoverProp> = ({
//   isVisible,
//   onVisible,
//   from,
//   popStyle,
//   popBackgroundColor,
//   arrowStyle,
//   hasArrow = true,
//   isFixed70 = false,
//   isFixed50 = false,
//   onRequestClose,
//   children,
// }) => {
//   const insets = useSafeAreaInsets();

//   return (
//     <Popover
//       displayAreaInsets={insets}
//       placement={PopoverPlacement.BOTTOM}
//       from={from}
//       isVisible={isVisible && isVisible}
//       // verticalOffset={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
//       arrowStyle={hasArrow ? arrowStyle && arrowStyle : { height: 0 }}
//       popoverStyle={[
//         styles.popoverShadow,
//         {
//           width: '70%',
//           borderRadius: 10,
//         },
//         popStyle,
//         {
//           overflow: hasArrow ? 'hidden' : 'visible',
//           width: isFixed70 ? '70%' : isFixed50 ? '50%' : undefined,
//         },
//       ]}
//       animationConfig={{
//         duration: 300,
//         easing: Easing.inOut(Easing.quad),
//       }}
//       backgroundStyle={{
//         backgroundColor: popBackgroundColor
//           ? popBackgroundColor
//           : 'rgba(0, 0, 0, 0.5)',
//       }}
//       onRequestClose={() => {
//         onRequestClose && onRequestClose();
//         onVisible && onVisible(false);
//       }}
//     >
//       {children}
//     </Popover>
//   );
// };

// const styles = StyleSheet.create({
//   popoverShadow: {
//     overflow: 'visible',
//     shadowColor: '#000',
//     shadowOpacity: 0.5,
//     shadowRadius: 3,
//     elevation: 5,
//   },
// });

// export default XPopover;
