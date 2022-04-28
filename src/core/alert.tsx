import React, { useState, createContext } from 'react';
import { useContext } from 'react';
import { Dimensions } from 'react-native';
import Snackbar from 'src/components/Snackbar';
import { DURATION } from 'src/components/Snackbar';
import { Brand } from '../styles/colors';

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

export function useAlertContext() {
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
    show(message, 'simple', Brand.secondary, action);
  };

  const info = (message?: string, action?: TAction) => {
    show(message, 'info', Brand.coreBlue, action);
  };

  const error = (message?: string, action?: TAction) => {
    show(message, 'error', Brand.error, action);
  };

  const success = (message?: string, action?: TAction) => {
    show(message, 'success', Brand.success, action);
  };

  const infinity = (message?: string, action?: TAction) => {
    show(message, 'infinity', Brand.coreBlue, action);
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
        rightIconName={
          alertState.type === 'error'
            ? 'alert-line'
            : alertState.type === 'success'
            ? 'checkbox-circle-line'
            : 'information-line'
        }
        rightIconColor={'#fff'}
        rightIconSize={18}
      />
    </>
  );
}

export default AlertProvider;
