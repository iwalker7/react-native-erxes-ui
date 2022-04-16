/* eslint-disable react-native/no-inline-styles */
import React, { SetStateAction } from 'react';
import {
  KeyboardAvoidingView,
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps as RNViewProps,
  ViewStyle,
} from 'react-native';
import { ios } from '../../commons/utils';

export type ModalProps = RNModalProps &
  RNViewProps & {
    onHide?: () => void;
    isVisible: boolean;
    onVisible: SetStateAction<any>;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    cancelable?: boolean | true;
    withoutTouch?: boolean;
    animationType?: 'fade' | 'none' | 'slide' | undefined;
    bgColor?: string;
  };

const Modal: React.FC<ModalProps> = ({
  onHide,
  isVisible,
  onVisible,
  children,
  style,
  cancelable = true,
  animationType,
  bgColor,
}) => {
  const onHideComplete = () => {
    if (cancelable) {
      onHide && onHide();
      onVisible && onVisible(false);
    }
  };
  return (
    <RNModal
      visible={isVisible}
      animationType={animationType}
      transparent
      onRequestClose={() => {
        onHideComplete();
      }}
    >
      <View
        style={[
          {
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
          },
          style,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.dialogContainer,
            { backgroundColor: bgColor ? bgColor : 'rgba(0, 0, 0, 0.5)' },
          ]}
          activeOpacity={1}
          onPressOut={() => {
            onHideComplete();
          }}
        />

        <KeyboardAvoidingView
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          behavior={ios ? 'padding' : undefined}
        >
          {children}
        </KeyboardAvoidingView>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Modal;
