/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';

// type StackParamList = {
//   Main: undefined;

//   Card: undefined;
//   Chip: undefined;
//   Divider: undefined;
//   Dropdown: undefined;
//   ImageView: undefined;
//   Loader: undefined;
//   Modal: undefined;
//   Popover: undefined;
//   TextInput: undefined;
//   Touchable: undefined;
// };

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Main"> */}
      <Stack.Screen name="Main" component={MainScreen} />
      {/* {map(screens, (screen, key) => {
          return (
            <Stack.Screen
              key={key}
              name={key.replace('Screen', '')}
              component={screen}
            />
          );
        })} */}
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  );
}
