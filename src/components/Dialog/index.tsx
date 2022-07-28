/* eslint-disable react-native/no-inline-styles */
import React, { SetStateAction } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Button from '../Button';
import Divider from '../Divider';
import TextView from '../Typography';

export type DialogProps = {
  onClose?: () => void;
  callBack?: () => void;
  buttonType?: 'contained' | 'outlined' | 'text';
  cancelButtonStyle?: StyleProp<ViewStyle>;
  confirmButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonTextStyle?: StyleProp<ViewStyle>;
  confirmButtonTextStyle?: StyleProp<ViewStyle>;
  title?: string;
  supportingText?: string;
  cancelText?: string;
  confirmText?: string;
  action?: 'confirm' | 'single' | 'custom';
  containerStyle?: StyleProp<ViewStyle>;
  isVisible: boolean;
  onVisible: SetStateAction<any>;
  icon?: JSX.Element;
  children?: React.ReactNode;
  theme: ReactNativeErxes.Theme;
};

const Dialog: React.FC<DialogProps> = ({
  onClose,
  callBack,
  title,
  icon,
  supportingText,
  cancelText,
  confirmText,
  action = 'confirm',
  containerStyle,
  isVisible,
  onVisible,
  children,
  theme,
  cancelButtonStyle,
  confirmButtonStyle,
  buttonType = 'text',
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={() => {
        onVisible(false);
      }}
    >
      <TouchableOpacity
        style={[
          styles.dialogContainer,
          { backgroundColor: theme.colors.backdrop },
        ]}
        activeOpacity={1}
        onPressOut={() => {
          onVisible(false);
        }}
      >
        <TouchableWithoutFeedback>
          <View
            style={[
              styles.container,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.roundness / 2,
              },
              containerStyle,
            ]}
          >
            {(action === 'confirm' || action === 'single') && (
              <View style={styles.body}>
                {icon}
                <TextView
                  bold
                  large
                  color={theme.colors.textPrimary}
                  style={{ marginVertical: 3 }}
                >
                  {title ? title : 'Are you sure?'}
                </TextView>
                <TextView
                  color={theme.colors.textSecondary}
                  style={styles.subText}
                >
                  {supportingText ? supportingText : 'This cannot be undone.'}
                </TextView>
              </View>
            )}
            {children && action === 'custom' && (
              <>
                <View style={styles.header}>
                  <TextView
                    bold
                    large
                    color={theme.colors.textPrimary}
                    style={{ marginVertical: 3 }}
                  >
                    {title}
                  </TextView>
                  <TextView
                    color={theme.colors.textSecondary}
                    style={{ marginTop: 3 }}
                  >
                    {supportingText ? supportingText : 'This cannot be undone.'}
                  </TextView>
                </View>
                <Divider />
                <View style={{ padding: 10 }}>{children}</View>
              </>
            )}
            {action === 'confirm' && (
              <View style={styles.buttonsContainer}>
                <Button
                  type={buttonType}
                  width={80}
                  textStyle={{ color: theme.colors.coreGray, fontSize: 15 }}
                  onPress={() => {
                    onVisible(false);
                    onClose && onClose();
                  }}
                  style={cancelButtonStyle}
                >
                  {cancelText ? cancelText : 'Cancel'}
                </Button>
                <Button
                  type={buttonType}
                  width={80}
                  textStyle={{ fontSize: 15 }}
                  onPress={() => {
                    onVisible(false);
                    callBack && callBack();
                  }}
                  style={confirmButtonStyle}
                >
                  {confirmText ? confirmText : 'Save'}
                </Button>
              </View>
            )}

            {action === 'single' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
              >
                <Button
                  width={80}
                  type={buttonType ? buttonType : 'text'}
                  onPress={() => {
                    onVisible(false);
                    callBack && callBack();
                  }}
                  textStyle={{ fontSize: 15 }}
                  style={confirmButtonStyle}
                >
                  {cancelText ? cancelText : 'Cancel'}
                </Button>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    alignSelf: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonStyle: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  body: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  subText: {
    marginBottom: 5,
  },
});

export default Dialog;
