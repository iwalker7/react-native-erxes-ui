/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Animated } from 'react-native';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Brand } from '../../styles/colors';
import Avatar from '../Avatar';
import MaterialCommunityIcons from '../MaterialCommunityIcons';
import Touchable from '../Touchable';
import TextView from '../Typography';

export type ChipProps = {
  mode?: 'flat' | 'outline';
  type?: 'avatar' | 'icon';
  index: number;
  text: string;
  selected?: boolean;
  avatarSrc: string;
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
  type,
  avatarSrc,
  selected = false,
  index,
  text,
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

  return (
    <Touchable
      onPress={onPress}
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
      {type === 'avatar' ? (
        <Avatar uri={avatarSrc} size={20} source={{ uri: avatarSrc }} />
      ) : type === 'icon' ? (
        <></>
      ) : null}

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
          <View style={styles.chipRemove}>
            {/* <MaterialCommunityIcons
            name="times"
            color={'#fff'}
            style={{
              position: 'absolute',
              alignSelf: 'center',
            }}
            size={15}
          /> */}
            <TextView color={'#fff'}>x</TextView>
          </View>
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
