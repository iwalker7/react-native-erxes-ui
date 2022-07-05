/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Linking } from 'react-native';
import {
  TextView,
  Surface,
  Colors,
  Touchable,
  useTheme,
} from 'react-native-erxes-ui';
import styles from '../styles';

const TextScreen: React.FC<any> = () => {
  const theme = useTheme();

  return (
    <Surface style={styles.container}>
      <Surface style={[styles.segment, { height: 70, marginBottom: 10 }]}>
        <TextView color={Colors.grey600}>
          {`Props + React native-ын TextProps`}
        </TextView>

        <Touchable
          style={{ position: 'absolute', bottom: 5, right: 0 }}
          onPress={() => Linking.openURL('https://reactnative.dev/docs/text')}
        >
          <TextView bold small color={Colors.blue600}>
            {`See React Native TextProps \u2192`}
          </TextView>
        </Touchable>
      </Surface>

      <Surface
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: 10,
          justifyContent: 'space-between',
          alignContent: 'center',
          borderColor: 'transparent',
          borderBottomColor: theme.colors.surface,
          borderWidth: 1,
        }}
      >
        <Surface style={{ width: '25%', alignContent: 'flex-start' }}>
          <TextView bold large>
            Size
          </TextView>
        </Surface>
        <Surface style={{ flexDirection: 'column' }}>
          <Surface
            style={{
              width: '70%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}
          >
            <TextView xxsmall>xxsmall</TextView>
            <TextView xsmall>xsmall</TextView>
            <TextView small>small</TextView>
            <TextView large>large</TextView>
          </Surface>
          <Surface
            style={{
              width: '75%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <TextView xlarge>xlarge</TextView>
            <TextView xxlarge>xxlarge</TextView>
            <TextView xxxlarge>xxxlarge</TextView>
          </Surface>
        </Surface>
      </Surface>
      <Surface
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: 10,
          justifyContent: 'space-between',
          borderColor: 'transparent',
          borderBottomColor: Colors.grey100,
          borderWidth: 1,
        }}
      >
        <Surface>
          <TextView bold large>
            Style
          </TextView>
        </Surface>
        <Surface
          style={{
            width: '75%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Surface style={{ flexDirection: 'column' }}>
            <Surface
              style={{
                flexWrap: 'wrap',
              }}
            >
              <TextView bold>bold</TextView>
              <TextView boldless>boldless</TextView>
              <TextView italic>italic</TextView>
            </Surface>
          </Surface>
          <Surface style={{ flexDirection: 'column', width: '50%' }}>
            <Surface>
              <TextView uppercase>uppercase</TextView>
              <TextView required>Required</TextView>
            </Surface>
          </Surface>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default TextScreen;
