/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextView, Colors, Modal, Button, Avatar } from 'react-native-erxes-ui';
import images from '../../assets/images';
import styles from '../styles';

const ModalScreen: React.FC<any> = () => {
  const [visible, onVisible] = useState(false);
  const [bottomVisible, onBottomVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.segment}>
        <TextView
          bold
          color={Colors.grey600}
        >{`Props + React native-ын ModalProps`}</TextView>
      </View>
      <View
        style={{
          width: '100%',
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TextView bold>Default modal</TextView>
        <Button onPress={() => onVisible(true)}>Click here </Button>
      </View>
      <View
        style={{
          width: '100%',
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TextView bold>Bottom modal</TextView>
        <Button onPress={() => onBottomVisible(true)}>Click here </Button>
      </View>
      <View style={styles.segment}>
        <Modal
          isVisible={visible}
          onVisible={onVisible}
          animationType="slide"
          presentationStyle="formSheet"
          onDismiss={() => console.log('on ddismiss')}
          onRequestClose={() => console.log('on ddismiss')}
          onHide={() => onVisible(false)}
        >
          <View>
            <Avatar source={images.avatar} uri={undefined} size={80} />
            <TextView center style={{ marginTop: 10 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation
            </TextView>
          </View>
        </Modal>
        <Modal isVisible={bottomVisible} onVisible={onBottomVisible} bottom>
          <Avatar source={images.avatar} uri={undefined} size={80} />
          <TextView center style={{ marginTop: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation
          </TextView>
        </Modal>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
        <View style={styles.segment}>
          <View style={styles.props}>
            <TextView bold>
              animationType<TextView color={Colors.grey600}>: string</TextView>
            </TextView>

            <View
              style={{
                backgroundColor: Colors.grey200,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <TextView small> fade | none | slide </TextView>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <TextView small>
              Modal гарч ирэхэд харуулах анимейшны төрөл
            </TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            isVisible
            <TextView color={Colors.grey600}>{`: boolean`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Модал харагдаж байгаа эсэх</TextView>
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
            <TextView small>Модал удирдах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            cancelable
            <TextView
              color={Colors.grey600}
            >{`: boolean (default:true)`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>
              false үед хэрэглэгч модалыг хаах боломжгүй байна
            </TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onHide
            <TextView color={Colors.grey600}>{`: () => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Модал хаагдсаны дараа дуудагдах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            bgColor
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Арын өнгө</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            width
            <TextView color={Colors.grey600}>{`: number`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Модалын өргөн</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            style
            <TextView
              color={Colors.grey600}
            >{`: StyleProp<ViewStyle>`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Агуулагчийн style</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            shadowRadius
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Сүүдэрлэлтийн радиус</TextView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ModalScreen;
