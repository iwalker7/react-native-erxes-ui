/* eslint-disable react-native/no-inline-styles */
//gitlab.com//* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ImageView, TextView, Touchable } from '../../index';
import { getNameChip } from '../../utils';
import images from '../../assets/images';

export type ChipProps = {
  item: any;
  index: number;
  source: any;
  isAvatar: boolean;
  isUser: boolean;
  onRemove: (index: number) => void;
};

const Chip: React.FC<ChipProps> = ({
  item,
  index,
  source,
  isAvatar = true,
  isUser = true,
  onRemove,
}) => {
  // const { item, index, isAvatar = true, isUser = true, onRemove } = props;

  return (
    <View style={[styles.chipContainer, { backgroundColor: '#fda50f' }]}>
      {isAvatar && (
        <ImageView
          source={source}
          uri={isUser ? item.details.avatar : item.avatar}
          placeHolder={images.avatar}
          style={styles.chipImage}
        />
      )}

      <TextView small style={styles.chipName}>
        {getNameChip(item, false, true)}
      </TextView>
      <Touchable
        style={{ justifyContent: 'center' }}
        onPress={() => {
          onRemove(index);
        }}
      >
        <View style={styles.chipRemove} />
        {/* <IconCore
          name="times"
          color={white}
          style={{
            position: 'absolute',
            alignSelf: 'center',
          }}
          size={15}
        /> */}
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  chipImage: {
    height: 22,
    width: 22,
    margin: 1,
    borderRadius: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginEnd: 3,
    marginBottom: 3,
  },
  chipName: {
    color: '#fff',
    marginStart: 5,
    marginEnd: 5,
  },
  chipRemove: {
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    opacity: 0.15,
  },
});

export default Chip;
