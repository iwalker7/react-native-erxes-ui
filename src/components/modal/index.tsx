/* eslint-disable react-native/no-inline-styles */
import React, { SetStateAction } from 'react';
import { Pressable } from 'react-native';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps as RNViewProps,
  ViewStyle,
} from 'react-native';
import TextView from '../typography';

export type ModalProps = RNModalProps &
  RNViewProps & {
    onHide?: () => void;
    isVisible: boolean;
    onVisible: SetStateAction<any>;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle> | any | {};
    cancelable?: boolean | true;
    bottom?: boolean;
    withoutTouch?: boolean;
    animationType?: 'fade' | 'none' | 'slide' | undefined;
    bgColor?: string;
    shadowRadius?: string;
    width?: number;
  };

const Modal: React.FC<ModalProps> = ({
  onHide,
  isVisible,
  onVisible,
  children,
  style,
  cancelable = true,
  animationType,
  bottom = false,
  width,
  shadowRadius,
}) => {
  const onHideComplete = () => {
    if (cancelable) {
      onHide && onHide();
      onVisible && onVisible(false);
    }
  };

  return (
    <TouchableOpacity
      onPressOut={() => {
        onHideComplete();
      }}
      style={styles.centeredView}
    >
      <RNModal
        visible={isVisible}
        animationType={animationType || 'slide'}
        transparent
        onRequestClose={() => {
          onHideComplete();
        }}
      >
        <View style={bottom ? styles.bottomView : styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                width: bottom ? '100%' : width ? width : '90%',
                shadowRadius: shadowRadius,
                minHeight: bottom ? 150 : 50,
              },
              style,
            ]}
          >
            <Pressable style={styles.xbutton} onPress={() => onVisible(false)}>
              <TextView small color={'#616161'}>
                Close
              </TextView>
            </Pressable>
            {children}
          </View>
        </View>
      </RNModal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 5,
  },
  xbutton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 20,
  },
});

export default Modal;
