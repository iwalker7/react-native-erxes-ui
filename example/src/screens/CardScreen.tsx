/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View } from 'react-native';
import { TextView, Colors, Card, Button, Picker } from 'react-native-erxes-ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import images from '../../assets/images';
import styles from '../styles';

const CardScreen: React.FC<any> = () => {
  const data = ['elevated', 'outline'];
  const [indexBoard, setIndexBoard] = React.useState<number>(-1);
  const [a, setA] = React.useState(data[0]);
  const [thVisible, setThVisible] = React.useState(0);
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', marginVertical: 5 }}>
        <Picker
          selectedIndex={indexBoard}
          data={data}
          placeholderText="Choose alert type"
          onSelect={(i: any) => {
            setIndexBoard(i);
            setA(data[i]);
          }}
          icon={
            <MaterialCommunityIcons
              name={'chevron-down'}
              color="#757575"
              size={20}
            />
          }
        />
      </View>
      <Card
        type={a}
        title="Title"
        thumbnail={
          thVisible ? (
            <Image
              source={images.avatar}
              style={{ resizeMode: 'contain', height: 50, width: '100%' }}
            />
          ) : null
        }
        secondaryText={'This is secondary text'}
        overflowIcon={
          <MaterialCommunityIcons
            name="dots-vertical"
            color="#757575"
            size={15}
          />
        }
        overflowAction={() => {}}
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
