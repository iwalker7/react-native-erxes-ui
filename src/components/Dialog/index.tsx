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
import { grey800, grey300 } from '../../styles/colors';
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
  icon?: JSX.Element;
  children?: React.ReactNode;
};

const Dialog: React.FC<DialogProps> = ({
  onClose,
  onSave,
  title,
  icon,
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
              <View style={styles.body}>
                {icon}
                <TextView bold style={styles.subText}>
                  {title ? title : 'Are you sure?'}
                </TextView>
                <TextView small color={grey800} style={styles.subText}>
                  {supportingText ? supportingText : 'This cannot be undone.'}
                </TextView>
              </View>
            )}
            {children && action === 'simple' && (
              <>
                <View style={styles.header}>
                  <TextView bold color={grey800}>
                    {title}
                  </TextView>
                  <TextView small color={grey800} style={{ marginTop: 3 }}>
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
                  width={80}
                  color={grey300}
                  textStyle={{ color: grey800, fontSize: 13 }}
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
                  width={80}
                  style={{ marginStart: 10 }}
                  textStyle={{ fontSize: 13 }}
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
  body: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  subText: {
    color: '#373737',
    marginBottom: 5,
  },
});

export default Dialog;
