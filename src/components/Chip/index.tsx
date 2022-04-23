/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Animated } from 'react-native';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Brand } from '../../styles/colors';
import Touchable from '../Touchable';
import TextView from '../Typography';

export type ChipProps = {
  mode?: 'flat' | 'outline';
  index: number;
  text: string;
  selected?: boolean;
  icon?: JSX.Element;
  removeIcon?: JSX.Element;
  selectedColor?: string;
  removable?: boolean;
  disabled?: boolean;
  onRemove?: (index: number) => void;
  onPress?: () => void;
  onLongPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

const Chip: React.FC<ChipProps> = ({
  mode,
  selected = false,
  index,
  text,
  icon,
  removeIcon,
  selectedColor = Brand.primaryLight3,
  removable = true,
  disabled = false,
  onRemove,
  onPress,
  onLongPress,
  textStyle,
  containerStyle,
}) => {
  const [select, setSelect] = useState(selected);
  const scale = 0.1;
  const { current: elevation } = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );
  const handlePressIn = () => {
    Animated.timing(elevation, {
      toValue: 4,
      duration: 200 * scale,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(elevation, {
      toValue: 0,
      duration: 150 * scale,
      useNativeDriver: true,
    }).start();
  };

  const handleOnPress = () => {
    setSelect(!select);
    onPress && onPress();
  };

  return (
    <Touchable
      onPress={handleOnPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.chipContainer,
        mode === 'outline'
          ? {
              borderColor: Brand.primary,
              backgroundColor: select ? selectedColor : '#fff',
            }
          : disabled
          ? { backgroundColor: Brand.disabled }
          : { backgroundColor: Brand.primaryLight3 },
        containerStyle,
      ]}
    >
      {icon && icon}
      <TextView
        small
        style={[
          styles.chipName,
          { color: mode === 'outline' ? Brand.primaryDark1 : '#fff' },
          textStyle,
        ]}
      >
        {text}
      </TextView>
      {removable && (
        <Touchable
          style={{ justifyContent: 'center' }}
          onPress={() => {
            onRemove && onRemove(index);
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={styles.chipRemove}>{removeIcon}</View>
        </Touchable>
      )}
    </Touchable>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginEnd: 3,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingLeft: 3,
  },
  chipName: {
    marginStart: 5,
    marginEnd: 5,
  },
  chipRemove: {
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Brand.primaryLight1,
  },
});
