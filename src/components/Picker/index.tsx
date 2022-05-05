/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { grey100 } from '../../styles/colors';
import { Modal, Touchable, TextView } from '../../index';
import Divider from '../Divider';
import type { SetStateAction } from 'react';
import type { RefObject } from 'react';

export type PickerProps = {
  selectedIndex?: number;
  data?: any[];
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  onSelect: (i: number) => void;
  from?:
    | RefObject<View>
    | ((sourceRef: RefObject<View>, openPopover: () => void) => React.ReactNode)
    | React.ReactNode;
  itemStyle: StyleProp<ViewStyle>;
  style: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderText?: string;
  selectionLimit?: number;
  isVisible: boolean;
  onVisible: SetStateAction<any>;
};
const Picker: React.FC<PickerProps> = ({
  selectedIndex = 0,
  data = [],
  onSelect,
  icon,
  iconPosition = 'right',
  placeholderText,
  isVisible,
  onVisible,
  itemStyle,
  style,
  containerStyle,
}) => {
  return (
    <>
      <Modal bottom isVisible={isVisible} onVisible={onVisible}>
        <ScrollView
          style={[{ maxHeight: 200, width: '100%' }, style]}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {data?.map((item, index) => {
              return (
                <Touchable
                  key={index.toString()}
                  onPress={() => {
                    if (index !== selectedIndex) {
                      onSelect(index);
                    } else {
                      onSelect(-1);
                    }
                    onVisible(false);
                  }}
                >
                  <View style={[styles.itemText, itemStyle]}>
                    <TextView small>{item}</TextView>
                  </View>
                  <Divider />
                </Touchable>
              );
            })}
          </View>
        </ScrollView>
      </Modal>
      <Touchable onPress={() => onVisible(!isVisible)}>
        <View style={[styles.container, containerStyle]}>
          <TextView style={{ fontSize: 13 }}>
            {selectedIndex > -1
              ? data[selectedIndex]
              : placeholderText
              ? placeholderText
              : 'Choose'}
          </TextView>

          {icon && (
            <View
              style={[
                {
                  marginLeft: iconPosition === 'right' ? 5 : 0,
                  marginRight: iconPosition === 'right' ? 0 : 5,
                },
              ]}
            >
              {icon}
            </View>
          )}
        </View>
      </Touchable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 8,
    marginVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: grey100,
  },

  itemText: {
    padding: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default Picker;
