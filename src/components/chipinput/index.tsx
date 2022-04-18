// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-native/no-inline-styles */
// import React, { useRef, useState, useEffect } from 'react';
// import { ScrollView, StyleSheet, Keyboard } from 'react-native';
// import { View, Text } from 'react-native';
// import { getAttachmentUrl, getNameChip } from 'src/commons/erxesconstants';
// import { ios } from 'src/commons/utils';
// import { Touchable, Avatar, TextInput, Card, TextView } from '../../index';

// export type ChipsInputProps = {
//   baseUrl: 'string';
//   type: 'user' | 'list' | 'item';
//   onFocus?: (chipRef: any) => void;
//   data: any;
//   chipItems: any[];
//   onAdd: (item: any) => void;
//   onRemove: (item?: any) => void;
//   onSearch: (text: string) => void;
//   focusedRef: any;
//   setFocusedRef: (ref: any) => void;
//   setenableScrollViewScroll: (a: boolean) => void;
//   placeholder?: string;
// };

// export type ChipProp = {
//   key: string;
//   uri: string;
//   onRemove: (index: number) => void;
// };

// const ChipsInput: React.ForwardRefRenderFunction<unknown, ChipsInputProps> = ({
//   onFocus,
//   data,
//   focusedRef,
//   setFocusedRef,
//   onAdd,
//   onSearch,
//   placeholder,
//   baseUrl = 'api.office.erxes.io',
//   type = 'list',
// }) => {
//   const inputRef = useRef<any>(null);
//   const [search, onChangeSearch] = useState<string>('');

//   useEffect(() => {
//     Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
//     return () => {
//       Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
//     };
//   }, []);

//   const _keyboardDidHide = () => {
//     setFocusedRef(undefined);
//     inputRef.current?.blur();
//   };
//   const renderItem = (item: any, index: number) => {
//     const URI =
//       type !== 'user'
//         ? getAttachmentUrl(baseUrl, item.details.avatar)
//         : getAttachmentUrl(baseUrl, item.avatar);

//     return (
//       <Touchable
//         key={index.toString()}
//         onPress={() => {
//           onAdd(item);
//           onChangeSearch('');
//         }}
//       >
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingVertical: 5,
//           }}
//         >
//           <Avatar
//             uri={URI}
//             source={{
//               uri: URI,
//             }}
//           />

//           <Text
//             maxFontSizeMultiplier={1}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//             style={{ marginStart: 8, color: '#373737' }}
//           >
//             {type !== 'user' ? getNameChip(item, true, false) : item}
//           </Text>
//         </View>
//       </Touchable>
//     );
//   };

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           borderColor: focusedRef === inputRef ? '#4F33AF' : '#e6e6e6',
//         },
//       ]}
//     >
//       <View
//         style={{
//           flexDirection: 'row',
//           flexWrap: 'wrap',
//         }}
//       >
//         {chipItems?.map((item: any, index: number) => (
//           <Chip
//             key={index.toString()}
//             item={item}
//             index={index}
//             isAvatar={isAvatar}
//             isUser={isUser}
//             onRemove={onRemove}
//           />
//         ))}
//       </View>
//       {onFocus && (
//         <TextInput
//           inputRef={inputRef}
//           style={styles.searchInput}
//           placeholder={placeholder}
//           onChangeText={(text: string) => {
//             onChangeSearch(text);
//             onSearch(text);
//           }}
//           value={search}
//           onFocus={() => {
//             onFocus(inputRef);
//           }}
//         />
//       )}

//       {focusedRef === inputRef && (
//         <Card
//           style={{
//             margin: 0,
//             marginBottom: 0,
//             backgroundColor: '#fff',
//           }}
//         >
//           <ScrollView
//             keyboardShouldPersistTaps="handled"
//             contentContainerStyle={{ paddingVertical: 4 }}
//             showsVerticalScrollIndicator={false}
//             style={styles.dropdown}
//             nestedScrollEnabled={true}
//             scrollEventThrottle={0}
//           >
//             {data?.length > 0 ? (
//               <View>
//                 {data?.map((item: any, index: number) =>
//                   renderItem(item, index)
//                 )}
//               </View>
//             ) : (
//               <Text style={{ padding: 5 }}>No result </Text>
//             )}
//           </ScrollView>
//         </Card>
//       )}
//     </View>
//   );
// };

// const Chip = (uri: string) => {
//   return (
//     <View>
//       <TextView>{uri}</TextView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderColor: '#4F33AF',
//     marginTop: 10,
//     paddingBottom: ios ? 0 : 5,
//   },
//   searchInput: {
//     padding: 0,
//     paddingVertical: ios ? 8 : 5,
//   },
//   dropdown: {
//     maxHeight: 200,
//     backgroundColor: '#fff',
//     width: '100%',
//     paddingHorizontal: 8,
//     position: ios ? 'absolute' : 'relative',
//     // top: '100%',
//     borderRadius: 5,
//   },
//   avatar: {
//     height: 22,
//     width: 22,
//     borderRadius: 12,
//     backgroundColor: '#4F33AF',
//   },
//   shadow: {
//     margin: 5,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   noShadow: {
//     margin: 5,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
// });

// export default ChipsInput;
