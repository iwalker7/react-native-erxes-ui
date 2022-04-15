import React from 'react';
import type { StyleProp } from 'react-native';
import { View, StyleSheet, ViewStyle, ColorValue } from 'react-native';

export type IndicatorProps = {
  itemCount: number;
  currentIndex?: number;
  indicatorStyle: StyleProp<ViewStyle>;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
  indicatorActiveColor?: string;
  indicatorInActiveColor?: string;
  indicatorActiveWidth: number;
};

const Indicator: React.FC<IndicatorProps> = ({
  itemCount,
  currentIndex,
  indicatorStyle,
  indicatorContainerStyle,
  indicatorActiveColor,
  indicatorInActiveColor,
  indicatorActiveWidth = 6,
}) => {
  return (
    <View style={[styles.container, indicatorContainerStyle]}>
      {renderIndicator(
        itemCount,
        currentIndex,
        indicatorStyle,
        indicatorActiveColor,
        indicatorInActiveColor,
        indicatorActiveWidth
      )}
    </View>
  );
};

export const renderIndicator = (
  count: number,
  currentIndex: number | undefined,
  indicatorStyle: StyleProp<ViewStyle>,
  indicatorActiveColor: ColorValue | undefined,
  indicatorInActiveColor: ColorValue | undefined,
  indicatorActiveWidth: number | string | undefined
) => {
  let indicators = [];
  for (let i = 0; i < count; i++) {
    indicators.push(
      <View
        key={i}
        style={[
          styles.indicator,
          indicatorStyle,
          i === currentIndex
            ? indicatorActiveColor
              ? {
                  ...styles.active,
                  ...{
                    backgroundColor: indicatorActiveColor,
                    width: indicatorActiveWidth,
                  },
                }
              : styles.active
            : {
                ...styles.inactive,
                ...{ backgroundColor: indicatorInActiveColor },
              },
        ]}
      />
    );
  }
  return indicators;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  active: {},
  inactive: {},
});

export default Indicator;
