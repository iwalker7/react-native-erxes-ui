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
import Divider from '../divider';

export type DropdownProps = {
  selectedIndex?: number;
  data?: any[];
  onSelect: (i: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  ref?: any;
};
const Dropdown: React.FC<DropdownProps> = ({
  selectedIndex = 0,
  data = [],
  onSelect,
  containerStyle,
}) => {
  const [isOpen, onOpen] = useState(false);

  return (
    <>
      <Touchable onPress={() => onOpen(!isOpen)}>
        <View style={[styles.container, containerStyle]}>
          <TextView style={{ fontSize: 13 }}>
            {selectedIndex > -1 ? data[selectedIndex] : 'Choose'}
          </TextView>
        </View>
      </Touchable>
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
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  itemText: {
    padding: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default Dropdown;
