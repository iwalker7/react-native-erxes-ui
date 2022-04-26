/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View } from 'react-native';
import { TextView, Colors, Card, Button } from 'react-native-erxes-ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import images from '../../assets/images';
import styles from '../styles';

const CardScreen: React.FC<any> = () => {
  const [thVisible, setThVisible] = React.useState(false);
  const renderMedia = () => {
    return (
      <Image
        source={images.cover}
        style={{ resizeMode: 'cover', height: 120, width: '100%' }}
      />
    );
  };

  const renderThumb = () => {
    return (
      <Image
        source={images.avatar}
        style={{ resizeMode: 'contain', height: 50, width: '100%' }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Card
        type="elevated"
        title="Title"
        thumbnail={thVisible ? renderThumb() : undefined}
        secondaryText={'This is secondary text'}
        overflowIcon={
          <MaterialCommunityIcons
            name="dots-vertical"
            color="#757575"
            size={15}
          />
        }
        overflowAction={() => {}}
        media={renderMedia()}
        actions={
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 8,
              justifyContent: 'space-between',
              marginBottom: 3,
            }}
          >
            <Button
              mode="disabled"
              onPress={() => setThVisible(false)}
              onLongPress={() => {}}
            >
              Hide thumbnail
            </Button>
            <Button
              type="default"
              onPress={() => setThVisible(true)}
              onLongPress={() => {}}
            >
              Show thumbnail
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
            <TextView small> elevated | outline </TextView>
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
