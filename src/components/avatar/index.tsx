/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { StyleProp, View, ViewStyle } from 'react-native';
import images from '../../assets/images';
import { getNameUser } from 'src/utils';
import { ImageView, TextView } from '../../index';

export type AvatarProps = {
  users?: any;
  maxAvatars?: number;
  withLabel?: boolean;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  withMoreUser?: boolean;
};

const Avatars: React.FC<AvatarProps> = ({
  users,
  maxAvatars = 3,
  withLabel = false,
  size = 30,
  containerStyle,
  withMoreUser = false,
}) => {
  const getLeftLength = () => {
    return users?.length - 1;
  };

  if (!users || users.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container && containerStyle]}>
      <View style={{ flexDirection: 'row-reverse' }}>
        {users?.map(
          (e: any, i: number) =>
            i < maxAvatars && (
              <ImageView
                source={e?.details?.avatar}
                placeHolder={images.avatar}
                key={i.toString()}
                uri={e?.details?.avatar}
                style={{
                  height: size,
                  width: size,
                  borderRadius: size,
                  borderWidth: 2,
                  borderColor: '#e0e0e0',
                  marginEnd: i > 0 ? -size / 3 : 0,
                  backgroundColor: '#e0e0e0',
                }}
              />
            )
        )}
      </View>
      {withMoreUser && users.length > maxAvatars && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            height: size,
            width: size,
            borderRadius: size,
            borderColor: '#e0e0e0',
            backgroundColor: '#e0e0e0',
            borderWidth: 2,
          }}
        >
          <TextView large boldless>
            +{users.length - maxAvatars}
          </TextView>
        </View>
      )}
      {withLabel && (
        <TextView small style={{ marginStart: 5 }}>
          {getNameUser(users[0])}
          {users.length > 1
            ? ' and ' +
              getLeftLength() +
              (getLeftLength() > 1 ? ' members' : ' member')
            : ''}
        </TextView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default Avatars;
