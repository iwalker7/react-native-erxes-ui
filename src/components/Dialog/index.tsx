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
import ScreenUtils from '../../utils/screenUtils';
import Button from '../Button';
import Divider from '../Divider';
import TextView from '../Typography';

export type DialogProps = {
  onClose?: () => void;
  callBack?: () => void;
  title?: string;
  supportingText?: string;
  cancelText?: string;
  confirmText?: string;
  action: 'confirm' | 'single' | 'custom';
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
                <TextView bold color={theme.colors.textPrimary}>
                  {title ? title : 'Are you sure?'}
                </TextView>
                <TextView
                  small
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
                  <TextView bold color={theme.colors.textPrimary}>
                    {title}
                  </TextView>
                  <TextView
                    small
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
                  width={80}
                  color={theme.colors.onSurfaceLowest}
                  textStyle={{ color: theme.colors.textPrimary, fontSize: 13 }}
                  onPress={() => {
                    onVisible(false);
                    onClose && onClose();
                  }}
                >
                  {cancelText ? cancelText : 'Cancel'}
                </Button>
                <Button
                  mode="verify"
                  width={80}
                  style={{ marginStart: 10 }}
                  textStyle={{ fontSize: 13 }}
                  onPress={() => {
                    onVisible(false);
                    callBack && callBack();
                  }}
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
                  padding: 10,
                }}
              >
                <Button
                  width={'50%'}
                  type={'text'}
                  color={theme.colors.primary}
                  textStyle={{ color: theme.colors.textPrimary, fontSize: 13 }}
                  onPress={() => {
                    onVisible(false);
                    callBack && callBack();
                  }}
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
