/* eslint-disable react-native/no-inline-styles */
import React, { SetStateAction } from 'react';
import {
  Pressable,
  TouchableWithoutFeedback,
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps as RNViewProps,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import color from 'color';

import TextView from '../Typography';
import Divider from '../Divider';
import { black, grey100, grey500, white } from '../../styles/colors';
import ScreenUtils from '../../utils/screenUtils';
import { withTheme } from '../../core/theming';

export type ModalProps = RNModalProps &
  RNViewProps & {
    onHide?: () => void;
    isVisible: boolean;
    onVisible: SetStateAction<any>;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle> | {};
    cancelable?: boolean;
    bottom?: boolean;
    withHeader?: boolean;
    headerText?: string;
    withoutTouch?: boolean;
    animationType?: 'fade' | 'none' | 'slide' | undefined;
    bgColor?: string;
    modalHeader?: JSX.Element;
    theme: ReactNativeErxes.Theme;
  };

const Modal: React.FC<ModalProps> = ({
  theme,
  onHide,
  isVisible,
  onVisible,
  children,
  style,
  cancelable = true,
  animationType,
  bottom = false,
  modalHeader,
  withHeader,
  headerText,
  withoutTouch,
  ...rest
}) => {
  const { colors } = theme;

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
      {withoutTouch ? (
        <View style={styles.dialogContainer}>
          <View
            style={[
              {
                flex: 1,
                width: '100%',
              },
              style,
            ]}
          >
            {children}
          </View>
        </View>
      ) : (
        <View
          style={[
            {
              flex: 1,
              width: '100%',
              justifyContent: 'flex-end',
              backgroundColor: colors.backdrop,
            },
            style,
          ]}
        >
          <TouchableOpacity
            style={styles.dialogContainer}
            activeOpacity={1}
            onPressOut={() => {
              onHideComplete();
            }}
          >
            {bottom ? (
              <View style={[{ flex: 1, justifyContent: 'flex-end' }]}>
                <TouchableWithoutFeedback>
                  <KeyboardAvoidingView
                    style={[
                      styles.modalView,
                      {
                        paddingBottom: ScreenUtils.isIphoneWithNotch()
                          ? 30
                          : 10,
                        backgroundColor: rest?.bgColor ? rest?.bgColor : white,
                      },
                    ]}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                  >
                    {children}
                  </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback>
                  <View
                    style={[
                      styles.modalView,
                      {
                        width: '90%',
                        minHeight: 50,
                      },
                      style,
                    ]}
                  >
                    {withHeader && (
                      <View
                        style={{
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          backgroundColor: grey100,
                        }}
                      >
                        <TextView style={styles.popoverHeader}>
                          {headerText}
                        </TextView>
                        <Divider />
                      </View>
                    )}
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
                    {modalHeader}
                    {children}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
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
    color: grey500,
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: grey500,
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '500',
    height: 50,
    backgroundColor: 'red',
  },
  dialogContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: color(black).alpha(0.5).rgb().string(),
  },
});

export default withTheme(Modal);
