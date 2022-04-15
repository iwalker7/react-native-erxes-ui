// /* eslint-disable react-native/no-inline-styles */
// import React, { useRef, useState } from 'react';
// import {
//   ScrollView,
//   StyleProp,
//   StyleSheet,
//   View,
//   ViewStyle,
// } from 'react-native';
// import { Popover, Touchable, TextView } from '../../index';

// type Props = {
//   selectedIndex?: number;
//   data?: any[];
//   onSelect?: any;
//   underline?: boolean;
//   containerStyle?: StyleProp<ViewStyle>;
//   popStyle?: StyleProp<ViewStyle>;
// };
// const Dropdown = ({
//   selectedIndex = 0,
//   data = [],
//   onSelect,
//   underline = true,
//   containerStyle,
//   popStyle,
// }: Props) => {
//   const dropRef = useRef<any>(null);
//   const [isOpen, onOpen] = useState(false);

//   //const { colors } = useTheme();

//   return (
//     <View style={[styles.container, containerStyle]}>
//       <Touchable onPress={() => onOpen(!isOpen)} touchRef={dropRef}>
//         <View
//           style={[
//             styles.title,
//             {
//               borderColor: colors.surfaceGrayDarker,
//               borderBottomWidth: underline ? 1 : 0,
//             },
//           ]}
//         >
//           <TextView style={{ fontSize: 13, flex: 1 }}>
//             {data[selectedIndex]}
//           </TextView>
//           {/* <IconCore
//             name={isOpen ? 'uparrow-2' : 'downarrow'}
//             // color={grey100}
//             style={{ marginStart: 5 }}
//             // size={14}
//           /> */}
//         </View>
//       </Touchable>
//       <Popover
//         from={dropRef}
//         isVisible={isOpen}
//         onVisible={onOpen}
//         popBackgroundColor={'rgba(255, 255, 255, 0)'}
//         arrowStyle={{ height: 0 }}
//         hasArrow={false}
//         popStyle={popStyle}
//       >
//         <ScrollView
//           style={{ maxHeight: 200 }}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={popStyle}>
//             {data.map((item, index) => {
//               return (
//                 <Touchable
//                   key={index.toString()}
//                   onPress={() => {
//                     onSelect(index);
//                     onOpen(false);
//                   }}
//                 >
//                   <View style={styles.itemText}>
//                     <TextView small>{item}</TextView>
//                   </View>
//                 </Touchable>
//               );
//             })}
//           </View>
//         </ScrollView>
//       </Popover>
//     </View>
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
//   container: {
//     marginVertical: 5,
//   },
//   title: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     paddingVertical: 5,
//   },
//   itemText: {
//     flex: 1,
//     padding: 8,
//     paddingHorizontal: 10,
//   },
// });

// export default Dropdown;
