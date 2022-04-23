/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View } from 'react-native';
import { TextView, Colors, Card, Button } from 'react-native-erxes-ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import images from '../../assets/images';
import styles from '../styles';

const CardScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <Card
        type="elevated"
        title="Title"
        thumbnail={
          <Image
            source={images.avatar}
            style={{ resizeMode: 'contain', height: 50, width: '100%' }}
          />
        }
        secondaryText={'This is secondary text'}
        overflowMenu={
          <MaterialCommunityIcons
            name="dots-vertical"
            color="#757575"
            size={15}
          />
        }
        media={
          <Image
            source={images.cover}
            style={{ resizeMode: 'cover', height: 120, width: '100%' }}
          />
        }
        actions={
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
            }}
          >
            <Button
              type="outline"
              mode="disabled"
              onPress={() => {}}
              onLongPress={() => {}}
            >
              Action 1
            </Button>

            <Button
              type="default"
              mode="verify"
              onPress={() => {}}
              onLongPress={() => {}}
              style={{ marginBottom: 10 }}
            >
              Action 2
            </Button>
          </View>
        }
        supportingText="This is supporting text. Supporting text include text like an article summary or a description."
      />

      <View style={styles.segment}>
        <View style={styles.props}>
          <TextView bold>
            type<TextView color={Colors.grey600}>: string</TextView>
          </TextView>

          <View
            style={{
              backgroundColor: Colors.grey200,
              padding: 5,
              borderRadius: 5,
            }}
          >
            <TextView small> elevated | outlined </TextView>
          </View>
        </View>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          title
          <TextView color={Colors.grey600}>{`: string`}</TextView>
        </TextView>
      </View>
      <View style={styles.segment}>
        <TextView bold>
          secondaryText
          <TextView color={Colors.grey600}>{`: string`}</TextView>
        </TextView>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          supportingText
          <TextView color={Colors.grey600}>{`: string`}</TextView>
        </TextView>
      </View>

      <View style={styles.segment}>
        <TextView bold>
          thumbnail
          <TextView color={Colors.grey600}>{`: JSX.Element`}</TextView>
        </TextView>
      </View>
      <View style={styles.segment}>
        <TextView bold>
          media
          <TextView color={Colors.grey600}>{`: JSX.Element`}</TextView>
        </TextView>
      </View>
      <View style={styles.segment}>
        <TextView bold>
          actions
          <TextView color={Colors.grey600}>{`: JSX.Element`}</TextView>
        </TextView>
      </View>
      <View style={styles.segment}>
        <TextView bold>
          overflowMenu
          <TextView color={Colors.grey600}>{`: JSX.Element`}</TextView>
        </TextView>
      </View>
    </View>
  );
};

export default CardScreen;
