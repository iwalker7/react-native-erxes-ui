/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';

import {
  primaryDark1,
  primaryDark3,
  primaryLight1,
} from '../../utils/colorUtils';
import { withTheme } from '../../core/theming';
import Touchable from '../Touchable';
import TextView from '../Typography';
import { white } from '../../styles/colors';
import images from '../../assets/images';

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
  theme: ReactNativeErxes.Theme;
  item: any;
  isAvatar: boolean;
  isUser: boolean;
};

const Chip: React.FC<ChipProps> = ({
  theme,
  mode,
  selected = false,
  index,
  text,
  icon,
  removeIcon,
  selectedColor,
  removable = true,
  disabled = false,
  onRemove,
  onPress,
  onLongPress,
  textStyle,
  containerStyle,
  item,
  isAvatar = false,
  isUser = false,
}) => {
  const { colors } = theme;

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
              borderColor: colors.primary,
              backgroundColor: select ? selectedColor : white,
            }
          : disabled
          ? { backgroundColor: colors.disabled }
          : { backgroundColor: primaryDark3(colors.primary) },
        containerStyle,
      ]}
    >
      {icon && icon}
      <TextView
        small
        style={[
          styles.chipName,
          {
            color: mode === 'outline' ? primaryDark1(colors.primary) : white,
          },
          textStyle,
        ]}
      >
        {isAvatar && (
          <Image
            source={{ uri: isUser ? item?.details?.avatar : item?.avatar }}
            defaultSource={images.avatar}
            style={styles.chipImage}
          />
        )}
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
          <View
            style={[
              styles.chipRemove,
              { backgroundColor: primaryLight1(colors.primary) },
            ]}
          >
            {removeIcon}
          </View>
        </Touchable>
      )}
    </Touchable>
  );
};

export default withTheme(Chip);

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
  },
  chipImage: {
    height: 22,
    width: 22,
    margin: 1,
    borderRadius: 12,
  },
});
