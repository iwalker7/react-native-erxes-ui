/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Modal, Touchable, TextView } from '../../index';
import Divider from '../Divider';

export type PickerProps = {
  selectedIndex?: number;
  data?: any[];
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  onSelect: (i: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  ref?: any;
  placeholderText?: string;
  selectionLimit?: number;
};
const Picker: React.FC<PickerProps> = ({
  selectedIndex = 0,
  data = [],
  onSelect,
  icon,
  iconPosition = 'right',
  containerStyle,
  placeholderText,
}) => {
  const [isOpen, onOpen] = useState(false);

  return (
    <>
      <Modal bottom isVisible={isOpen} onVisible={onOpen}>
        <ScrollView
          style={{ maxHeight: 200, width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {data.map((item, index) => {
              return (
                <Touchable
                  key={index.toString()}
                  onPress={() => {
                    if (index !== selectedIndex) {
                      onSelect(index);
                    } else {
                      onSelect(-1);
                    }
                    onOpen(false);
                  }}
                >
                  <View style={styles.itemText}>
                    <TextView small>{item}</TextView>
                  </View>
                  <Divider />
                </Touchable>
              );
            })}
          </View>
        </ScrollView>
      </Modal>
      <Touchable onPress={() => onOpen(!isOpen)}>
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
    backgroundColor: '#F5F5F5',
  },

  itemText: {
    padding: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default Picker;
