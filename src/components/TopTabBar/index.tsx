/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TabBar } from 'react-native-tab-view';
import { TextView, useTheme } from 'react-native-erxes-ui';
import Icon from '../Icon';

const TopTabBar: React.FC<any> = ({ hasIcon = false, ...rest }) => {
  const { colors } = useTheme();

  return (
    <TabBar
      {...rest}
      indicatorStyle={{
        backgroundColor: colors.primary,
        height: 3,
        borderRadius: 30,
      }}
      style={{
        backgroundColor: colors.surface,
        borderBottomColor: colors.onSurfaceLow,
      }}
      activeColor={colors.primary}
      inactiveColor={colors.disabled}
      renderIcon={({ route, color }) =>
        hasIcon && route.icon ? (
          <Icon
            color={color ? color : colors.textPrimary}
            source={route.icon}
            size={16}
          />
        ) : null
      }
      renderLabel={({ color, route }) => (
        <TextView
          style={{
            color: color ? color : colors.textPrimary,
          }}
        >
          {route.title}
        </TextView>
      )}
      tabStyle={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    />
  );
};

export default TopTabBar;
