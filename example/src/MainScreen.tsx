/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { TextView, TouchableOpacity, TextInput } from 'react-native-erxes-ui';
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
    return searchText.toLowerCase().includes(text.toLowerCase());
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
        <View>
          <TextView uppercase>{section.key}</TextView>
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
        <TouchableOpacity
          activeOpacity={1}
          key={item.title}
          style={styles.sectionItem}
          onPress={() => {
            onItemPress({ screenId });
          }}
        >
          <TextView>{item.title}</TextView>
        </TouchableOpacity>
      );
    },
    [searchText]
  );

  return (
    <View>
      <SectionList
        ListHeaderComponent={
          <TextInput
            placeholder="Search component name"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
        }
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldStyle: {},
  sectionItem: {
    borderBottomWidth: 1,
  },
});
