/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextView, Empty, Indicator, ImageView } from 'react-native-erxes-ui';
import images from '../assets/images';

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Main" component={MainScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <SafeAreaView style={styles.container}>
      <TextView bold large color="red">
        Itgel.G
      </TextView>

      <Empty />
    </SafeAreaView>
  );
}

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
