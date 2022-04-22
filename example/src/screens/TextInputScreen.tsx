/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextView, Colors, TextInput } from 'react-native-erxes-ui';
import styles from '../styles';

const TextInputScreen: React.FC<any> = () => {
  const [searchText, setSearchText] = React.useState<string>('');
  return (
    <View style={styles.container}>
      <View style={styles.segment}>
        <TextView
          bold
          color={Colors.grey600}
        >{`Props + React native-ын TextInputProps`}</TextView>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
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
              <TextView small> default | outline | filled </TextView>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={style.search}>
              <TextInput
                placeholder="Default"
                onChangeText={(text: string) => setSearchText(text)}
                value={searchText}
              />
              <TextInput
                type="outline"
                placeholder="Outline"
                onChangeText={(text: string) => setSearchText(text)}
                value={searchText}
              />

              <TextInput
                type="filled"
                placeholder="Filled"
                onChangeText={(text: string) => setSearchText(text)}
                value={searchText}
              />
            </View>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            required
            <TextView color={Colors.grey600}>{`: boolean`}</TextView>
          </TextView>
          <TextInput
            required
            placeholder="Outline"
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
          />
        </View>

        <View style={styles.segment}>
          <TextView bold>
            floating
            <TextView
              color={Colors.grey600}
            >{`: boolean  (label-тай байх)`}</TextView>
          </TextView>
          <TextInput
            label="Label"
            floating
            placeholder="Outline"
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
          />
        </View>

        <View style={styles.segment}>
          <TextView bold>
            value
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Бичиж байхад харуулах утга</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onChangeText
            <TextView
              color={Colors.grey600}
            >{`: (value: string) => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Бичиж байхад өөрчлөлтийг хадгалах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onSubmitEditing
            <TextView
              color={Colors.grey600}
            >{`: (value: string) => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>
              Бичиж дууссаны дараа өөрчлөлтийг хадгалах функц
            </TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            ref
            <TextView
              color={Colors.grey600}
            >{`: LegacyRef<TouchableOpacity | any>`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Reference</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onFocus
            <TextView
              color={Colors.grey600}
            >{`: (value: string) => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Фокуслах үед дуудагдах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            placeholder
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Бичих утгын тайлбар</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            placeholderTextColor
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>placeholder-ын өнгө</TextView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  search: { backgroundColor: '#fff', width: '100%' },
  sectionItem: {
    borderBottomWidth: 1,
    borderColor: Colors.grey100,
  },
});
export default TextInputScreen;
