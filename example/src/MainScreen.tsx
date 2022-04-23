/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import {
  TextView,
  Touchable,
  TextInput,
  Colors,
  useTheme,
  Button,
  ExpandableSection,
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
        //   <ExpandableSection >

        //   </ExpandableSection>
        <View
          style={{
            padding: 20,
            backgroundColor: '#DED9E8',
          }}
        >
          <TextView uppercase bold color={theme.colors.primary}>
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
          <TextView
            bold
            style={{
              paddingHorizontal: 30,
              paddingVertical: 15,
              backgroundColor: 'white',
              color: theme.colors.primary,
            }}
          >
            {item.title}
          </TextView>
        </Touchable>
      );
    },
    [searchText]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <SectionList
        keyExtractor={(data, index) => data.tags + index}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: { backgroundColor: '#fff', width: '100%' },
  sectionItem: {
    borderBottomWidth: 1,
    borderColor: Colors.grey300,
  },
});
