// /* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import { TabBar, TabView } from 'react-native-tab-view';
// import { useTheme } from '../../core/theming';
// import { white } from '../../styles/colors';
// import ScreenUtils from '../../utils/screenUtils';
// import TextView from '../Typography';

// export type TabViewProps = {
//   index?: number;
//   routes?: any;
//   renderScene?: () => void;
//   onIndexChange: (index: number) => void;
//   props?: any;
// };

// const TopTabBar: React.FC<TabViewProps> = ({
//   index,
//   routes,
//   renderScene,
//   setIndex,
//   props,
//   ...rest
// }) => {
//   return (
//     <TabView
//       lazy
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{ width: ScreenUtils.screenWidth }}
//       renderTabBar={() => <CustomTopTabBar {...props} />}
//     />
//   );
// };

// const CustomTopTabBar: React.FC<any> = ({ icon, ...rest }) => {
//   const { colors } = useTheme();
//   return (
//     <TabBar
//       {...rest}
//       indicatorStyle={{
//         backgroundColor: colors.primary,
//         height: 3,
//         borderRadius: 30,
//       }}
//       style={{
//         backgroundColor: white,
//       }}
//       activeColor={colors.primary}
//       inactiveColor={colors.disabled}
//       renderIcon={() => (icon ? icon : null)}
//       renderLabel={({ color, route }) => (
//         <TextView
//           style={{
//             color,
//           }}
//         >
//           {route.title}
//         </TextView>
//       )}
//       tabStyle={{
//         flexDirection: 'row',
//         alignItems: 'center',
//       }}
//     />
//   );
// };

// export default TopTabBar;
