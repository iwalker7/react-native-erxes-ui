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
import TextView from '../Typography';

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
    <RNModal
      visible={isVisible}
      animationType={animationType || 'fade'}
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
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
          style,
        ]}
      >
        <TouchableOpacity
          onPressOut={() => {
            onHideComplete();
          }}
          style={styles.centeredView}
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
              {cancelable && (
                <Pressable
                  style={styles.xbutton}
                  onPress={() => onVisible(false)}
                >
                  <TextView small color={'#616161'}>
                    Close
                  </TextView>
                </Pressable>
              )}

              {children}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </RNModal>
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
    width: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    shadowOpacity: 0.5,
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
