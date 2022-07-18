import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  Animated,
  //   Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Touchable from '../Touchable';

const AnimatedModal = ({
  //   theme,
  style,
  isVisible,
  onVisible,
  onHide,
  cancelable = true,
  children,
}: any) => {
  const [animation] = useState(() => new Animated.Value(0));
  const background = animation.interpolate({
    inputRange: [0, 0.2],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,.3)'],
    extrapolate: 'clamp',
  });
  const display = animation.interpolate({
    inputRange: [0.2, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  //   const { height } = Dimensions.get('window');
  //   const success = animation.interpolate({
  //     inputRange: [1.1, 2],
  //     outputRange: [0, -height],
  //     extrapolate: 'clamp',
  //   });

  const onHideComplete = () => {
    if (cancelable) {
      onHide && onHide();
      onVisible && onVisible(false);
    }

    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.background,
          {
            backgroundColor: background,
          },
        ]}
      >
        {isVisible && (
          <Animated.View
            style={[
              styles.background,
              {
                transform: [
                  {
                    scale: display,
                  },
                ],
              },
              style,
            ]}
          >
            {children}
            <View style={styles.wrap}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Touchable
                  onPress={onHideComplete}
                  style={[styles.button, styles.buttonCancel]}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </Touchable>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

export default AnimatedModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    borderRadius: 8,
    backgroundColor: '#FFF',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
  },
  regularText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 16,
  },
  button: {
    backgroundColor: '#007ffe',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonCancel: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
});
