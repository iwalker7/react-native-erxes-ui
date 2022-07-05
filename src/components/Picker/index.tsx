/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { withTheme } from '../../index';
import { Modal, Touchable, TextView, Colors } from '../../index';
import Divider from '../Divider';
import type { SetStateAction } from 'react';
import type { RefObject } from 'react';
import { useState } from 'react';
import ScreenUtils from '../../utils/screenUtils';

export type PickerProps = {
  data: any[];
  value?: any[];
  onChange: (item: any) => void;
  isVisible: boolean;
  onVisible: SetStateAction<any>;
  mode?: 'SINGLE' | 'MULTI';
  rightIcon?: JSX.Element;
  from?:
    | RefObject<View>
    | ((sourceRef: RefObject<View>, openPopover: () => void) => React.ReactNode)
    | React.ReactNode;
  selectionColor?: string;
  placeholder?: string;
  saveText?: string;
  closeText?: string;
  saveTextStyle?: StyleProp<ViewStyle>;
  closeTextStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  theme: ReactNativeErxes.Theme;
};
const Picker: React.FC<PickerProps> = ({
  theme,
  selectionColor = theme.colors.onSurfaceMedium,
  mode = 'SINGLE',
  value = [],
  data = [],
  onChange,
  placeholder = 'Choose',
  isVisible,
  onVisible,
  rightIcon,
  saveText = 'Save',
  closeText = 'Close',
  saveTextStyle,
  closeTextStyle,
  placeholderStyle,
  itemStyle,
  modalStyle,
}) => {
  const [selections, setSelections] = useState<any[]>(value);

  const onSelect = (item: any) => {
    if (mode === 'SINGLE') {
      setSelections(selections.includes(item) ? [] : [item]);
      return;
    }
    let temp = [...selections];
    if (selections.length > 0 && selections.includes(item)) {
      temp = selections.filter((el: number) => el !== item);
      setSelections(temp);
      return;
    }
    temp.push(item);
    setSelections(temp);
  };

  const onHide = () => {
    if (selections.length < 0) {
      return;
    } else {
      onChange && onChange(selections);
    }
    onVisible(false);
  };

  return (
    <>
      <Modal bottom isVisible={isVisible} onVisible={onVisible} onHide={onHide}>
        <View
          style={[
            {
              width: ScreenUtils.screenWidth,
              backgroundColor: theme.colors.surface,
            },
            modalStyle,
          ]}
        >
          <View
            style={{
              height: 45,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 15,
              backgroundColor: theme.colors.surfaceHighlight,
            }}
          >
            <Touchable
              style={{
                flexDirection: 'row',
              }}
              onPress={onHide}
            >
              <TextView
                bold
                color={theme.colors.textPrimary}
                style={closeTextStyle}
              >
                {closeText}
              </TextView>
            </Touchable>
            <Touchable
              style={{
                flexDirection: 'row',
              }}
              onPress={onHide}
            >
              <TextView bold color={Colors.green500} style={saveTextStyle}>
                {saveText}
              </TextView>
            </Touchable>
          </View>
          <Divider />

          <ScrollView
            style={[
              {
                maxHeight: 200,
                width: '100%',
                backgroundColor: theme.colors.surface,
                padding: 20,
              },
              modalStyle,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {data?.map((item, index) => {
              return (
                <Touchable
                  key={index.toString()}
                  onPress={() => {
                    if (mode === 'SINGLE') {
                      onVisible(false);
                      onHide();
                    }
                    onSelect(item);
                  }}
                >
                  <View
                    style={[
                      styles.item,
                      {
                        backgroundColor: selections.includes(item)
                          ? selectionColor
                          : undefined,
                      },
                      itemStyle,
                    ]}
                  >
                    <TextView small color={theme.colors.textPrimary}>
                      {item}
                    </TextView>
                    <Divider />
                  </View>
                </Touchable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      <Touchable onPress={() => onVisible(!isVisible)}>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.surfaceHighlight },
            placeholderStyle,
          ]}
        >
          <TextView color={theme.colors.textSecondary}>
            {mode === 'MULTI' && selections?.length > 0
              ? selections?.join(', ')
              : mode === 'SINGLE' && selections?.length === 1 && selections[0]
              ? selections[0]
              : placeholder}
          </TextView>
          {rightIcon && rightIcon}
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
  },

  item: {
    padding: 15,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default withTheme(Picker);
