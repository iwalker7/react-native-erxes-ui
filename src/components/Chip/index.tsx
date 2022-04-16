// /* eslint-disable react-native/no-inline-styles */
// //gitlab.com//* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import { StyleSheet, Image, View } from 'react-native';
// import { TextView, Touchable } from '../../index';
// import { getNameChip } from '../../utils';
// import images from '../../assets/images';

// export type ChipProps = {
//   item: any;
//   index: number;
//   source: any;
//   isAvatar: boolean;
//   isUser: boolean;
//   onRemove: (index: number) => void;
// };

// const Chip: React.FC<ChipProps> = ({
//   item,
//   index,
//   source,

//   onRemove,
// }) => {
//   return (
//     <View style={[styles.chipContainer, { backgroundColor: '#fda50f' }]}>
//       {isAvatar && (
//         <Image
//           source={source}
//           placeHolder={images.avatar}
//           style={styles.chipImage}
//         />
//       )}

//       <TextView small style={styles.chipName}>
//         {getNameChip(item, false, true)}
//       </TextView>
//       <Touchable
//         style={{ justifyContent: 'center' }}
//         onPress={() => {
//           onRemove(index);
//         }}
//       >
//         <View style={styles.chipRemove} />
//       </Touchable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   chipImage: {
//     height: 22,
//     width: 22,
//     margin: 1,
//     borderRadius: 12,
//   },
//   chipContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 15,
//     marginEnd: 3,
//     marginBottom: 3,
//   },
//   chipName: {
//     color: '#fff',
//     marginStart: 5,
//     marginEnd: 5,
//   },
//   chipRemove: {
//     height: 24,
//     width: 24,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#000',
//     opacity: 0.15,
//   },
// });

// export default Chip;
