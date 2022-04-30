/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from '../Icon';
import Touchable from '../Touchable';
import TextView from '../Typography';

export type BottomSheetProps = {
  title?: string;
  hasNotInput?: boolean;
  center?: boolean;
  back?: boolean;
  onBack?: () => void;
  children?: React.ReactNode;
};

export default function BottomSheetContainer({
  title,
  hasNotInput,
  center,
  back,
  onBack,
  children,
}: BottomSheetProps) {
  const content = () => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <View style={{ paddingVertical: 10 }}>
          <View>
            {title && (
              <TextView
                xxlarge
                style={{
                  marginHorizontal: 30,
                  marginBottom: 30,
                  textAlign: center ? 'center' : 'left',
                }}
              >
                {title}
              </TextView>
            )}
            {back && (
              <Touchable
                onPress={() => onBack && onBack()}
                style={{
                  position: 'absolute',
                  left: 30,
                  top: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Icon source="arrow-left-s-line" size={24} color={'#757575'} />
              </Touchable>
            )}
          </View>
          {children}
        </View>
      </View>
    );
  };

  return (
    <View>
      {hasNotInput ? (
        content()
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {content()}
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
