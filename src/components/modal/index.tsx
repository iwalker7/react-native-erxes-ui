/* eslint-disable react-native/no-inline-styles */
import React, { SetStateAction } from 'react';
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
import { grey500 } from '../../styles/colors';
import ScreenUtils from '../../utils/screenUtils';
import { withTheme } from '../../core/theming';
import { useState } from 'react';
import { useEffect } from 'react';

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
    withoutTouch?: boolean;
    bgColor?: string;
    headerComponent?: JSX.Element;
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
  cancelable = true,
  bottom = false,
  headerComponent,
  withoutTouch,
  transparent = true,
  presentationStyle,
  ...rest
}) => {
  const { colors } = theme;

  const [forceModalVisible, setForceModalVisible] = useState(false);
  useEffect(() => {
    if (forceModalVisible) {
      setForceModalVisible(false);
    }
  }, [forceModalVisible]);

  const onHideComplete = () => {
    if (cancelable) {
      onHide && onHide();
      onVisible && onVisible(false);
    }
  };

  //   const defaultHeader = () => {
  //       return <View
  //       style={{
  //         borderTopLeftRadius: 20,
  //         borderTopRightRadius: 20,
  //         backgroundColor: grey100,
  //       }}
  //     >
  //       {cancelable && (
  //         <Pressable
  //           style={styles.xbutton}
  //           onPress={() => onVisible(false)}
  //         >
  //           {iconClose ? (
  //             iconClose
  //           ) : (
  //             <TextView small color={'#616161'}>
  //               {closeText ? closeText : 'Close'}
  //             </TextView>
  //           )}
  //         </Pressable>
  //       )}
  //       <TextView style={styles.popoverHeader}>
  //         {headerTitle}
  //       </TextView>
  //       <Divider />
  //     </View>
  //   }

  return (
    <RNModal
      visible={isVisible}
      transparent={
        presentationStyle === 'pageSheet' || presentationStyle === 'formSheet'
          ? false
          : transparent
      }
      animationType={
        presentationStyle
          ? 'slide'
          : rest.animationType
          ? rest.animationType
          : 'fade'
      }
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
                (presentationStyle === 'pageSheet' ||
                  presentationStyle === 'formSheet') &&
                ScreenUtils.isIOS
                  ? 'transparent'
                  : colors.backdrop,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          {children}
        </View>
      ) : (presentationStyle === 'pageSheet' ||
          presentationStyle === 'formSheet') &&
        ScreenUtils.isIOS ? (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: bottom ? 'flex-end' : 'center',
          }}
        >
          {children}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: bottom ? 'flex-end' : 'center',
          }}
        >
          <TouchableOpacity
            style={[
              {
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                backgroundColor:
                  (presentationStyle === 'pageSheet' ||
                    presentationStyle === 'formSheet') &&
                  ScreenUtils.isIOS
                    ? 'transparent'
                    : colors.backdrop,
              },
            ]}
            onPress={() => {
              onHideComplete();
            }}
          />
          <View style={[styles.modalView, style]}>
            {headerComponent ? headerComponent : null}
            {children}
          </View>
        </View>
      )}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 20,
    backgroundColor: '#fff',
    maxHeight: ScreenUtils.screenHeight * 0.5,
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
