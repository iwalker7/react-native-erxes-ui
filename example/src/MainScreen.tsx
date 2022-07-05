/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { SectionList } from 'react-native';
import {
  TextView,
  Touchable,
  useTheme,
  Surface,
  Searchbar,
} from 'react-native-erxes-ui';

import _ from 'lodash';
import { screens } from './MenuStructure';
import { SafeAreaView } from 'react-native-safe-area-context';

const sections = _.map(screens, (section, key) => {
  return {
    key,
    data: section.screens,
  };
});

export default function MainScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();

  const includedInSearch = (text = '') => {
    return text.toLowerCase().includes(searchText.toLowerCase());
  };

  const onItemPress = useCallback(({ screenId }) => {
    navigation.navigate(screenId);
  }, []);

  const renderSectionHeader = useCallback(
    ({ section }) => {
      if (!_.find(section.data, (screen) => includedInSearch(screen.title))) {
        return null;
      }

      return (
        <Surface
          style={{
            padding: 20,
            backgroundColor: theme.colors.surfaceHighlight,
          }}
        >
          <TextView uppercase bold>
            {section.key}
          </TextView>
        </Surface>
      );
    },
    [searchText]
  );

  const renderItem = useCallback(
    ({ item }) => {
      if (!includedInSearch(item.title)) {
        return null;
      }

      const screenId = _.flow(
        (str: string) => _.split(str, '.'),
        _.last,
        (str: string) => _.replace(str, 'Screen', '')
      )(item.screen);

      return (
        <Surface>
          <Touchable
            activeOpacity={1}
            key={item.title}
            style={{ padding: 20 }}
            onPress={() => {
              onItemPress({ screenId });
            }}
          >
            <TextView bold>{item.title}</TextView>
          </Touchable>
        </Surface>
      );
    },
    [searchText]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <Searchbar
        leftIconName={'magnifent'}
        placeholder="Search component name"
        onChangeText={(text: string) => setSearchText(text)}
        value={searchText}
        style={{ margin: 10 }}
      />
      <TextView center large style={{ margin: 20 }}>
        React native erxes ui
      </TextView>
      <SectionList
        keyExtractor={(data, index) => data.tags + index}
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
