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
  ModalScreen,
  TextInputScreen,
  TextScreen,
  UplaoderScreen,
} from './screens';
import TouchableScreen from './screens/TouchableScreen';
import LoaderScreen from './screens/LoaderScreen';

const Stack = createStackNavigator();

export default function App() {
  const option = {
    headerTitleStyle: {
      //   color: '#472D9A',
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Alert" component={AlertScreen} options={option} />
        <Stack.Screen name="Avatar" component={AvatarScreen} options={option} />
        <Stack.Screen name="Button" component={ButtonScreen} options={option} />
        <Stack.Screen name="Card" component={CardScreen} options={option} />
        <Stack.Screen name="Empty" component={EmptyScreen} options={option} />
        <Stack.Screen name="Loader" component={LoaderScreen} options={option} />
        <Stack.Screen name="Modal" component={ModalScreen} options={option} />
        <Stack.Screen name="Text" component={TextScreen} options={option} />
        <Stack.Screen
          name="TextInput"
          component={TextInputScreen}
          options={option}
        />
        <Stack.Screen
          name="Touchable"
          component={TouchableScreen}
          options={option}
        />
        <Stack.Screen
          name="Uploader"
          component={UplaoderScreen}
          options={option}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
