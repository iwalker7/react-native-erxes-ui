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
import Divider from '../Divider';
import { bgLight, coreGray } from '../../styles/colors';

export type ModalProps = RNModalProps &
  RNViewProps & {
    onHide?: () => void;
    isVisible: boolean;
    onVisible: SetStateAction<any>;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle> | any | {};
    cancelable?: boolean | true;
    bottom?: boolean;
    withHeader?: boolean;
    headerText?: string;
    withoutTouch?: boolean;
    animationType?: 'fade' | 'none' | 'slide' | undefined;
    bgColor?: string;
    shadowRadius?: string;
    width?: number;
    modalHeader?: JSX.Element;
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
  modalHeader,
  withHeader,
  headerText,
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
      <TouchableOpacity
        onPressOut={() => {
          onHideComplete();
        }}
        style={styles.centeredView}
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
              {withHeader && (
                <View
                  style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: bgLight,
                  }}
                >
                  <TextView style={styles.popoverHeader}>{headerText}</TextView>
                  <Divider />
                </View>
              )}
              {modalHeader}
              {children}
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  xbutton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 20,
  },
  popoverHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: coreGray,
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default Modal;
