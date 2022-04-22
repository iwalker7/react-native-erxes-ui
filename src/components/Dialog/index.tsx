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
  onSave?: () => void;
  title?: string;
  supportingText?: string;
  closeText?: string;
  saveText?: string;
  action: 'alert' | 'simple' | 'confirm';
  containerStyle?: StyleProp<ViewStyle>;
  isVisible: boolean;
  onVisible: SetStateAction<any>;
  children?: React.ReactNode;
};

const Dialog: React.FC<DialogProps> = ({
  onClose,
  onSave,
  title,
  supportingText,
  closeText,
  saveText,
  action,
  containerStyle,
  isVisible,
  onVisible,
  children,
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
        style={styles.dialogContainer}
        activeOpacity={1}
        onPressOut={() => {
          onVisible(false);
        }}
      >
        <TouchableWithoutFeedback>
          <View style={[styles.container, containerStyle]}>
            {(action === 'alert' || action === 'confirm') && (
              <View style={{ padding: 20, alignItems: 'center' }}>
                {/* action === 'alert' && <IconCore
                  name="exclamation-triangle"
                  color={colors.colorSecondary}
                  size={35}
                  style={{ marginBottom: 5 }}
                /> */}
                <TextView bold style={{ marginBottom: 5, color: '#373737' }}>
                  {title ? title : 'Are you sure?'}
                </TextView>
                <TextView small color="#373737">
                  {supportingText ? supportingText : 'This cannot be undone.'}
                </TextView>
              </View>
            )}
            {children && action === 'simple' && (
              <>
                <View style={styles.header}>
                  <TextView bold color="#373737">
                    {title}
                  </TextView>
                  <TextView small color="#373737" style={{ marginTop: 3 }}>
                    {supportingText ? supportingText : 'This cannot be undone.'}
                  </TextView>
                </View>
                <Divider />
                <View style={{ padding: 10 }}>{children}</View>
              </>
            )}
            {action !== 'simple' && (
              <View style={styles.buttonsContainer}>
                <Button
                  color="#E0E0E0"
                  iconName="times-circle"
                  iconColor={'#373737'}
                  textstyle={{ color: '#373737', fontSize: 13 }}
                  onPress={() => {
                    onVisible(false);
                    onClose && onClose();
                  }}
                >
                  {action === 'alert'
                    ? 'No, Cancel'
                    : action === 'confirm'
                    ? 'Cancel'
                    : closeText && closeText}
                </Button>
                <Button
                  mode="verify"
                  style={{ marginStart: 10 }}
                  iconName="times-circle"
                  iconColor={'#373737'}
                  textstyle={{ fontSize: 13 }}
                  onPress={() => {
                    onVisible(false);
                    onSave && onSave();
                  }}
                >
                  {action === 'alert'
                    ? 'Yes, I am'
                    : action === 'confirm'
                    ? 'Save'
                    : saveText && saveText}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
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
});

export default Dialog;
