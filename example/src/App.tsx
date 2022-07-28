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
  FABScreen,
} from './screens';

import {
  Provider as ThemeProvider,
  DarkTheme,
  DefaultTheme,
  Colors,
  Snackbar,
  DURATION,
} from 'react-native-erxes-ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

declare global {
  namespace ReactNativeErxes {
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
  colors: {
    ...DarkTheme.colors,
    customColor: '#BADA55',
  },
  fonts: {
    ...DarkTheme.fonts,
  },
  userDefinedThemeProperty: '',
  animation: {
    ...DarkTheme.animation,
    customProperty: 1,
  },
  mode: 'exact',
};

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    customColor: '#BADA55',
  },
  fonts: {
    ...DefaultTheme.fonts,
  },
  userDefinedThemeProperty: '',
  animation: {
    ...DefaultTheme.animation,
    customProperty: 1,
  },
};
const initialAlert = {
  isOpen: false,
  message: '',
  type: '',
  backgroundColor: '',
  action: undefined,
};

type TAlert = {
  isOpen: boolean;
  message?: string;
  type?: string;
  backgroundColor?: string;
  action?: TAction;
};

type TAction = {
  onPress: () => void;
  label: string;
};

interface IAlert {
  alert: (message: string, action?: TAction) => void;
  error: (message: string, action?: TAction) => void;
  success: (message: string, action?: TAction) => void;
  info: (message: string, action?: TAction) => void;
  warn: (message: string, action?: TAction) => void;
  infinity: (message: string, action?: TAction) => void;
  isShowing: (message: string, action?: TAction) => boolean;
}

const AlertContext = React.createContext({} as IAlert);
const { Provider } = AlertContext;
export function useAlert() {
  const mContext = React.useContext(AlertContext);
  return mContext;
}

export default function App() {
  const option = {
    headerTitleStyle: {
      color: '#472D9A',
    },
  };

  const [alertState, setAlertState] = React.useState<TAlert>(initialAlert);

  const onDismissSnackBar = () => {
    setAlertState({
      ...initialAlert,
      isOpen: false,
    });
  };

  const alert = (message?: string, action?: TAction) => {
    show(message, 'simple', Colors.blue500, action);
  };

  const info = (message?: string, action?: TAction) => {
    show(message, 'info', Colors.blue500, action);
  };

  const error = (message?: string, action?: TAction) => {
    show(message, 'error', Colors.red400, action);
  };

  const success = (message?: string, action?: TAction) => {
    show(message, 'success', Colors.lightGreen500, action);
  };

  const warn = (message?: string, action?: TAction) => {
    show(message, 'warn', Colors.amberA400, action);
  };

  const infinity = (message?: string, action?: TAction) => {
    show(message, 'infinity', Colors.amberA400, action);
  };
  const show = (
    message?: string,
    type?: string,
    backgroundColor?: string,
    action?: TAction
  ) => {
    setAlertState({
      ...initialAlert,
      isOpen: true,
      message: message,
      type: type,
      backgroundColor: backgroundColor,
      action,
    });
  };

  const mContext: IAlert = {
    alert: (message?: string, action?: TAction) => alert(message, action),
    error: (message?: string, action?: TAction) => error(message, action),
    success: (message?: string, action?: TAction) => success(message, action),
    info: (message?: string, action?: TAction) => info(message, action),
    warn: (message?: string, action?: TAction) => warn(message, action),
    infinity: (message?: string, action?: TAction) => infinity(message, action),
    isShowing: () => alertState.isOpen,
  };

  return (
    <ThemeProvider theme={CustomDefaultTheme}>
      <Provider value={mContext}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Theme"
              component={ThemeScreen}
              options={option}
            />
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
            <Stack.Screen
              name="Empty"
              component={EmptyScreen}
              options={option}
            />
            <Stack.Screen
              name="Loader"
              component={LoaderScreen}
              options={option}
            />
            <Stack.Screen
              name="Modal"
              component={ModalScreen}
              options={option}
            />
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
            <Stack.Screen name="FAB" component={FABScreen} options={option} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <Snackbar
        visible={alertState.isOpen}
        onDismiss={onDismissSnackBar}
        type={alertState.type}
        duration={
          alertState.type === 'error'
            ? 3000
            : alertState.type === 'infinity'
            ? 5000
            : 1500
        }
        action={alertState.action}
        backgroungColor={alertState.backgroundColor}
      >
        {alertState.message}
      </Snackbar>
    </ThemeProvider>
  );
}
