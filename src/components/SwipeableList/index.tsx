/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Dimensions, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Divider from '../Divider';

export type SwipeableListProps = {
  data: any[];
  onRemove?: (idx: number) => void;
};

const SwipeableList: React.FC<SwipeableListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <SwipeableItem {...item} />}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
};

const SwipeableItem: React.FC<any> = (item: any) => {
  const leftSwipeActions = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ccffbd',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: '#40394a',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingVertical: 20,
          }}
        >
          Left Action
        </Text>
      </View>
    );
  };

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: '#ff8303',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            color: '#1b1a17',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingVertical: 20,
          }}
        >
          Right action
        </Text>
      </View>
    );
  };

  const swipeFromLeftOpen = () => {
    console.log('Swipe from left');
  };

  const swipeFromRightOpen = () => {
    console.log('Swipe from left');
  };

  return (
    <Swipeable
      renderLeftActions={leftSwipeActions}
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={swipeFromRightOpen}
      onSwipeableLeftOpen={swipeFromLeftOpen}
    >
      <View
        style={{
          width: Dimensions.get('window').width,
          paddingHorizontal: 30,
          paddingVertical: 20,
          backgroundColor: 'white',
        }}
      >
        <Text style={{ fontSize: 24 }}>{item?.text}</Text>
      </View>
    </Swipeable>
  );
};

export default SwipeableList;
