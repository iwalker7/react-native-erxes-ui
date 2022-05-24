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
  SafeAreaView,
} from 'react-native';
import TextView from '../Typography';
import Divider from '../Divider';
import { grey100, grey500 } from '../../styles/colors';
import ScreenUtils from '../../utils/screenUtils';
import { withTheme } from '../../core/theming';

export type ModalProps = RNModalProps &
  RNViewProps & {
    onHide?: () => void;
    isVisible: boolean;
    onVisible: SetStateAction<any>;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle> | {};
    contentContainerStyle?: StyleProp<ViewStyle> | {};
    cancelable?: boolean;
    bottom?: boolean;
    withHeader?: boolean;
    headerText?: string;
    withoutTouch?: boolean;
    bgColor?: string;
    modalHeader?: JSX.Element;
    iconClose?: JSX.Element;
    closeText?: string;
    transparent?: boolean;
    presentationStyle?:
      | 'fullScreen'
      | 'pageSheet'
      | 'formSheet'
      | 'overFullScreen';
    theme: ReactNativeErxes.Theme;
  };

const Modal: React.FC<ModalProps> = ({
  theme,
  onHide,
  isVisible,
  onVisible,
  children,
  style,
  contentContainerStyle,
  cancelable = true,
  bottom = false,
  modalHeader,
  withHeader,
  headerText,
  withoutTouch,
  iconClose,
  closeText,
  transparent = true,
  presentationStyle = 'overFullScreen',
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
      transparent={
        presentationStyle === 'pageSheet' || 'formSheet'
          ? false
          : transparent
          ? transparent
          : true
      }
      animationType={rest.animationType ? rest.animationType : 'fade'}
      onRequestClose={() => {
        onHideComplete();
      }}
      presentationStyle={ScreenUtils.isIOS ? presentationStyle : undefined}
    >
      {withoutTouch ? (
        <View
          style={[
            {
              backgroundColor:
                (presentationStyle === 'pageSheet' || 'formSheet') &&
                ScreenUtils.isIOS
                  ? 'transparent'
                  : colors.backdrop,
            },
            style,
          ]}
        >
          <View style={contentContainerStyle}>{children}</View>
        </View>
      ) : (presentationStyle === 'pageSheet' || 'formSheet') &&
        ScreenUtils.isIOS ? (
        <View style={contentContainerStyle}>{children}</View>
      ) : (
        <TouchableOpacity
          style={[
            {
              width: '100%',
              flex: 1,
              backgroundColor:
                (presentationStyle === 'pageSheet' || 'formSheet') &&
                ScreenUtils.isIOS
                  ? 'transparent'
                  : colors.backdrop,
              justifyContent: bottom ? 'flex-end' : 'center',
            },
          ]}
          activeOpacity={1}
          onPressOut={() => {
            onHideComplete();
          }}
        >
          {bottom ? (
            <SafeAreaView style={[styles.modalView, style]}>
              <TouchableWithoutFeedback>
                <View style={contentContainerStyle}>{children}</View>
              </TouchableWithoutFeedback>
            </SafeAreaView>
          ) : (
            <SafeAreaView style={[styles.modalView, style]}>
              <TouchableWithoutFeedback>
                <View>
                  {withHeader && (
                    <View
                      style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: grey100,
                      }}
                    >
                      {cancelable && (
                        <Pressable
                          style={styles.xbutton}
                          onPress={() => onVisible(false)}
                        >
                          {iconClose ? (
                            iconClose
                          ) : (
                            <TextView small color={'#616161'}>
                              {closeText ? closeText : 'Close'}
                            </TextView>
                          )}
                        </Pressable>
                      )}
                      <TextView style={styles.popoverHeader}>
                        {headerText}
                      </TextView>
                      <Divider />
                    </View>
                  )}
                  {modalHeader}
                  <View style={contentContainerStyle}>{children}</View>
                </View>
              </TouchableWithoutFeedback>
            </SafeAreaView>
          )}
        </TouchableOpacity>
      )}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 20,
    backgroundColor: '#fff',
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
});

export default withTheme(Modal);
