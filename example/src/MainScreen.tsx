/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextView } from 'react-native-erxes-ui';

const sections = [
  {
    title: 'Basic',
    data: ['Button', 'Card', 'Chip', 'ImageView', 'Text', 'Touchable'],
  },
  {
    title: 'Overlays',
    data: ['Alert'],
  },
  {
    title: 'Incubator',
    data: ['ChipInput', 'TextField'],
  },
];

const onItemPress = ({ item }: any) => {
  //navigation hiih
};

const renderItem = ({ item }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      key={item.title}
      style={styles.sectionItem}
      onPress={() => onItemPress(item)}
    >
      <TextView>{item}</TextView>
    </TouchableOpacity>
  );
};

const renderSectionHeader = ({ section }) => {
  return (
    <View style={styles.sectionHeader}>
      <TextView uppercase bold color="white">
        {section.title}
      </TextView>
    </View>
  );
};

const colorMain = '#673FBD';
const colorHighlight = 'mediumvioletred';

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextView color={colorMain}>erxes Inc ui lib by</TextView>
        <TextView bold large color={colorHighlight}>
          Itgel.G
        </TextView>
      </View>
      <SectionList
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        style={{ width: '100%' }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionItem: {
    width: '100%',
    borderBottomWidth: 0.3,
    borderBottomColor: '#673FBD',
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  sectionHeader: {
    backgroundColor: '#673FBD',
    padding: 10,
  },
});

export default MainScreen;
