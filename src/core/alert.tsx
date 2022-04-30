import React, { useState, createContext, useContext } from 'react';
import { Dimensions } from 'react-native';
import Snackbar, { DURATION } from '../components/Snackbar';
import { blue400, green400, orange400, red400, white } from '../styles/colors';

export type TAlert = {
  isOpen: boolean;
  message?: string;
  type?: string;
  backgroundColor?: string;
  action?: TAction;
};

export type TAction = {
  onPress: () => void;
  label: string;
};

export interface IAlert {
  alert: (message: string, action?: TAction) => void;
  error: (message: string, action?: TAction) => void;
  success: (message: string, action?: TAction) => void;
  info: (message: string, action?: TAction) => void;
  infinity: (message: string, action?: TAction) => void;
  isShowing: (message: string, action?: TAction) => boolean;
}

export const AlertContext = createContext({} as IAlert);

const { Provider } = AlertContext;

export function useAlert() {
  const mContext = useContext(AlertContext);

  return mContext;
}

function AlertProvider({ children }: any) {
  const initialAlert = {
    isOpen: false,
    message: '',
    type: '',
    backgroundColor: 'transparent',
    action: undefined,
  };

  const [alertState, setAlertState] = useState<TAlert>(initialAlert);

  const onDismissSnackBar = () => {
    setAlertState({
      ...alertState,
      isOpen: false,
    });
  };

  const alert = (message?: string, action?: TAction) => {
    show(message, 'simple', orange400, action);
  };

  const info = (message?: string, action?: TAction) => {
    show(message, 'info', blue400, action);
  };

  const error = (message?: string, action?: TAction) => {
    show(message, 'error', red400, action);
  };

  const success = (message?: string, action?: TAction) => {
    show(message, 'success', green400, action);
  };

  const infinity = (message?: string, action?: TAction) => {
    show(message, 'infinity', blue400, action);
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
    infinity: (message?: string, action?: TAction) => infinity(message, action),
    isShowing: () => alertState.isOpen,
  };

  return (
    <>
      <Provider value={mContext}>{children}</Provider>

      <Snackbar
        visible={alertState.isOpen}
        onDismiss={onDismissSnackBar}
        type={alertState.type}
        duration={
          alertState.type === 'error'
            ? DURATION.DURATION_MEDIUM
            : alertState.type === 'infinity'
            ? DURATION.DURATION_INFINITY
            : DURATION.DURATION_SHORT
        }
        action={alertState.action}
        message={alertState.message || ''}
        wrapperStyle={{ width: Dimensions.get('screen').width - 18 }}
        leftIconName={
          alertState.type === 'error'
            ? 'alert-line'
            : alertState.type === 'success'
            ? 'checkbox-circle-line'
            : 'information-line'
        }
        leftIconColor={white}
        leftIconSize={18}
      />
    </>
  );
}

export default AlertProvider;
