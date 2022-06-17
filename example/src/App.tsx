/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import {
  AvatarScreen,
  ButtonScreen,
  CardScreen,
  PickerScreen,
  EmptyScreen,
  LoaderScreen,
  ModalScreen,
  TextInputScreen,
  TextScreen,
  UplaoderScreen,
  TouchableScreen,
  ThemeScreen,
  RadioButtonScreen,
  CheckboxScreen,
  DialogScreen,
  ChipScreen,
  SnackbarScreen,
  ExpandableSectionScreen,
} from './screens';

import {
  Provider as ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-erxes-ui';

const Stack = createStackNavigator();

declare global {
  namespace ReactNativeErxes {
    interface ThemeFonts {
      superLight: ThemeFont;
    }
    interface ThemeColors {
      customColor: string;
    }
    interface ThemeAnimation {
      customProperty: number;
    }
    interface Theme {
      userDefinedThemeProperty: string;
    }
  }
}

const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const PREFERENCES_KEY = 'APP_PREFERENCES';

const CustomDarkTheme: ReactNativeErxes.Theme = {
  ...DarkTheme,
  themeColors: {
    ...DarkTheme.themeColors,
    customColor: '#BADA55',
  },
  fonts: {
    ...DarkTheme.fonts,
    superLight: { ...DarkTheme.fonts.light },
  },
  userDefinedThemeProperty: '',
  animation: {
    ...DarkTheme.animation,
    customProperty: 1,
  },
};

const CustomDefaultTheme = {
  ...DefaultTheme,
  themeColors: {
    ...DefaultTheme.themeColors,
    customColor: '#BADA55',
  },
  fonts: {
    ...DefaultTheme.fonts,
    superLight: { ...DefaultTheme.fonts['light'] },
  },
  userDefinedThemeProperty: '',
  animation: {
    ...DefaultTheme.animation,
    customProperty: 1,
  },
};

export default function App() {
  const option = {
    headerTitleStyle: {
      //   color: '#472D9A',
    },
  };

  return (
    <ThemeProvider theme={CustomDefaultTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Theme" component={ThemeScreen} options={option} />
          {/* { components} */}
          <Stack.Screen
            name="Avatar"
            component={AvatarScreen}
            options={option}
          />
          <Stack.Screen
            name="Button"
            component={ButtonScreen}
            options={option}
          />
          <Stack.Screen name="Card" component={CardScreen} options={option} />
          <Stack.Screen name="Empty" component={EmptyScreen} options={option} />
          <Stack.Screen
            name="Loader"
            component={LoaderScreen}
            options={option}
          />
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
          <Stack.Screen
            name="Picker"
            component={PickerScreen}
            options={option}
          />
          <Stack.Screen
            name="RadioButton"
            component={RadioButtonScreen}
            options={option}
          />
          <Stack.Screen
            name="Checkbox"
            component={CheckboxScreen}
            options={option}
          />
          <Stack.Screen
            name="Dialog"
            component={DialogScreen}
            options={option}
          />
          <Stack.Screen name="Chip" component={ChipScreen} options={option} />
          <Stack.Screen
            name="Snackbar"
            component={SnackbarScreen}
            options={option}
          />
          <Stack.Screen
            name="ExpandableSection"
            component={ExpandableSectionScreen}
            options={option}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
