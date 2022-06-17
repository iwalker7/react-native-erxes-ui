/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
  TextView,
  Colors,
  Button,
  Dialog,
  Avatar,
  Divider,
} from 'react-native-erxes-ui';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';

const DialogScreen: React.FC<any> = () => {
  const [alert, onAlert] = useState(false);
  const [confirm, onConfirm] = useState(false);
  const [simple, onSimple] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            height: 70,
            justifyContent: 'space-between',
          }}
        >
          <TextView bold>Alert dialog</TextView>
          <Button width={80} onPress={() => onAlert(true)}>
            Click here
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'column',
            height: 70,
            justifyContent: 'space-between',
          }}
        >
          <TextView bold>Confirm dialog</TextView>
          <Button width={80} onPress={() => onConfirm(true)}>
            Click here
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'column',
            height: 70,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexWrap: 'wrap', flexDirection: 'column' }}>
            <TextView bold>Simple dialog </TextView>
          </View>
          <Button width={80} onPress={() => onSimple(true)}>
            Click here
          </Button>
        </View>
      </View>

      <View style={styles.segment}>
        <Dialog
          action="confirm"
          title="Change field?"
          supportingText="Do you want to save your edits?"
          saveText="Yes"
          closeText="No"
          isVisible={confirm}
          onVisible={onConfirm}
        />
        <Dialog
          action="alert"
          isVisible={alert}
          onVisible={onAlert}
          icon={
            <MaterialCommunityIcons
              name="alert-outline"
              color="#F1A73E"
              size={30}
            />
          }
        />
        <Dialog
          action="simple"
          title="Title"
          supportingText="Supporting text"
          isVisible={simple}
          onVisible={onSimple}
        >
          <TextView>
            Here you can display JSX components. Just do whatever you want. For
            example
          </TextView>
          <Divider style={{ marginVertical: 10 }} />
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TextView> You can upload image</TextView>
            <Avatar source={0} />
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TextView> You add button</TextView>
            <Button
              mode="disabled"
              style={{ marginTop: 10 }}
              onPress={() => {}}
            >
              Close
            </Button>
          </View>
        </Dialog>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
        <View style={styles.segment}>
          <View style={styles.props}>
            <TextView bold>
              action<TextView color={Colors.grey600}>: string</TextView>
            </TextView>
            <View
              style={{
                backgroundColor: Colors.grey200,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <TextView small> alert | confirm | simple</TextView>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Диалогийн төрөл</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            title
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Диалогийн гарчиг</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            supportingText
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Диалогийн тайлбар</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            saveText
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>
              + товчинд харуулах текст{' '}
              <TextView
                color={Colors.grey600}
              >{`(default: Yes, I am)`}</TextView>
            </TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            closeText
            <TextView color={Colors.grey600}>{`: boolean`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>
              - товчинд харуулах текст{' '}
              <TextView
                color={Colors.grey600}
              >{`(default: No, Cancel)`}</TextView>
            </TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onSave
            <TextView color={Colors.grey600}>{`: () => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small> + товч дарагдвал дуудагдах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onClose
            <TextView color={Colors.grey600}>{`: () => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small> - товч дарагдвал дуудагдах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            isVisible
            <TextView color={Colors.grey600}>{`: boolean`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Диалог харагдаж байгаа эсэх</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onVisible
            <TextView
              color={Colors.grey600}
            >{`: SetStateAction<any>`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Диалог удирдах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            containerStyle
            <TextView
              color={Colors.grey600}
            >{`: StyleProp<ViewStyle>`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Агуулагчийн style</TextView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DialogScreen;
