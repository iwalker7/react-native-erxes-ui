/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  LegacyRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import Loader from '../loader';
import images from '../../assets/images';
import { deviceWidth, getAttachmentUrl } from '../../utils';
import Touchable, { TouchableProps } from '../touchable';

export type ImageViewProps = FastImageProps & {
  containerStyle?: StyleProp<ViewStyle>;
  style: ImageStyle;
  resizeMode?: FastImageProps['resizeMode'] | undefined;
  OnErrorComponent?: any;
  uri?: string;
  onPress?: () => void;
  placeHolder?: string;
  onLoadEvent?: any;
  touchRef?: LegacyRef<TouchableProps> | undefined;
  width?: number | string | undefined;
  height?: number | string | undefined;
} & { children?: React.ReactNode };

const staticPlaceholder = images.meteors;

const ImageView: React.FC<ImageViewProps> = ({
  containerStyle,
  style,
  resizeMode,
  OnErrorComponent,
  uri,
  onPress,
  onLoadEvent,
  placeHolder,
  touchRef,
}) => {
  const [isError, setError] = useState(false);

  const [isMount, setMount] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [intialHeight, setInitialHeight] = useState(0);

  useEffect(() => {
    setMount(true);
  }, []);

  const getSource = () => {
    if (isLoading) {
      return placeHolder || staticPlaceholder;
    }
    if (uri === null || uri === undefined || uri === '') {
      return placeHolder || staticPlaceholder;
    }

    return {
      uri: getAttachmentUrl(uri),
    };
  };

  const { width, height, borderRadius } = style;

  const imageWidth = (width ? width : deviceWidth) as any;

  const imageHeight = (height ? height : intialHeight) as any;

  const renderImage = useCallback(() => {
    return (
      <FastImage
        source={isError ? placeHolder || staticPlaceholder : getSource()}
        resizeMode={resizeMode}
        style={[
          { backgroundColor: 'rgba(255, 255, 255, 0)' },
          style,
          {
            width: imageWidth,
            height: imageHeight,
          },
        ]}
        onError={() => {
          isMount && setError(true);
          isMount && setLoading(false);
        }}
        onLoadEnd={() => {
          isMount && setLoading(false);
        }}
        onLoad={(event: any) => {
          event.persist();
          isMount &&
            setInitialHeight(
              Math.round(
                (event.nativeEvent.height / event.nativeEvent.width) *
                  imageWidth
              )
            );
          onLoadEvent && onLoadEvent(event);
        }}
      />
    );
  }, [imageHeight, getSource, uri]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Touchable
        touchRef={touchRef}
        style={{ borderRadius: borderRadius }}
        onPress={!isLoading ? onPress : undefined}
      >
        <View>
          {renderImage()}
          <View style={styles.childrenStyle}>
            {OnErrorComponent}
            {!isError && isLoading && <Loader backgroundColor="transparent" />}
          </View>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  childrenStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
  },
  loaderStyle: {
    height: 30,
    width: 30,
  },
});

export default memo(ImageView);
