/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import {
  AlertScreen,
  AvatarScreen,
  ButtonScreen,
  CardScreen,
  EmptyScreen,
  TextInputScreen,
  TextScreen,
} from './screens';
import TouchableScreen from './screens/TouchableScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />

        <Stack.Screen name="Alert" component={AlertScreen} />
        <Stack.Screen name="Avatar" component={AvatarScreen} />
        <Stack.Screen name="Button" component={ButtonScreen} />
        <Stack.Screen name="Card" component={CardScreen} />
        <Stack.Screen name="Empty" component={EmptyScreen} />
        <Stack.Screen name="Text" component={TextScreen} />
        <Stack.Screen name="TextInput" component={TextInputScreen} />
        <Stack.Screen name="Touchable" component={TouchableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
