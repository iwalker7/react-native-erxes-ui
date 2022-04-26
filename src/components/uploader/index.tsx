/* eslint-disable react-native/no-inline-styles */
import React, { SetStateAction, useState } from 'react';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import { View } from 'react-native';
import { androidCameraPermission } from '../../utils/utils';
import ScreenUtils from '../../utils/screenUtils';
import { Touchable, TextView, Modal, Divider } from '../../index';
import { ActivityIndicator } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export type UploaderProps = {
  isVisible: boolean;
  onVisible: SetStateAction<any>;
  children?: React.ReactNode | any;
  onUploadStart?: (file?: any) => void;
  onUploadEnd?: (
    result?: any,
    file?: any,
    description?: string,
    isCover?: boolean
  ) => void;
  onUploadError?: (message?: string) => void;
  isCover?: boolean;
  onlyPhoto?: boolean;
  uploadHandler: (e: any) => void;
  text?: string;
};

const Uploader: React.FC<UploaderProps> = ({
  isVisible,
  onVisible,
  children,
  onUploadEnd,
  onUploadStart,
  onUploadError,
  isCover,
  text,
  onlyPhoto = false,
  uploadHandler,
}) => {
  const [isUploading, onUploading] = useState<boolean>(false);

  const onStart = () => {
    setTimeout(() => {
      onUploading(true);
      onUploadStart && onUploadStart();
    }, 400);
  };

  const onError = (message: string) => {
    onUploading(false);
    onUploadError && onUploadError(message);
  };

  const onEnd = (result?: any, file?: any, description?: string) => {
    onUploading(false);
    onUploadEnd && onUploadEnd(result, file, description, isCover);
  };

  const mLaunchCamera = (mediaType: MediaType) => {
    if (!ScreenUtils.isIOS) {
      return androidCameraPermission(() => launchCameraCallback(mediaType));
    }
    launchCameraCallback(mediaType);
  };

  const launchCameraCallback = (mediaType: MediaType) => {
    launchCamera({ mediaType }, (res: any) => {
      if (res.errorCode) {
        //alert
        onError('Failed');
        return;
      }
      if (res.didCancel) {
        return;
      }

      const file = {
        name: res.fileName,
        size: res.fileSize,
        type: res.type,
        uri: res.uri,
      };
      onVisible(false);

      uploadHandler({
        file,
        event: (event: any) => {
          console.log(Math.round((100 * event.loaded) / event.total));
        },
        onStart,
        onError,
        onEnd,
      });
    });
  };

  const mLaunchLibrary = (mediaType: MediaType) => {
    launchImageLibrary({ mediaType }, (res: any) => {
      if (res.errorCode) {
        //alert
        onError('Failed');
        return;
      }
      if (res.didCancel) {
        return;
      }
      const file = {
        name: res.assets[0].fileName,
        size: res.assets[0].fileSize,
        type: res.assets[0].type,
        uri: res.assets[0].uri,
      };

      onVisible(false);
      uploadHandler({
        file,
        event: (event: any) => {
          console.log(Math.round((100 * event.loaded) / event.total));
        },
        onStart,
        onError,
        onEnd,
      });
    });
  };

  const mChooseFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const file = res[0] as any;

      onVisible(false);
      uploadHandler({
        file,
        event: (event: any) => {
          console.log(Math.round((100 * event.loaded) / event.total));
        },
        onStart,
        onError,
        onEnd,
      });
    } catch (err: any) {
      if (!DocumentPicker.isCancel(err)) {
        onError('Failed');
      }
    }
  };

  return (
    <View>
      <Modal cancelable={false} isVisible={isUploading} onVisible={onUploading}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
          }}
        >
          <ActivityIndicator size="small" color="#4F33AF" />
          <TextView
            bold
            large
            style={{
              color: '#4F33AF',
              alignSelf: 'center',
              marginBottom: 15,
              marginTop: 8,
            }}
          >
            {text ? text : 'Please wait'}
          </TextView>
        </View>
      </Modal>
      <Modal bottom isVisible={isVisible} onVisible={onVisible}>
        <View
          style={{ paddingBottom: ScreenUtils.isIphoneWithNotch() ? 30 : 0 }}
        >
          {children}
          {children && <Divider style={{ marginStart: 20 }} />}
          <Touchable
            onPress={() => {
              mLaunchLibrary('photo');
            }}
          >
            <TextView style={{ padding: 10, paddingHorizontal: 20 }}>
              {'Library'}
            </TextView>
          </Touchable>
          <Divider style={{ marginStart: 20 }} />
          <Touchable
            onPress={() => {
              mLaunchCamera('photo');
            }}
          >
            <TextView style={{ padding: 10, paddingHorizontal: 20 }}>
              {'Camera'}
            </TextView>
          </Touchable>
          <Divider style={{ marginStart: 20 }} />
          {!onlyPhoto && (
            <Touchable
              onPress={() => {
                mChooseFile();
              }}
            >
              <TextView style={{ padding: 10, paddingHorizontal: 20 }}>
                {'File'}
              </TextView>
            </Touchable>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Uploader;
