/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { TextView, Touchable, TextInput, Colors } from 'react-native-erxes-ui';

import _ from 'lodash';
import { screens } from './MenuStructure';

const sections = _.map(screens, (section, key) => {
  return {
    key,
    data: section.screens,
  };
});

export default function MainScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState('');

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
        <View style={{ padding: 20, backgroundColor: Colors.secondary }}>
          <TextView uppercase bold>
            {section.key}
          </TextView>
        </View>
      );
    },
    [searchText]
  );

  const renderItem = useCallback(
    ({ item }) => {
      if (!includedInSearch(item.title)) {
        return null;
      }

      if (!item.title) {
        return <View />;
      }

      const screenId = _.flow(
        (str: string) => _.split(str, '.'),
        _.last,
        (str: string) => _.replace(str, 'Screen', '')
      )(item.screen);

      return (
        <Touchable
          activeOpacity={1}
          key={item.title}
          style={styles.sectionItem}
          onPress={() => {
            onItemPress({ screenId });
          }}
        >
          <TextView style={{ padding: 10, backgroundColor: 'white' }}>
            {item.title}
          </TextView>
        </Touchable>
      );
    },
    [searchText]
  );

  return (
    <View>
      <SectionList
        ListHeaderComponent={
          <View style={styles.search}>
            <TextInput
              placeholder="Search component name"
              onChangeText={(text: string) => setSearchText(text)}
              value={searchText}
            />
          </View>
        }
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: { backgroundColor: '#fff' },
  sectionItem: {
    borderBottomWidth: 1,
    borderColor: Colors.surface,
  },
});
